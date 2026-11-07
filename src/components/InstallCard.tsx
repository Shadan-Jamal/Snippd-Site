import { useState } from "react";
import { INSTALL_OPTIONS } from "@/data/install";
import { cn } from "@/lib/utils";

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function InstallCard({ className }: { className?: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const selected = INSTALL_OPTIONS[selectedIndex];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(selected.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access can fail in insecure contexts.
    }
  }

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-border bg-background/80 p-3 shadow-sm backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Install
        </p>
        <div
          className="inline-flex rounded-md border border-border bg-muted/40 p-0.5"
          role="group"
          aria-label="Choose package manager"
        >
          {INSTALL_OPTIONS.map((option, index) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={selectedIndex === index}
              onClick={() => {
                setSelectedIndex(index);
                setCopied(false);
              }}
              className={cn(
                "cursor-pointer rounded px-2 py-1 text-xs font-medium transition-colors",
                selectedIndex === index
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
        <span aria-hidden className="font-mono text-sm text-muted-foreground">
          $
        </span>
        <code className="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
          {selected.command}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "shrink-0 cursor-pointer rounded-md p-1 transition-colors",
            copied
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-muted-foreground hover:bg-background hover:text-foreground",
          )}
          title={copied ? "Copied!" : "Copy command"}
          aria-label={copied ? "Copied" : "Copy install command"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
    </div>
  );
}
