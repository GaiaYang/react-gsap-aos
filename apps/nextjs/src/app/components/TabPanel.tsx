"use client";

import { useAtomValue } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";
import { tabs } from "./constants";

import AllAnimations from "./AllAnimations";
import TypographyAnimations from "./TypographyAnimations";
import LargeAnimations from "./LargeAnimations";

export default function TabPanel() {
  const index = useAtomValue(tabIndexAtom);

  return (
    <section className="grid w-full gap-4 overflow-hidden">
      {renderContent(index)}
    </section>
  );
}

function renderContent(index: number) {
  switch (tabs[index]?.value) {
    case "all":
      return <AllAnimations />;
    case "large":
      return <LargeAnimations />;
    case "typography":
      return <TypographyAnimations />;
    default:
      break;
  }
}
