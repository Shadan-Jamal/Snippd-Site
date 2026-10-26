import { useEffect, useRef } from "react";
import { useSearchParams } from "wouter";
import { DOC_COMMANDS } from "@/data/docs";
import { cn } from "@/lib/utils";

export function DocsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cmdParam = searchParams.get("cmd");
  const activeId =
    DOC_COMMANDS.find((c) => c.id === cmdParam)?.id ?? DOC_COMMANDS[0]?.id ?? "";
  const didScroll = useRef(false);

  useEffect(() => {
    if (!cmdParam || didScroll.current) return;
    const el = document.getElementById(`cmd-${cmdParam}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      didScroll.current = true;
    }
  }, [cmdParam]);

  function selectCommand(id: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("cmd", id);
        return next;
      },
      { replace: true },
    );
    document.getElementById(`cmd-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl gap-10 px-6 pb-24 pt-28">
      <aside className="sticky top-28 hidden h-[calc(100vh-8rem)] w-44 shrink-0 overflow-y-auto md:block lg:w-52">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Commands
        </p>
        <nav className="flex flex-col gap-0.5" aria-label="Command docs">
          {DOC_COMMANDS.map((command) => (
            <button
              key={command.id}
              type="button"
              onClick={() => selectCommand(command.id)}
              className={cn(
                "rounded-md px-2.5 py-1.5 text-left font-mono text-sm transition-colors",
                activeId === command.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {command.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Docs</h1>
          <p className="text-muted-foreground">
            Command reference. Pick a command in the sidebar — the URL updates with{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">?cmd=</code>.
          </p>

          {/* Mobile command picker */}
          <label className="mt-4 block md:hidden">
            <span className="sr-only">Command</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm"
              value={activeId}
              onChange={(e) => selectCommand(e.target.value)}
            >
              {DOC_COMMANDS.map((command) => (
                <option key={command.id} value={command.id}>
                  {command.title}
                </option>
              ))}
            </select>
          </label>
        </header>

        <div className="space-y-14">
          {DOC_COMMANDS.map((command) => (
            <section
              key={command.id}
              id={`cmd-${command.id}`}
              className="scroll-mt-28 border-b border-border pb-12 last:border-b-0"
            >
              <h2 className="font-mono text-xl font-semibold text-foreground">
                {command.title}
              </h2>
              <p className="mt-2 text-muted-foreground">{command.summary}</p>
              <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-muted/40 px-4 py-3 font-mono text-sm text-foreground">
                {command.usage}
              </pre>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
