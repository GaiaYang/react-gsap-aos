/** 動畫選項 */
export interface AnimationOptions {
  /**
   * 從觸發點的偏移量 (px)
   *
   * @default 120
   */
  offset: number;
  /**
   * 動畫延遲時間 (ms)
   *
   * @default 0
   */
  delay: number;
  /**
   * 動畫持續時間 (ms)
   *
   * @default 400
   */
  duration: number;
  /**
   * 緩動曲線
   *
   * @default "none"
   *
   * @see https://gsap.com/docs/v3/Eases
   */
  easing: Easing;
  /**
   * 只執行一次動畫
   *
   * @default false
   */
  once: boolean;
  /**
   * 向上捲動時反轉動畫
   *
   * @default false
   */
  mirror: boolean;
  /**
   * 錨點位置
   *
   * @default "top-bottom"
   *
   * @see https://gsap.com/docs/v3/Plugins/ScrollTrigger/#start
   */
  anchorPlacement: AnchorPlacement;
}

export type FadeAnimation =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-up-right"
  | "fade-up-left"
  | "fade-down-right"
  | "fade-down-left";

export type FlipAnimation =
  | "flip-up"
  | "flip-down"
  | "flip-left"
  | "flip-right";

export type SlideAnimation =
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right";

export type ZoomAnimation =
  | "zoom-in"
  | "zoom-in-up"
  | "zoom-in-down"
  | "zoom-in-left"
  | "zoom-in-right"
  | "zoom-out"
  | "zoom-out-up"
  | "zoom-out-down"
  | "zoom-out-left"
  | "zoom-out-right";

/** 動畫類型 */
export type Animation =
  | FadeAnimation
  | FlipAnimation
  | SlideAnimation
  | ZoomAnimation;

/** 錨點位置 */
export type AnchorPlacement =
  | "top-bottom"
  | "top-center"
  | "top-top"
  | "center-bottom"
  | "center-center"
  | "center-top"
  | "bottom-bottom"
  | "bottom-center"
  | "bottom-top";

/** 緩動曲線 */
export type Easing =
  | "none"
  | "power1"
  | "power1.in"
  | "power1.out"
  | "power1.inOut"
  | "power2"
  | "power2.in"
  | "power2.out"
  | "power2.inOut"
  | "power3"
  | "power3.in"
  | "power3.out"
  | "power3.inOut"
  | "power4"
  | "power4.in"
  | "power4.out"
  | "power4.inOut"
  | "back"
  | "back.in"
  | "back.out"
  | "back.inOut"
  | "bounce"
  | "bounce.in"
  | "bounce.out"
  | "bounce.inOut"
  | "circ"
  | "circ.in"
  | "circ.out"
  | "circ.inOut"
  | "elastic"
  | "elastic.in"
  | "elastic.out"
  | "elastic.inOut"
  | "expo"
  | "expo.in"
  | "expo.out"
  | "expo.inOut"
  | "sine"
  | "sine.in"
  | "sine.out"
  | "sine.inOut";

type AttributeKey =
  | "offset"
  | "delay"
  | "duration"
  | "easing"
  | "once"
  | "mirror"
  | "anchor-placement";

/** AOS 屬性 */
export type AOSAttributeKey = `data-aos-${AttributeKey}`;
