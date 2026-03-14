"use client";

import { ChevronDownIcon } from "lucide-react";

import scrollTab from "./scrollTab";

export default function Splash() {
  return (
    <div className="flex h-[calc(100dvh-64px)] flex-col">
      <div className="flex grow flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold sm:text-5xl">React GSAP AOS</h1>
        <p className="mt-6 flex-none text-lg">
          輕量的 GSAP + ScrollTrigger 整合
        </p>
      </div>
      <div className="mb-4 flex flex-col items-center gap-3">
        <button onClick={scrollTab} className="btn btn-ghost">
          Scroll Down
        </button>
        <ChevronDownIcon className="text-primary size-12 animate-bounce md:size-14 lg:size-16" />
      </div>
    </div>
  );
}
