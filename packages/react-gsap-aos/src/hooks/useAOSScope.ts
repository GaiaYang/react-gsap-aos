import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import createAnimation from "@/animation/createAnimation";
import type { AnimationOptions, AOSAttributeKey } from "@/types";

gsap.registerPlugin(useGSAP);

/** AOS 屬性 */
const AOS_ATTRIBUTE_KEYS: (AOSAttributeKey | "data-aos")[] = [
  "data-aos",
  "data-aos-offset",
  "data-aos-delay",
  "data-aos-duration",
  "data-aos-easing",
  "data-aos-mirror",
  "data-aos-once",
  "data-aos-anchor-placement",
];

/** AOS 選擇器 */
const AOS_SELECTORS = "[data-aos]";

/**
 * 綁定 AOS 動畫範圍
 * 
 * @example
 * ```tsx
  "use client";

  import {useAOSScope} from '@/aos';
 
  export default function Demo() {
    const {containerRef} = useAOSScope<HTMLDivElement>()
    return (
      <div ref={containerRef} className="overflow-hidden">
        <div data-aos-container>
          <div data-aos="fade-up">Hello AOS</div>
        </div>
      </div>
    )
  }
 * ```
 */
export default function useAOSScope<E extends HTMLElement = HTMLElement>(
  /** 預設動畫選項 */
  options?: Partial<AnimationOptions>,
) {
  const containerRef = useRef<E | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  /** 記錄每個元素對應的動畫實例 */
  const animationsWeakMap = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
    new WeakMap(),
  );
  const optionsRef = useRef(options);

  // 使用靜態寫入，下次新增動畫才會套用覆蓋預設值
  useLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useGSAP(
    (_, contextSafe) => {
      if (!containerRef.current || !contextSafe) return;

      /** 新增動畫 */
      const addAnimation = (element: HTMLElement) => {
        if (animationsWeakMap.current.has(element)) return;

        const newAnimation = contextSafe(createAnimation)(
          element,
          optionsRef.current,
        );
        if (!newAnimation) return;

        animationsWeakMap.current.set(element, newAnimation);
      };

      /** 移除動畫 */
      const removeAnimation = (element: HTMLElement) => {
        const animation = animationsWeakMap.current.get(element);
        if (!animation) return;

        animation.kill().revert();
        animationsWeakMap.current.delete(element);
      };

      /** 更新動畫 */
      const updateAnimation = (element: HTMLElement) => {
        removeAnimation(element);
        addAnimation(element);
      };

      /** 監聽元素變化 */
      const handleMutation: MutationCallback = (mutations) => {
        const removedElements = new Set<HTMLElement>();
        const addedElements = new Set<HTMLElement>();
        const updatedElements = new Set<HTMLElement>();

        for (const mutation of mutations) {
          if (
            mutation.type === "attributes" &&
            mutation.target instanceof HTMLElement
          ) {
            updatedElements.add(mutation.target);
          } else if (mutation.type === "childList") {
            collectElements(mutation.addedNodes, addedElements);
            collectElements(mutation.removedNodes, removedElements);
          }
        }

        // 移除 => 新增 => 更新，避免重複初始化
        for (const element of removedElements) {
          removeAnimation(element);
        }

        for (const element of addedElements) {
          addAnimation(element);
        }

        for (const element of updatedElements) {
          updateAnimation(element);
        }
      };

      // 初始化
      for (const element of gsap.utils.toArray<HTMLElement>(
        AOS_SELECTORS,
        containerRef.current,
      )) {
        addAnimation(element);
      }

      observerRef.current = new MutationObserver(handleMutation);
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_ATTRIBUTE_KEYS,
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return { containerRef };
}

/** 搜尋 [data-aos] 變動元素 */
function collectElements(nodes: NodeList, result: Set<HTMLElement>) {
  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;
    if (node.matches(AOS_SELECTORS)) result.add(node);
    for (const element of node.querySelectorAll<HTMLElement>(AOS_SELECTORS)) {
      result.add(element);
    }
  }
}
