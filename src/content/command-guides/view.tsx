import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd view "route.go"',
    terminalOutput: [
      "func HandleRoute(w http.ResponseWriter, r *http.Request) {",
      '  fmt.Fprintln(w, "ok")',
      "}",
    ],
  },
  {
    code: "snippd view",
    terminalOutput: ["Select a snippet to view:", "1. route.go", "2. parse-data.ts"],
  },
];

export default function ViewGuide() {
  return (
    <CommandGuideContent
      intro="The view command opens a snippet in your configured editor in read-only mode. This is useful for reviewing code without the risk of accidental edits."
      commandFlows={commandFlows}
      examples={[
        { description: "View a snippet by title", code: 'snippd view "route.go"' },
        { description: "Omit title to pick a snippet interactively", code: "snippd view" },
      ]}
      notes={[
        "The editor opens in view mode - closing it without changes returns to the terminal.",
        "This is different from edit, which opens the editor for modifications.",
        "Use view when you want to read code without accidentally modifying it.",
        "If your editor doesn't support read-only mode, it may open normally - be careful not to save changes.",
        "Interactive mode shows all snippets as a list for easy selection.",
      ]}
    />
  );
}
