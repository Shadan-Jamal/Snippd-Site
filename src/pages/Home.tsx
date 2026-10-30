import { useState } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Terminal } from "@/components/ui/terminal";

/** Set to "/demo.mp4" (or a hosted URL) once your recording is ready. */
const DEMO_VIDEO_SRC = "";

const USE_CASES = [
  {
    title: "Docker Commands You Keep Forgetting",
    body: "Save restart, log-tailing, exec-into-shell, and prune commands once, then open the one you need in your editor.",
    commands: [`snippd search "docker restart"`, `snippd view "docker-restart.sh"`],
    outputs: {
      0: ["1 match · docker-restart.sh"],
      1: [
        "Opening docker-restart.sh in nvim...",
        "name=\"${1:?container}\"",
        "docker restart \"$name\"",
        "docker logs -f --tail 80 \"$name\"",
      ],
    },
  },
  {
    title: "Competitive Programming Templates",
    body: "Keep fast I/O, Dijkstra, and segment tree templates one command away so contest time goes to the problem.",
    commands: [`snippd search "dijkstra"`, `snippd edit "dijkstra.cpp"`],
    outputs: {
      0: ["1 match · dijkstra.cpp"],
      1: [
        "Opened dijkstra.cpp in nvim",
        "dist.assign(n, INF);",
        "dist[s] = 0;",
        "pq.push({0, s});",
      ],
    },
  },
  {
    title: "LeetCode Pattern Library",
    body: "Store sliding window, two pointers, BFS, and monotonic stack, then open the pattern that matches the problem.",
    commands: [`snippd search "sliding window"`, `snippd view "sliding-window.py"`],
    outputs: {
      0: ["2 matches · sliding-window.py, two-pointers.py"],
      1: [
        "Opening sliding-window.py in nvim...",
        "lo = best = 0",
        "seen = {}",
        "for hi, ch in enumerate(s):",
        "    if ch in seen: lo = max(lo, seen[ch] + 1)",
        "    seen[ch] = hi",
        "    best = max(best, hi - lo + 1)",
      ],
    },
  },
  {
    title: "Regex You Can’t Remember",
    body: "Keep working patterns for emails, UUIDs, and dates, then open the one that already matches.",
    commands: [`snippd search "uuid regex"`, `snippd view "uuid.ts"`],
    outputs: {
      0: ["1 match · uuid.ts"],
      1: [
        "Opening uuid.ts in nvim...",
        "const uuid =",
        "  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;",
      ],
    },
  },
  {
    title: "Database Queries for Debugging",
    body: "Turn one-off incident queries like duplicate finders and FK checks into a runbook you can open mid-incident.",
    commands: [`snippd search "duplicate rows"`, `snippd view "find-dupes.sql"`],
    outputs: {
      0: ["1 match · find-dupes.sql"],
      1: [
        "Opening find-dupes.sql in nvim...",
        "SELECT email, COUNT(*) AS n",
        "FROM users",
        "GROUP BY email",
        "HAVING n > 1;",
      ],
    },
  },
  {
    title: "Git Recipes for Messy Situations",
    body: "Keep reviewed recipes for undoing commits, cleaning merged branches, and bisecting bugs.",
    commands: [`snippd search "undo last commit"`, `snippd view "git-undo.sh"`],
    outputs: {
      0: ["1 match · git-undo.sh"],
      1: [
        "Opening git-undo.sh in nvim...",
        "git reset --soft HEAD~1",
        "git restore --staged .",
      ],
    },
  },
  {
    title: "Onboarding to a New Codebase",
    body: "Store seed commands, env setup, and test flags, then export the container for every new teammate.",
    commands: [`snippd container show`, `snippd export`],
    outputs: {
      0: ["onboarding · 6 snippets"],
      1: ["Wrote ~/.snippd/snippd-backup.db"],
    },
  },
  {
    title: "Cross-Language Reuse",
    body: "Find the logic you wrote in Python last year from TypeScript using semantic search with snippd ai.",
    commands: [`snippd ai "rate limiter I wrote in python"`, `snippd view "token-bucket.py"`],
    outputs: {
      0: ["1 match · token-bucket.py"],
      1: [
        "Opening token-bucket.py in nvim...",
        "tokens = min(cap, tokens + (now - last) * rate)",
        "last = now",
        "if tokens < 1: return False",
        "tokens -= 1",
      ],
    },
  },
];

