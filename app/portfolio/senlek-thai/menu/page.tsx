import type { Metadata } from "next";

import { MenuSection } from "../_components/MenuSection";
import { PageTransition } from "../_components/PageTransition";
import { SubpageHero } from "../_components/SubpageHero";
import { buildSenlekMetadata } from "../_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSenlekMetadata({
    title: "Menu | Senlek Thai Rice & Noodles — Thai Street Food in Hoover, AL",
    description:
      "Explore our full menu of authentic Thai dishes — from Pad Thai and Khao Soi to braised beef noodle soup and crispy pork belly rice. Fresh, flavorful, and made with care.",
    path: "/menu",
    ogType: "restaurant.menu"
  });
}

export default function MenuPage() {
  return (
    <PageTransition>
      <SubpageHero
        eyebrow="Fresh Daily"
        title="Our Menu"
        description="Authentic Thai Street Food — Made Fresh Daily"
      />
      <section className="bg-[var(--senlek-cream)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MenuSection />
        </div>
      </section>
    </PageTransition>
  );
}
