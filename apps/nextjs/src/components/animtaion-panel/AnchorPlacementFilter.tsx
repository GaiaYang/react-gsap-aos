import { useAtom } from "jotai";
import { anchorPlacements } from "react-gsap-aos/constants";

import { anchorPlacementAtom } from "@/jotai/animation";

import TwoLevelSelect from "@/components/form/TwoLevelSelect";

const categories = Array.from(
  new Set(anchorPlacements.map((item) => item.split("-")[0])),
);

export default function AnchorPlacementFilter() {
  const [anchorPlacement, setAnchorPlacement] = useAtom(anchorPlacementAtom);

  return (
    <TwoLevelSelect
      id="anchorPlacement"
      label="Anchor Placement"
      categories={categories}
      enums={anchorPlacements}
      value={anchorPlacement}
      onChangeValue={setAnchorPlacement}
    />
  );
}
