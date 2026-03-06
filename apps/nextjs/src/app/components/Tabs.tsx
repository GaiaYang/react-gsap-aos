"use client";

import { useAtom } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";
import cn from "@/utils/cn";

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
  { value: "typography", label: "文本測試" },
  { value: "large", label: "大量內容" },
];

export default function Tabs() {
  const [tabIndex, setTabIndex] = useAtom(tabIndexAtom);

  return (
    <div className="w-full overflow-x-auto">
      <div role="tablist" className="tabs tabs-box min-w-max">
        {tabs.map((item, index) => (
          <button
            key={item.value}
            role="tab"
            type="button"
            onClick={() => {
              setTabIndex(index);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={cn("tab", { "tab-active": tabIndex === index })}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
