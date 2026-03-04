import { Provider } from "jotai";
import { AOSProvider } from "react-gsap-aos/client";

import ToTopButton from "@/components/ToTopButton";
import OffsetMarker from "@/components/animtaion-panel/OffsetMarker";
import Tabs from "./components/Tabs";
import { MenuDialog, MenuDialogButton } from "./components/MenuDialog";
import TabPanel from "./components/TabPanel";

export default function Home() {
  return (
    <Provider>
      <AOSProvider
        component="main"
        className="relative flex flex-col gap-4 p-4"
      >
        <Tabs />
        <TabPanel />
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
