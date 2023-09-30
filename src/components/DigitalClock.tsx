import React, { useState, useEffect } from "react";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const dayStr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date();
  const day = dayStr[date.getDay()];
  return (
    <div className="digital-clock">
      {day}, {time}
    </div>
  );
};

export default DigitalClock;
