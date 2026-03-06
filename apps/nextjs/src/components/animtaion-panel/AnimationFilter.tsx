import { atom, useAtom, useAtomValue } from "jotai";
import { animations } from "react-gsap-aos/constants";

import { animationAtom } from "@/jotai/animation";
import { tabIndexAtom } from "@/jotai/demo";

import TwoLevelSelect from "@/components/form/TwoLevelSelect";
import Container from "./Container";

const categories = Array.from(
  new Set(animations.map((item) => item.split("-")[0])),
);

const invalidAtom = atom((get) => {
  const tabIndex = get(tabIndexAtom);
  return tabIndex === 0 || tabIndex === 2;
});

export default function AnimationFilter() {
  const [animation, setAnimation] = useAtom(animationAtom);
  const invalid = useAtomValue(invalidAtom);

  return (
    <Container>
      {invalid ? (
        <div role="alert" className="alert col-span-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>此修改不會生效於該範例</span>
        </div>
      ) : null}
      <TwoLevelSelect
        id="animation"
        label="Animation"
        categories={categories}
        enums={animations}
        value={animation}
        onChangeValue={setAnimation}
      />
    </Container>
  );
}
