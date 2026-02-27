import type { EstimationRange } from "../services";

type Props = {
  range: EstimationRange;
  notes?: string;
};

export const ClientSummaryCard = ({ range, notes }: Props) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="text-sm uppercase tracking-[0.2em] text-white/60">Estimate range</div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
          <div className="text-xs text-white/60">Min</div>
          <div className="text-lg font-semibold">{range.min}</div>
        </div>
        <div className="rounded-xl border border-jitcyan/40 bg-black/40 p-3">
          <div className="text-xs text-white/60">Probable</div>
          <div className="text-lg font-semibold">{range.probable}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 p-3">
          <div className="text-xs text-white/60">Max</div>
          <div className="text-lg font-semibold">{range.max}</div>
        </div>
      </div>
      {notes && <p className="mt-4 text-sm text-white/70">{notes}</p>}
    </div>
  );
};
