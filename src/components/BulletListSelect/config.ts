import type { ComponentType } from "react";

import type {
  BulletListExtensionName,
  BulletListToggleFnName,
} from "@/extensions/bullet-list/types";
import { CircleList, DiscList, SquareList } from "@/icons";

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
    Icon: DiscList,
  },
  {
    label: "Circle",
    value: "circleList",
    toggleFnName: "toggleCircleList",
    Icon: CircleList,
  },
  {
    label: "Square",
    value: "squareList",
    toggleFnName: "toggleSquareList",
    Icon: SquareList,
  },
];
