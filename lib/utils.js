import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// utils.js
export const startInterval = (set, state) => {
  return setInterval(() => {
    set((prevState) => {
      if (prevState.seconds > 0) {
        prevState.seconds -= 1;
      } else {
        clearInterval(prevState.intervalId);
        prevState.intervalId = null;
        prevState.isTimerEnded = true;
      }
    });
  }, 1000);
};

export const clearIntervalAndReturnNull = (intervalId) => {
  clearInterval(intervalId);
  return null;
};
