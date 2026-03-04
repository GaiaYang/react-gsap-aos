import React from "react";
import Navbar from "./Navbar";

export default function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>
      {children}
    </>
  );
}
