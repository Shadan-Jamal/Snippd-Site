import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd delete "old-migrate.sql"',
    terminalOutput: ['Are you sure you want to delete "old-migrate.sql"? [y/N]', "Deleted snippet"],
  },
  {
    code: "snippd delete",
    terminalOutput: ["Select a snippet to delete:", "1. old-migrate.sql", "2. retry.ts"],
  },
];

export default function DeleteGuide() {
  return (
    <CommandGuideContent
      intro="The delete command removes snippets from your library. Use with caution - deletion is permanent and cannot be undone unless you have a backup."
      commandFlows={commandFlows}
      examples={[
        { description: "Delete a snippet by title", code: 'snippd delete "old-migrate.sql"' },
        { description: "Omit title to pick a snippet interactively", code: "snippd delete" },
      ]}
      notes={[
        "Deletion is permanent - consider using snippd export to backup before bulk deletion.",
        "If the title doesn't match exactly, similar snippets are shown to help you find the right one.",
        "Interactive mode requires confirmation before deleting each snippet.",
        "You can delete multiple snippets in a row in interactive mode without re-entering the command.",
        "Deleting a snippet removes it from all containers and removes all its tags.",
        "Use tags and containers to organize snippets to avoid accidental deletion of important code.",
      ]}
    />
  );
}
