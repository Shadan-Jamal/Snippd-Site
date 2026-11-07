import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Config } from "@react-router/dev/config";
import { ALL_PATHS } from "./src/lib/doc-paths.ts";
import { SITE_URL } from "./src/lib/site.ts";

const CLIENT_DIR = path.resolve("dist/client");

function priorityFor(route: string): string {
  if (route === "/") return "1.0";
  if (route === "/docs") return "0.8";
  return "0.7";
}

function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = ALL_PATHS.map(
    (route) =>
      `  <url>\n    <loc>${SITE_URL}${route === "/" ? "" : route}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priorityFor(route)}</priority>\n  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default {
  appDirectory: "src",
  buildDirectory: "dist",
  ssr: false,
  prerender: {
    paths: ALL_PATHS,
    concurrency: 4,
  },
  async buildEnd() {
    await mkdir(CLIENT_DIR, { recursive: true });
    await Promise.all([
      writeFile(path.join(CLIENT_DIR, "sitemap.xml"), buildSitemap(), "utf8"),
      writeFile(
        path.join(CLIENT_DIR, "robots.txt"),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
        "utf8",
      ),
    ]);
  },
} satisfies Config;
