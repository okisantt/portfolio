"use client";

import { useEffect, useState } from "react";

function now() {
  const date = new Date();
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** The visitor's local time, like the clock on the lock screen that inspired the layout. */
export default function HeroClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(now());
    update();
    const interval = window.setInterval(update, 10_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <p className="hero-c hero-clock" style={{ "--d": "1s" } as React.CSSProperties}>
      <span className="sr-only">Hora local: </span>
      {time}
    </p>
  );
}
