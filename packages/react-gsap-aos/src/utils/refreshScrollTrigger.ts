import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 原始 ScrollTrigger.refresh 封裝
 *
 * @see https://greensock.com/docs/v3/Plugins/ScrollTrigger/static.refresh()
 */
export default function refreshScrollTrigger(safe?: boolean | undefined) {
  ScrollTrigger.refresh(safe);
}
