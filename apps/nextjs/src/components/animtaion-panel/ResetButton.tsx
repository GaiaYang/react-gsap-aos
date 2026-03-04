import { useSetAtom } from "jotai";
import { RESET } from "jotai/utils";

import {
  animationAtom,
  easingAtom,
  offsetAtom,
  durationAtom,
  delayAtom,
  onceAtom,
  mirrorAtom,
  anchorPlacementAtom,
} from "@/jotai/animation";

export default function ResetButton() {
  const setAnimation = useSetAtom(animationAtom);
  const setEasing = useSetAtom(easingAtom);
  const setAnchorPlacement = useSetAtom(anchorPlacementAtom);
  const setOffset = useSetAtom(offsetAtom);
  const setDuration = useSetAtom(durationAtom);
  const setDelay = useSetAtom(delayAtom);
  const setOnce = useSetAtom(onceAtom);
  const setMirror = useSetAtom(mirrorAtom);

  function onClick() {
    setAnimation(RESET);
    setEasing(RESET);
    setAnchorPlacement(RESET);
    setOffset(RESET);
    setDuration(RESET);
    setDelay(RESET);
    setOnce(RESET);
    setMirror(RESET);
  }

  return (
    <button type="button" onClick={onClick} className="btn btn-error">
      重置所有動畫
    </button>
  );
}
