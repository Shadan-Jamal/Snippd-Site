import type { ComponentType } from "react";
import AiGuide from "./ai";
import ConfigGuide from "./config";
import ContainersGuide from "./containers";
import CopyGuide from "./copy";
import DeleteGuide from "./delete";
import DoctorGuide from "./doctor";
import EditGuide from "./edit";
import ExportGuide from "./export";
import ExtensionsGuide from "./exts";
import ImportGuide from "./import";
import ListGuide from "./list";
import RecentGuide from "./recent";
import SaveGuide from "./save";
import SearchGuide from "./search";
import TagsGuide from "./tags";
import UiGuide from "./ui";
import ViewGuide from "./view";

export const COMMAND_GUIDES: Record<string, ComponentType> = {
  ai: AiGuide,
  config: ConfigGuide,
  containers: ContainersGuide,
  copy: CopyGuide,
  delete: DeleteGuide,
  doctor: DoctorGuide,
  edit: EditGuide,
  export: ExportGuide,
  exts: ExtensionsGuide,
  import: ImportGuide,
  list: ListGuide,
  recent: RecentGuide,
  save: SaveGuide,
  search: SearchGuide,
  tags: TagsGuide,
  ui: UiGuide,
  view: ViewGuide,
};
