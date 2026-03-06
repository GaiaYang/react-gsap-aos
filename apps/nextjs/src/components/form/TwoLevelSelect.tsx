import { useState } from "react";

export interface TwoLevelSelectProps<T extends string> {
  id: string;
  label?: string;
  categories: string[];
  enums: T[];
  value: T;
  onChangeValue: (value: T) => void;
}

export default function TwoLevelSelect<T extends string>({
  id,
  label,
  categories,
  enums,
  value,
  onChangeValue,
}: TwoLevelSelectProps<T>) {
  const [category, setCategory] = useState(
    categories.find((item) => value.startsWith(item)) || categories[0],
  );
  const filtered = enums.filter((item) => item.startsWith(category));

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend">{label}</legend>
      <div className="flex flex-wrap gap-3">
        <select
          id={`${id}-category`}
          className="select"
          value={category}
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setCategory(nextValue);
            onChangeValue(
              enums.find((item) => item.startsWith(nextValue)) || enums[0],
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
          id={id}
          className="select"
          disabled={filtered.length === 1}
          value={value}
          onChange={(event) => {
            onChangeValue(event.currentTarget.value as T);
          }}
        >
          {filtered.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
}
