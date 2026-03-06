import { useAtomValue } from "jotai";

import {
  animationAtom,
  easingAtom,
  offsetAtom,
  durationAtom,
  delayAtom,
  onceAtom,
  mirrorAtom,
  anchorPlacementAtom,
  markersAtom,
} from "@/jotai/animation";

export default function useDynamicOptions() {
  const animation = useAtomValue(animationAtom);
  const easing = useAtomValue(easingAtom);
  const offset = useAtomValue(offsetAtom);
  const duration = useAtomValue(durationAtom);
  const delay = useAtomValue(delayAtom);
  const once = useAtomValue(onceAtom);
  const mirror = useAtomValue(mirrorAtom);
  const anchorPlacement = useAtomValue(anchorPlacementAtom);
  const markers = useAtomValue(markersAtom);
  return {
    animation,
    easing,
    offset,
    duration,
    delay,
    once,
    mirror,
    anchorPlacement,
    markers,
  };
}
