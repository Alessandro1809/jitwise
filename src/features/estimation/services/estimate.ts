import type { EstimationInput } from "../model";

export type EstimationRange = {
  min: number;
  probable: number;
  max: number;
};

export function estimateRange(_input: EstimationInput): EstimationRange {
  return { min: 0, probable: 0, max: 0 };
}
