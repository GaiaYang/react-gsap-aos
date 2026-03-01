import { useState } from "react";

import { type Animation } from "react-gsap-aos";
import { animations } from "react-gsap-aos/constants";

interface AnimationFilterProps {
  value?: Animation;
  onChangeValue?: (next: Animation) => void;
}

const categories = Array.from(
  new Set(animations.map((item) => item.split("-")[0])),
);

export default function AnimationFilter({
  value,
  onChangeValue,
}: AnimationFilterProps) {
  const [category, setCategory] = useState(categories[0]);

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">動畫篩選</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <select
          className="select"
          value={category}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setCategory(nextValue);
            onChangeValue?.(
              animations.find((item) => item.startsWith(nextValue)) ||
                animations[0],
            );
          }}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={value}
          onChange={(event) => {
            onChangeValue?.(event.currentTarget.value as Animation);
          }}
        >
          {animations
            .filter((item) => item.startsWith(category))
            .map((item) => (
              <option key={item} value={item}>
                {item.replace(/\-/g, " ")}
              </option>
            ))}
        </select>
      </div>
    </fieldset>
  );
}
