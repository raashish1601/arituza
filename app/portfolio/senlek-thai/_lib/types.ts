export type MenuCategory =
  | "appetizers"
  | "rice-dishes"
  | "noodle-soups"
  | "stir-fry"
  | "curries"
  | "specialties"
  | "dessert"
  | "drinks";

export type MenuFilter = MenuCategory | "all" | "dessert-drinks";

export type DietaryTag =
  | "beef"
  | "chicken"
  | "egg"
  | "mild"
  | "nuts"
  | "pork"
  | "seafood"
  | "spicy"
  | "tofu"
  | "vegetarian";

export type SpiceLevel = 0 | 1 | 2 | 3;

export interface MenuItem {
  id: string;
  code: string;
  name: string;
  thaiName?: string;
  description: string;
  price: number;
  category: MenuCategory;
  isPopular: boolean;
  isSpicy: boolean;
  spiceLevel: SpiceLevel;
  dietaryTags: DietaryTag[];
  image: string;
  proteinOptions?: string[];
}

export interface MenuFilterOption {
  id: MenuFilter;
  label: string;
  categories: MenuCategory[];
}

export interface BusinessHour {
  day: string;
  shortDay: string;
  display: string;
  opens?: string;
  closes?: string;
  isClosed: boolean;
}

export interface ReviewHighlight {
  id: string;
  quote: string;
  source: string;
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface RestaurantStat {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
}

export interface StorySection {
  id: string;
  overline: string;
  title: string;
  copy: string[];
  image: string;
  imageAlt: string;
  imageHint: string;
}
