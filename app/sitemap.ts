import type { MetadataRoute } from "next";

/* Served at /sitemap.xml. /founding is left out on purpose (unlisted page). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tutur.my",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://tutur.my/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://tutur.my/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
