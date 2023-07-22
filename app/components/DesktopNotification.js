"use client"

import { useEffect } from 'react';

const DesktopNotification = ({ title, options, show }) => {
  useEffect(() => {
    if (!show) return;

    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      const notification = new Notification(title, options);
      notification.onclick = function () {
        window.focus();
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          const notification = new Notification(title, options);
          notification.onclick = function () {
            window.focus();
          };
        }
      });
    }
  }, [title, options, show]);

  return null;
};


export default DesktopNotification;