import { OverridableComponent } from "@mui/types";
import { SvgIconTypeMap } from "@mui/material";

export type TDrawerItem = {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: TDrawerItem[];
}