import { BreakCenterAlign, BreakLeftAlign, BreakRightAlign } from "@/icons";
import type { ComponentType } from "react";
import type { ImageAlign } from "../../types";

export type TextAlignOptions = {
  value: ImageAlign;
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

export const ALIGN_OPTIONS: TextAlignOptions[] = [
  {
    value: "left",
    label: "Left aligned image",
    Icon: BreakLeftAlign,
  },
  {
    value: "center",
    label: "Centered image",
    Icon: BreakCenterAlign,
  },
  {
    value: "right",
    label: "Right aligned image",
    Icon: BreakRightAlign,
  },
];
