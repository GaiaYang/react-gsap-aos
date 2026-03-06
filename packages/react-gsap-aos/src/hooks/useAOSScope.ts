import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import createAnimation from "@/animation/createAnimation";
import type { AnimationOptions, AOSAttributeKey } from "@/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type UseAOSScopeOptions = Partial<AnimationOptions>;

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
  "data-aos-markers",
];
/** AOS 屬性名稱 */
const AOS_QUALIFIED_NAME = "data-aos";
/** AOS 選擇器 */
const AOS_SELECTORS = `[${AOS_QUALIFIED_NAME}]`;

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
  options?: UseAOSScopeOptions,
) {
  const containerRef = useRef<E | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  /** 記錄每個元素對應的動畫實例 */
  const elementAnimationsRef = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
    new WeakMap(),
  );
  const currentOptionsRef = useRef(options);
  const rafIdRef = useRef<number>(0);
  const shouldRefreshRef = useRef(false);

  // 下次新增動畫才會套用覆蓋預設值
  useLayoutEffect(() => {
    currentOptionsRef.current = options;
  }, [options]);

  useGSAP(
    (_, contextSafe) => {
      if (!containerRef.current || !contextSafe) return;

      /** 新增動畫 */
      const addAnimation = (element: HTMLElement) => {
        const elementAnimations = elementAnimationsRef.current;

        if (elementAnimations.has(element)) return;

        const newAnimation = contextSafe(createAnimation)(
          element,
          currentOptionsRef.current,
        );
        if (!newAnimation) return;

        elementAnimations.set(element, newAnimation);
      };

      /** 移除動畫 */
      const removeAnimation = (element: HTMLElement) => {
        const elementAnimations = elementAnimationsRef.current;

        const animation = elementAnimations.get(element);
        if (!animation) return;

        animation.revert();
        elementAnimations.delete(element);
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
          const { type, target, addedNodes, removedNodes } = mutation;

          if (type === "attributes" && target instanceof HTMLElement) {
            // 沒有指定 'data-aos' 就不處理相關邏輯
            if (!target.hasAttribute(AOS_QUALIFIED_NAME)) continue;
            updatedElements.add(target);
          } else if (type === "childList") {
            collectElements(addedNodes, addedElements);
            collectElements(removedNodes, removedElements);
          }
        }

        // 移除 => 新增 => 更新
        for (const element of removedElements) removeAnimation(element);
        for (const element of addedElements) addAnimation(element);
        for (const element of updatedElements) updateAnimation(element);

        if (addedElements.size > 0 || removedElements.size > 0) {
          shouldRefreshRef.current = true;
        }
      };

      /**
       * ScrollTrigger 刷新
       *
       * > `ScrollTrigger.refresh()` 會導致無限觸發滾動事件、攔截 `window.scroll`
       *
       * > MutationObserver 變化後才會重新開啟避免無限刷新
       * */
      const updateScrollTrigger = () => {
        if (!shouldRefreshRef.current || rafIdRef.current) return;

        rafIdRef.current = requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          shouldRefreshRef.current = false;
          rafIdRef.current = 0;
        });
      };

      // 初始化
      for (const element of gsap.utils.toArray<HTMLElement>(
        AOS_SELECTORS,
        containerRef.current,
      )) {
        addAnimation(element);
      }

      window.addEventListener("scroll", updateScrollTrigger, { passive: true });
      observerRef.current = new MutationObserver(handleMutation);
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_ATTRIBUTE_KEYS,
      });

      return () => {
        window.removeEventListener("scroll", updateScrollTrigger);

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

    if (node.hasAttribute(AOS_QUALIFIED_NAME)) {
      result.add(node);
    }

    for (const element of node.querySelectorAll<HTMLElement>(AOS_SELECTORS)) {
      result.add(element);
    }
  }
}
