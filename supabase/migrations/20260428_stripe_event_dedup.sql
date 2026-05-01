-- Tracks processed Stripe webhook event IDs to prevent double-processing on retries.
-- Stripe retries failed webhooks for up to 3 days; we keep records for 7.
CREATE TABLE IF NOT EXISTS processed_stripe_events (
  event_id     TEXT        PRIMARY KEY,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index to support periodic cleanup of old records
CREATE INDEX IF NOT EXISTS processed_stripe_events_processed_at_idx
  ON processed_stripe_events (processed_at);
