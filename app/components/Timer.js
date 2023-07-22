"use client";

import { MdReplay } from "react-icons/md";
import { HiMiniPlay } from "react-icons/hi2";
import { useState } from "react";
import { FaPause } from "react-icons/fa";


export default function Timer({ isTimerEnded, setIsTimerEnded }) {
  const [seconds, setSeconds] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [message, setMessage] = useState("");

  function reset() {
    setSeconds(5);
    setIsActive(false);
    clearInterval(intervalId);
    setMessage("");
    setIsTimerEnded(false);
  }
  
  function toggle() {
    if (!isActive) {
      setIsActive(true);

      const id = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds > 1) {
            return seconds - 1;
          } else {
            clearInterval(id);
            setMessage("Time is up!");
            setIsTimerEnded(true);
            return 0;
          }
        });
      }, 1000);

      setIntervalId(id);
    } else {
      setIsActive(false);
      clearInterval(intervalId);
    }
  }
  
  return (
    <div className="bg-slate-900 text-5xl rounded-3xl sm:max-lg:p-10 p-24 flex flex-col items-center justify-center gap-10">
      <span>{seconds}</span>
      <div className="space-x-20">
        <button
          className="cursor-pointer rounded-full p-10 bg-blue-500/20 hover:bg-blue-400 text-white"
          onClick={toggle}
          disabled={seconds === 0}
        >
          {isActive ? <FaPause size={50} /> : <HiMiniPlay size={50} />}
        </button>
        <button
          className="cursor-pointer text-2xl rounded-full p-10 bg-red-500/20 hover:bg-red-400 text-white"
          onClick={reset}
        >
          <MdReplay size={50} />
        </button>
      </div>
      {message && <div className="my-3 text-red-500">{message}</div>}
    </div>
  );
}