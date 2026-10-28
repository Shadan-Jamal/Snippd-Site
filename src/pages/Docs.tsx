import { DOC_GUIDES, DOC_COMMANDS } from "@/data/docs";

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

type SidebarItem = { id: string; label: string; group: "guide" | "command" };

const SIDEBAR_ITEMS: SidebarItem[] = [
  ...DOC_GUIDES.map((g) => ({
    id: g.id,
    label: g.title,
    group: "guide" as const,
  })),
  ...DOC_COMMANDS.map((c) => ({
    id: c.id,
    label: c.title,
    group: "command" as const,
  })),
];

export function DocsPage() {
  /* Group sidebar items for rendering */
  const guideItems = SIDEBAR_ITEMS.filter((i) => i.group === "guide");
  const commandItems = SIDEBAR_ITEMS.filter((i) => i.group === "command");

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl gap-10 px-6 pb-24 pt-28">
      <aside className="sticky top-28 hidden h-[calc(100vh-8rem)] w-44 shrink-0 overflow-y-auto md:block lg:w-52">
        {/* Guide links */}
        <nav className="flex flex-col gap-0.5" aria-label="Guide sections">
          {guideItems.map((item) => (
            <a
              key={item.id}
              href={`/docs/${item.id}`}
              className="rounded-md px-2.5 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-border" />

        {/* Command links */}
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Commands
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="Command docs">
          {commandItems.map((item) => (
            <a
              key={item.id}
              href={`/docs/${item.id}`}
              className="rounded-md px-2.5 py-1.5 text-left font-mono text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Documentation</h1>
          <p className="text-lg text-muted-foreground">
            Browse guides and command reference for Snippd.
          </p>
        </header>

        <div className="space-y-12">
          {/* Guide sections cards */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Guides</h2>
            <div className="grid grid-cols-2 gap-4">
              {guideItems.map((item) => (
                <a
                  key={item.id}
                  href={`/docs/${item.id}`}
                  className="block rounded-lg border border-border bg-muted/40 p-4 hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                </a>
              ))}
            </div>
          </div>

          {/* Command reference cards */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Commands</h2>
            <div className="grid grid-cols-2 gap-4">
              {commandItems.map((item) => (
                <a
                  key={item.id}
                  href={`/docs/${item.id}`}
                  className="block rounded-lg border border-border bg-muted/40 p-4 hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <h3 className="font-mono text-sm text-foreground">{item.label}</h3>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
