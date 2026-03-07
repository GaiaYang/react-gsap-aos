"use client";

import { useState } from "react";
import { toAOSProps } from "react-gsap-aos";

import ColorBox from "@/components/ColorBox";

import useDynamicOptions from "./useDynamicOptions";
import { InfoIcon } from "lucide-react";

const list = [50, 200, 500, 1000];

export default function LargeAnimations() {
  const options = useDynamicOptions();
  const [count, setCount] = useState(list[0]);

  return (
    <>
      <div role="alert" className="alert">
        <InfoIcon className="text-info" />
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
      <ul className="mx-auto flex w-full max-w-180 flex-col gap-[inherit]">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} data-aos-container>
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
