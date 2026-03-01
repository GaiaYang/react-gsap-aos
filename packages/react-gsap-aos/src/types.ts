export interface ScrollAnimationOptions {
  /**
   * 提前觸發動畫的距離 (px)
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
   */
  easing: Easing;
  /**
   * 是否只執行一次
   *
   * @default false
   */
  once: boolean;
  /**
   * 滾動過元素後，動畫是否反向播放
   *
   * @default false
   */
  mirror: boolean;
  /**
   * 元素在視窗的指定位置觸發動畫
   *
   * [GSAP 文件](https://gsap.com/docs/v3/Eases)
   *
   * @default "top-bottom"
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

export type Animation =
  | FadeAnimation
  | FlipAnimation
  | SlideAnimation
  | ZoomAnimation;

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

export type Easing = gsap.EaseString;
