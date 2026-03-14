"use client";

import { useAtom } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";
import cn from "@/utils/cn";
import { tabs } from "./constants";

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
              window.scrollTo({
                top: window.innerHeight - 64,
                behavior: "smooth",
              });
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
