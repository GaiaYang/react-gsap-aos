"use client";

import { useState } from "react";

import cn from "@/utils/cn";

import AnimationFilter from "./AnimationFilter";
import EasingFilter from "./EasingFilter";
import AnchorPlacementFilter from "./AnchorPlacementFilter";
import OtherOptions from "./OtherOptions";
import DevTool from "./DevTool";
import CurrentAnimationOptions from "./CurrentAnimationOptions";

interface Tab {
  value: string;
  label: string;
}

const tabs: Tab[] = [
  { value: "animation", label: "動畫類型" },
  { value: "easing", label: "緩動曲線" },
  { value: "anchor-placement", label: "錨點位置" },
  { value: "other", label: "其他參數" },
  { value: "dev", label: "開發工具" },
] satisfies readonly Tab[];

export default function AnimationPanel() {
  const [tabIndex, setTabIndex] = useState(0);
  const tabValue = tabs[tabIndex]?.value ?? tabs[0].value;

  function renderTab(item: Tab) {
    return (
      <button
        key={item.value}
        role="tab"
        type="button"
        onClick={() => {
          setTabIndex(tabs.findIndex((i) => i.value === item.value));
        }}
        className={cn("tab", { "tab-active": tabValue === item.value })}
      >
        {item.label}
      </button>
    );
  }

  function renderPanel() {
    switch (tabValue) {
      case "animation":
        return <AnimationFilter />;
      case "easing":
        return <EasingFilter />;
      case "anchor-placement":
        return <AnchorPlacementFilter />;
      case "other":
        return <OtherOptions />;
      case "dev":
        return <DevTool />;
      default:
        break;
    }
  }

  return (
    <div className="grid gap-4">
      <div className="overflow-x-auto">
        <div role="tablist" className="tabs tabs-border min-w-max">
          {tabs.map(renderTab)}
        </div>
      </div>
      {renderPanel()}
      <CurrentAnimationOptions />
    </div>
  );
}
