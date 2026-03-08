import "../styles.css";

function resolveSiteUrl() {
  const fallback = "https://arituza.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  try {
    return new URL(raw);
  } catch {
    return new URL(fallback);
  }
}

const siteUrl = resolveSiteUrl();
const siteName = "Arituza";
const pageTitle = "Arituza | AI-Ready IT for Alabama Businesses";
const pageDescription =
  "Arituza designs and runs modern IT systems for Alabama businesses: websites, cloud, cybersecurity, automation, and managed services.";

export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: pageTitle,
    template: `%s | ${siteName}`
  },
  description: pageDescription,
  applicationName: siteName,
  keywords: [
    "IT services Alabama",
    "managed IT services",
    "cybersecurity Alabama",
    "cloud solutions",
    "custom software development",
    "website development Alabama",
    "business automation",
    "IT support for small business"
  ],
  alternates: {
    canonical: "/"
  },
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    url: "/",
    siteName,
    title: pageTitle,
    description: pageDescription,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Arituza - AI-ready technology systems for Alabama businesses."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/twitter-image"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"]
  },
  manifest: "/manifest.webmanifest"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3ea28f",
  colorScheme: "light"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
