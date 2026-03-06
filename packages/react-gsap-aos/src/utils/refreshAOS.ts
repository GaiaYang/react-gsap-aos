import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 刷新 AOS 動畫位置
 *
 * > 目前只是封裝了 ScrollTrigger.refresh()，未添加額外邏輯。
 *
 * > 封裝此函式是為了未來可以在刷新時加入自定義處理。
 */
const refreshAOS = ScrollTrigger.refresh;

export default refreshAOS;
