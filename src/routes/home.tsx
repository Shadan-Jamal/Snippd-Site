import type { MetaFunction } from "react-router";
import { HomePage } from "@/pages/Home";
import { seoMeta } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const meta: MetaFunction = () =>
  seoMeta({
    title: "Snippd — Local-only CLI snippet manager",
    description: SITE_DESCRIPTION,
    path: "/",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, Linux",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      downloadUrl: "https://www.npmjs.com/package/snippd",
      sameAs: [
        "https://www.npmjs.com/package/snippd",
        "https://github.com/Shadan-Jamal/Snippd",
      ],
    },
  });

export default function HomeRoute() {
  return <HomePage />;
}
