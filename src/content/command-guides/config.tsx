import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd config init",
    terminalOutput: ["Created ~/.snippd/config.json with default values."],
  },
  {
    code: 'snippd config set OLLAMA_MODEL nomic-embed-text',
    terminalOutput: ["Configuration updated: OLLAMA_MODEL"],
  },
  {
    code: 'snippd config set SNIPPD_TUI nvim',
    terminalOutput: ["Configuration updated: SNIPPD_TUI"],
  },
  {
    code: "snippd config show",
    terminalOutput: ["OLLAMA_MODEL: nomic-embed-text", "SNIPPD_TUI: nvim"],
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
          description: "Set the full path to a GUI editor executable and wait for it to close",
          code: "snippd config set SNIPPD_GUI '\"C:\\Program Files\\Microsoft VS Code\\Code.exe\" --wait'",
        },
        {
          description: "Set Ollama API URL (only if not using default localhost:11434)",
          code: 'snippd config set OLLAMA_API_URL "<url>"',
        },
        { description: "Set the embedding model for semantic search", code: "snippd config set OLLAMA_MODEL <model-name>" },
        { description: "Reset all config values to empty defaults", code: "snippd config reset" },
        { description: "Manage saved editor paths interactively", code: "snippd config editor" },
        { description: "Show setup instructions for editor and Ollama", code: "snippd config setup" },
      ]}
      notes={[
        "Config is stored in ~/.snippd/config.json - never leaves your machine.",
        "Use the full path to the editor executable so Snippd can launch the intended program reliably, including when its install folder is not on PATH.",
        "On Windows, point to the editor's actual .exe file. .cmd and .bat shims require a command shell, but Snippd launches the configured editor executable directly and cannot run those shims as editor processes.",
        "Quote executable paths that contain spaces. GUI editors such as VS Code should include --wait so Snippd does not continue before you finish editing the temporary snippet.",
        "The first editor path you set determines the active mode; change later with CURRENT_EDITOR.",
        "Use snippd ai choose to select from installed Ollama models instead of manually setting OLLAMA_MODEL.",
        "After changing OLLAMA_MODEL, run snippd ai reindex to regenerate embeddings.",
      ]}
    />
  );
}
