import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://datadrivenscience.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/ saveSurvey", "/survey/success"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
