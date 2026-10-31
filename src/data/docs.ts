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
  | { kind: "list"; items: string[] }
  | { kind: "install"; options: { label: string; command: string }[] }
  | { kind: "note"; body: string };

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
    subtitle: "Set up your editor, save and find snippets, then explore containers, AI search, and the web UI.",
    blocks: [
      {
        kind: "heading",
        body: "Installation",
      },
      {
        kind: "text",
        body: "Install Snippd with your preferred package manager, then follow these steps from a terminal:",
      },
      {
        kind: "note",
        body: "The Yarn command uses Yarn Classic (v1); Yarn 2 and newer do not support global installs.",
      },
      {
        kind: "install",
        options: [
          { label: "npm", command: "npm install -g snippd" },
          { label: "Yarn", command: "yarn global add snippd" },
          { label: "pnpm", command: "pnpm add --global snippd" },
        ],
      },
      {
        kind: "heading",
        body: "1. Initialize your configuration",
      },
      {
        kind: "text",
        body: "Create Snippd's local configuration file before setting up an editor or AI search. The file is stored in your Snippd data directory and can also be edited with a text editor.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd config init",
      },
      {
        kind: "note",
        body: "This creates the config file with empty defaults. If it already exists, init leaves it unchanged.",
      },
      {
        kind: "heading",
        body: "2. Configure your editor",
      },
      {
        kind: "text",
        body: "Snippd opens a temporary file in your editor when you save a snippet, then reads its contents after you close it. Configure a GUI editor, a terminal/TUI editor, or both.",
      },
      {
        kind: "note",
        body: "On Windows, use the full executable path instead of .cmd or .bat shims for GUI IDEs like VS Code, this is usually the editor's .exe file — and quote paths that contain spaces. Make sure the '--wait' flag is added so Snippd waits to save until you've closed the temp file."
      },
      {
        kind: "code",
        lang: "bash",
        body: 'snippd config set SNIPPD_GUI "C:\\Path\\To\\Executable\\Code.exe\ --wait"',
      },
      {
        kind: "code",
        lang: "bash",
        body: 'snippd config set SNIPPD_TUI "nvim --wait"',
      },
      {
        kind: "note",
        body: "For TUI editors, just adding the shorthand shim is fine.",
      },
      {
        kind: "text",
        body: "Set the active editor mode when you have configured both, or whenever you want to switch between them:",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd config set CURRENT_EDITOR SNIPPD_GUI",
      },
      {
        kind: "list",
        items: [
          "SNIPPD_GUI — command or full executable path for a GUI/interactive editor, such as VS Code or Cursor.",
          "SNIPPD_TUI — command for a terminal editor, such as nvim, vim, or nano.",
          "CURRENT_EDITOR — selects SNIPPD_GUI or SNIPPD_TUI as the active editor mode. Setting your first editor path selects that mode automatically.",
          "EDITORS — optional saved editor aliases managed through snippd config editor.",
          "OLLAMA_API_URL and OLLAMA_MODEL — optional AI-search settings; configure these in step 7.",
        ],
      },
      {
        kind: "text",
        body: "You can also configure editor paths interactively with snippd config editor, or inspect the current settings with snippd config show.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd config editor\nsnippd config show",
      },
      {
        kind: "heading",
        body: "3. Check your configuration",
      },
      {
        kind: "text",
        body: "Run doctor after configuring your editor. It reports the config file, effective editor, Ollama status, embedding model, and index coverage, and tells you if anything needs attention.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd doctor",
      },
      {
        kind: "heading",
        body: "4. Save your first snippet",
      },
      {
        kind: "text",
        body: "Give the snippet a short, descriptive title. The extension can be included in the title or supplied with -e. Add optional tags to make it easier to find later. Snippd opens your configured editor; enter or paste the code, then save and close the editor to store it.",
      },
      {
        kind: "code",
        lang: "bash",
        body: 'snippd save "parse-data.ts" -t node,csv',
      },
      {
        kind: "note",
        body: "Titles are unique. If you include an extension in the title, Snippd detects it automatically. Tags are optional, but useful for filtering and search.",
      },
      {
        kind: "heading",
        body: "5. Search your snippets",
      },
      {
        kind: "text",
        body: "Use keyword search to find matching titles or code content. Snippd presents matching snippets so you can select one to view, copy, or edit. Search by a phrase that appears in the code or title.",
      },
      {
        kind: "code",
        lang: "bash",
        body: 'snippd search "csv parser"',
      },
      {
        kind: "heading",
        body: "6. Organize snippets with containers",
      },
      {
        kind: "text",
        body: "Containers group related snippets without duplicating them. Create one for a project or topic, then add snippets by their title. Use show to browse your containers.",
      },
      {
        kind: "code",
        lang: "bash",
        body: 'snippd container create "data-tools" -d "CSV and data utilities"\nsnippd container add "data-tools" "parse-data"\nsnippd container show',
      },
      {
        kind: "note",
        body: "When adding a snippet, use its title as saved in Snippd; the extension is not required.",
      },
      {
        kind: "heading",
        body: "7. Set up semantic search with AI (optional)",
      },
      {
        kind: "text",
        body: "Snippd's ai command finds snippets by describing what the code does, rather than matching only exact keywords. It uses Ollama and an embedding model running locally. Install Ollama, start it, and download an embedding model before configuring AI search.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "ollama pull <model-name>",
      },
      {
        kind: "note",
        body: "OLLAMA_API_URL is the Ollama server URL; it defaults to http://localhost:11434, so leave it unset for a standard local setup. OLLAMA_MODEL is the installed embedding model name. Set it, then create or refresh the embedding index.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd config set OLLAMA_MODEL <model-name>\nsnippd ai reindex",
      },
      {
        kind: "code",
        lang: "bash",
        body: 'snippd ai "code that parses CSV rows"',
      },
      {
        kind: "note",
        body: "AI search requires Ollama to be installed and running locally, plus an embedding-capable model. Reindex after changing models or when you want to refresh embeddings.",
      },
      {
        kind: "heading",
        body: "8. Open the web UI",
      },
      {
        kind: "text",
        body: "Start Snippd's local web dashboard to browse, search, and manage snippets in a browser. The UI and CLI use the same local database, so changes are shared between them.",
      },
      {
        kind: "code",
        lang: "bash",
        body: "snippd ui",
      },
      {
        kind: "note",
        body: "Keep the command running while using the web UI. Stop it with Ctrl+C when you are finished.",
      },
      {
        kind: "text",
        body: "You are ready to build a searchable local snippet library. Explore the command reference for editing, tags, backups, and other workflows.",
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
    summary: "Create a snippet in your editor, or save one snippet per file. With --file, the title is the filename and the extension is taken from it. Relative paths are resolved from the current directory.",
    usage: "snippd save \"[title]\" [-e,--ext <ext>] [-t,--tags <tags...>] [-f,--file <paths...>]",
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
    id: "container",
    title: "container",
    summary: "Group snippets into named containers.",
    usage: "snippd container",
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
