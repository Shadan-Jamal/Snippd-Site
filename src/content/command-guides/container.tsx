import { CommandGuideContent } from "@/components/docs/CommandGuideContent";

const commandFlows = [
  {
    code: 'snippd container create "api-kit" -d "HTTP client utilities"',
    terminalOutput: ['Created container "api-kit"'],
  },
  {
    code: 'snippd container add "api-kit" "retry.ts"',
    terminalOutput: ['Added "retry.ts" to "api-kit"'],
  },
];

export default function ContainerGuide() {
  return (
    <CommandGuideContent
      intro="The container command organizes snippets into named groups, similar to folders. Containers help you bundle related snippets together (e.g., by project, language, or domain) for better organization."
      commandFlows={commandFlows}
      examples={[
        { description: "Show all containers", code: "snippd container show" },
        { description: "Search containers by name or description", code: 'snippd container show -s "react"' },
        {
          description: "Create a new container with optional description",
          code: 'snippd container create "api-kit" -d "HTTP client utilities"',
        },
        { description: "Add a snippet to a container", code: 'snippd container add "api-kit" "retry.ts"' },
        {
          description: "Delete a container (snippets remain, only the container is removed)",
          code: 'snippd container del "api-kit"',
        },
        { description: "Remove a snippet from a container", code: 'snippd container remove "api-kit" "retry.ts"' },
        { description: "Update a container's description", code: 'snippd container update "api-kit" -d "Updated API helpers"' },
        { description: "Rename a container", code: 'snippd container rename "api-kit" "http-tools"' },
      ]}
      notes={[
        "Containers organize snippets but don't duplicate them - snippets can exist in multiple containers.",
        "Deleting a container removes the container itself but keeps all snippets intact.",
        "Use containers to group snippets by project, technology stack, or functional area.",
        "The show command accepts a search query to filter containers by name or description.",
        "Container names must be unique - you cannot have two containers with the same name.",
        "Adding a snippet to a container it's already in has no effect (idempotent operation).",
      ]}
    />
  );
}
