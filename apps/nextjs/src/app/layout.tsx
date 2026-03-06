import "./globals.css";

import type { Metadata } from "next";

import { noto_sans_tc, noto_serif_tc, noto_sans_mono } from "@/libs/fonts";
import clsx from "clsx";
import BasicLayout from "@/components/layout/basic";

export const metadata: Metadata = {
  title: {
    default: "React GSAP AOS",
    template: "%s | React GSAP AOS",
  },
  description:
    "A lightweight GSAP + ScrollTrigger integration, similar in usage to AOS, specifically designed for React / Next.js.",
  metadataBase: new URL("https://react-gsap-aos-nextjs.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW">
      <body
        className={clsx(
          noto_sans_tc.className,
          noto_sans_tc.variable,
          noto_serif_tc.variable,
          noto_sans_mono.variable,
          "antialiased",
        )}
      >
        <BasicLayout>{children}</BasicLayout>
      </body>
    </html>
  );
}
