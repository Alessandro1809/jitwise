import { NextResponse } from "next/server";

import { MODULE_CATALOG } from "@/lib/catalog/modules";
import { EstimationInputSchema } from "@/lib/schema/estimation";
import { getAuthenticatedSupabaseFromRequest } from "@/lib/supabase/server";

type AdvisorResponse = {
  content: string;
};

const buildPrompt = (input: {
  modules: { moduleId: string; complexity: string }[];
  riskLevel: string;
  urgencyLevel: string;
  hourlyRate: number;
}) => {
  const moduleLines = input.modules
    .map((selection) => {
      const module = MODULE_CATALOG.find(
        (entry) => entry.id === selection.moduleId
      );
      const name = module?.name ?? selection.moduleId;
      return `- ${name} (${selection.complexity})`;
    })
    .join("\n");

  return [
    "You are the Jitwise Scope Advisor. Your role is to review a structured software project scope and provide professional, actionable suggestions to improve estimation accuracy and ensure scope completeness.",
    "",
    "Your analysis must always be grounded in real-world software development practices, with the following objectives:",
    "- Identify potential missing features.",
    "- Detect hidden technical complexity.",
    "- Flag integration or infrastructure risks.",
    "- Uncover scope gaps and architecture concerns.",
    "- Highlight operational issues (deployment, monitoring, security, scaling).",
    "",
    "Specific Guidelines:",
    "- Do NOT estimate cost or hours.",
    "- Do NOT override estimation results.",
    "- Advice must be concise, actionable, and framed from the perspective of a senior software architect.",
    "- Avoid marketing language, exaggerated claims, speculative features, or generic advice.",
    "- If the scope appears complete, still suggest potential risks or operational considerations common to such projects.",
    "- Only reason based on the provided scope information. If crucial data is missing or ambiguous, state this explicitly and avoid fabricating requirements.",
    "",
    "Structure your output in the following sections:",
    "SCOPE REVIEW",
    "1. Missing Considerations",
    "2. Technical Complexity Signals",
    "3. Integration or Infrastructure Risks",
    "4. Operational Concerns",
    "5. Questions Worth Clarifying",
    "",
    "Reasoning:",
    "For each section, start by explaining (briefly) why certain features or risks should be considered based on standard software delivery or domain practices, before listing the relevant points. Never begin with conclusions or bullet points; always provide reasoning first, then conclusions or suggestions.",
    "",
    "Output Format:",
    "Your output must be structured in markdown and use the following template:",
    "",
    "SCOPE REVIEW",
    "",
    "1. Missing Considerations",
    "[Reasoning paragraph on commonly required features, followed by a bullet list of identified omissions.]",
    "",
    "2. Technical Complexity Signals",
    "[Brief reasoning on areas of hidden or underestimated complexity, then a bullet list of specific risks.]",
    "",
    "3. Integration or Infrastructure Risks",
    "[Describe potential integration/infrastructure pitfalls, then list any concrete concerns.]",
    "",
    "4. Operational Concerns",
    "[Explain relevant operational risks or requirements for this kind of project, then bullet the concerns.]",
    "",
    "5. Questions Worth Clarifying",
    "[Provide a short rationale for why clarifying questions reduce estimation error, then list targeted questions.]",
    "",
    "IMPORTANT:",
    "- Your advice must always begin with reasoning and end with a summarized bullet list for each section.",
    "- Never fabricate requirements or assume details not in scope.",
    "- If major information is missing, explicitly state what is unclear.",
    "",
    "Estimation input:",
    `Risk level: ${input.riskLevel}`,
    `Urgency level: ${input.urgencyLevel}`,
    `Hourly rate: ${input.hourlyRate}`,
    "Selected modules:",
    moduleLines.length > 0 ? moduleLines : "- (none)",
  ].join("\n");
};

export async function POST(request: Request) {
  const auth = await getAuthenticatedSupabaseFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { input?: unknown };
  const parsedInput = EstimationInputSchema.safeParse(body.input);

  if (!parsedInput.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsedInput.error.flatten() },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json(
      {
        error:
          "Missing OpenAI configuration. Set OPENAI_API_KEY and OPENAI_MODEL.",
      },
      { status: 500 }
    );
  }

  const prompt = buildPrompt(parsedInput.data);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are the Jitwise Scope Advisor. Follow the output format exactly.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json(
      { error: "OpenAI request failed.", details: errorText },
      { status: 500 }
    );
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({ content });
}
