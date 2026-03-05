import { NextResponse } from "next/server";

import { EstimationInputSchema } from "@/lib/schema/estimation";
import { getAuthenticatedSupabaseFromRequest } from "@/lib/supabase/server";

const buildTemplatePrompt = (input: {
  summaryMarkdown: string;
  advisorItems: string[];
  estimationInput: {
    modules: { moduleId: string; complexity: string }[];
    riskLevel: string;
    urgencyLevel: string;
    hourlyRate: number;
  };
}) => {
  const moduleLines = input.estimationInput.modules
    .map((selection) => `- ${selection.moduleId} (${selection.complexity})`)
    .join("\n");

  const advisorLines =
    input.advisorItems.length > 0
      ? input.advisorItems.map((item) => `- ${item}`).join("\n")
      : "- (none)";

  return [
    "You are the Jitwise Scope Template Builder.",
    "Your task: turn the provided client summary markdown and advisor follow-ups into a developer-facing scope template.",
    "The template should read like a clear implementation checklist.",
    "Do not invent scope beyond what is provided. If information is missing, add explicit placeholders and questions.",
    "Keep it structured, actionable, and concise. Avoid marketing language.",
    "",
    "Inputs:",
    "Client summary markdown:",
    input.summaryMarkdown,
    "",
    "Selected modules:",
    moduleLines.length > 0 ? moduleLines : "- (none)",
    "",
    "Advisor follow-ups:",
    advisorLines,
    "",
    "Output format requirements:",
    "- Markdown only",
    "- Use clear headings and bullet lists",
    "- Include sections: Overview, Functional Scope, Non-Functional Requirements, Open Questions, Acceptance Criteria",
    "- Keep it practical and specific to the given inputs",
  ].join("\n");
};

export async function POST(request: Request) {
  const auth = await getAuthenticatedSupabaseFromRequest(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    input?: unknown;
    summaryMarkdown?: string;
    advisorItems?: string[];
  };

  const parsedInput = EstimationInputSchema.safeParse(body.input);

  if (!parsedInput.success || typeof body.summaryMarkdown !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL;

  if (!apiKey || !model) {
    return NextResponse.json(
      { error: "Missing OpenAI configuration." },
      { status: 500 }
    );
  }

  const prompt = buildTemplatePrompt({
    summaryMarkdown: body.summaryMarkdown,
    advisorItems: Array.isArray(body.advisorItems) ? body.advisorItems : [],
    estimationInput: parsedInput.data,
  });

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
            "You are a precise technical writer. Follow the required sections.",
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

  return NextResponse.json({ content: content.trim() });
}
