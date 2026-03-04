import { useState } from "react";

import cn from "@/utils/cn";

import AnimationFilter from "./AnimationFilter";
import EasingFilter from "./EasingFilter";
import AnchorPlacementFilter from "./AnchorPlacementFilter";
import OtherOptions from "./OtherOptions";
import DevTool from "./DevTool";
import CurrentAnimationOptions from "./CurrentAnimationOptions";

type FilterType = "animation" | "easing" | "anchor-placement" | "other" | "dev";

interface Tab {
  value: string;
  label: string;
}

const tabs: Tab[] = [
  { value: "animation", label: "動畫類型" },
  { value: "easing", label: "動畫曲線" },
  { value: "anchor-placement", label: "動畫錨點" },
  { value: "other", label: "其他" },
  { value: "dev", label: "開發人員工具" },
] satisfies readonly Tab[];

interface FilterPanelProps {
  filter?: Exclude<FilterType, "other" | "dev">[];
}

export default function AnimationPanel({ filter }: FilterPanelProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const _tabs = tabs.filter((item) => {
    const value = item.value as FilterType;

    // 固定顯示
    if (value === "other" || value === "dev") {
      return true;
    }

    if (Array.isArray(filter)) {
      if (filter.length > 0) {
        return filter.includes(value);
      }
      return false;
    }

    return true;
  });
  const tabValue = _tabs[tabIndex]?.value ?? _tabs[0].value;

  function renderTab(item: Tab) {
    return (
      <button
        key={item.value}
        role="tab"
        type="button"
        onClick={() => {
          setTabIndex(_tabs.findIndex((i) => i.value === item.value));
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
          {_tabs.map(renderTab)}
        </div>
      </div>
      {renderPanel()}
      <CurrentAnimationOptions />
    </div>
  );
}
