import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** 刷新 AOS 動畫位置 */
export default function refreshAOS() {
  ScrollTrigger.refresh(true);
}
