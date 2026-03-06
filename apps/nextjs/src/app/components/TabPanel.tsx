"use client";

import { useAtomValue } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";

import AllAnimations from "./AllAnimations";
import SingleAnimations from "./SingleAnimations";
import TypographyAnimations from "./TypographyAnimations";
import LargeCountAnimations from "./LargeCountAnimations";

export default function TabPanel() {
  const index = useAtomValue(tabIndexAtom);

  return (
    <section className="grid w-full gap-4 overflow-hidden">
      {renderContent(index)}
    </section>
  );
}

function renderContent(index: number) {
  switch (index) {
    case 0:
      return <AllAnimations />;
    case 1:
      return <SingleAnimations />;
    case 2:
      return <TypographyAnimations />;
    case 3:
      return <LargeCountAnimations />;
    default:
      break;
  }
}
