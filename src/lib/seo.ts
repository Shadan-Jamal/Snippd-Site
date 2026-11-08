import type { MetaDescriptor } from "react-router";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "./site.ts";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export function absoluteUrl(path: string): string {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function seoMeta({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
  image = DEFAULT_OG_IMAGE,
  jsonLd,
}: SeoOptions): MetaDescriptor[] {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  const meta: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    {
      name: "robots",
      content: noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large",
    },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${SITE_NAME} — local-only CLI snippet manager` },
    { property: "og:locale", content: "en_US" },
  ];

  if (jsonLd) {
    meta.push({ "script:ld+json": jsonLd });
  }

  return meta;
}
