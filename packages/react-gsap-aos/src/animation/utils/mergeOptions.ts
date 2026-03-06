import { anchorPlacements, DEFAULT_OPTIONS, easings } from "../constants";

import type { AnimationOptions } from "@/types";

/** 跟預設值合併動畫選項 */
export default function mergeOptions(
  ...array: (Partial<AnimationOptions> | undefined | null)[]
): AnimationOptions {
  const result = { ...DEFAULT_OPTIONS };

  for (const options of array) {
    if (!options) continue;

    for (const key of Object.keys(options) as (keyof AnimationOptions)[]) {
      const value = options[key];

      switch (key) {
        case "offset":
        case "delay":
        case "duration":
          if (typeof value === "number" && Number.isInteger(value)) {
            result[key] = value;
          }
          break;
        case "once":
        case "mirror":
        case "markers":
          if (typeof value === "boolean") {
            result[key] = value;
          }
          break;
        case "easing":
          if (verifyEnum(easings, value)) {
            result[key] = value;
          }
          break;
        case "anchorPlacement":
          if (verifyEnum(anchorPlacements, value)) {
            result[key] = value;
          }
          break;
        default:
          break;
      }
    }
  }

  return result;
}

function verifyEnum<T>(list: readonly T[], value: unknown): value is T {
  return list.includes(value as T);
}
