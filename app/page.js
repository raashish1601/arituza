import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function resolveSiteUrl() {
  const fallback = "https://arituza.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

function getPageMarkup() {
  const filePath = path.join(process.cwd(), "index.html");
  const html = fs.readFileSync(filePath, "utf8");
  const match = html.match(/<body>([\s\S]*?)<script src="script\.js"><\/script>\s*<\/body>/i);

  if (!match) {
    throw new Error("Could not extract body markup from index.html");
  }

  return match[1].trim();
}

export default function Page() {
  const pageMarkup = getPageMarkup();
  const siteUrl = resolveSiteUrl();

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Arituza",
      url: siteUrl,
      description:
        "Arituza designs and runs modern IT systems for Alabama businesses.",
      inLanguage: "en-US"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "Arituza",
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      email: "contact@arituza.com",
      address: {
        "@type": "PostalAddress",
        addressRegion: "AL",
        addressCountry: "US"
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Alabama"
      },
      serviceType: [
        "Managed IT Services",
        "Cybersecurity Services",
        "Cloud Solutions",
        "Custom Software Development",
        "Website Development",
        "Business Automation"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Arituza | AI-Ready IT for Alabama Businesses",
      isPartOf: {
        "@id": `${siteUrl}/#organization`
      },
      about: {
        "@id": `${siteUrl}/#organization`
      },
      description:
        "AI-ready technology systems for businesses that cannot afford downtime."
    }
  ];

  return (
    <>
      {structuredData.map((entry, index) => (
        <Script
          id={`ld-json-${index}`}
          key={`ld-json-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          strategy="beforeInteractive"
        />
      ))}
      <div dangerouslySetInnerHTML={{ __html: pageMarkup }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
