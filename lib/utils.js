import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const startInterval = (callback, delay) => setInterval(callback, delay);
export const stopInterval = (id) => clearInterval(id);

export const clearIntervalAndReturnNull = (intervalId) => {
  clearInterval(intervalId);
  return null;
};
