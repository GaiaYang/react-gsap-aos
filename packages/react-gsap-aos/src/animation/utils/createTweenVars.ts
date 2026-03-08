/** @see https://gsap.com/docs/v3/GSAP/CorePlugins/CSS/#3d-transforms */
export function perspective(
  transformPerspective: gsap.TweenVars["perspective"],
): gsap.TweenVars {
  return { transformPerspective };
}

export function rotateX(
  rotationX: gsap.TweenVars["rotationX"],
): gsap.TweenVars {
  return { rotationX };
}

export function rotateY(
  rotationY: gsap.TweenVars["rotationY"],
): gsap.TweenVars {
  return { rotationY };
}

export function scale(
  scaleX: gsap.TweenVars["scaleX"],
  scaleY?: gsap.TweenVars["scaleY"],
): gsap.TweenVars {
  return scaleY !== undefined ? { scaleX, scaleY } : { scale: scaleX };
}

export function translate3d(
  x: gsap.TweenVars["x"],
  y: gsap.TweenVars["y"],
  z: gsap.TweenVars["z"],
): gsap.TweenVars {
  return { x, y, z };
}

export function translate3dPercent(
  xPercent: gsap.TweenVars["xPercent"],
  yPercent: gsap.TweenVars["yPercent"],
  z: gsap.TweenVars["z"],
): gsap.TweenVars {
  return { xPercent, yPercent, z };
}
