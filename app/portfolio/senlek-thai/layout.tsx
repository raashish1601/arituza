import type { ReactNode } from "react";
import { Suspense } from "react";
import { DM_Sans, Playfair_Display, Sarabun } from "next/font/google";

import "./senlek.css";

import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import { ProtectionLayer } from "./_components/ProtectionLayer";
import { RouteProgressBar } from "./_components/RouteProgressBar";
import { SenlekThemeProvider } from "./_components/SenlekThemeProvider";
import { StickyOrderBar } from "./_components/StickyOrderBar";
import { businessHours } from "./_data/hours";
import { restaurantInfo } from "./_data/restaurant-info";
import { getRestaurantUrl } from "./_lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-playfair"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans"
});

const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "600"],
  variable: "--font-sarabun"
});

export default function SenlekLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurantInfo.displayName,
    image: [],
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurantInfo.addressLine1,
      addressLocality: "Hoover",
      addressRegion: "AL",
      postalCode: "35244",
      addressCountry: "US"
    },
    telephone: restaurantInfo.phoneIntl,
    url: getRestaurantUrl(),
    servesCuisine: "Thai",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: businessHours
          .filter((hour) => ["Monday", "Tuesday", "Wednesday", "Thursday"].includes(hour.day))
          .map((hour) => hour.day),
        opens: "11:00",
        closes: "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: businessHours
          .filter((hour) => ["Friday", "Saturday"].includes(hour.day))
          .map((hour) => hour.day),
        opens: "11:00",
        closes: "20:00"
      }
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurantInfo.coordinates.latitude,
      longitude: restaurantInfo.coordinates.longitude
    },
    sameAs: [restaurantInfo.instagram, restaurantInfo.facebook],
    menu: getRestaurantUrl("/menu")
  };

  return (
    <SenlekThemeProvider>
      <div className={`senlek-guard ${playfair.variable} ${dmSans.variable} ${sarabun.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ProtectionLayer />
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>
        <Navbar />
        <main className="pb-24 md:pb-0">{children}</main>
        <StickyOrderBar />
        <Footer />
      </div>
    </SenlekThemeProvider>
  );
}
