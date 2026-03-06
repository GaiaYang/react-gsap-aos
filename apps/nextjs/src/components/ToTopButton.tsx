"use client";

import { memo } from "react";
import { ArrowUpToLineIcon } from "lucide-react";

export default memo(function ToTopButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="btn-circle btn btn-xl"
    >
      <ArrowUpToLineIcon />
    </button>
  );
});
