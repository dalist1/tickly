"use client"

import { convertSecondsToMinutes } from "@/lib/utils/secondsConverter";
import useAppStore from "@/lib/utils/storesss/useAppStore";
import { DialogClose } from "@/components/ui/dialog";


export default function StratsModal() {
  const { handleControlClick, activeStrategy, strats } = useAppStore();

  return (
    <div className="py-10">
      <div className="relative mx-auto max-w-md space-y-4 overflow-y-scroll rounded-lg bg-gray-950 shadow-slate-500 shadow-lg p-8">
        {strats.map((strat) => {
          const { name, description, taskTimeSeconds, breakTimeSeconds } = strat;
          const isActive = activeStrategy === name;

          return (
            <DialogClose
              className={`flex cursor-pointer justify-between rounded-lg bg-sky-500/5 px-4 py-4 text-gray-800 shadow hover:bg-sky-400/10 hover:drop-shadow-lg ${isActive ? "border-sky-400 border" : ""}`}
              key={name}
              onClick={() => handleControlClick(taskTimeSeconds, breakTimeSeconds, name)}
            >
              <div className="space-y-3">
                <p className="text-white">{name}</p>
                <p className="text-sm text-gray-500">{description}</p>
                <div className="inline-flex space-x-1 text-xs text-gray-500">
                  <p>{convertSecondsToMinutes(taskTimeSeconds)}</p>
                  <p>•</p>
                  <p>{convertSecondsToMinutes(breakTimeSeconds)}</p>
                </div>
              </div>
            </DialogClose>
          );
        })}
      </div>
    </div>
  );
};