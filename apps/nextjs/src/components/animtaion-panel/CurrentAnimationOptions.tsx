"use client";

import { memo } from "react";
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
} from "@/jotai/animation";

interface Option {
  label: string;
  value: string;
}

export default memo(function CurrentAnimationOptions() {
  const animation = useAtomValue(animationAtom);
  const easing = useAtomValue(easingAtom);
  const anchorPlacement = useAtomValue(anchorPlacementAtom);
  const offset = useAtomValue(offsetAtom);
  const duration = useAtomValue(durationAtom);
  const delay = useAtomValue(delayAtom);
  const once = useAtomValue(onceAtom);
  const mirror = useAtomValue(mirrorAtom);

  const data: Option[] = [
    { label: "animation", value: `${animation}` },
    { label: "easing", value: `${easing}` },
    { label: "anchorPlacement", value: `${anchorPlacement}` },
    { label: "offset", value: `${offset}` },
    { label: "duration", value: `${duration}` },
    { label: "delay", value: `${delay}` },
    { label: "once", value: `${once}` },
    { label: "mirror", value: `${mirror}` },
  ];

  return (
    <div className="fieldset">
      <p className="label">當前參數</p>
      <div className="flex flex-wrap gap-2">{data.map(renderItem)}</div>
    </div>
  );
});

function renderItem(item: Option, index: number) {
  return (
    <div key={index} className="join font-mono">
      <div className="badge badge-primary join-item">{item.label}</div>
      <div className="badge join-item">{item.value}</div>
    </div>
  );
}
