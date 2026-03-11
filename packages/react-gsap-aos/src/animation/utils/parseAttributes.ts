import { anchorPlacements, easings } from "../constants";

import type { AnimationOptions, AOSAttributeKey } from "@/types";

/** AOS 屬性對應 */
const AOS_ATTRIBUTE_MAP = {
  "data-aos-offset": "offset",
  "data-aos-delay": "delay",
  "data-aos-duration": "duration",
  "data-aos-easing": "easing",
  "data-aos-mirror": "mirror",
  "data-aos-once": "once",
  "data-aos-anchor-placement": "anchorPlacement",
  "data-aos-markers": "markers",
} satisfies Record<AOSAttributeKey, keyof AnimationOptions>;

/** 解析動畫屬性 */
export default function parseAttributes<E extends Element>(element: E) {
  const options = {} as Partial<AnimationOptions>;

  for (const key of Object.keys(AOS_ATTRIBUTE_MAP)) {
    const value = element.getAttribute(key);

    if (value) {
      const prop = AOS_ATTRIBUTE_MAP[key as AOSAttributeKey];

      switch (prop) {
        case "offset": {
          const numberValue = parseNumber(value);
          if (typeof numberValue === "number") {
            options[prop] = numberValue;
          }
          break;
        }
        case "delay":
        case "duration": {
          const numberValue = parseNumber(value);
          if (typeof numberValue === "number") {
            options[prop] = Math.max(0, numberValue);
          }
          break;
        }
        case "once":
        case "mirror":
        case "markers": {
          const booleanValue = parseBoolean(value);
          if (typeof booleanValue === "boolean") {
            options[prop] = booleanValue;
          }
          break;
        }
        case "easing": {
          const easing = parseEnum(easings, value);
          if (easing) {
            options[prop] = easing;
          }
          break;
        }
        case "anchorPlacement": {
          const anchorPlacement = parseEnum(anchorPlacements, value);
          if (anchorPlacement) {
            options[prop] = anchorPlacement;
          }
          break;
        }
        default:
          break;
      }
    }
  }

  return options;
}

function parseEnum<T extends string>(
  list: readonly T[],
  value: string,
): T | undefined {
  return list.includes(value as T) ? (value as T) : undefined;
}

function parseBoolean(value: string) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return undefined;
  }
}

function parseNumber(value: string) {
  const num = Number(value);
  return Number.isInteger(num) ? num : undefined;
}
