"use client";

import { toAOSProps } from "react-gsap-aos";

import useDynamicOptions from "./useDynamicOptions";

import ColorBox from "@/components/ColorBox";
import AnchorPlacementMarker from "@/components/animtaion-panel/AnchorPlacementMarker";

const list = Array(20).fill(null);

export default function SingleAnimations() {
  const options = useDynamicOptions();

  return (
    <ul className="mx-auto flex w-full max-w-3xl flex-col gap-[inherit]">
      {list.map((_, index) => (
        <li key={index} data-aos-container className="relative">
          <AnchorPlacementMarker />
          <ColorBox index={index} {...toAOSProps(options)}>
            <span>{options.animation.replace(/\-/g, " ")}</span>
          </ColorBox>
        </li>
      ))}
    </ul>
  );
}
