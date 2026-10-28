import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd config show",
    terminalOutput: ["SNIPPD_GUI: vscode", "OLLAMA_MODEL: nomic-embed-text"],
  },
  {
    code: 'snippd config set OLLAMA_MODEL nomic-embed-text',
    terminalOutput: ["Configuration updated: OLLAMA_MODEL"],
  },
];

export default function ConfigGuide() {
  return (
    <CommandGuideContent
      intro="The config command manages Snippd configuration stored in ~/.snippd/config.json. It handles editor settings (GUI vs TUI modes), Ollama configuration for AI search, and editor path aliases."
      commandFlows={commandFlows}
      examples={[
        {
          description: "Show current configuration including editor and Ollama settings",
          code: "snippd config show",
        },
        { description: "Initialize config.json with a default template", code: "snippd config init" },
        {
          description: "Set a config value (editor path, Ollama URL, or model)",
          code: 'snippd config set SNIPPD_GUI "C:\\path\\Code.exe"',
        },
        {
          description: "Set Ollama API URL (only if not using default localhost:11434)",
          code: 'snippd config set OLLAMA_API_URL "<url>"',
        },
        { description: "Set the embedding model for semantic search", code: "snippd config set OLLAMA_MODEL nomic-embed-text" },
        { description: "Reset all config values to empty defaults", code: "snippd config reset" },
        { description: "Manage saved editor paths interactively", code: "snippd config editor" },
        { description: "Show setup instructions for editor and Ollama", code: "snippd config setup" },
      ]}
      notes={[
        "Config is stored in ~/.snippd/config.json - never leaves your machine.",
        "SNIPPD_GUI is for GUI/interactive editors, SNIPPD_TUI for terminal/TUI editors.",
        "The first editor path you set determines the active mode; change later with CURRENT_EDITOR.",
        "Use snippd ai choose to select from installed Ollama models instead of manually setting OLLAMA_MODEL.",
        "The editor subcommand lets you save aliases (like vscode, nvim) for quick switching.",
        "After changing OLLAMA_MODEL, run snippd ai reindex to regenerate embeddings.",
        "Reset clears all values - use with caution as it removes all your custom configurations.",
      ]}
    />
  );
}
