import { anchorPlacements, easings } from "@/constants";
import type { Animation, AnimationOptions, AOSAttributeKey } from "@/types";

interface AOSDataAttributes extends Partial<Record<AOSAttributeKey, string>> {
  "data-aos": Animation;
}

export interface AOSAttributeOptions extends Partial<AnimationOptions> {
  animation: Animation;
}

/**
 * 將動畫選項轉成可直接使用的 AOS data attributes
 *
 * > 不合法的值會被過濾掉
 */
export default function toAOSProps(
  options?: AOSAttributeOptions,
): Partial<AOSDataAttributes> {
  if (!options) return {};

  return omitNil({
    "data-aos": options.animation,
    "data-aos-offset": toNumberAttr(options.offset),
    "data-aos-delay": toNumberAttr(options.delay, 0),
    "data-aos-duration": toNumberAttr(options.duration, 0),
    "data-aos-easing": toEnumAttr(easings, options.easing),
    "data-aos-mirror": toBooleanAttr(options.mirror),
    "data-aos-once": toBooleanAttr(options.once),
    "data-aos-anchor-placement": toEnumAttr(
      anchorPlacements,
      options.anchorPlacement,
    ),
    "data-aos-markers": toBooleanAttr(options.markers),
  } satisfies AOSDataAttributes);
}

function omitNil<T extends object>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  const keys = Object.keys(obj) as Array<keyof T>;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    if (value != null) {
      result[key] = value;
    }
  }

  return result;
}

function toBooleanAttr(value?: boolean) {
  return typeof value === "boolean" ? String(value) : undefined;
}

function toNumberAttr(value?: number, min?: number) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return undefined;
  }

  const next = typeof min === "number" ? Math.max(min, value) : value;

  return String(next);
}

function toEnumAttr<T>(list: readonly T[], value: T) {
  return list.includes(value) ? value : undefined;
}
