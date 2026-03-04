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
    <div className="flex flex-wrap items-end gap-3">
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
      label="提前觸發動畫的距離"
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
      label="動畫持續時間"
      caption="最小輸入值: 100"
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
    <CheckboxFieldset
      label="是否只執行一次"
      checked={once}
      onChangeValue={setOnce}
    />
  );
}

function MirrorCheckbox() {
  const [mirror, setMirror] = useAtom(mirrorAtom);

  return (
    <CheckboxFieldset
      label="是否於離開時反向播放"
      checked={mirror}
      onChangeValue={setMirror}
    />
  );
}
