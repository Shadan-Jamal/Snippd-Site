import type { MetaFunction } from "react-router";
import { useParams } from "react-router";
import { DocSectionPage } from "@/pages/DocSection";
import { DOC_COMMANDS, DOC_GUIDES } from "@/data/docs";
import { absoluteUrl, seoMeta } from "@/lib/seo";

function summarize(value: string, maxLength = 160): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export const meta: MetaFunction = ({ params }) => {
  const id = params.id ?? "";
  const guide = DOC_GUIDES.find((item) => item.id === id);
  const command = DOC_COMMANDS.find((item) => item.id === id);

  if (!guide && !command) {
    return seoMeta({
      title: "Section not found — Snippd Docs",
      description: "The requested Snippd documentation section does not exist.",
      path: `/docs/${id}`,
      noIndex: true,
    });
  }

  const firstText = guide?.blocks.find(
    (block) => block.kind === "text" || block.kind === "note",
  );
  const title = guide
    ? `${guide.title} — Snippd Docs`
    : `snippd ${command!.title} — Snippd Docs`;
  const descriptionSource =
    guide?.subtitle ??
    (firstText && "body" in firstText ? firstText.body : undefined) ??
    command?.summary ??
    "Snippd command reference and usage guide.";
  const description = summarize(descriptionSource);

  return seoMeta({
    title,
    description,
    path: `/docs/${id}`,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title,
      description,
      url: absoluteUrl(`/docs/${id}`),
      isPartOf: {
        "@type": "WebSite",
        name: "Snippd",
        url: absoluteUrl("/"),
      },
    },
  });
};

export default function DocSectionRoute() {
  const { id = "" } = useParams();
  return <DocSectionPage id={id} />;
}
