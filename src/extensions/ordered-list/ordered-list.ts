import { Extension } from "@tiptap/core";

import { createOrderedListExt } from "./utils/create-ordered-list-ext";

export const OrderedListExt = Extension.create({
  name: "orderedList",

  addExtensions() {
    return [
      createOrderedListExt({
        name: "lowerAlphaList",
        toggleFnName: "toggleLowerAlphaList",
        listType: "lower-alpha",
      }),
      createOrderedListExt({
        name: "decimalList",
        toggleFnName: "toggleDecimalList",
        listType: "decimal",
      }),
      createOrderedListExt({
        name: "decimalLeadingZeroList",
        toggleFnName: "toggleDecimalLeadingZeroList",
        listType: "decimal-leading-zero",
      }),
      createOrderedListExt({
        name: "lowerRomanList",
        toggleFnName: "toggleLowerRomanList",
        listType: "lower-roman",
      }),
      createOrderedListExt({
        name: "upperAlphaList",
        toggleFnName: "toggleUpperAlphaList",
        listType: "upper-alpha",
      }),
      createOrderedListExt({
        name: "upperRomanList",
        toggleFnName: "toggleUpperRomanList",
        listType: "upper-roman",
      }),
    ];
  },
});
