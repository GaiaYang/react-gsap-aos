import { useState } from "react";
import { useAtom } from "jotai";

import {
  offsetAtom,
  onceAtom,
  mirrorAtom,
  durationAtom,
} from "@/jotai/animation";

import CheckboxFieldset from "@/components/form/CheckboxFieldset";
import InputApplyFieldset from "@/components/form/InputApplyFieldset";

export default function OtherOptions() {
  return (
    <div className="flex flex-wrap gap-3">
      <OffsetInput />
      <DurationInput />
      <OnceCheckbox />
      <MirrorCheckbox />
    </div>
  );
}

function OffsetInput() {
  const [offset, setOffset] = useAtom(offsetAtom);
  const [inputValue, setInputValue] = useState(offset.toString(10));

  return (
    <InputApplyFieldset
      label="Offset"
      inputProps={{
        id: "offset",
        type: "number",
        inputMode: "numeric",
      }}
      value={inputValue}
      onChangeValue={setInputValue}
      onApply={(value) => {
        const int = parseInt(value, 10);
        const next = Number.isInteger(int) ? int : 0;
        setOffset(next);
        setInputValue(String(next));
      }}
    />
  );
}

function DurationInput() {
  const [duration, setDuration] = useAtom(durationAtom);
  const [inputValue, setInputValue] = useState(duration.toString(10));

  return (
    <InputApplyFieldset
      label="Duration"
      inputProps={{
        id: "duration",
        type: "number",
        inputMode: "numeric",
      }}
      value={inputValue}
      onChangeValue={setInputValue}
      onApply={(value) => {
        const int = parseInt(value, 10);
        const next = Math.max(0, Number.isInteger(int) ? int : 0);
        setDuration(next);
        setInputValue(String(next));
      }}
    />
  );
}

function OnceCheckbox() {
  const [once, setOnce] = useAtom(onceAtom);

  return (
    <CheckboxFieldset
      id="once"
      label="Once"
      checked={once}
      onChangeValue={setOnce}
    />
  );
}

function MirrorCheckbox() {
  const [mirror, setMirror] = useAtom(mirrorAtom);

  return (
    <CheckboxFieldset
      id="mirror"
      label="Mirror"
      checked={mirror}
      onChangeValue={setMirror}
    />
  );
}
