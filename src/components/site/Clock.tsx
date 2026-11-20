import { useEffect, useState } from "react";
import { formatClockTime } from "@/lib/clock";

export function Clock({ initialTime }: { initialTime?: string | undefined }) {
  const [time, setTime] = useState(initialTime ?? "--:--:--");

  useEffect(() => {
    const update = () => setTime(formatClockTime());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular">{time}</span>;
}
