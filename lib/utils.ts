import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { districts, states } from "./state_and_district";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function formatDateForInput(dateValue: string | Date) {
  const date = new Date(dateValue);

  return date.toISOString().split("T")[0];
}

export function getStates(): string[] {
  return states;
}

export function getDistrictsByState(stateName: string): string[] {
  return districts[stateName] || [];
}

export function getAlledStatesAndDistricts() {
  return states.map((state) => ({
    state,
    districts: getDistrictsByState(state),
  }));
}
