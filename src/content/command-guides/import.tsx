import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd import "C:\\path\\to\\snippd-backup.db"',
    terminalOutput: [
      "Merging backup...",
      "Imported 12 snippets, 8 tags, and 2 containers",
      "Reindex embeddings now? [y/N] - y",
      "Successfully reindexed embeddings for 12 snippets.",
    ],
  },
];

export default function ImportGuide() {
  return (
    <CommandGuideContent
      intro="The import command merges a Snippd backup file into your local database. New snippets are inserted, and for existing snippets, the version with the newer updated_at timestamp wins."
      commandFlows={commandFlows}
      examples={[
        { description: "Import a backup file", code: 'snippd import "C:\\path\\to\\snippd-backup.db"' },
      ]}
      notes={[
        "Import merges data - it doesn't overwrite your entire database.",
        "For duplicate titles, the snippet with the newer updated_at timestamp is kept.",
        "Tags, container links, and containers are also merged from the backup.",
        "After import, you'll be prompted to reindex embeddings if any snippets were added or updated.",
        "Embeddings from the backup are not imported - always reindex after importing.",
        "Use this to restore from backup or merge libraries from multiple machines.",
      ]}
    />
  );
}
