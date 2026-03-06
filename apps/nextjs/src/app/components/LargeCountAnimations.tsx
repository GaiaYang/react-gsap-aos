"use client";

import AnchorPlacementMarker from "@/components/animtaion-panel/AnchorPlacementMarker";
import ColorBox from "@/components/ColorBox";
import React, { useState } from "react";
import { toAOSProps } from "react-gsap-aos";
import useDynamicOptions from "./useDynamicOptions";

const list = [50, 100, 150, 200];

export default function LargeCountAnimations() {
  const options = useDynamicOptions();
  const [count, setCount] = useState(list[0]);

  return (
    <>
      <div role="alert" className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>此區塊沒有使用虛擬化列表</span>
      </div>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">列表數量</legend>
        <select
          id="list-count"
          value={count}
          onChange={(event) => {
            setCount(Number(event.currentTarget.value));
          }}
          className="select"
        >
          {list.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </fieldset>
      <ul className="mx-auto flex w-full max-w-3xl flex-col gap-[inherit]">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} data-aos-container className="relative">
            <AnchorPlacementMarker />
            <ColorBox index={index} {...toAOSProps(options)}>
              <span>
                {`${options.animation.replace(/\-/g, " ")} ${index + 1}`}
              </span>
            </ColorBox>
          </li>
        ))}
      </ul>
    </>
  );
}
