"use client";

import React, {
  type ComponentPropsWithoutRef,
  createElement,
  type ElementType,
} from "react";

import useAOSScope from "@/hooks/useAOSScope";
import { type AOSAttributeOptions } from "@/utils/toAOSProps";

type AOSProviderProps<T extends ElementType> = {
  component?: T;
  options?: AOSAttributeOptions;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "ref">;

export default function AOSProvider<T extends ElementType = "div">({
  component,
  options,
  children,
  ...props
}: AOSProviderProps<T>) {
  const { containerRef } = useAOSScope(options);

  return createElement(
    typeof component === "string" ? component : "div",
    {
      ...props,
      ref: containerRef,
    },
    children,
  );
}
