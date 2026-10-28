import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd exts",
    terminalOutput: ["ts  12 snippets", "py   8 snippets", "rs   5 snippets"],
  },
  {
    code: "snippd exts -e py",
    terminalOutput: ["http_server.py  ·  python,server", "file_utils.py  ·  python,utility"],
  },
];

export default function ExtensionsGuide() {
  return (
    <CommandGuideContent
      intro="The exts command displays snippets grouped by file extension. This helps you browse your library by programming language or file type."
      commandFlows={commandFlows}
      examples={[
        { description: "List all extensions with snippet counts", code: "snippd exts" },
        { description: "Filter by one or more specific extensions", code: "snippd exts -e ts js" },
        { description: "Filter by a single extension", code: "snippd exts -e py" },
      ]}
      notes={[
        "Extensions are shown with snippet counts to help you identify which languages you use most.",
        "Filtering by multiple extensions shows snippets matching any of the specified extensions.",
        "Extension filtering is case-insensitive (TS, ts, Ts all match).",
        "Use this to quickly find all snippets in a specific language like TypeScript or Python.",
        "Results are interactive - select a snippet to view, copy, or edit it.",
      ]}
    />
  );
}
