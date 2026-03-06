import { atomWithReset } from "jotai/utils";
import type { Animation, AnimationOptions } from "react-gsap-aos";

export const animationAtom = atomWithReset<Animation>("fade");
export const easingAtom = atomWithReset<AnimationOptions["easing"]>("none");
export const offsetAtom = atomWithReset<AnimationOptions["offset"]>(120);
export const durationAtom = atomWithReset<AnimationOptions["duration"]>(400);
export const delayAtom = atomWithReset<AnimationOptions["delay"]>(0);
export const onceAtom = atomWithReset<AnimationOptions["once"]>(false);
export const mirrorAtom = atomWithReset<AnimationOptions["mirror"]>(false);
export const anchorPlacementAtom =
  atomWithReset<AnimationOptions["anchorPlacement"]>("top-bottom");
export const markersAtom = atomWithReset<AnimationOptions["markers"]>(false);
