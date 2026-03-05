import { atom, useAtom, useAtomValue } from "jotai";
import { animations } from "react-gsap-aos/constants";

import { animationAtom } from "@/jotai/animation";
import TwoLevelSelect from "@/components/form/TwoLevelSelect";
import { tabIndexAtom } from "@/jotai/demo";

const categories = Array.from(
  new Set(animations.map((item) => item.split("-")[0])),
);

const disabledAtom = atom((get) => {
  const tabIndex = get(tabIndexAtom);
  return tabIndex === 0 || tabIndex === 2;
});

export default function AnimationFilter() {
  const [animation, setAnimation] = useAtom(animationAtom);
  const disabled = useAtomValue(disabledAtom);

  if (disabled) {
    return (
      <div role="alert" className="alert alert-info">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>此示範不支援動畫類型</span>
      </div>
    );
  }

  return (
    <TwoLevelSelect
      label="Animation"
      categories={categories}
      enums={animations}
      value={animation}
      onChangeValue={setAnimation}
    />
  );
}
