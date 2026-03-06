import Link from "next/link";
import { Geist_Mono } from "next/font/google";

import cn from "@/utils/cn";

const geist = Geist_Mono({
  subsets: ["latin"],
});

export default function LogoButton() {
  return (
    <Link href="/" className={cn("btn btn-ghost", geist.className)}>
      React GSAP AOS
    </Link>
  );
}
