"use client"

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useUser } from '@clerk/nextjs';

export const fetchCache = 'force-no-store'

const GradientChart = () => {
  const { user } = useUser()
  console.log(user)
  const userid = user.id
  console.log("dashboard userid", userid)
  const strategyName = 'Pomodoro Technique';
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      fetch(`/api/storage?userId=${encodeURIComponent(userid)}&strategyName=${encodeURIComponent(strategyName)}`, { cache: 'no-store' })
        .then(response => response.json())
        .then(data => {
          const labels = Object.keys(data).reverse();
          let taskTimes = Object.values(data).reverse();

          taskTimes = taskTimes.map(time => isNaN(time) ? 0 : time);

          const ctx = chartRef.current.getContext('2d');
          const gradientFill = ctx.createLinearGradient(0, 0, 0, chartRef.current.height);
          gradientFill.addColorStop(0, "rgba(75, 192, 192, 0.5)");
          gradientFill.addColorStop(1, "rgba(75, 192, 192, 0)");

          new Chart(ctx, {
            type: 'line',
            data: {
              labels,
              datasets: [{
                label: `Task time in minutes`,
                data: taskTimes,
                fill: true,
                backgroundColor: gradientFill,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                easing: "easeInOutBack"
              },
              scales: {
                y: {
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                      size: 14,
                    },
                    beginAtZero: true,
                    maxTicksLimit: 5
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                },
                x: {
                  ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                      size: 14,
                    }
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                }
              }
            }
          });
        });
    }
  }, []);

  return (
    <div className='py-10'>
      <div className="relative mx-auto max-w-xl space-y-4 overflow-y-scroll bg-gray-950">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default GradientChart;
