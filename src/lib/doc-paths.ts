import { DOC_COMMANDS, DOC_GUIDES } from "../data/docs.ts";

/** Every documentation detail page, derived from the docs data. */
const DOC_PATHS = [
  ...DOC_GUIDES.map((guide) => `/docs/${guide.id}`),
  ...DOC_COMMANDS.map((command) => `/docs/${command.id}`),
];

/** All prerenderable, indexable routes. */
export const ALL_PATHS = ["/", "/docs", ...DOC_PATHS];
