import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import createAnimation from "@/animation/createAnimation";
import type { AnimationOptions, AOSAttributeKey } from "@/types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** AOS hook 選項 */
export type UseAOSScopeOptions = Partial<AnimationOptions>;

/** AOS 屬性名稱 */
const AOS_QUALIFIED_NAME = "data-aos";
/** AOS 選擇器 */
const AOS_SELECTORS = `[${AOS_QUALIFIED_NAME}]`;
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
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  /** 記錄每個元素對應的動畫實例 */
  const elementAnimationsRef = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
    new WeakMap(),
  );
  const currentOptionsRef = useRef(options);

  // 下次新增動畫才會套用覆蓋預設值
  useLayoutEffect(() => {
    currentOptionsRef.current = options;
  }, [options]);

  useGSAP(
    (_, contextSafe) => {
      if (!containerRef.current || !contextSafe) return;

      const safeCreateAnimation = contextSafe(createAnimation);

      /** 新增動畫 */
      const addAnimation = (element: HTMLElement) => {
        const elementAnimations = elementAnimationsRef.current;
        if (elementAnimations.has(element)) return;

        const newAnimation = safeCreateAnimation(
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

        animation.revert().kill();
        elementAnimations.delete(element);
      };

      /** 更新動畫 */
      const updateAnimation = (element: HTMLElement) => {
        removeAnimation(element);
        addAnimation(element);
      };

      let refreshPending = false;
      /**
       * 合併刷新 ScrollTrigger
       *
       * > 將多次刷新合併在同一幀，預防萬一還是啟用 safe 參數
       * */
      const refreshScrollTrigger = () => {
        if (refreshPending) return;

        refreshPending = true;

        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
          refreshPending = false;
        });
      };

      /** 監聽動畫元素變化 */
      const handleMutation: MutationCallback = (mutations) => {
        const removedElements = new Set<HTMLElement>();
        const addedElements = new Set<HTMLElement>();
        const updatedElements = new Set<HTMLElement>();

        for (const mutation of mutations) {
          const { type, target, addedNodes, removedNodes } = mutation;

          switch (type) {
            case "attributes":
              if (target instanceof HTMLElement) {
                // 沒有指定 'data-aos' 就不處理相關邏輯
                if (!target.hasAttribute(AOS_QUALIFIED_NAME)) break;
                updatedElements.add(target);
              }
              break;
            case "childList":
              collectElements(addedNodes, addedElements);
              collectElements(removedNodes, removedElements);
              break;
            default:
              break;
          }
        }

        // 移除 => 新增 => 更新
        for (const element of removedElements) removeAnimation(element);
        for (const element of addedElements) addAnimation(element);
        for (const element of updatedElements) updateAnimation(element);

        if (removedElements.size || addedElements.size) {
          refreshScrollTrigger();
        }
      };

      let lastHeight = 0;
      /**
       * 監聽父層容器尺寸變化
       *
       * > gsap ScrollTrigger 已經處理寬度，這裡是補上實際高度影響
       * */
      const handleResize: ResizeObserverCallback = ([entry]) => {
        const height = entry.contentRect.height;

        if (lastHeight !== 0 && lastHeight !== height) {
          refreshScrollTrigger();
        }

        lastHeight = height;
      };

      // 初始化
      for (const element of containerRef.current.querySelectorAll<HTMLElement>(
        AOS_SELECTORS,
      )) {
        addAnimation(element);
      }

      mutationObserverRef.current = new MutationObserver(handleMutation);
      mutationObserverRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_ATTRIBUTE_KEYS,
      });

      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(containerRef.current);

      return () => {
        if (mutationObserverRef.current) {
          mutationObserverRef.current.disconnect();
          mutationObserverRef.current = null;
        }

        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
          resizeObserverRef.current = null;
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
