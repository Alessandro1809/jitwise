'use client';

import { useMemo, useState } from "react";
import type { EstimationInput } from "../model";

type Props = {
  defaultInput?: EstimationInput;
  onSubmit?: (input: EstimationInput) => void;
};

const parseList = (value: string): string[] => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const EstimationForm = ({ defaultInput, onSubmit }: Props) => {
  const [scope, setScope] = useState(defaultInput?.scope ?? "");
  const [risks, setRisks] = useState((defaultInput?.risks ?? []).join(", "));
  const [constraints, setConstraints] = useState(
    (defaultInput?.constraints ?? []).join(", ")
  );

  const preview = useMemo<EstimationInput>(
    () => ({
      scope: scope.trim() || undefined,
      risks: parseList(risks),
      constraints: parseList(constraints),
    }),
    [scope, risks, constraints]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(preview);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold">Scope</label>
        <textarea
          className="min-h-[120px] w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
          placeholder="Describe the scope of work"
          value={scope}
          onChange={(event) => setScope(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold">Risks (comma separated)</label>
        <input
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
          placeholder="Third-party dependency, uncertain requirements"
          value={risks}
          onChange={(event) => setRisks(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold">Constraints (comma separated)</label>
        <input
          className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
          placeholder="Hard launch date, limited QA bandwidth"
          value={constraints}
          onChange={(event) => setConstraints(event.target.value)}
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-full border border-jitcyan/60 px-6 text-sm font-semibold text-white transition hover:border-jitcyan hover:bg-jitblue/80"
      >
        Estimate
      </button>
    </form>
  );
};
