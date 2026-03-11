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
const AOS_ATTRIBUTE = "data-aos";
/** AOS 選擇器 */
const AOS_SELECTOR = `[${AOS_ATTRIBUTE}]`;
/** AOS 相關屬性名稱 */
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
 * 建立並管理指定容器內的 AOS 動畫
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
  /** 記錄元素與對應 GSAP 動畫實例 */
  const elementAnimationsRef = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
    new WeakMap(),
  );
  const optionsRef = useRef(options);

  // 更新預設動畫選項（僅影響之後新增的動畫）
  useLayoutEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useGSAP(
    (_, contextSafe) => {
      const container = containerRef.current;

      if (!container || !contextSafe) return;

      const safeCreateAnimation = contextSafe(createAnimation);

      /** 新增動畫 */
      const addAnimation = (element: HTMLElement) => {
        const elementAnimations = elementAnimationsRef.current;
        if (elementAnimations.has(element)) return;

        const newAnimation = safeCreateAnimation(element, optionsRef.current);
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

      let isRefreshScheduled = false;
      /**
       * 合併 ScrollTrigger.refresh 呼叫
       *
       * 將多次 refresh 合併到同一幀執行，避免大量 DOM 變動時重複觸發 refresh。
       */
      const refreshScrollTrigger = () => {
        if (isRefreshScheduled) return;

        isRefreshScheduled = true;

        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
          isRefreshScheduled = false;
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
                // 只有包含 'data-aos' 的元素才需要更新動畫
                if (!hasAOSAttribute(target)) break;
                updatedElements.add(target);
              }
              break;
            case "childList":
              collectAOSElements(addedNodes, addedElements);
              collectAOSElements(removedNodes, removedElements);
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
       * 監聽容器尺寸變化
       *
       * ScrollTrigger 已會處理大部分 resize 情境，這裡額外監聽高度變化以確保重新計算。
       * */
      const handleResize: ResizeObserverCallback = (entries) => {
        const entry = entries[0];
        if (!entry) return;

        const height = entry.contentRect.height;

        if (lastHeight !== 0 && lastHeight !== height) {
          refreshScrollTrigger();
        }

        lastHeight = height;
      };

      // 初始化
      const elements = queryAOSElements(container);

      for (const element of elements) {
        addAnimation(element);
      }

      const mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_ATTRIBUTE_KEYS,
      });

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      return () => {
        if (mutationObserver) {
          mutationObserver.disconnect();
        }

        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return { containerRef };
}

/** 從節點列表中收集所有包含 'data-aos' 的元素（包含子節點） */
function collectAOSElements(nodes: NodeList, result: Set<HTMLElement>) {
  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;

    if (hasAOSAttribute(node)) {
      result.add(node);
    }

    for (const element of queryAOSElements(node)) {
      result.add(element);
    }
  }
}

/** 判斷元素是否包含 'data-aos' 屬性 */
function hasAOSAttribute(element: HTMLElement) {
  return element.hasAttribute(AOS_ATTRIBUTE);
}

/** 查詢指定節點內所有 AOS 動畫元素 */
function queryAOSElements(node: ParentNode): NodeListOf<HTMLElement> {
  return node.querySelectorAll<HTMLElement>(AOS_SELECTOR);
}
