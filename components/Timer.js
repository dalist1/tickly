"use client";

// Icons
import { MdReplay } from "react-icons/md";
import { HiMiniPlay } from "react-icons/hi2";
import { useState } from "react";
import { FaPause } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

// Extra components
import Button from "./Button";
import StratsModal from "./StratsModal";
import { strats } from "@/lib/strategies";

// Reusable functions
import { formatSeconds } from "@/lib/utils/formatSeconds";

// Importing Shadcn Dialog
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Timer({ isTimerEnded, setIsTimerEnded }) {
  const [seconds, setSeconds] = useState(strats[0].taskTimeSeconds);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [activeStrategy, setActiveStrategy] = useState(strats[0].name);
  const [breakSeconds, setBreakSeconds] = useState(strats[0].breakTimeSeconds);
  const [isBreak, setIsBreak] = useState(false);
  const [initialBreakSeconds, setInitialBreakSeconds] = useState(
    strats[0].breakTimeSeconds,
  );
  const [round, setRound] = useState(1);
  const [isNewRound, setIsNewRound] = useState(false);

  function reset() {
    setSeconds(strats[0].taskTimeSeconds);
    setIsActive(false);
    clearInterval(intervalId);
    setIsTimerEnded(false);
    setBreakSeconds(initialBreakSeconds);
    setIsBreak(false);
    setRound(1);
  }

  function toggle() {
    if (isBreak) {
      return;
    }
    if (!isActive) {
      setSeconds((prevSeconds) => prevSeconds - 1); // decrement seconds immediately
      const id = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 1) {
            return prevSeconds - 1;
          } else {
            clearInterval(id);
            setIsBreak(true);
            startBreak();
            return 0;
          }
        });
      }, 1000);
      setIntervalId(id);
      setIsActive(true);
    } else {
      setIsActive(false);
      clearInterval(intervalId);
    }
  }

  function startBreak() {
    setIsNewRound(true);
    setBreakSeconds((prevSeconds) => prevSeconds - 1); // decrement break seconds immediately
    const id = setInterval(() => {
      setBreakSeconds((prevSeconds) => {
        if (prevSeconds > 1) {
          return prevSeconds - 1;
        } else {
          clearInterval(id);
          setIsBreak(false);
          setIsActive(false);
          setRound((prevRound) => prevRound + 1);
          setIntervalId(null);
          setSeconds(strats[0].taskTimeSeconds);
          return initialBreakSeconds;
        }
      });
    }, 1000);
    setIntervalId(id);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-4 text-center">
      <div className="flex max-w-md flex-col items-center justify-center gap-y-14 rounded-3xl bg-slate-900 px-10 py-10 text-center">
        <span className="text-3xl">{activeStrategy}</span>
        {isBreak ? (
          <span className="text-3xl text-red-500">
            Break: {formatSeconds(breakSeconds)}
          </span>
        ) : (
          <span className="text-3xl text-white">{formatSeconds(seconds)}</span>
        )}
        <div className="space-x-20">
          <Button variant="primary" onClick={toggle} disabled={isBreak}>
            {isBreak ? (
              <HiMiniPlay size={40} />
            ) : isActive ? (
              <FaPause size={40} />
            ) : (
              <HiMiniPlay size={40} />
            )}
          </Button>

          <Button variant="secondary" onClick={reset}>
            <MdReplay size={40} />
          </Button>
        </div>
        {round && (
          <div className="mt-2 text-2xl text-sky-500">Round {round}</div>
        )}
      </div>
      <Dialog>
        <DialogTrigger>
          <span className="group relative flex h-12 w-12 cursor-pointer">
            <span className="opacity-55 absolute inline-flex h-full w-full rounded-full bg-sky-400 duration-1000 group-hover:animate-ping"></span>
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 hover:bg-sky-400">
              {" "}
              <FiPlus size={30} />
            </span>
          </span>
        </DialogTrigger>
        <DialogContent>
          <StratsModal
            setTimeInSeconds={setSeconds}
            setBreakTimeInSeconds={(seconds) => {
              setBreakSeconds(seconds);
              setInitialBreakSeconds(seconds);
            }}
            activeStrategy={activeStrategy}
            setActiveStrategy={setActiveStrategy}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
