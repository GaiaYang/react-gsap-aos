export function translate3d(x: number | string, y: number | string, z: number) {
  return { x, y, z } satisfies gsap.TweenVars;
}

export function rotateY(y: number | string) {
  return { rotateY: y } satisfies gsap.TweenVars;
}

export function rotateX(x: number | string) {
  return { rotateX: x } satisfies gsap.TweenVars;
}

export function scale(x: number, y?: number) {
  return typeof y === "number"
    ? ({
        scaleX: x,
        scaleY: y,
      } satisfies gsap.TweenVars)
    : ({
        scale: x,
      } satisfies gsap.TweenVars);
}

/**
 * @see https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/#3d-transforms
 */
export function perspective(value: number) {
  return {
    transformPerspective: value,
  } satisfies gsap.TweenVars;
}
