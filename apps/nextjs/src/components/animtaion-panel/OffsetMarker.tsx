"use client";

import { atom, useAtomValue } from "jotai";

import {
  anchorPlacementAtom,
  devToolStore,
  offsetAtom,
  visibleOffsetAtom,
} from "@/jotai/animation";
import cn from "@/utils/cn";

const atomOptions = { store: devToolStore };

const anchorAtom = atom((get) => get(anchorPlacementAtom).split("-")[1]);

export default function OffsetMarker() {
  const offset = useAtomValue(offsetAtom);
  const anchor = useAtomValue(anchorAtom);
  const visible = useAtomValue(visibleOffsetAtom, atomOptions);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-primary pointer-events-none fixed left-0 z-1 flex h-px flex-col justify-end",
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
      style={{
        transform: `translateY(${-offset}px)`,
      }}
    >
      <span
        className={cn("text-primary mx-2 my-1 font-semibold", {
          "translate-y-full": anchor === "top",
        })}
      >
        動畫觸發距離
      </span>
    </div>
  );
}
