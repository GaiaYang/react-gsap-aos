"use client";

import { atom, useAtomValue } from "jotai";

import {
  anchorPlacementAtom,
  devToolStore,
  visibleAnchorAtom,
} from "@/jotai/animation";
import cn from "@/utils/cn";

const atomOptions = { store: devToolStore };

const anchorAtom = atom((get) => get(anchorPlacementAtom).split("-")[0]);

export default function AnchorPlacementMarker() {
  const visible = useAtomValue(visibleAnchorAtom, atomOptions);
  const anchor = useAtomValue(anchorAtom);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-1 flex flex-col",
        "*:w-dvw *:self-center",
      )}
    >
      <div className="bg-primary/50 h-px" />
      <div className="bg-primary/20 grow" />
      <div
        className={cn(
          "bg-secondary/50 absolute h-px",
          (() => {
            switch (anchor) {
              case "top":
                return "top-0";
              case "center":
                return "top-1/2 -translate-y-1/2";
              case "bottom":
                return "bottom-0";
              default:
                break;
            }
          })(),
        )}
      />
      <div className="bg-primary/50 h-px" />
    </div>
  );
}
