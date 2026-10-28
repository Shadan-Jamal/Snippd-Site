import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: "snippd doctor",
    terminalOutput: [
      "Snippd Doctor",
      "  Config file:     /home/dev/.snippd/config.json (found)",
      "  Effective editor: 'C:\\Path\\to\\editor.exe' --wait (SNIPPD_GUI; GUI/interactive)",
      "",
      "AI / embeddings",
      "  OLLAMA_API_URL:  (default http://localhost:11434)",
      "  OLLAMA_MODEL:    nomic-embed-text",
      "  Ollama:          reachable",
      "  Embed model:     available",
      "  Index model:     nomic-embed-text (dim 768)",
      "  Indexed:         18/18 snippets",
      "",
      "  ✅ Ready.",
    ],
  },
];

export default function DoctorGuide() {
  return (
    <CommandGuideContent
      intro="The doctor command reports your config file and validates editor paths, checks Ollama connectivity and the configured embedding model, and summarizes embedding-index coverage."
      commandFlows={commandFlows}
      examples={[
        { description: "Run a full health check", code: "snippd doctor" },
      ]}
      notes={[
        "The effective editor report includes the selected config key and whether it is a GUI/interactive editor, terminal/TUI editor, or platform fallback.",
        "For AI features, doctor reports the Ollama URL and model setting, checks whether Ollama is reachable, and checks model availability when Ollama is running and a model is configured.",
        "The embedding-index report includes the index model, vector dimensions, and indexed-versus-total snippet count.",
        "If the configured Ollama model differs from the index model, doctor recommends running snippd ai reindex.",
        "The final status is Ready, Some checks need attention, or Configuration needs attention, depending on warnings, errors, Ollama availability, and index coverage.",
        "Use this command to troubleshoot issues with editor or AI search not working.",
        "Run doctor after setting up Ollama or changing your editor configuration.",
      ]}
    />
  );
}
