import type { BusinessHour } from "../_lib/types";

export const businessHours: BusinessHour[] = [
  {
    day: "Monday",
    shortDay: "Mon",
    display: "11:00 AM - 7:00 PM",
    opens: "11:00",
    closes: "19:00",
    isClosed: false
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    display: "11:00 AM - 7:00 PM",
    opens: "11:00",
    closes: "19:00",
    isClosed: false
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    display: "11:00 AM - 7:00 PM",
    opens: "11:00",
    closes: "19:00",
    isClosed: false
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    display: "11:00 AM - 7:00 PM",
    opens: "11:00",
    closes: "19:00",
    isClosed: false
  },
  {
    day: "Friday",
    shortDay: "Fri",
    display: "11:00 AM - 8:00 PM",
    opens: "11:00",
    closes: "20:00",
    isClosed: false
  },
  {
    day: "Saturday",
    shortDay: "Sat",
    display: "11:00 AM - 8:00 PM",
    opens: "11:00",
    closes: "20:00",
    isClosed: false
  },
  {
    day: "Sunday",
    shortDay: "Sun",
    display: "CLOSED",
    isClosed: true
  }
];
