"use client";

import { LayoutPanelTopIcon } from "lucide-react";

import scrollTab from "./scrollTab";

export default function ToTabButton() {
  return (
    <button type="button" onClick={scrollTab} className="btn-circle btn btn-xl">
      <LayoutPanelTopIcon />
    </button>
  );
}
