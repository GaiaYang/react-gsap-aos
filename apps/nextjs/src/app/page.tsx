import { Provider } from "jotai";
import { AOSProvider } from "react-gsap-aos/client";

import ToTopButton from "@/components/ToTopButton";
import Tabs from "./components/Tabs";
import { MenuDialog, MenuDialogButton } from "./components/MenuDialog";
import TabPanel from "./components/TabPanel";

export default function Home() {
  return (
    <Provider>
      <AOSProvider component="main" className="flex flex-col gap-4 py-4 *:px-4">
        <Tabs />
        <TabPanel />
      </AOSProvider>
      <div className="fixed right-4 bottom-4 flex flex-col gap-4">
        <MenuDialogButton />
        <ToTopButton />
      </div>
      <MenuDialog />
    </Provider>
  );
}
