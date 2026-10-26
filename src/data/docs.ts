export type DocCommand = {
  id: string;
  title: string;
  summary: string;
  usage: string;
};

/** Command reference shell — expand body copy in later phases. */
export const DOC_COMMANDS: DocCommand[] = [
  {
    id: "save",
    title: "save",
    summary: "Create a snippet with a title, extension, and optional tags.",
    usage: "snippd save <title> [-e ext] [-t tags...]",
  },
  {
    id: "search",
    title: "search",
    summary: "Full-text search across titles, code, and extensions.",
    usage: "snippd search <query>",
  },
  {
    id: "ai",
    title: "ai",
    summary: "Semantic search over embeddings (requires Ollama).",
    usage: "snippd ai <query>",
  },
  {
    id: "list",
    title: "list",
    summary: "Browse snippets with optional filters.",
    usage: "snippd list",
  },
  {
    id: "recent",
    title: "recent",
    summary: "Show recently created or updated snippets.",
    usage: "snippd recent [-l limit] [-s query]",
  },
  {
    id: "view",
    title: "view",
    summary: "Print a snippet to the terminal.",
    usage: "snippd view <title>",
  },
  {
    id: "edit",
    title: "edit",
    summary: "Open a snippet in your configured editor.",
    usage: "snippd edit [title]",
  },
  {
    id: "copy",
    title: "copy",
    summary: "Copy snippet code to the clipboard.",
    usage: "snippd copy <title>",
  },
  {
    id: "delete",
    title: "delete",
    summary: "Remove one or more snippets.",
    usage: "snippd delete <title>",
  },
  {
    id: "tags",
    title: "tags",
    summary: "List, rename, or delete tags.",
    usage: "snippd tags",
  },
  {
    id: "containers",
    title: "containers",
    summary: "Group snippets into named containers.",
    usage: "snippd containers",
  },
  {
    id: "exts",
    title: "exts",
    summary: "Browse snippets by file extension.",
    usage: "snippd exts",
  },
  {
    id: "config",
    title: "config",
    summary: "Configure editor and Ollama settings.",
    usage: "snippd config",
  },
  {
    id: "doctor",
    title: "doctor",
    summary: "Health-check the local install and embedding index.",
    usage: "snippd doctor",
  },
  {
    id: "ui",
    title: "ui",
    summary: "Open the local web UI.",
    usage: "snippd ui",
  },
  {
    id: "export",
    title: "export",
    summary: "Backup the SQLite database to a portable .db file.",
    usage: "snippd export [path]",
  },
  {
    id: "import",
    title: "import",
    summary: "Merge a backup into your local library.",
    usage: "snippd import <file>",
  },
];
