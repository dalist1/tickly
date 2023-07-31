"use client"

// Icons
import { FiPlus } from "react-icons/fi";
import { Suspense } from "react";

// Radix
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Zustand Store
import useAppStore from "@/lib/store/useAppStore";

// Comps
import Display from "./timerComps/Display";
import ControlButtons from "./timerComps/ControlButtons";
import RoundIndicator from "./timerComps/RoundIndicator";
import StratsModal from "./StratsModal";
import MagicStrat from "./MagicStrat";


export default function Timer() {
  const { activeStrategy, handleControlClick } = useAppStore();


  const handleAiStrat = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/openai');
        const data = await response.json();
        handleControlClick(data.taskTimeSeconds, data.breakTimeSeconds, data.name);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex max-w-md flex-col items-center justify-center gap-y-14 rounded-3xl bg-slate-900 px-10 py-10 text-center">
        <span className="text-3xl">{activeStrategy}</span>
        <Display />
        <ControlButtons />
        <RoundIndicator />
      </div>
      <div className="mt-12 flex gap-x-6">
        <MagicStrat />
        <Dialog>
          <DialogTrigger asChild >
            <span className="group relative flex h-16 w-16 cursor-pointer">
              <span className="opacity-55 absolute inline-flex h-full w-full rounded-full bg-sky-400 duration-1000 group-hover:animate-ping"></span>
              <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400">
                {" "}
                <FiPlus size={25} />
              </span>
            </span>
          </DialogTrigger>
          <DialogContent>
            <StratsModal />
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
}