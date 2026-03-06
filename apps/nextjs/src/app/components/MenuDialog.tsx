"use client";

import { Settings2Icon, XIcon } from "lucide-react";

import AnimationPanel from "@/components/animtaion-panel/AnimationPanel";

export const MENU_DIALOG_ID = "menu-dialog";

function closeDialog() {
  (document.getElementById(MENU_DIALOG_ID) as HTMLDialogElement)?.close();
}

export function MenuDialog() {
  return (
    <dialog id={MENU_DIALOG_ID} className="modal">
      <div className="modal-box max-w-3xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeDialog}
            className="btn btn-circle btn-error"
          >
            <XIcon />
          </button>
        </div>
        <AnimationPanel />
      </div>
      <button type="button" onClick={closeDialog} className="modal-backdrop" />
    </dialog>
  );
}

export function MenuDialogButton() {
  return (
    <button
      type="button"
      onClick={() => {
        (
          document.getElementById(MENU_DIALOG_ID) as HTMLDialogElement
        )?.showModal();
      }}
      className="btn btn-circle btn-xl btn-primary"
    >
      <Settings2Icon />
    </button>
  );
}
