import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd save "parse-data.ts" -t node,csv',
    terminalOutput: ["Opening configured editor...", "parse-data.ts saved with tags: node, csv"],
  },
  {
    code: 'snippd save "pool.rs" -t rust,concurrency',
    terminalOutput: ["Opening configured editor...", "pool.rs saved with tags: rust, concurrency"],
  },
  {
    code: 'snippd save --file "./src/utils/example/example_1.ts" "./src/utils/example/example_2.py" -t "file, examples"',
    terminalOutput: ["Saved 2 snippets."],
  },
];

export default function SaveGuide() {
  return (
    <CommandGuideContent
      intro="The save command is the primary way to add new snippets to your library. It opens your configured editor, lets you write or paste code, and stores it with metadata like title, extension, and tags."
      commandFlows={commandFlows}
      examples={[
        {
          description: "Save a snippet.",
          code: 'snippd save "parse-data.ts"',
        },
        {
          description: "Save a snippet with a title, extension (optional, txt by default) and tags (optional).",
          code: 'snippd save "parse-data.ts" -t node,csv',
        },
        {
          description: "Add the extension in the title itself and it'll be auto-detected.",
          code: 'snippd save "pool.rs" -t rust,concurrency',
        },
        {
          description: "Use file paths using '--file' flag (extension is automatically detected from the filename).",
          code: 'snippd save --file "./src/utils/example/example_1.ts" "./src/utils/example/example_2.py"',
        },
      ]}
      notes={[
        "If extension is specified in the title, then that will take precedence over the -e flag.",
        "The title must be unique. If a snippet with the same title exists, you'll be prompted to overwrite or cancel.",
        "Tags are optional but highly recommended for organization. They make filtering and searching much easier.",
        "Your configured editor (set via snippd config) will open. Save and close the file to complete the save operation.",
      ]}
    />
  );
}
