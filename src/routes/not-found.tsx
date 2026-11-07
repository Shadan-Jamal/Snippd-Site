import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { seoMeta } from "@/lib/seo";

export const meta: MetaFunction = () =>
  seoMeta({
    title: "Page not found — Snippd",
    description: "The page you are looking for does not exist.",
    path: "/404",
    noIndex: true,
  });

export default function NotFoundRoute() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-28">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block text-sm text-muted-foreground underline"
      >
        Back home
      </Link>
    </main>
  );
}
