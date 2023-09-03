'use client'

import { useEffect } from 'react';
import useAppStore from '@/lib/store/useAppStore';

const DesktopNotification = ({ title = "⏰ Time is up, let's take a break!" }) => {
  const { isTimerEnded } = useAppStore()

  useEffect(() => {
    if (!isTimerEnded) return;

    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(title);
      notification.onclick = () => window.focus();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          const notification = new Notification(title);
          notification.onclick = () => window.focus();
        }
      });
    }
  }, [title, isTimerEnded]);

  return null;
};

export default DesktopNotification;