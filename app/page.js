"use client"

import Clock from "../components/Clock";
import Timer from "@/components/Timer";
import DesktopNotification from "../components/DesktopNotification";
import { useState } from "react";

export default function Page() {

  const [isTimerEnded, setIsTimerEnded] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen w-screen relative">
      <Clock />
      <Timer isTimerEnded={isTimerEnded} setIsTimerEnded={setIsTimerEnded} />
      <DesktopNotification
        title="⏰ Time is up, let's take a break!"
        show={isTimerEnded}
      />

      <div className="fixed font-medium text-lg bottom-4 p-5 bg-[#0c2d6b]/40 backdrop-blur-sm rounded-full space-x-4">
        Powered 🚀 by{" "}
        <a
          href="https://github.com/dalist1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Dalist
        </a>
      </div>
    </div>
  );
}
