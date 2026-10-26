import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Terminal } from "@/components/ui/terminal";


const USE_CASES = [
  {
    title: "Capture without leaving the shell",
    body: "Save titled snippets with extensions and tags in one command. Snippd opens your editor when you need a longer body.",
  },
  {
    title: "Find it again fast",
    body: "SQLite FTS for exact text, plus optional semantic search via Ollama when you only remember the idea.",
  },
  {
    title: "Stay local-first",
    body: "Everything lives under ~/.snippd. Export a portable .db, merge backups, and keep your library offline.",
  },
];

export function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_top,_oklch(0.92_0.02_250)_0%,_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_oklch(0.28_0.03_250)_0%,_transparent_55%)]"
      />

      <section className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-center gap-10 px-6 pb-16 pt-28 md:flex-row md:items-center md:gap-14">
        <div className="flex-1 space-y-6">
          <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Snippd
          </p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-[1.1]">
            Snippets that live where you work — the terminal.
          </h1>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            A local-first CLI snippet manager. Save, search, tag, and reuse code without leaving your shell.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <HoverBorderGradient
              as="a"
              href="/docs"
              containerClassName="inline-flex rounded-full"
              className="rounded-full bg-background px-5 py-2 text-sm font-medium text-foreground"
            >
              Read the docs
            </HoverBorderGradient>
            <a
              href="#use-cases"
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              See how it fits
            </a>
          </div>
        </div>

        <div className="w-full flex-1 md:max-w-md">
          <Terminal
            enableSound={false}
            username="dev"
            commands={[
              "snippd save debounce -e ts -t util",
              "snippd search debounce",
              "snippd copy debounce",
            ]}
            outputs={{
              0: ["Saved debounce.ts"],
              1: ["1 match · debounce.ts"],
              2: ["Copied to clipboard"],
            }}
          />
        </div>
      </section>

      <section
        id="use-cases"
        className="relative border-t border-border bg-muted/30 px-6 py-20 dark:bg-muted/10"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Built for everyday CLI workflows
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Three moments where Snippd stays out of the way and keeps your snippets close.
          </p>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {USE_CASES.map((item) => (
              <li key={item.title} className="space-y-2">
                <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer left blank for your info */}
      <footer className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-5xl min-h-[4rem]" />
      </footer>
    </div>
  );
}
