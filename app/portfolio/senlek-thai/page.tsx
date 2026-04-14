import type { Metadata } from "next";

import { AboutPreview } from "./_components/AboutPreview";
import { CTASection } from "./_components/CTASection";
import { FeaturedDishes } from "./_components/FeaturedDishes";
import { GuestExperienceSection } from "./_components/GuestExperienceSection";
import { HeroSection } from "./_components/HeroSection";
import { LocationSection } from "./_components/LocationSection";
import { PageTransition } from "./_components/PageTransition";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { buildSenlekMetadata } from "./_lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildSenlekMetadata({
    title: "Senlek Thai Rice & Noodles | Authentic Thai Street Food in Hoover, AL",
    description:
      "Senlek Thai Rice & Noodles brings authentic Thai street food to Hoover, Alabama. Enjoy bold noodle soups, rice bowls, curries, and more at The Plaza at Riverchase. Order online or visit us today."
  });
}

export default function SenlekHomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturedDishes />
      <AboutPreview />
      <GuestExperienceSection />
      <TestimonialsSection />
      <LocationSection />
      <CTASection />
    </PageTransition>
  );
}