const CLI_LINKS = [
  { label: "tags", href: "/docs/tags" },
  { label: "container", href: "/docs/container" },
  { label: "search", href: "/docs/search" },
  { label: "snippd ai", href: "/docs/ai" },
  { label: "snippd ui", href: "/docs/ui" },
];

const EDITOR_BEATS = [
  {
    title: "Find it.",
    body: "snippd search",
  },
  {
    title: "Open it/Edit it where you write",
    body: "snippd view and snippd edit",
  },
  {
    title: "It comes back saved",
    body: "Edits land in the local database.",
  },
];

export function HomePage() {
  const [useCaseIndex, setUseCaseIndex] = useState(0);
  const active = USE_CASES[useCaseIndex];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_top,oklch(0.92_0.02_250)_0%,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,oklch(0.28_0.03_250)_0%,transparent_55%)]"
      />

      <section className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-center gap-10 px-6 pb-16 pt-28 md:flex-row md:items-center md:gap-14">
        <div className="flex-1 space-y-6">
          <p className="font-mono text-7xl text-foreground uppercase">
            Snippd
          </p>
          <p className="max-w-md text-base text-muted-foreground md:text-lg">
            A <span className="font-bold text-xl text-white">local</span> snippet library for the terminal. Search it, then open the result in your preferred <code className="font-bold text-xl text-white">editor</code> — with your keybindings, syntax, and lint.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a href="/docs">
              <HoverBorderGradient
                containerClassName="inline-flex rounded-full"
                className="rounded-full bg-background px-5 py-2 text-sm font-medium text-foreground"
              >
                Read the docs
              </HoverBorderGradient>
            </a>
            <a
              href="#in-your-editor"
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              In your editor
            </a>
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
            typingSpeed={20}
            username="dev"
            commands={[
              `snippd search "debounce"`,
              `snippd view "debounce.ts"`,
              `snippd edit "debounce.ts"`,
            ]}
            outputs={{
              0: ["1 match · debounce.ts"],
              1: ["Opening debounce.ts in VS Code..."],
              2: ["Saved debounce.ts"],
            }}
          />
        </div>
      </section>

      <section
        id="in-your-editor"
        className="relative border-t border-border px-6 py-20"
      >
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              The snippet opens where you already write.
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Search stays in the shell. The code opens in the editor you configured, then the save comes back to your library.
            </p>
            <ol className="mt-8 space-y-5">
              {EDITOR_BEATS.map((beat, index) => (
                <li key={beat.title} className="flex gap-4">
                  <span className="font-mono text-xs text-muted-foreground pt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-foreground">{beat.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{beat.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Gist / notes</p>
                <p className="mt-1 text-sm text-foreground">Copy, switch windows, paste.</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 dark:bg-muted/20">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Snippd</p>
                <p className="mt-1 text-sm text-foreground">One command. Your editor.</p>
              </div>
            </div>
          </div>
          <Terminal
            enableSound={false}
            typingSpeed={20}
            username="dev"
            commands={[
              `snippd search "debounce"`,
              `snippd view "debounce.ts"`,
            ]}
            outputs={{
              0: ["1 match · debounce.ts"],
              1: ["Opening debounce.ts in VS Code..."],
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
            Pick a situation. The same motion every time: search, then open it in your editor.
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,16rem)_1fr] md:items-start">
            <ul className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
              {USE_CASES.map((item, index) => {
                const selected = index === useCaseIndex;
                return (
                  <li key={item.title} className="shrink-0 md:shrink">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setUseCaseIndex(index)}
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                        selected
                          ? "border-border bg-background font-medium text-foreground"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{active.body}</p>
              <Terminal
                key={active.title}
                enableSound={false}
                typingSpeed={20}
                username="dev"
                commands={active.commands}
                outputs={active.outputs}

              />
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="relative border-t border-border px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            See it in action
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Search, open in your editor, edit, save.
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

      <section className="relative border-t border-border px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              How it stays yours
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">Local library.</span>{" "}
                The library lives under <span className="font-mono text-xs">~/.snippd</span>.
              </li>
              <li>
                <span className="font-medium text-foreground">No account.</span>{" "}
                Nothing to sign into, and nothing leaves the machine.
              </li>
              <li>
                <span className="font-medium text-foreground">Move it.</span>{" "}
                <span className="font-mono text-xs">snippd export</span> and{" "}
                <span className="font-mono text-xs">snippd import</span> carry the library to another machine.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Also in the CLI
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {CLI_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex rounded-md border border-border px-3 py-1.5 font-mono text-sm text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
    </div>
  );
}
