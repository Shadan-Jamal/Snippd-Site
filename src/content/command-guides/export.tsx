import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd export",
    terminalOutput: [
      "Exporting database...",
      "Backup created: ~/.snippd/backup-2026-10-28.db",
    ],
  },
  {
    code: 'snippd export "C:\\backups\\snippd-backup.db"',
    terminalOutput: ["Backup created: C:\\backups\\snippd-backup.db"],
  },
];

export default function ExportGuide() {
  return (
    <CommandGuideContent
      intro="The export command creates a portable backup of your Snippd database as a .db file. This is useful for migrating to another machine or keeping a backup copy."
      commandFlows={commandFlows}
      examples={[
        { description: "Export to a timestamped backup file (default location)", code: "snippd export" },
        { description: "Export to a specific file path", code: 'snippd export "C:\\backups\\snippd-backup.db"' },
      ]}
      notes={[
        "The default export location is ~/.snippd/snippd-backup-YYYY-MM-DD.db.",
        "The exported file is a complete SQLite database with all snippets, tags, and containers.",
        "Embeddings are not included in the export - you'll need to reindex after importing.",
        "Use this before making bulk changes or when migrating to a new machine.",
        "The file can be imported on any machine with Snippd installed.",
      ]}
    />
  );
}
