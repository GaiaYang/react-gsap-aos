import React from "react";
import GithubButton from "./GithubButton";

export default function Navbar() {
  return (
    <nav className="navbar shadow-sm backdrop-blur">
      <div className="grow" />
      <GithubButton />
    </nav>
  );
}
