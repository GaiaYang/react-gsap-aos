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
    <div className="grid gap-3">
      <div className="flex grow flex-wrap gap-[inherit]">
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
      id="visibleAnchor"
      label="顯示 Anchor Placement 標記"
      checked={visible}
      onChangeValue={setVisible}
    />
  );
}

function VisibleOffset() {
  const [visible, setVisible] = useAtom(visibleOffsetAtom, atomOptions);

  return (
    <CheckboxFieldset
      id="visibleOffset"
      label="顯示 Offset 標記"
      checked={visible}
      onChangeValue={setVisible}
    />
  );
}
