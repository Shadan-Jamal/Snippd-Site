import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd ui",
    terminalOutput: ["Server is running on http://127.0.0.1:8000. ctrl+click to open in browser."],
  },
];

export default function UiGuide() {
  return (
    <CommandGuideContent
      intro="The ui command starts the Snippd web server, providing a visual interface for browsing, searching, and managing your snippets. The UI runs locally and works offline."
      commandFlows={commandFlows}
      examples={[
        { description: "Start the web UI server", code: "snippd ui" },
      ]}
      notes={[
        "All data stays local - nothing is sent to external servers.",
        "The UI provides features like pagination, bulk operations, and visual filtering.",
        "Both CLI and UI read from the same database, so they're always in sync.",
        "The UI is more convenient for browsing large libraries and performing bulk operations.",
      ]}
    />
  );
}
