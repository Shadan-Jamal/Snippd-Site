import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd edit "retry.ts"',
    terminalOutput: ["Opening retry.ts in your configured editor..."],
  },
  {
    code: 'snippd edit "retry.ts" --add-tags network,backoff',
    terminalOutput: ['Updated tags for "retry.ts": api, network, backoff'],
  },
];

export default function EditGuide() {
  return (
    <CommandGuideContent
      intro="The edit command modifies existing snippets. You can open it in your editor to change the code, or use flags to update metadata like title, extension, and tags without opening the editor."
      commandFlows={commandFlows}
      examples={[
        { description: "Open a snippet in your configured editor to edit the code", code: 'snippd edit "retry.ts"' },
        { description: "Omit title to pick a snippet interactively", code: "snippd edit" },
        { description: "Change the snippet title", code: 'snippd edit "retry.ts" --title "retry-request.ts"' },
        { description: "Change the file extension", code: 'snippd edit "parse-data.ts" --ext js' },
        { description: "Replace all tags with new ones", code: 'snippd edit "retry.ts" --tags api,network,backoff' },
        { description: "Add tags to existing tags", code: 'snippd edit "retry.ts" --add-tags network,backoff' },
        { description: "Remove specific tags", code: 'snippd edit "retry.ts" --remove-tags backoff' },
        { description: "Rebuild embeddings for this snippet only", code: 'snippd edit "retry.ts" --reindex' },
      ]}
      notes={[
        "When using flags, you must provide the title. Omit title only for interactive picker mode.",
        "The --tags flag replaces all existing tags; use --add-tags to preserve existing ones.",
        "Tags can be comma-separated in a single argument (e.g., react,hooks) or space-separated.",
        "Changing the title requires it to be unique - you cannot duplicate an existing snippet title.",
        "The --reindex flag only updates embeddings for the specified snippet, not the entire library.",
        "If you don't use any flags, the editor opens for code editing. Save and close to apply changes.",
        "Extension changes affect syntax highlighting and filtering but don't validate the code.",
      ]}
    />
  );
}
