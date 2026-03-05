"use client";

import { type ComponentPropsWithoutRef, createElement } from "react";

import useAOSScope from "@/hooks/useAOSScope";
import isBlockElementTag, {
  type BlockElementTag,
} from "@/utils/isBlockElementTag";
import { type AOSAttributeOptions } from "@/utils/toAOSProps";

type AOSProviderProps<T extends BlockElementTag> = {
  /**
   * 要渲染的 HTML 元素標籤。
   *
   * 如果未提供或非區塊元素，預設會渲染 `<div>`。
   *
   * @default "div"
   *
   * @see https://www.w3schools.com/html/html_blocks.asp
   */
  component?: T;
  /**
   * 讓子元素繼承的預設動畫參數
   *
   * > 注意：預設選項只作用於後續生成的動畫，這是刻意設計的行為。
   */
  options?: AOSAttributeOptions;
} & ComponentPropsWithoutRef<T>;

/**
 * 為子元素提供自動 AOS 動畫能力。
 *
 * 所有帶有 `data-aos` 屬性的子元素都會自動生成動畫。
 */
export default function AOSProvider<T extends BlockElementTag = "div">({
  component,
  options,
  children,
  ...props
}: AOSProviderProps<T>) {
  const { containerRef } = useAOSScope(options);

  return createElement(
    isBlockElementTag(component) ? component : "div",
    { ...props, ref: containerRef },
    children,
  );
}
