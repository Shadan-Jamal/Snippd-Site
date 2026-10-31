import { useEffect, useState } from "react";
import { DOC_GUIDES, DOC_COMMANDS, type DocBlock } from "@/data/docs";
import { COMMAND_GUIDES } from "@/content/command-guides";
import { CodeBlock } from "@/components/docs/CommandGuideContent";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Block renderer                                                    */
/* ------------------------------------------------------------------ */

function BlockRenderer({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h3 className="mt-6 text-base font-semibold text-foreground first:mt-0">
          {block.body}
        </h3>
      );
    case "text":
      return (
        <p className="mt-2 leading-relaxed font-light text-foreground/90">
          {block.body}
        </p>
      );
    case "code":
      return <CodeBlock code={block.body} />;
    case "list":
      return (
        <ul className="mt-3 space-y-1.5 pl-5 font-light text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i} className="list-disc leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "install":
      return <InstallCommandSwitcher options={block.options} />;
    case "note":
      return (
        <aside
          role="note"
          className="mt-3 rounded-md border border-amber-300 bg-amber-100 px-4 py-3 text-sm leading-relaxed text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
        >
          {block.body}
        </aside>
      );
  }
}

function InstallCommandSwitcher({
  options,
}: {
  options: { label: string; command: string }[];
}) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="mt-3">
      <div className="inline-flex rounded-md border border-border bg-muted/40 p-1" role="group" aria-label="Choose package manager">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            aria-pressed={selected.label === option.label}
            onClick={() => setSelected(option)}
            className={cn(
              "rounded px-3 py-1.5 text-sm transition-colors cursor-pointer",
              selected.label === option.label
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      <CodeBlock code={selected.command} />
    </div>
  );
}

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

export function DocSectionPage({ id }: { id: string }) {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  function selectItem(itemId: string) {
    window.location.href = `/docs/${itemId}`;
  }

  /* Group sidebar items for rendering */
  const guideItems = SIDEBAR_ITEMS.filter((i) => i.group === "guide");
  const commandItems = SIDEBAR_ITEMS.filter((i) => i.group === "command");

  /* Find the current doc content */
  const guide = DOC_GUIDES.find((g) => g.id === id);
  const command = DOC_COMMANDS.find((c) => c.id === id);
  const CommandGuide = COMMAND_GUIDES[id];

  if (!guide && !command) {
    return (
      <main className="mx-auto max-w-3xl px-6 pt-28">
        <h1 className="text-2xl font-semibold">Section not found</h1>
        <a href="/docs" className="mt-4 inline-block text-sm text-muted-foreground underline">
          Back to docs
        </a>
      </main>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl gap-10 px-6 pb-24 pt-28">
      <aside className="sticky top-28 hidden h-[calc(100vh-8rem)] w-44 shrink-0 overflow-y-auto md:block lg:w-52">
        {/* Guide links */}
        <nav className="flex flex-col gap-0.5" aria-label="Guide sections">
          {guideItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectItem(item.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-left text-sm transition-colors cursor-pointer",
                id === item.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
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
            <button
              key={item.id}
              type="button"
              onClick={() => selectItem(item.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-left font-mono text-sm transition-colors cursor-pointer",
                id === item.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="mb-10 space-y-2">
          {/* Mobile section picker */}
          <label className="mt-4 block md:hidden">
            <span className="sr-only">Section</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm"
              value={id}
              onChange={(e) => selectItem(e.target.value)}
            >
              <optgroup label="Guides">
                {guideItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Commands">
                {commandItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </label>
        </header>

        <div className="space-y-14">
          {guide && (
            <section id={`doc-${guide.id}`} className="scroll-mt-28">
              <h2 className="text-xl font-semibold text-foreground">
                {guide.title}
              </h2>
              {guide.subtitle && (
                <p className="mt-1 text-sm font-light text-muted-foreground">
                  {guide.subtitle}
                </p>
              )}
              <div className="mt-6">
                {guide.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            </section>
          )}

          {command && (
            <section id={`doc-${command.id}`} className="scroll-mt-28">
              <h2 className="font-mono text-xl font-semibold text-foreground">
                {command.title}
              </h2>
              <p className="mt-2 font-light text-muted-foreground">{command.summary}</p>
              <CodeBlock code={command.usage} />

              {command.sub_commands && command.sub_commands.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground">Subcommands</h3>
                  <div className="mt-4 divide-y divide-border rounded-lg border border-border">
                    {command.sub_commands.map((subCommand) => {
                      const args = subCommand.flags ? ` ${subCommand.flags}` : "";
                      return (
                        <div
                          key={subCommand.name}
                          className="grid gap-2 p-4 sm:grid-cols-[minmax(12rem,auto)_1fr] sm:gap-6"
                        >
                          <code className="font-mono text-sm text-foreground">
                            snippd {command.id} {subCommand.name}{args}
                          </code>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {subCommand.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {CommandGuide && <CommandGuide />}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
