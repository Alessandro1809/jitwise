-- Phase 6: Capture actual outcomes for estimates.

create table if not exists public.estimation_outcomes (
  id uuid primary key default gen_random_uuid(),
  estimation_id uuid not null references public.estimations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  actual_hours numeric,
  actual_cost numeric,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint estimation_outcomes_estimation_id_key unique (estimation_id)
);

create index if not exists estimation_outcomes_user_id_idx
  on public.estimation_outcomes (user_id);

create index if not exists estimation_outcomes_estimation_id_idx
  on public.estimation_outcomes (estimation_id);

alter table public.estimation_outcomes enable row level security;

create policy "estimation_outcomes_select_own"
  on public.estimation_outcomes
  for select
  using (auth.uid() = user_id);

create policy "estimation_outcomes_insert_own"
  on public.estimation_outcomes
  for insert
  with check (auth.uid() = user_id);

create policy "estimation_outcomes_update_own"
  on public.estimation_outcomes
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "estimation_outcomes_delete_own"
  on public.estimation_outcomes
  for delete
  using (auth.uid() = user_id);
