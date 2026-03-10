import {
  perspective,
  rotateX,
  rotateY,
  scale,
  translate3d,
  translate3dPercent,
} from "./utils/createTweenVars";

/** 動畫配置 */
export interface AnimationPreset {
  /** 動畫起點 */
  from: gsap.TweenVars;
  /** 動畫終點 */
  to: gsap.TweenVars;
}

/** 動畫定義 */
export interface AnimationDefinitions {
  /** 預設配置 */
  preset: AnimationPreset;
  /** 自訂配置 */
  vars: AnimationPreset;
}

/** 距離 `px` */
export const DISTANCE = 100;

/** 動畫預設配置 */
const presets = {
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1, ...translate3d(0, 0, 0) },
  },
  zoom: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1, ...translate3d(0, 0, 0), ...scale(1) },
  },
  slide: {
    from: { visibility: "hidden" },
    to: { visibility: "visible", ...translate3dPercent(0, 0, 0) },
  },
  flip: {
    from: { backfaceVisibility: "hidden" },
    to: {},
  },
} satisfies Record<string, AnimationPreset>;

/** 動畫定義 */
const definitions = {
  fade: {
    preset: presets.fade,
    vars: {
      from: {},
      to: {},
    },
  },
  fadeUp: {
    preset: presets.fade,
    vars: {
      from: translate3d(0, DISTANCE, 0),
      to: {},
    },
  },
  fadeDown: {
    preset: presets.fade,
    vars: {
      from: translate3d(0, -DISTANCE, 0),
      to: {},
    },
  },
  fadeLeft: {
    preset: presets.fade,
    vars: {
      from: translate3d(DISTANCE, 0, 0),
      to: {},
    },
  },
  fadeRight: {
    preset: presets.fade,
    vars: {
      from: translate3d(-DISTANCE, 0, 0),
      to: {},
    },
  },
  fadeUpRight: {
    preset: presets.fade,
    vars: {
      from: translate3d(-DISTANCE, DISTANCE, 0),
      to: {},
    },
  },
  fadeUpLeft: {
    preset: presets.fade,
    vars: {
      from: translate3d(DISTANCE, DISTANCE, 0),
      to: {},
    },
  },
  fadeDownRight: {
    preset: presets.fade,
    vars: {
      from: translate3d(-DISTANCE, -DISTANCE, 0),
      to: {},
    },
  },
  fadeDownLeft: {
    preset: presets.fade,
    vars: {
      from: translate3d(DISTANCE, -DISTANCE, 0),
      to: {},
    },
  },
  flipUp: {
    preset: presets.flip,
    vars: {
      from: { ...perspective(2500), ...rotateX("-100deg") },
      to: { ...perspective(2500), ...rotateX(0) },
    },
  },
  flipDown: {
    preset: presets.flip,
    vars: {
      from: { ...perspective(2500), ...rotateX("100deg") },
      to: { ...perspective(2500), ...rotateX(0) },
    },
  },
  flipLeft: {
    preset: presets.flip,
    vars: {
      from: { ...perspective(2500), ...rotateY("-100deg") },
      to: { ...perspective(2500), ...rotateY(0) },
    },
  },
  flipRight: {
    preset: presets.flip,
    vars: {
      from: { ...perspective(2500), ...rotateY("100deg") },
      to: { ...perspective(2500), ...rotateY(0) },
    },
  },
  slideUp: {
    preset: presets.slide,
    vars: {
      from: translate3dPercent(0, 100, 0),
      to: {},
    },
  },
  slideDown: {
    preset: presets.slide,
    vars: {
      from: translate3dPercent(0, -100, 0),
      to: {},
    },
  },
  slideLeft: {
    preset: presets.slide,
    vars: {
      from: translate3dPercent(100, 0, 0),
      to: {},
    },
  },
  slideRight: {
    preset: presets.slide,
    vars: {
      from: translate3dPercent(-100, 0, 0),
      to: {},
    },
  },
  zoomIn: { preset: presets.zoom, vars: { from: scale(0.6), to: {} } },
  zoomInUp: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(0, DISTANCE, 0), ...scale(0.6) },
      to: {},
    },
  },
  zoomInDown: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(0, -DISTANCE, 0), ...scale(0.6) },
      to: {},
    },
  },
  zoomInLeft: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(DISTANCE, 0, 0), ...scale(0.6) },
      to: {},
    },
  },
  zoomInRight: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(-DISTANCE, 0, 0), ...scale(0.6) },
      to: {},
    },
  },
  zoomOut: { preset: presets.zoom, vars: { from: scale(1.2), to: {} } },
  zoomOutUp: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(0, DISTANCE, 0), ...scale(1.2) },
      to: {},
    },
  },
  zoomOutDown: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(0, -DISTANCE, 0), ...scale(1.2) },
      to: {},
    },
  },
  zoomOutLeft: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(DISTANCE, 0, 0), ...scale(1.2) },
      to: {},
    },
  },
  zoomOutRight: {
    preset: presets.zoom,
    vars: {
      from: { ...translate3d(-DISTANCE, 0, 0), ...scale(1.2) },
      to: {},
    },
  },
} satisfies Record<string, AnimationDefinitions>;

export default definitions;
