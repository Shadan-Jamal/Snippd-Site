import { Link } from "wouter";

/** Update these when the package / repo are published. */
const NPM_URL = "https://www.npmjs.com/package/snippd";
const GITHUB_URL = "https://github.com/shadan/snippd";

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 sm:items-center">
        <Link href="/" className="flex items-center gap-3 text-foreground no-underline">
          <img
            src="/favicon.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-md"
          />
          <span className="text-base font-semibold tracking-tight">Snippd</span>
        </Link>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:justify-end"
        >
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            npm
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
        </nav>
      </div>
    </footer>
  );
}
