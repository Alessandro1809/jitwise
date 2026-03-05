"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/ui/markdown";
import type { EstimationInput } from "@/lib/schema/estimation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type ScopeAdvisorPanelProps = {
  estimationInput: EstimationInput | null;
  onAddToTemplate?: (items: string[]) => void;
};

const extractBulletItems = (content: string) => {
  const items = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, "").trim())
    .filter((line) => line.length > 0);

  return Array.from(new Set(items));
};

export function ScopeAdvisorPanel({
  estimationInput,
  onAddToTemplate,
}: ScopeAdvisorPanelProps) {
  const [content, setContent] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canGenerate = Boolean(estimationInput) && status !== "loading";

  const handleGenerate = async () => {
    if (!estimationInput) {
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;
      if (!accessToken) {
        throw new Error("Missing session token");
      }

      const response = await fetch("/api/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ input: estimationInput }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json()) as { error?: string };
        throw new Error(errorPayload.error ?? "Advisor request failed.");
      }

      const payload = (await response.json()) as { content?: string };
      setContent(payload.content ?? "");
      setSelectedItems([]);
      setStatus("idle");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Advisor request failed."
      );
      setStatus("error");
    }
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Scope advisor
        </p>
        <h2 className="text-lg font-semibold text-foreground">
          Surface missing scope items
        </h2>
        <p className="text-sm text-muted-foreground">
          Generates a short checklist of potential gaps to review.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          onClick={handleGenerate}
          disabled={!canGenerate}
          aria-busy={status === "loading"}
        >
          {status === "loading" ? "Generating..." : "Generate suggestions"}
        </Button>
        {!estimationInput && (
          <span className="text-xs text-muted-foreground">
            Add at least one module to generate suggestions.
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 text-sm">
        {errorMessage && (
          <p className="text-xs text-destructive">{errorMessage}</p>
        )}
        {!content && !errorMessage && (
          <p className="text-muted-foreground">No suggestions yet.</p>
        )}
        {content && (
          <div className="rounded-md border border-border bg-background px-3 py-3">
            <MarkdownRenderer content={content} />
          </div>
        )}
      </div>
      {content && (
        <div className="mt-4 rounded-md border border-border bg-background px-3 py-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Add to scope template
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Select advisor items to include in a developer-facing scope template.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {extractBulletItems(content).map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <label
                  key={item}
                  className="flex items-start gap-2 rounded-md border border-border bg-card px-3 py-2"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border"
                    checked={isSelected}
                    onChange={() => {
                      setSelectedItems((current) =>
                        isSelected
                          ? current.filter((entry) => entry !== item)
                          : [...current, item]
                      );
                    }}
                  />
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              disabled={selectedItems.length === 0}
              onClick={() => onAddToTemplate?.(selectedItems)}
            >
              Add selected to template
            </Button>
            {selectedItems.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {selectedItems.length} selected
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
