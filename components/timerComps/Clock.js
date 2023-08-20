"use client";

import { useState, useEffect, Fragment } from "react";
import moment from "moment";

export default function Clock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTime(moment().format("LT"));
      const timer = setInterval(() => {
        setTime(moment().format("LT"));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <>
      {time && (
        <span className="text-2xl rounded-3xl ring-2 ring-slate-800 p-4 px-25 bg-slate-900/95">
          {time}
        </span>
      )}
    </>
  );
}
