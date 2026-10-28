import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd recent -l 5",
    terminalOutput: [
      "parse-data.ts  ·  Last edited 2026-10-28 15:42",
      "pool.rs  ·  Last edited 2026-10-28 14:18",
      "route.go  ·  Last edited 2026-10-27 19:05",
      "cache-key.ts  ·  Last edited 2026-10-27 16:31",
      "parse-json.rs  ·  Last edited 2026-10-26 11:09",
    ],
  },
  {
    code: 'snippd recent --limit 2 --search "java"',
    terminalOutput: [
      "Maps.java  ·  Last edited 2026-10-28 14:18",
      "Classes.java  ·  Last edited 2026-10-26 11:09",
    ],
  },
];

export default function RecentGuide() {
  return (
    <CommandGuideContent
      intro="The recent command lists snippets by their last edit time, newest first. Search matches title, tags, code content, and file extension; it does not search embeddings."
      commandFlows={commandFlows}
      examples={[
        { description: "Show the 10 most recent snippets (default)", code: "snippd recent" },
        { description: "Limit to a specific number of results", code: "snippd recent --limit 5" },
        { description: "Filter by text in a title, tag, code content, or extension", code: 'snippd recent --search "rust"' },
        { description: "Combine limit and search", code: 'snippd recent --limit 5 --search "rust"' },
      ]}
      notes={[
        "Each result shows its last-edited timestamp and results are ordered by that timestamp, newest first.",
        "Search checks title, code content, extension, and tags. It does not use semantic embeddings.",
        "The limit flag accepts a number - defaults to 10 if not specified.",
        "This is useful for quickly finding snippets you were just working on.",
        "Results are interactive - you can select a snippet to view, copy, or edit it.",
      ]}
    />
  );
}
