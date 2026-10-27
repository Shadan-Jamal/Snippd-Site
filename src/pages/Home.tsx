import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Terminal } from "@/components/ui/terminal";

/** Set to "/demo.mp4" (or a hosted URL) once your recording is ready. */
const DEMO_VIDEO_SRC = "";

const USE_CASES = [
  {
    title: "Docker Commands You Keep Forgetting",
    body: "Save restart, log-tailing, exec-into-shell, and prune commands once instead of re-Googling them every time.",
  },
  {
    title: "Competitive Programming Templates",
    body: "Keep fast I/O, Dijkstra, and segment tree templates ready to paste so contest time goes to the problem.",
  },
  {
    title: "LeetCode Pattern Library",
    body: "Store templates for sliding window, two pointers, BFS, and monotonic stack, then search by problem shape.",
  },
  {
    title: "Regex You Can’t Remember",
    body: "Keep working patterns for emails, UUIDs, and dates with notes on what they match and miss.",
  },
  {
    title: "Database Queries for Debugging",
    body: "Turn one-off incident queries like duplicate finders and FK checks into a reusable runbook.",
  },
  {
    title: "Git Recipes for Messy Situations",
    body: "Keep safe, reviewed recipes for undoing commits, cleaning merged branches, and bisecting bugs.",
  },
  {
    title: "Onboarding to a New Codebase",
    body: "Store seed commands, env setup, and test flags, then export them for every new teammate.",
  },
  {
    title: "Cross-Language Reuse",
    body: "Find the logic you wrote in Python last year from TypeScript using semantic search with snippd ai.",
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
            <a
              href="#demo"
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Watch demo
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
            Built for the things you keep relearning
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Save the commands, templates, and patterns you reach for under pressure — then find them again from the shell.
          </p>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {USE_CASES.map((item) => (
              <li key={item.title} className="space-y-2 border-l border-border pl-4">
                <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="demo" className="relative border-t border-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            See it in action
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            A short walkthrough of saving, searching, and reusing snippets from the terminal.
          </p>

          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-muted/40 dark:bg-muted/20">
            <div className="relative aspect-video w-full">
              {DEMO_VIDEO_SRC ? (
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src={DEMO_VIDEO_SRC} type="video/mp4" />
                </video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
                  <p className="text-sm font-medium text-foreground">Demo video coming soon</p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    Drop your recording in{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono">public/demo.mp4</code>
                    , then set <code className="rounded bg-muted px-1.5 py-0.5 font-mono">DEMO_VIDEO_SRC</code>{" "}
                    in <code className="rounded bg-muted px-1.5 py-0.5 font-mono">Home.tsx</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
