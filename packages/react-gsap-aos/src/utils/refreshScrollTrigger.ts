import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** 原始 ScrollTrigger.refresh */
export default function refreshScrollTrigger(safe?: boolean | undefined) {
  ScrollTrigger.refresh(safe);
}
