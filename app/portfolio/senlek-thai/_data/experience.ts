import type {
  CateringPackage,
  ExperienceCard,
  GiftOption,
  RewardPerk,
  ServiceStep
} from "../_lib/types";

import { restaurantInfo } from "./restaurant-info";

export const guestExperienceCards: ExperienceCard[] = [
  {
    id: "catering",
    eyebrow: "Plan Ahead",
    title: "Bring Senlek to your next lunch, office drop, or celebration.",
    description:
      "Build a catering brief, choose the right service style, and move from idea to pickup or delivery without the back-and-forth.",
    href: `${restaurantInfo.basePath}/catering`,
    ctaLabel: "Explore Catering"
  },
  {
    id: "gift-cards",
    eyebrow: "Gift Better",
    title: "Send a Thai night out with a polished, mobile-friendly gifting flow.",
    description:
      "Use flexible digital gifting for birthdays, thank-yous, and last-minute surprises while keeping the experience branded and premium.",
    href: `${restaurantInfo.basePath}/gift-cards`,
    ctaLabel: "View Gift Options"
  },
  {
    id: "rewards",
    eyebrow: "Come Back Often",
    title: "Save favorites, build your flavor profile, and shortcut repeat orders.",
    description:
      "The Flavor Passport turns repeat guests into regulars with saved dishes, personalized reorder prompts, and future-ready loyalty UX.",
    href: `${restaurantInfo.basePath}/rewards`,
    ctaLabel: "Open Flavor Passport"
  }
];

export const cateringPackages: CateringPackage[] = [
  {
    id: "drop-off-lunch",
    title: "Drop-Off Lunch",
    guestRange: "8 to 12 guests",
    serviceStyle: "Easy office or studio lunch",
    leadTime: "Best with 24 to 48 hours notice",
    description:
      "Designed for small team meals, creative sessions, and casual celebrations where guests want variety without slowing the day down.",
    highlights: ["Rice bowls and noodle soups", "Vegetarian-friendly add-ons", "Pickup or delivery planning"],
    idealFor: "Office lunches, team wins, client drop-offs"
  },
  {
    id: "street-market-spread",
    title: "Thai Street Market Spread",
    guestRange: "12 to 20 guests",
    serviceStyle: "Shareable mains and sides",
    leadTime: "Best with 48 hours notice",
    description:
      "A warmer, more celebratory setup centered on bold Thai favorites, layered textures, and a balance of comforting dishes and bright salads.",
    highlights: ["Curated dish mix", "Spice-level planning", "Guest-friendly packaging"],
    idealFor: "Birthdays, family gatherings, creative events"
  },
  {
    id: "signature-noodle-night",
    title: "Signature Noodle Night",
    guestRange: "20+ guests",
    serviceStyle: "Custom quote and service plan",
    leadTime: "Best with 72 hours notice",
    description:
      "For larger groups that want a memorable Senlek experience with signature noodle soups, crowd favorites, and a coordinated service plan.",
    highlights: ["Custom menu consultation", "Pickup timing strategy", "Recommended order quantities"],
    idealFor: "Launches, community nights, larger celebrations"
  }
];

export const cateringSteps: ServiceStep[] = [
  {
    id: "brief",
    title: "Build your event brief",
    description: "Share guest count, timing, service style, and any dietary or spice notes."
  },
  {
    id: "confirm",
    title: "Confirm the menu direction",
    description: "We help match the right dishes and quantities to your group and format."
  },
  {
    id: "deposit",
    title: "Approve and secure your date",
    description: "Once the order is approved, use the restaurant's preferred payment or deposit flow."
  },
  {
    id: "enjoy",
    title: "Pickup, deliver, and serve smoothly",
    description: "Get a polished handoff with timing, packaging, and guest-ready recommendations."
  }
];

export const giftOptions: GiftOption[] = [
  {
    id: "gift-25",
    title: "Quick Treat",
    amount: "$25",
    description: "Perfect for Thai tea, a favorite noodle bowl, or a casual lunch surprise.",
    href: restaurantInfo.giftCardLink,
    helper: "Flexible digital gifting via Giftly.",
    isOfficial: false
  },
  {
    id: "gift-50",
    title: "Dinner for Two",
    amount: "$50",
    description: "A strong go-to for a shared meal, drinks, and a dessert moment.",
    href: restaurantInfo.giftCardLink,
    helper: "A polished, mobile-friendly way to send a Senlek night out.",
    isOfficial: false
  },
  {
    id: "gift-100",
    title: "Celebrate Big",
    amount: "$100",
    description: "Ideal for birthdays, thank-yous, and generous celebration gifting.",
    href: restaurantInfo.giftCardLink,
    helper: "Great for families, food lovers, and last-minute wins.",
    isOfficial: false
  }
];

export const rewardPerks: RewardPerk[] = [
  {
    id: "save-favorites",
    title: "Save your signature order",
    description: "Keep your go-to bowls, noodles, and drinks one tap away for your next Thai night."
  },
  {
    id: "spice-profile",
    title: "Remember your flavor style",
    description: "Track whether you lean mild, balanced, or bold so repeat orders feel faster and smarter."
  },
  {
    id: "reorder-shortcuts",
    title: "Build faster reorders",
    description: "Use your saved favorites as a launch pad before heading into Toast for pickup or delivery."
  },
  {
    id: "vip-launch",
    title: "Stay ready for loyalty",
    description: "The page is structured so Senlek can plug in a future loyalty or VIP launch without redesigning the experience."
  }
];
