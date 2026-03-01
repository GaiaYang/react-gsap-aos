import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { createAnimation } from "../createAnimation";

gsap.registerPlugin(useGSAP);

const AOS_PROPS_KEYS = [
  "data-aos",
  "data-aos-offset",
  "data-aos-delay",
  "data-aos-duration",
  "data-aos-easing",
  "data-aos-mirror",
  "data-aos-once",
  "data-aos-anchor-placement",
];

/**
 * 初始化 AOS 動畫
 * 
 * @example
 * ```tsx
  "use client";

  import {useAOSInitial} from '@/aos';
 
  export default function Demo() {
    const {containerRef} = useAOSInitial<HTMLDivElement>()
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
export default function useAOSInitial<E extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<E | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  /** 記錄每個元素對應的動畫實例 */
  const elementAnimations = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
    new WeakMap(),
  );

  useGSAP(
    (context, contextSafe) => {
      if (!containerRef.current || !contextSafe || !context) return;

      /** 新增動畫 */
      const addAnimation = (element: HTMLElement) => {
        const animation = createAnimation(element, contextSafe);
        if (!animation) return;

        elementAnimations.current.set(element, animation);
      };

      /** 移除動畫 */
      const removeAnimation = (element: HTMLElement) => {
        const animation = elementAnimations.current.get(element);
        if (!animation) return;

        animation.kill();
        elementAnimations.current.delete(element);
      };

      /**  初始化元素動畫，並存入 WeakMap */
      const initAOSForElements = (elements: HTMLElement[]) => {
        for (const element of elements) {
          if (elementAnimations.current.has(element)) continue;
          addAnimation(element);
        }
      };

      /** 監聽元素變化 */
      const handleMutation: MutationCallback = (mutations) => {
        const addedElements: HTMLElement[] = [];
        const removedElements: HTMLElement[] = [];

        for (const mutation of mutations) {
          switch (mutation.type) {
            case "attributes": {
              if (!mutation.attributeName?.startsWith("data-aos")) continue;
              if (!(mutation.target instanceof HTMLElement)) continue;

              const element = mutation.target;
              // 先清除舊動畫
              removeAnimation(element);
              // 重新建立動畫
              addAnimation(element);

              break;
            }
            case "childList": {
              for (const node of mutation.addedNodes) {
                collectAOSNodes(node, addedElements);
              }

              for (const node of mutation.removedNodes) {
                collectAOSNodes(node, removedElements);
              }

              break;
            }
            default:
              break;
          }
        }

        // 清理移除的元素動畫
        for (const element of removedElements) {
          removeAnimation(element);
        }

        // 初始化新增的元素動畫
        initAOSForElements(addedElements);
      };

      // 初次初始化指定容器內的所有 [data-aos] 元素
      initAOSForElements(
        gsap.utils.toArray<HTMLElement>("[data-aos]", containerRef.current),
      );

      observerRef.current = new MutationObserver(handleMutation);
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_PROPS_KEYS,
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

function collectAOSNodes(node: Node, result: HTMLElement[]) {
  if (!(node instanceof HTMLElement)) return;

  if (node.matches("[data-aos]")) {
    result.push(node);
  }

  result.push(...node.querySelectorAll<HTMLElement>("[data-aos]"));
}
