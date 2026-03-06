import { useAtom } from "jotai";

import { markersAtom } from "@/jotai/animation";

import ResetButton from "./ResetButton";
import CheckboxFieldset from "@/components/form/CheckboxFieldset";
import Container from "./Container";

export default function DevTool() {
  return (
    <Container>
      <MarkersCheckbox />
      <div className="col-span-full place-self-end">
        <ResetButton />
      </div>
    </Container>
  );
}

function MarkersCheckbox() {
  const [markers, setMarkers] = useAtom(markersAtom);

  return (
    <CheckboxFieldset
      id="markers"
      label="啟用 GSAP 標記"
      checked={markers}
      onChangeValue={setMarkers}
    />
  );
}
