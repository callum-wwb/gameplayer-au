import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const disallowed = ["/tools/", "/api/", "/staff/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowed,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowed,
      },
      {
        userAgent: "Googlebot-News",
        allow: "/",
        disallow: disallowed,
      },
    ],
    sitemap: [absoluteUrl("/sitemap.xml"), absoluteUrl("/news-sitemap.xml")],
    host: absoluteUrl("/"),
  };
}
