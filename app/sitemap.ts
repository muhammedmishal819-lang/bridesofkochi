import type { Metadata } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://bridesofkochi.com";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/photographers`, lastModified: now },
    { url: `${base}/makeup-artists`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
    { url: `${base}/list-your-business`, lastModified: now }
  ];
}
