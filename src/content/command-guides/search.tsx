import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd search "test" --title',
    terminalOutput: [
      "Found 3 matching snippets. Select one to open:",
      "1. docker-test.txt - docker,template",
      "2. server-test.go - http,init",
      "3. tree-test.java - tree,recursion",
    ],
  },
  {
    code: 'snippd search "rs" --ext',
    terminalOutput: [
      "Found 2 matching snippets. Select one to open:",
      "1. enums.rs - rust,enums",
      "2. borrow.rs - rust,borrowing",
    ],
  },
];

export default function SearchGuide() {
  return (
    <CommandGuideContent
      intro="The search command performs full-text search across your snippet library. By default, it searches through titles, code content, tags, and extensions using SQLite's FTS5 engine for fast, indexed lookups. You can narrow the search scope with flags."
      examples={[
        {
          description: "Search for snippets containing a keyword in title, code, tags, or extension",
          code: 'snippd search "test"',
        },
        { description: "Search only in snippet titles", code: 'snippd search "useEffect" --title' },
        { description: "Search only in snippet code content", code: 'snippd search "import express" --content' },
        { description: "Search only in tags", code: 'snippd search "react" --tags' },
        { description: "Search only in file extensions", code: 'snippd search "ts" --ext' },
        { description: "Seach for containers.", code: 'snippd search "new-container" --container' },
      ]}
      commandFlows={commandFlows}
      notes={[
        "Search accepts a single query argument. To search for multiple terms, include them in quotes.",
        "Search is case-insensitive and matches partial words (e.g., deb matches debounce).",
        "Results are ranked by relevance, with the best matches shown first.",
        "By default, search checks all fields: title, code, tags, and extension.",
        "Use flags to narrow the search scope: --title, --content, --ext, --tags, --container.",
        "The --container flag can be combined with snippet filters to search within specific containers.",
        "For semantic search that finds snippets by meaning rather than keywords, use the ai command instead.",
      ]}
    />
  );
}
