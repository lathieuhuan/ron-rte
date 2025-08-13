import type { ComponentType } from "react";

import type {
  OrderedListExtensionName,
  OrderedListToggleFnName,
} from "@/extensions/ordered-list/types";
import { 
  DecimalList,
  DecimalLeadingZeroList,
  LowerAlphaList,
  LowerRomanList,
  UpperAlphaList,
  UpperRomanList,
} from "@/icons";

export type OrderedListOption = {
  label: string;
  value: OrderedListExtensionName;
  toggleFnName: OrderedListToggleFnName;
  Icon: ComponentType<{ className?: string }>;
};

export const ORDERED_LIST_OPTIONS: OrderedListOption[] = [
  {
    label: "Decimal",
    value: "decimalList",
    toggleFnName: "toggleDecimalList",
    Icon: DecimalList,
  },
  {
    label: "Decimal Leading Zero",
    value: "decimalLeadingZeroList",
    toggleFnName: "toggleDecimalLeadingZeroList",
    Icon: DecimalLeadingZeroList,
  },
  {
    label: "Lower Alpha",
    value: "lowerAlphaList",
    toggleFnName: "toggleLowerAlphaList",
    Icon: LowerAlphaList,
  },
  {
    label: "Lower Roman",
    value: "lowerRomanList",
    toggleFnName: "toggleLowerRomanList",
    Icon: LowerRomanList,
  },
  {
    label: "Upper Alpha",
    value: "upperAlphaList",
    toggleFnName: "toggleUpperAlphaList",
    Icon: UpperAlphaList,
  },
  {
    label: "Upper Roman",
    value: "upperRomanList",
    toggleFnName: "toggleUpperRomanList",
    Icon: UpperRomanList,
  },
];
