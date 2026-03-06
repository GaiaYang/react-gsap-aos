import { atom, useAtom, useAtomValue } from "jotai";
import { InfoIcon } from "lucide-react";
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
          <InfoIcon className="text-info" />
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
