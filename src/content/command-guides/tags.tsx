import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd tags",
    terminalOutput: ["react  6 snippets", "hooks  4 snippets", "utility  3 snippets"],
  },
  {
    code: 'snippd tags view "rust"',
    terminalOutput: ["pool.rs  ·  rust, concurrency", "parse.rs  ·  rust, parser"],
  },
];

export default function TagsGuide() {
  return (
    <CommandGuideContent
      intro="The tags command manages tags across your snippet library. Tags are labels you attach to snippets for organization and filtering. You can list, view, rename, and delete tags."
      commandFlows={commandFlows}
      examples={[
        { description: "List all tags with snippet counts", code: "snippd tags" },
        { description: "Show all tags with snippet counts (explicit subcommand)", code: "snippd tags show" },
        { description: "View all snippets with a specific tag", code: 'snippd tags view "rust"' },
        { description: "Rename a tag (updates all snippets using it)", code: 'snippd tags rename "node" "nodejs"' },
        { description: "Delete a tag (removes it from all snippets)", code: 'snippd tags delete "old-tag"' },
      ]}
      notes={[
        "Tags are case-sensitive - React and react are different tags.",
        "Renaming a tag updates all snippets that use it, maintaining organization.",
        "Deleting a tag removes it from all snippets but doesn't delete the snippets themselves.",
        "If a tag is used by multiple snippets, delete will warn you with the count.",
        "The view subcommand shows snippets with the tag and lets you interact with them.",
        "Use comma-separated tags when saving (e.g., -t react,hooks) to apply multiple tags at once.",
      ]}
    />
  );
}
