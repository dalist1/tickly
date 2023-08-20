"use client"

import React, { useEffect, useState } from 'react';

function StrategyTime() {
  const [timeData, setTimeData] = useState({});

  useEffect(() => {
    const strategyName = 'Pomodoro Technique';

    const url = `/api/storage?strategyName=${encodeURIComponent(strategyName)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => setTimeData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Total Time For Past 6 Days:</h1>
      {Object.entries(timeData).map(([date, totalTime]) => (
        <p key={date}>{date}: {totalTime}</p>
      ))}
    </div>
  );
}

export default StrategyTime;
