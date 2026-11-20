import { profile } from "@/data/portfolio";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function formatClockTime(date = new Date()) {
  return formatter.format(date);
}
