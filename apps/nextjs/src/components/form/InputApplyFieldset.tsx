import React, { useRef } from "react";

interface InputApplyFieldsetProps {
  label: string;
  caption?: string;
  value: string;
  onChangeValue: (value: string) => void;
  onApply: (value: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function InputApplyFieldset({
  label,
  caption,
  value,
  onChangeValue,
  onApply,
  inputProps,
}: InputApplyFieldsetProps) {
  const inputValueRef = useRef(value);

  return (
    <fieldset className="fieldset w-[clamp(3rem,20rem,100%)]">
      <legend className="fieldset-legend">{label}</legend>
      <div className="join">
        <label className="input join-item">
          <input
            {...inputProps}
            type="number"
            inputMode="numeric"
            value={value}
            onChange={(event) => {
              const next = event.currentTarget.value;
              inputValueRef.current = next;
              onChangeValue(next);
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            onApply(inputValueRef.current);
          }}
          className="join-item btn"
        >
          套用
        </button>
      </div>
      {caption ? (
        <p className="label">{caption === " " ? "\u00a0" : caption}</p>
      ) : null}
    </fieldset>
  );
}
