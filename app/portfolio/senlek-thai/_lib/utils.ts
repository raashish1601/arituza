import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { businessHours } from "../_data/hours";
import type { BusinessHour, MenuItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(price);
}

export function resolveSiteUrl() {
  const fallback = "https://arituza.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;

  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export function getRestaurantUrl(path = "") {
  return `${resolveSiteUrl()}/portfolio/senlek-thai${path}`;
}

export function getCurrentBusinessDayIndex() {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/Chicago"
  }).format(new Date());

  return businessHours.findIndex((hour) => hour.day === weekday);
}

export function prettifyTag(tag: string) {
  switch (tag) {
    case "seafood":
      return "Contains Seafood";
    case "pork":
      return "Contains Pork";
    case "vegetarian":
      return "Vegetarian";
    case "chicken":
      return "Chicken";
    case "beef":
      return "Beef";
    case "tofu":
      return "Tofu Option";
    case "egg":
      return "Egg";
    case "nuts":
      return "Contains Peanuts";
    case "mild":
      return "Mild";
    case "spicy":
      return "Spicy";
    default:
      return tag;
  }
}

function getRestaurantDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Monday";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return {
    weekday,
    minutes: hour * 60 + minute
  };
}

function getMinutes(time?: string) {
  if (!time) {
    return 0;
  }

  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function findNextOpenBusinessHour(fromIndex: number) {
  for (let offset = 1; offset <= businessHours.length; offset += 1) {
    const hour = businessHours[(fromIndex + offset) % businessHours.length];
    if (!hour.isClosed) {
      return hour;
    }
  }

  return undefined;
}

function formatBusinessTime(value?: string) {
  if (!value) {
    return "";
  }

  const [hourValue, minuteValue] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hourValue, minuteValue, 0, 0);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export interface RestaurantStatus {
  state: "open" | "closing-soon" | "closed";
  label: string;
  detail: string;
  currentHour?: BusinessHour;
}

export function getRestaurantStatus(date = new Date()): RestaurantStatus {
  const { weekday, minutes } = getRestaurantDateParts(date);
  const currentIndex = businessHours.findIndex((hour) => hour.day === weekday);
  const currentHour = businessHours[currentIndex] ?? businessHours[0];

  if (!currentHour || currentHour.isClosed) {
    const nextOpen = findNextOpenBusinessHour(currentIndex >= 0 ? currentIndex : 0);
    return {
      state: "closed",
      label: "Closed today",
      detail: nextOpen ? `Opens ${nextOpen.day} at ${formatBusinessTime(nextOpen.opens)}` : "Call for updates",
      currentHour
    };
  }

  const openMinutes = getMinutes(currentHour.opens);
  const closeMinutes = getMinutes(currentHour.closes);

  if (minutes < openMinutes) {
    return {
      state: "closed",
      label: "Opening later",
      detail: `Today at ${formatBusinessTime(currentHour.opens)}`,
      currentHour
    };
  }

  if (minutes >= closeMinutes) {
    const nextOpen = findNextOpenBusinessHour(currentIndex);
    return {
      state: "closed",
      label: "Closed now",
      detail: nextOpen ? `Opens ${nextOpen.day} at ${formatBusinessTime(nextOpen.opens)}` : "Call for updates",
      currentHour
    };
  }

  const minutesRemaining = closeMinutes - minutes;

  if (minutesRemaining <= 60) {
    return {
      state: "closing-soon",
      label: "Closing soon",
      detail: `Open until ${formatBusinessTime(currentHour.closes)}`,
      currentHour
    };
  }

  return {
    state: "open",
    label: "Open now",
    detail: `Until ${formatBusinessTime(currentHour.closes)}`,
    currentHour
  };
}

export function getSuggestedPairings(item: MenuItem, menuItems: MenuItem[]) {
  const pairings = new Set<string>();

  if (item.isSpicy) {
    pairings.add("Thai Tea");
    pairings.add("Coconut Water");
  } else {
    pairings.add("Thai Lemon Tea");
  }

  if (item.category !== "dessert") {
    pairings.add("Bua Loi");
  }

  return menuItems.filter((candidate) => pairings.has(candidate.name)).slice(0, 3);
}
