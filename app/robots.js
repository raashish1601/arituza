function resolveSiteUrl() {
  const fallback = "https://arituza.com";
  const raw = process.env.NEXT_PUBLIC_SITE_URL || fallback;
  try {
    return new URL(raw).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export default function robots() {
  const siteUrl = resolveSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl
  };
}
