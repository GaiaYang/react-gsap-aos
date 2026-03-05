import { anchorPlacements, easings } from "@/constants";
import type { Animation, AnimationOptions, AOSAttributeKey } from "@/types";

interface AOSDataAttributes extends Partial<Record<AOSAttributeKey, string>> {
  "data-aos": Animation;
}

export interface AOSAttributeOptions extends Partial<AnimationOptions> {
  animation: Animation;
}

/** 將 options 轉成可直接使用的 AOS data attributes */
export default function toAOSProps(
  options?: AOSAttributeOptions,
): Partial<AOSDataAttributes> {
  if (!options) return {};

  return omitNil({
    "data-aos": options.animation,
    "data-aos-offset": toNumberAttr(options.offset),
    "data-aos-delay": toNumberAttr(options.delay),
    "data-aos-duration": toNumberAttr(options.duration),
    "data-aos-easing": validateEnumValue(easings, options.easing),
    "data-aos-mirror": toBooleanAttr(options.mirror),
    "data-aos-once": toBooleanAttr(options.once),
    "data-aos-anchor-placement": validateEnumValue(
      anchorPlacements,
      options.anchorPlacement,
    ),
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

function toNumberAttr(value?: number) {
  return Number.isInteger(value) ? String(value) : undefined;
}

function validateEnumValue<T>(list: readonly T[], value: T) {
  return list.includes(value) ? value : undefined;
}
