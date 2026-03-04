import { useAtom } from "jotai";

import {
  devToolStore,
  visibleAnchorAtom,
  visibleOffsetAtom,
} from "@/jotai/animation";

import ResetButton from "./ResetButton";
import CheckboxFieldset from "@/components/form/CheckboxFieldset";

export default function DevTool() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex grow gap-[inherit]">
        <VisibleOffset />
        <VisibleAnchor />
      </div>
      <div className="flex justify-end">
        <ResetButton />
      </div>
    </div>
  );
}

const atomOptions = { store: devToolStore };

function VisibleAnchor() {
  const [visible, setVisible] = useAtom(visibleAnchorAtom, atomOptions);

  return (
    <CheckboxFieldset
      label="顯示動畫觸發點"
      checked={visible}
      onChangeValue={setVisible}
    />
  );
}

function VisibleOffset() {
  const [visible, setVisible] = useAtom(visibleOffsetAtom, atomOptions);

  return (
    <CheckboxFieldset
      label="顯示動畫觸發距離"
      checked={visible}
      onChangeValue={setVisible}
    />
  );
}
