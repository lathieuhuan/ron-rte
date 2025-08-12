import { List } from "lucide-react";
import type { ComponentType } from "react";

import type {
  BulletListExtensionName,
  BulletListToggleFnName,
} from "@/extensions/bullet-list/types";

export type BulletListOption = {
  label: string;
  value: BulletListExtensionName;
  toggleFnName: BulletListToggleFnName;
  Icon: ComponentType<{ className?: string }>;
};

export const BULLET_LIST_OPTIONS: BulletListOption[] = [
  {
    label: "Disc",
    value: "discList",
    toggleFnName: "toggleDiscList",
    Icon: List,
  },
  {
    label: "Circle",
    value: "circleList",
    toggleFnName: "toggleCircleList",
    Icon: List,
  },
  {
    label: "Square",
    value: "squareList",
    toggleFnName: "toggleSquareList",
    Icon: List,
  },
];
