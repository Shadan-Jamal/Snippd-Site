import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd list -e ts -t node",
    terminalOutput: [
      "parse-data.ts  ·  node, csv",
      "retry.ts  ·  node, network",
      "read-config.ts  ·  node, config",
      "stream-log.ts  ·  node, logging",
      "cache-key.ts  ·  node, cache",
    ],
  },
  {
    code: 'snippd list --ext "rs" --tags "rust"',
    terminalOutput: [
      "parse.rs  ·  rust, parser",
      "parse-args.rs  ·  rust, cli",
      "parse-date.rs  ·  rust, chrono",
      "parse-json.rs  ·  rust, serde",
      "parse-path.rs  ·  rust, filesystem",
    ],
  },
];

export default function ListGuide() {
  return (
    <CommandGuideContent
      intro="The list command displays all snippets in your library with optional filtering by extension, tags, or search query. For a better visual experience, consider using the web UI instead."
      commandFlows={commandFlows}
      examples={[
        { description: "List all snippets", code: "snippd list" },
        { description: "Filter by one or more extensions", code: "snippd list -e ts js" },
        { description: "Filter by one or more tags", code: "snippd list -t node csv" },
        { description: "Filter by search query in title and content", code: 'snippd list -s "retry"' },
        { description: "Combine filters - extension, tags, and search", code: 'snippd list -e ts -t node -s "retry"' },
      ]}
      notes={[
        "Filters are combined with AND logic - all conditions must match.",
        "Extension and tag filters are case-insensitive.",
        "The UI (snippd ui) provides a better browsing experience with pagination and visual layout.",
        "Search in list checks only title and content fields, not tags or extensions.",
        "Use tags command for tag-focused browsing and exts command for extension-focused browsing.",
        "Results are shown as an interactive list where you can select a snippet to view, copy, or edit.",
      ]}
    />
  );
}
