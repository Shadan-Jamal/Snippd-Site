/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export type DocCommand = {
  id: string;
  title: string;
  summary: string;
  usage: string;
  sub_commands?: {
    name: string;
    description: string;
    flags?: string;
  }[];
};

/** A prose paragraph — plain text or a fenced code block. */
export type DocBlock =
  | { kind: "text"; body: string }
  | { kind: "code"; lang: string; body: string }
  | { kind: "heading"; body: string }
  | { kind: "list"; items: string[] };

export type DocGuide = {
  id: string;
  title: string;
  subtitle?: string;
  blocks: DocBlock[];
};

/* ------------------------------------------------------------------ */
/*  Guide sections                                                    */
/* ------------------------------------------------------------------ */

export const DOC_GUIDES: DocGuide[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        kind: "text",
        body: "Snippd is a local-only CLI snippet manager built for developers who live in the terminal. It lets you save, organize, search, and reuse code snippets without ever leaving your shell.",
      },
      {
        kind: "heading",
        body: "Why Snippd?",
      },
      {
        kind: "text",
        body: "Every developer has a graveyard of one-off scripts, Stack Overflow answers saved in random files, and commands they keep re-Googling. Snippd gives all of that a permanent, searchable home that stays on your machine.",
      },
      {
        kind: "list",
        items: [
          "Fully offline — your snippets never leave your computer.",
          "Fast — instant saves and sub-second search, no network round-trips.",
          "Organized — tag, group into containers, and filter by file extension.",
          "Searchable — full-text search by title, content, tags, or extension.",
          "AI-powered — optional semantic search finds snippets by meaning, not just keywords.",
          "Portable — export your entire library as a single file and import it anywhere.",
        ],
      },
      {
        kind: "heading",
        body: "How it works",
      },
      {
        kind: "text",
        body: "Snippd stores everything locally in a lightweight database inside your home directory. When you save a snippet, it captures the code along with metadata like a title, file extension, tags, and an optional container. You can retrieve snippets by searching, browsing, or using AI-powered semantic search.",
      },
      {
        kind: "text",
        body: "There are two ways to interact with your library: the CLI for quick terminal workflows, and a built-in web dashboard for visual browsing and management. Both read from the same local store, so they are always in sync.",
      },
      {
        kind: "heading",
        body: "Key concepts",
      },
      {
        kind: "list",
        items: [
          "Snippet — a titled piece of code with an extension (e.g. .ts, .py, .sh).",
          "Tag — a label you attach to snippets for filtering (e.g. react, util, docker).",
          "Container — a named group, like a folder, to organize related snippets together.",
          "Extension — the file type of the snippet, used for syntax highlighting and filtering.",
        ],
      },
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    subtitle: "From install to your first workflow.",
    blocks: [
      {
        kind: "heading",
        body: "Installation",
      },
      {
        kind: "text",
        body: "Install Snippd globally so it is available from any terminal session.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "npm install -g snippd",
      },
      {
        kind: "text",
        body: "Run the doctor command to verify everything is set up correctly.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd doctor",
      },
      {
        kind: "heading",
        body: "Scenario: building a React project",
      },
      {
        kind: "text",
        body: "Let's walk through a real workflow. You are building a React app and just wrote a reusable debounce hook that you want to keep for future projects.",
      },
      {
        kind: "heading",
        body: "1. Save a snippet",
      },
      {
        kind: "text",
        body: "Pipe the file directly into Snippd, or run the save command and paste the code into the editor that opens.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd save \"useDebounce.ts\" -t react,hooks",
      },
      {
        kind: "text",
        body: "Your configured editor opens. Paste or write the hook code, save, and close — the snippet is stored.",
      },
      {
        kind: "heading",
        body: "2. Browse your library",
      },
      {
        kind: "text",
        body: "List all saved snippets, or filter by tag.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd list\nsnippd recent",
      },
      {
        kind: "heading",
        body: "3. Find it later",
      },
      {
        kind: "text",
        body: "Weeks later you need that hook again. Search by keyword or use AI search to find it by describing what it does.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd search \"debounce\"\n\n# or, with semantic search\nsnippd ai \"hook that delays rapid state updates\"",
      },
      {
        kind: "heading",
        body: "4. Reuse it",
      },
      {
        kind: "text",
        body: "Copy the snippet straight to your clipboard and paste it into your new project.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd copy \"useDebounce\"",
      },
      {
        kind: "heading",
        body: "5. Edit when things change",
      },
      {
        kind: "text",
        body: "Need to tweak the hook? Open it in your editor, make changes, and it is updated in place.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd edit \"useDebounce\"",
      },
      {
        kind: "heading",
        body: "6. Open the web dashboard",
      },
      {
        kind: "text",
        body: "Prefer a visual interface? Launch the built-in web UI to browse, search, and manage snippets in your browser.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd ui",
      },
      {
        kind: "heading",
        body: "7. Configure your setup",
      },
      {
        kind: "text",
        body: "Set your preferred editor and configure AI search through the interactive config command.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd config",
      },
      {
        kind: "heading",
        body: "Next steps",
      },
      {
        kind: "text",
        body: "That covers the essentials. Explore the command reference below to see everything Snippd can do — from managing tags and containers to exporting your entire library.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Command reference                                                 */
/* ------------------------------------------------------------------ */

/** Command reference shell — expand body copy in later phases. */
export const DOC_COMMANDS: DocCommand[] = [
  {
    id: "save",
    title: "save",
    summary: "Create a snippet with a title, extension, and optional tags.",
    usage: "snippd save \"<title>\" [-e,--ext <ext>] [-t,--tags <tags...>]",
  },
  {
    id: "search",
    title: "search",
    summary: "Full-text search across titles, code, and extensions.",
    usage: "snippd search \"<query>\" [--title] [--content] [--ext] [--tags] [--container]",
  },
  {
    id: "ai",
    title: "ai",
    summary: "Semantic search over embeddings (requires Ollama).",
    usage: "snippd ai \"<query>\" [-l, --limit <number>]",
    sub_commands: [
      {
        name: "reindex",
        description: "Rebuild the embedding index for all snippets",
        flags: "",
      },
      {
        name: "choose",
        description: "Interactively choose an embedding model from installed Ollama models",
        flags: "",
      },
    ],
  },
  {
    id: "list",
    title: "list",
    summary: "Browse snippets with optional filters.",
    usage: "snippd list [-e, --ext <ext>] [-t, --tags <tags...>] [-s, --search <query>]",
  },
  {
    id: "recent",
    title: "recent",
    summary: "Show snippets ordered by last edit time, with optional text search.",
    usage: "snippd recent [-l, --limit [number]] [-s, --search <query>]",
  },
  {
    id: "view",
    title: "view",
    summary: "Print a snippet to the terminal.",
    usage: "snippd view \"[title]\"",
  },
  {
    id: "edit",
    title: "edit",
    summary: "Edit a snippet's content.",
    usage: "snippd edit \"[title]\" [--title <new-title>] [--ext <new-ext>] [--tags <new-tags...>] [--add-tags <tags...>] [--remove-tags <tags...>] [--reindex]",
  },
  {
    id: "copy",
    title: "copy",
    summary: "Copy snippet code to the clipboard.",
    usage: "snippd copy \"[title]\"",
  },
  {
    id: "delete",
    title: "delete",
    summary: "Remove one or more snippets.",
    usage: "snippd delete \"[title]\"",
  },
  {
    id: "tags",
    title: "tags",
    summary: "List, rename, or delete tags.",
    usage: "snippd tags",
    sub_commands: [
      {
        name: "show",
        description: "List all tags with snippet counts",
        flags: "",
      },
      {
        name: "view",
        description: "Show snippets with a specific tag",
        flags: "<tag>",
      },
      {
        name: "delete",
        description: "Delete a tag",
        flags: "<tag>",
      },
      {
        name: "rename",
        description: "Rename a tag",
        flags: "<old-name> <new-name>",
      },
    ],
  },
  {
    id: "containers",
    title: "containers",
    summary: "Group snippets into named containers.",
    usage: "snippd containers",
    sub_commands: [
      {
        name: "show",
        description: "Show all containers",
        flags: "[-s, --search <query>]",
      },
      {
        name: "create",
        description: "Create a new container",
        flags: "<name> [-d, --description <description>]",
      },
      {
        name: "add",
        description: "Add a snippet to a container",
        flags: "<container-name> <snippet-title>",
      },
      {
        name: "del",
        description: "Delete a container",
        flags: "<container-name>",
      },
      {
        name: "remove",
        description: "Remove a snippet from a container",
        flags: "<container-name> <snippet-title>",
      },
      {
        name: "update",
        description: "Update a container's description",
        flags: "<name> [-d, --description <description>]",
      },
      {
        name: "rename",
        description: "Rename a container",
        flags: "<old-name> <new-name>",
      },
    ],
  },
  {
    id: "exts",
    title: "exts",
    summary: "Browse snippets by file extension.",
    usage: "snippd exts [-e, --ext <ext>]",
  },
  {
    id: "config",
    title: "config",
    summary: "Configure editor and Ollama settings.",
    usage: "snippd config",
    sub_commands: [
      {
        name: "show",
        description: "Show current configuration",
        flags: "",
      },
      {
        name: "init",
        description: "Create config.json with default template",
        flags: "",
      },
      {
        name: "set",
        description: "Set a config value (key and value)",
        flags: "<key> <value>",
      },
      {
        name: "reset",
        description: "Clear all configuration values",
        flags: "",
      },
      {
        name: "editor",
        description: "Manage saved editor paths interactively",
        flags: "",
      },
      {
        name: "setup",
        description: "Show editor and Ollama setup instructions",
        flags: "",
      },
    ],
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
    usage: "snippd export \"[path]\"",
  },
  {
    id: "import",
    title: "import",
    summary: "Merge a backup into your local library.",
    usage: "snippd import \"<file_path>\"",
  },
];
