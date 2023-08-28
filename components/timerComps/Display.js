'use client'

import { formatSeconds } from "@/lib/utils/formatSeconds";
import useAppStore from "@/lib/store/useAppStore";

export default function Display() {
  const { isBreak, taskTimeSeconds, breakSeconds, activeStrategy } = useAppStore();

  return (
    <>
      <span className="text-3xl">{activeStrategy}</span>
      {isBreak ? (
        <span className="text-3xl text-red-500">
          Break: {formatSeconds(breakSeconds)}
        </span>
      ) : (
        <span className="text-3xl text-white">{formatSeconds(taskTimeSeconds)}</span>
      )}
    </>
  );
}