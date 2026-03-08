import parseAttributes from "./utils/parseAttributes";
import animations, { type CreateAnimationFunction } from "./animations";

import type { Animation, AnimationOptions } from "@/types";

const ANIMATION_REGISTRY: Record<Animation, CreateAnimationFunction> = {
  fade: animations.fade,
  "fade-up": animations.fadeUp,
  "fade-down": animations.fadeDown,
  "fade-left": animations.fadeLeft,
  "fade-right": animations.fadeRight,
  "fade-up-right": animations.fadeUpRight,
  "fade-up-left": animations.fadeUpLeft,
  "fade-down-right": animations.fadeDownRight,
  "fade-down-left": animations.fadeDownLeft,
  "flip-up": animations.flipUp,
  "flip-down": animations.flipDown,
  "flip-left": animations.flipLeft,
  "flip-right": animations.flipRight,
  "slide-up": animations.slideUp,
  "slide-down": animations.slideDown,
  "slide-left": animations.slideLeft,
  "slide-right": animations.slideRight,
  "zoom-in": animations.zoomIn,
  "zoom-in-up": animations.zoomInUp,
  "zoom-in-down": animations.zoomInDown,
  "zoom-in-left": animations.zoomInLeft,
  "zoom-in-right": animations.zoomInRight,
  "zoom-out": animations.zoomOut,
  "zoom-out-up": animations.zoomOutUp,
  "zoom-out-down": animations.zoomOutDown,
  "zoom-out-left": animations.zoomOutLeft,
  "zoom-out-right": animations.zoomOutRight,
};

/** 建立動畫元素 */
export default function createAnimation<E extends HTMLElement>(
  /** 要綁定動畫的元素 */
  element: E,
  /** 動畫選項 */
  options?: Partial<AnimationOptions>,
) {
  const animate = element.getAttribute("data-aos") as Animation | null;
  if (!animate) return;

  const handleAnimation = ANIMATION_REGISTRY[animate];
  if (!handleAnimation) return;

  return handleAnimation(element, {
    ...options,
    ...parseAttributes(element),
  });
}
