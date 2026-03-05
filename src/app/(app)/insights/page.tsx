import { redirect } from "next/navigation";

import { getAuthenticatedSupabase } from "@/lib/supabase/server";

type EstimationRow = {
  id: string;
  created_at: string;
  result: {
    hoursRange: { probable: number };
    pricingRange: { probable: number };
  };
};

type OutcomeRow = {
  estimation_id: string;
  actual_hours: number | null;
  actual_cost: number | null;
  completed_at: string | null;
  created_at: string;
};

const formatNumber = (value: number, fractionDigits = 1) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: fractionDigits,
  }).format(value);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default async function InsightsPage() {
  const auth = await getAuthenticatedSupabase();
  if (!auth) {
    redirect("/login");
  }

  const { supabase, user } = auth;
  const { data: estimationsData, error: estimationsError } = await supabase
    .from("estimations")
    .select("id, created_at, result")
    .eq("user_id", user.id);

  const { data: outcomesData, error: outcomesError } = await supabase
    .from("estimation_outcomes")
    .select("estimation_id, actual_hours, actual_cost, completed_at, created_at")
    .eq("user_id", user.id);

  if (estimationsError || outcomesError) {
    return (
      <main className="flex flex-col gap-4 py-12">
        <h1 className="text-2xl font-semibold">Insights</h1>
        <p className="text-sm text-muted-foreground">
          Could not load insights yet.
        </p>
      </main>
    );
  }

  const estimations = (estimationsData ?? []) as EstimationRow[];
  const outcomes = (outcomesData ?? []) as OutcomeRow[];
  const estimationById = new Map(
    estimations.map((item) => [item.id, item])
  );

  const outcomesWithActualHours = outcomes.filter(
    (outcome) => outcome.actual_hours !== null
  );
  const outcomesWithActualCost = outcomes.filter(
    (outcome) => outcome.actual_cost !== null
  );
  const completedCount = outcomes.filter(
    (outcome) => Boolean(outcome.completed_at)
  ).length;

  const avgActualHours =
    outcomesWithActualHours.length > 0
      ? outcomesWithActualHours.reduce(
          (sum, item) => sum + (item.actual_hours ?? 0),
          0
        ) / outcomesWithActualHours.length
      : null;
  const avgActualCost =
    outcomesWithActualCost.length > 0
      ? outcomesWithActualCost.reduce(
          (sum, item) => sum + (item.actual_cost ?? 0),
          0
        ) / outcomesWithActualCost.length
      : null;

  const hoursDeltaValues = outcomes
    .map((outcome) => {
      const estimation = estimationById.get(outcome.estimation_id);
      if (!estimation || outcome.actual_hours === null) {
        return null;
      }
      return outcome.actual_hours - estimation.result.hoursRange.probable;
    })
    .filter((value): value is number => value !== null);

  const costDeltaValues = outcomes
    .map((outcome) => {
      const estimation = estimationById.get(outcome.estimation_id);
      if (!estimation || outcome.actual_cost === null) {
        return null;
      }
      return outcome.actual_cost - estimation.result.pricingRange.probable;
    })
    .filter((value): value is number => value !== null);

  const avgHoursDelta =
    hoursDeltaValues.length > 0
      ? hoursDeltaValues.reduce((sum, value) => sum + value, 0) /
        hoursDeltaValues.length
      : null;
  const avgCostDelta =
    costDeltaValues.length > 0
      ? costDeltaValues.reduce((sum, value) => sum + value, 0) /
        costDeltaValues.length
      : null;

  const recentOutcomes = [...outcomes]
    .sort((a, b) => {
      const aTime = new Date(a.completed_at ?? a.created_at).getTime();
      const bTime = new Date(b.completed_at ?? b.created_at).getTime();
      return bTime - aTime;
    })
    .slice(0, 8);

  return (
    <main className="flex flex-col gap-8 py-12">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Insights
        </p>
        <h1 className="text-2xl font-semibold text-foreground">
          Estimation quality snapshot
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          These metrics reflect the outcomes you have captured so far.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Outcomes captured
          </p>
          <p className="mt-2 text-2xl font-semibold">{outcomes.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Completed projects
          </p>
          <p className="mt-2 text-2xl font-semibold">{completedCount}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Avg actual hours
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {avgActualHours !== null ? `${formatNumber(avgActualHours)} hrs` : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Avg actual cost
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {avgActualCost !== null ? formatCurrency(avgActualCost) : "—"}
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Avg hours delta
          </p>
          <p className="mt-2 text-lg font-semibold">
            {avgHoursDelta !== null
              ? `${avgHoursDelta > 0 ? "+" : ""}${formatNumber(avgHoursDelta)} hrs`
              : "—"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Actual minus probable hours.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Avg cost delta
          </p>
          <p className="mt-2 text-lg font-semibold">
            {avgCostDelta !== null
              ? `${avgCostDelta > 0 ? "+" : ""}${formatCurrency(avgCostDelta)}`
              : "—"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Actual minus probable cost.
          </p>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Recent outcomes
        </p>
        <div className="mt-3 flex flex-col gap-3 text-sm">
          {recentOutcomes.length === 0 && (
            <p className="text-muted-foreground">
              No outcomes captured yet.
            </p>
          )}
          {recentOutcomes.map((outcome) => {
            const estimation = estimationById.get(outcome.estimation_id);
            const estimatedHours = estimation?.result.hoursRange.probable ?? null;
            const estimatedCost = estimation?.result.pricingRange.probable ?? null;
            const hoursDelta =
              estimatedHours !== null && outcome.actual_hours !== null
                ? outcome.actual_hours - estimatedHours
                : null;
            const costDelta =
              estimatedCost !== null && outcome.actual_cost !== null
                ? outcome.actual_cost - estimatedCost
                : null;

            return (
              <div
                key={outcome.estimation_id}
                className="rounded-lg border border-border bg-background px-3 py-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-muted-foreground">
                    Estimation {outcome.estimation_id.slice(0, 8)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {outcome.completed_at
                      ? `Completed ${outcome.completed_at.slice(0, 10)}`
                      : `Captured ${outcome.created_at.slice(0, 10)}`}
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    Actual hours:{" "}
                    <span className="font-semibold text-foreground">
                      {outcome.actual_hours !== null
                        ? `${formatNumber(outcome.actual_hours)} hrs`
                        : "—"}
                    </span>
                  </span>
                  <span>
                    Actual cost:{" "}
                    <span className="font-semibold text-foreground">
                      {outcome.actual_cost !== null
                        ? formatCurrency(outcome.actual_cost)
                        : "—"}
                    </span>
                  </span>
                  <span>
                    Hours delta:{" "}
                    <span className="font-semibold text-foreground">
                      {hoursDelta !== null
                        ? `${hoursDelta > 0 ? "+" : ""}${formatNumber(
                            hoursDelta
                          )} hrs`
                        : "—"}
                    </span>
                  </span>
                  <span>
                    Cost delta:{" "}
                    <span className="font-semibold text-foreground">
                      {costDelta !== null
                        ? `${costDelta > 0 ? "+" : ""}${formatCurrency(
                            costDelta
                          )}`
                        : "—"}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
