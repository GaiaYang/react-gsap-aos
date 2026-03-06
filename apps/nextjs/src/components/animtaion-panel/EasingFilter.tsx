import { useAtom } from "jotai";
import { easings } from "react-gsap-aos/constants";

import { easingAtom } from "@/jotai/animation";

import TwoLevelSelect from "@/components/form/TwoLevelSelect";

const categories = Array.from(
  new Set(easings.map((item) => item.split(".")[0])),
);

export default function EasingFilter() {
  const [easing, setEasing] = useAtom(easingAtom);

  return (
    <TwoLevelSelect
      id="easing"
      label="Easing"
      categories={categories}
      enums={easings}
      value={easing}
      onChangeValue={setEasing}
    />
  );
}
