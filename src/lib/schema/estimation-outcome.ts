import { z } from "zod";

export const EstimationOutcomeInputSchema = z
  .object({
    actualHours: z.number().min(0).nullable().optional(),
    actualCost: z.number().min(0).nullable().optional(),
    completedAt: z.string().datetime().nullable().optional(),
    notes: z.string().max(2000).nullable().optional(),
  })
  .strict();

export type EstimationOutcomeInput = z.infer<
  typeof EstimationOutcomeInputSchema
>;
