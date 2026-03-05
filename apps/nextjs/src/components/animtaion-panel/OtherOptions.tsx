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
      caption=" "
      inputProps={{
        type: "number",
        inputMode: "numeric",
      }}
      value={inputValue || "0"}
      onChangeValue={setInputValue}
      onApply={(value) => {
        const next = value ? parseInt(value, 10) : 0;
        setOffset(Number.isNaN(next) ? 0 : next);
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
      caption="min: 100"
      inputProps={{
        type: "number",
        inputMode: "numeric",
      }}
      value={inputValue || "0"}
      onChangeValue={setInputValue}
      onApply={(value) => {
        const next = parseInt(value, 10);
        setDuration(Math.max(Number.isNaN(next) ? 0 : next, 100));
      }}
    />
  );
}

function OnceCheckbox() {
  const [once, setOnce] = useAtom(onceAtom);

  return (
    <CheckboxFieldset label="Once" checked={once} onChangeValue={setOnce} />
  );
}

function MirrorCheckbox() {
  const [mirror, setMirror] = useAtom(mirrorAtom);

  return (
    <CheckboxFieldset
      label="Mirror"
      checked={mirror}
      onChangeValue={setMirror}
    />
  );
}
