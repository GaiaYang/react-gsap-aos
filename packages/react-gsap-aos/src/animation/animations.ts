import gsap from "gsap";

import mergeOptions from "./utils/mergeOptions";
import definitions, {
  AnimationDefinitions,
  AnimationPreset,
} from "./definitions";

import type { AnchorPlacement, AnimationOptions } from "@/types";

export type CreateAnimationFunction = (
  element: HTMLElement,
  options?: Partial<AnimationOptions>,
) => gsap.core.Tween;

/** 解析 ScrollTrigger 的 `start` */
function resolveScrollTriggerStart(
  anchorPlacement: AnchorPlacement,
  offset: number,
): string {
  const [v1, v2] = anchorPlacement.split("-");
  const anchor = `${v1} ${v2}`;

  if (offset === 0 || !Number.isFinite(offset)) return anchor;

  const fix = `${offset > 0 ? "-" : "+"}=${Math.abs(offset)}`;
  return `${anchor}${fix}`;
}

/** 解析 ScrollTrigger 的 `toggleActions` */
function resolveToggleActions(once?: boolean, mirror?: boolean): string {
  if (once) return "play none none none";
  if (mirror) return "play reverse play reverse";
  return "play none none reverse";
}

/** 建立 ScrollTrigger 動畫 */
function createScrollTriggerTween(
  element: HTMLElement,
  preset: AnimationPreset,
  vars: AnimationPreset,
  options?: Partial<AnimationOptions>,
) {
  const { from, to } = vars;
  const { offset, delay, duration, easing, once, mirror, anchorPlacement } =
    mergeOptions(options);

  /** 上層基準容器 */
  const container = element.parentElement?.hasAttribute("data-aos-container")
    ? element.parentElement
    : null;

  return gsap.fromTo(
    element,
    {
      ...preset.from,
      ...from,
    },
    {
      ...preset.to,
      ...to,
      ease: easing,
      duration: duration / 1000,
      delay: delay / 1000,
      overwrite: "auto",
      scrollTrigger: {
        // markers: true,
        invalidateOnRefresh: true,
        trigger: container || element,
        toggleActions: resolveToggleActions(once, mirror),
        start: resolveScrollTriggerStart(anchorPlacement, offset),
      },
    },
  );
}

/** 建立動畫物件組 */
function createAnimationMap<T extends Record<string, AnimationDefinitions>>(
  definitions: T,
): { [K in keyof T]: CreateAnimationFunction } {
  const result = {} as Record<keyof T, CreateAnimationFunction>;
  const keys = Object.keys(definitions) as Array<keyof T>;

  for (const key of keys) {
    const { preset, vars } = definitions[key];

    result[key] = (element, options) =>
      createScrollTriggerTween(element, preset, vars, options);
  }

  return result;
}

const animations = createAnimationMap(definitions);

export default animations;
