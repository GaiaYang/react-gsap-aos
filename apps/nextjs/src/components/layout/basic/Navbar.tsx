import GithubButton from "./GithubButton";
import LogoButton from "./LogoButton";

export default function Navbar() {
  return (
    <nav className="navbar shadow-sm backdrop-blur">
      <LogoButton />
      <div className="grow" />
      <GithubButton />
    </nav>
  );
}
