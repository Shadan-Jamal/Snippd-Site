import { useState } from "react";
import { cn } from "@/lib/utils";
import { Terminal } from "@/components/ui/terminal";

export type CommandGuideExample = {
  description: string;
  code: string;
};

export function CommandGuideContent({
  intro,
  examples,
  commandFlows,
  notes,
}: {
  intro: string;
  examples: CommandGuideExample[];
  commandFlows: { code: string, terminalOutput: string[] }[];
  notes: string[];
}) {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-foreground">Overview</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">{intro}</p>
      </section>

      {commandFlows[0] && (
        <section>
          <h3 className="text-lg font-semibold text-foreground">Terminal flow</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Example output is illustrative and may vary with your local library.
          </p>
          <Terminal
            className="mt-4"
            typingSpeed={10}
            enableSound={false}
            username="dev"
            commands={commandFlows.map((flow) => flow.code)}
            outputs={commandFlows.reduce((acc, flow, index) => {
              acc[index] = flow.terminalOutput;
              return acc;
            }, {} as Record<number, string[]>)}
          />
        </section>
      )}

      {examples.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-foreground">Examples</h3>
          <div className="mt-4 space-y-4">
            {examples.map((example) => (
              <div key={example.code}>
                <p className="text-sm text-muted-foreground">{example.description}</p>
                <CodeBlock code={example.code} />
              </div>
            ))}
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-foreground">Notes</h3>
          <ul className="mt-4 space-y-2 pl-5 text-muted-foreground">
            {notes.map((note) => (
              <li key={note} className="list-disc leading-relaxed">
                {note}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative mt-3">
      <pre className="overflow-x-auto rounded-md border border-border bg-muted/40 px-4 py-3 pr-10 font-mono text-sm text-foreground">
        {code}
      </pre>
      {(code.includes("npm") || code.includes("yarn") || code.includes("pnpm")) && (
        <CopyButton text={code} />
      )}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "absolute right-2 top-2 rounded-md p-1.5 transition-colors cursor-pointer",
        copied
          ? "bg-muted text-emerald-500 dark:text-emerald-400"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      title={copied ? "Copied!" : "Copy code"}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}
