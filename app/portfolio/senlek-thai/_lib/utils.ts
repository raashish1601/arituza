import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { businessHours } from "../_data/hours";

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
