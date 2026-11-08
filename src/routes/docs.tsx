import type { MetaFunction } from "react-router";
import { DocsPage } from "@/pages/Docs";
import { seoMeta } from "@/lib/seo";

export const meta: MetaFunction = () =>
  seoMeta({
    title: "Documentation — Snippd",
    description:
      "Guides and command reference for Snippd, the local-only CLI snippet manager. Learn how to save, search, organize, and reuse snippets from your terminal.",
    path: "/docs",
  });

export default function DocsRoute() {
  return <DocsPage />;
}
