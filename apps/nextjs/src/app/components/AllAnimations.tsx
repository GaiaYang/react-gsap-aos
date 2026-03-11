"use client";

import { toAOSProps } from "react-gsap-aos";
import { animations } from "react-gsap-aos/constants";

import useDynamicOptions from "./useDynamicOptions";

import ColorBox from "@/components/ColorBox";

export default function AllAnimations() {
  const options = useDynamicOptions();

  return (
    <ul className="mx-auto flex w-full max-w-180 flex-col gap-[inherit]">
      {animations.map((item, index) => (
        <li key={item}>
          <ColorBox
            index={index}
            {...toAOSProps({ ...options, animation: item })}
          >
            <span>{item.replace(/\-/g, " ")}</span>
          </ColorBox>
        </li>
      ))}
    </ul>
  );
}
