import Script from "next/script";
import HomePageClient from "./components/home-page-client";

function resolveSiteUrl() {
  const fallback = "https://arituza.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export default function Page() {
  const siteUrl = resolveSiteUrl();
  const contactEmail = "contact@arituza.com";
  const contactPhones = ["+1-205-800-8869", "+1-205-738-9195"];
  const serviceTypes = [
    "Managed IT Services",
    "Cybersecurity Services",
    "Cloud Solutions",
    "Custom Software Development",
    "Website Development",
    "Business Automation",
    "IT Consultation and Training"
  ];
  const serviceAreas = [
    "Alabama",
    "Birmingham, AL",
    "Huntsville, AL",
    "Montgomery, AL",
    "Mobile, AL",
    "Tuscaloosa, AL",
    "Auburn, AL",
    "Dothan, AL"
  ];
  const faqItems = [
    {
      question: "What IT services does Arituza provide in Alabama?",
      answer:
        "Arituza provides managed IT services, cybersecurity, cloud architecture, custom software development, website development, and workflow automation for Alabama businesses."
    },
    {
      question: "Do you support small and mid-sized businesses in Alabama?",
      answer:
        "Yes. Arituza supports small and mid-sized teams across Alabama with right-sized IT roadmaps, proactive monitoring, and operator-friendly support."
    },
    {
      question: "Can Arituza help with cybersecurity and compliance requirements?",
      answer:
        "Yes. We implement practical security controls including identity policies, endpoint protections, monitoring, backups, and compliance-aligned documentation."
    },
    {
      question: "How quickly can a new business start with Arituza?",
      answer:
        "Most new Alabama clients can begin discovery immediately, with onboarding and implementation plans typically starting within days."
    },
    {
      question: "Does Arituza offer cloud migration and infrastructure modernization?",
      answer:
        "Yes. We design and execute cloud migration, hosting, reliability architecture, and infrastructure upgrades focused on uptime and security."
    },
    {
      question: "How do I request a proposal for IT support in Alabama?",
      answer:
        "Email contact@arituza.com or call (205) 800-8869 or (205) 738-9195. Arituza will respond with a discovery call and a clear scope-first recommendation within one business day."
    }
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Arituza",
      url: siteUrl,
      description:
        "Arituza designs and runs modern IT systems for Alabama businesses.",
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteUrl}/#organization`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Arituza",
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      image: [`${siteUrl}/opengraph-image`, `${siteUrl}/media/hero-operations.jpg`],
      email: contactEmail,
      telephone: contactPhones[0],
      contactPoint: contactPhones.map((telephone) => ({
        "@type": "ContactPoint",
        contactType: "sales",
        email: contactEmail,
        telephone,
        availableLanguage: ["en-US"],
        areaServed: "US-AL"
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hoover",
        addressRegion: "AL",
        postalCode: "35216",
        addressCountry: "US"
      },
      areaServed: serviceAreas.map((place) => ({
        "@type": place === "Alabama" ? "State" : "City",
        name: place
      })),
      serviceType: serviceTypes,
      knowsAbout: serviceTypes
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${siteUrl}/#service-list`,
      name: "Arituza IT Services",
      itemListElement: serviceTypes.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          "@id": `${siteUrl}/#service-${index + 1}`,
          name,
          serviceType: name,
          provider: {
            "@id": `${siteUrl}/#organization`
          },
          areaServed: {
            "@type": "State",
            name: "Alabama"
          }
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Arituza | AI-Ready IT for Alabama Businesses",
      inLanguage: "en-US",
      isPartOf: {
        "@id": `${siteUrl}/#website`
      },
      about: {
        "@id": `${siteUrl}/#organization`
      },
      mainEntity: [{ "@id": `${siteUrl}/#service-list` }, { "@id": `${siteUrl}/#faq` }],
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
      <HomePageClient />
    </>
  );
}
