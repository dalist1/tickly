export function reset() {
  setSeconds(5);
  setIsActive(false);
  clearInterval(intervalId);
  setMessage("");
  setIsTimerEnded(false);
}

export function toggle() {
  if (!isActive) {
    setIsActive(true);

    // Define the interval function
    const intervalFunc = () => {
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
    };

    // Immediately call the function
    intervalFunc();

    // Then set the interval
    const id = setInterval(intervalFunc, 1000);

    setIntervalId(id);
  } else {
    setIsActive(false);
    clearInterval(intervalId);
  }
}
