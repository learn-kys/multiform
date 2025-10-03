import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePassword() {
  const characters = "ABCDEFGHIJKLMNOPQRSTmnopqrstuvwxyz0123456789@#";
  let password = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    password += characters.charAt(randomIndex);
  }

  return password;
}
