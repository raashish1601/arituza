import type { Metadata } from "next";

import { restaurantInfo } from "../_data/restaurant-info";
import { getRestaurantUrl } from "./utils";

interface SenlekMetadataInput {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
}

export function buildSenlekMetadata({
  title,
  description,
  path = "",
  ogType = "website"
}: SenlekMetadataInput): Metadata {
  const url = getRestaurantUrl(path);
  const imageUrl = getRestaurantUrl("/opengraph-image");

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: restaurantInfo.displayName,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${restaurantInfo.displayName} website preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    other: {
      "og:type": ogType
    }
  };
}
