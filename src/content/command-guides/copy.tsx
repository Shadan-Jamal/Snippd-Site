import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd copy "pool.rs"',
    terminalOutput: ['Copied "pool.rs" to clipboard'],
  },
  {
    code: "snippd copy",
    terminalOutput: ["Select a snippet to copy:", "1. pool.rs", "2. parse-data.ts"],
  },
];

export default function CopyGuide() {
  return (
    <CommandGuideContent
      intro="The copy command copies a snippet's code to your system clipboard. This is the fastest way to reuse a snippet in your current project."
      commandFlows={commandFlows}
      examples={[
        { description: "Copy a snippet by title", code: 'snippd copy "pool.rs"' },
        { description: "Omit title to pick a snippet interactively", code: "snippd copy" },
      ]}
      notes={[
        "Only the code content is copied, not the title, tags, or metadata.",
        "If the title isn't found, an error message is shown.",
        "Interactive mode shows all snippets as a list for easy selection.",
        "The clipboard is the system clipboard - works across applications on your OS.",
        "This is the quickest way to paste a snippet into your editor or terminal.",
      ]}
    />
  );
}
