"use client";

import { useAtomValue } from "jotai";

import { tabIndexAtom } from "@/jotai/demo";
import AnimationPanel from "@/components/animtaion-panel/AnimationPanel";

export const MENU_DIALOG_ID = "menu-dialog";

function closeDialog() {
  (document.getElementById(MENU_DIALOG_ID) as HTMLDialogElement)?.close();
}

export function MenuDialog() {
  const index = useAtomValue(tabIndexAtom);

  function renderMenu() {
    switch (index) {
      case 0:
        return (
          <AnimationPanel key={0} filter={["easing", "anchor-placement"]} />
        );
      case 1:
        return <AnimationPanel key={1} />;
      case 2:
        return (
          <AnimationPanel key={2} filter={["easing", "anchor-placement"]} />
        );
      default:
        break;
    }
  }

  return (
    <dialog id={MENU_DIALOG_ID} className="modal">
      <div className="modal-box max-w-3xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={closeDialog}
            className="btn btn-circle btn-error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {renderMenu()}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 17H5" />
        <path d="M19 7h-9" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
      </svg>
    </button>
  );
}
