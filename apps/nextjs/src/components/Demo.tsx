"use client";

import { useMemo, useState } from "react";

import { toAOSProps, useAOSInitial } from "react-gsap-aos";
import { animations, easings } from "react-gsap-aos/constants";
import cn from "@/utils/cn";

import FilterPanel from "./FilterPanel";

interface Tab {
  value: string;
  label: string;
}

const tabs: Tab[] = [
  {
    value: "all",
    label: "所有動畫",
  },
  {
    value: "single",
    label: "單一動畫",
  },
];

export default function Demo() {
  const { containerRef } = useAOSInitial<HTMLDivElement>();
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-4 py-4 *:px-4"
    >
      <div>
        <div role="tablist" className="tabs tabs-box">
          {tabs.map((item, index) => (
            <button
              key={item.value}
              role="tab"
              type="button"
              onClick={() => {
                setTabIndex(index);
              }}
              className={cn("tab", { "tab-active": tabIndex === index })}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {renderPanel(tabIndex)}
      <OffsetMark />
      <FAB />
    </div>
  );
}

function renderPanel(index: number) {
  switch (index) {
    case 0:
      return <AllAnimation />;
    case 1:
      return <SingleAnimation />;
    default:
      break;
  }
}

function OffsetMark() {
  return (
    <div className="bg-primary fixed left-0 h-px" style={{ bottom: 120 }}>
      <span className="text-primary font-semibold">動畫觸發點</span>
    </div>
  );
}

function FAB() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="btn-circle btn btn-lg fixed right-4 bottom-4"
    >
      ↑
    </button>
  );
}

function AllAnimation() {
  const [easing, setEasing] = useState(easings[0]);

  return (
    <>
      <FilterPanel filter={["easing"]} easing={easing} setEasing={setEasing} />
      <ul className="flex flex-col gap-4 overflow-hidden">
        {animations.map((item, index) => (
          <li key={item} data-aos-container>
            <div
              {...toAOSProps({ animation: item, easing })}
              className={cn(
                "flex h-60 items-center justify-center rounded-lg",
                bgColors[index],
              )}
            >
              <span className="text-2xl font-semibold text-white">
                {item.replace(/\-/g, " ")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function SingleAnimation() {
  const list = useMemo(() => Array(20).fill(null), []);
  const [animation, setAnimation] = useState(animations[0]);
  const [easing, setEasing] = useState(easings[0]);

  return (
    <>
      <FilterPanel
        animation={animation}
        setAnimation={setAnimation}
        easing={easing}
        setEasing={setEasing}
      />
      <ul className="flex flex-col gap-4 overflow-hidden">
        {list.map((_, index) => (
          <li key={[animation, easing, index].join("-")} data-aos-container>
            <div
              {...toAOSProps({ animation, easing })}
              className={cn(
                "flex h-60 items-center justify-center rounded-lg",
                bgColors[index],
              )}
            >
              <span className="text-2xl font-semibold text-white">
                {animation.replace(/\-/g, " ")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

const bgColors = [
  "bg-red-500",
  "bg-red-600",
  "bg-orange-500",
  "bg-orange-600",
  "bg-amber-500",
  "bg-amber-600",
  "bg-yellow-500",
  "bg-yellow-600",
  "bg-lime-500",
  "bg-lime-600",
  "bg-green-500",
  "bg-green-600",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-teal-500",
  "bg-teal-600",
  "bg-cyan-500",
  "bg-cyan-600",
  "bg-sky-500",
  "bg-sky-600",
  "bg-blue-500",
  "bg-blue-600",
  "bg-indigo-500",
  "bg-indigo-600",
  "bg-violet-500",
  "bg-violet-600",
  "bg-purple-500",
  "bg-purple-600",
  "bg-fuchsia-500",
  "bg-fuchsia-600",
  "bg-pink-500",
  "bg-pink-600",
  "bg-rose-500",
  "bg-rose-600",
];
