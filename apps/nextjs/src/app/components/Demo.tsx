import { Provider } from "jotai";
import { AOSProvider } from "react-gsap-aos/client";

import ToTopButton from "@/components/ToTopButton";
import OffsetMarker from "@/components/animtaion-panel/OffsetMarker";
import Tabs from "./Tabs";
import { MenuDialog, MenuDialogButton } from "./MenuDialog";
import Panel from "./Panel";

export default function Demo() {
  return (
    <Provider>
      <AOSProvider className="relative flex flex-col gap-4 p-4">
        <Tabs />
        <Panel />
        <OffsetMarker />
        <div className="fixed right-4 bottom-4 flex flex-col gap-4">
          <MenuDialogButton />
          <ToTopButton />
        </div>
      </AOSProvider>
      <MenuDialog />
    </Provider>
  );
}
