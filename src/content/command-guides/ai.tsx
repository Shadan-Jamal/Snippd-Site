import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd ai "Find code that calls several APIs at the same time"',
    terminalOutput: [
      "2 matches",
      "1. parallel.go · match 25%",
      "2. parallel.js · match 23%",
    ],
  },
  {
    code: "snippd ai reindex",
    terminalOutput: ["Reindexing snippets...", "Embeddings updated successfully"],
  },
  {
    code: "snippd ai choose",
    terminalOutput: ["Fetching models...", "1. nomic-embed-text (dim: 768)", "2. qwen3-embedding:0.6b (dim: 1024)"],
  },
];

export default function AiGuide() {
  return (
    <CommandGuideContent
      intro="The ai command provides semantic search over your snippets using local Ollama embeddings. Unlike keyword search, it finds snippets by meaning and intent. It also includes subcommands for managing the embedding index and choosing models."
      commandFlows={commandFlows}
      examples={[
        {
          description: "Semantic search - describe what you're looking for in natural language",
          code: 'snippd ai "hook that delays rapid state updates"',
        },
        { description: "Limit results to top k matches", code: 'snippd ai "async function wrapper" -l 5' },
        { description: "Rebuild the embedding index after model changes or new snippets", code: "snippd ai reindex" },
        { description: "Interactively choose an embedding model from installed Ollama models", code: "snippd ai choose" },
      ]}
      notes={[
        "Requires Ollama to be installed and running locally.",
        "You must configure an embedding model via snippd config set OLLAMA_MODEL or snippd ai choose.",
        "Run snippd ai reindex after changing models or adding new snippets to update embeddings.",
        "Semantic search understands meaning, not just keywords - useful when you don't remember exact terms.",
        "Embeddings are generated only from the code content, not titles or tags, to avoid false matches.",
      ]}
    />
  );
}
