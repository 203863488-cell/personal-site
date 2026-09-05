import { useSyncExternalStore } from "react";
import { isPresentationDevice } from "./interaction";

function snapshot() {
  const handheld = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    || window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  return isPresentationDevice(handheld, window.innerWidth, window.innerHeight);
}

function subscribe(callback: () => void) {
  const pointer = window.matchMedia("(hover: none) and (pointer: coarse)");
  window.addEventListener("resize", callback);
  pointer.addEventListener("change", callback);
  return () => {
    window.removeEventListener("resize", callback);
    pointer.removeEventListener("change", callback);
  };
}

export function usePresentationDevice() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
