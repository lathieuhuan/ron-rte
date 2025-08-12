import { AlignJustify, AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import type { ComponentType } from "react";

export type TextAlignType = "left" | "center" | "right" | "justify";

export type TextAlignOption = {
  label: string;
  value: TextAlignType;
  Icon: ComponentType<{ className?: string }>;
};

export const TEXT_ALIGN_OPTIONS: TextAlignOption[] = [
  { label: "Align Left", value: "left", Icon: AlignLeft },
  { label: "Align Center", value: "center", Icon: AlignCenter },
  { label: "Align Right", value: "right", Icon: AlignRight },
  { label: "Justify", value: "justify", Icon: AlignJustify },
];
