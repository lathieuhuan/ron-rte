declare module "@tiptap/core" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Commands<ReturnType> {
    lowerAlphaList: {
      toggleLowerAlphaList: () => ReturnType;
    };
    decimalList: {
      toggleDecimalList: () => ReturnType;
    };
    decimalLeadingZeroList: {
      toggleDecimalLeadingZeroList: () => ReturnType;
    };
    lowerRomanList: {
      toggleLowerRomanList: () => ReturnType;
    };
    upperAlphaList: {
      toggleUpperAlphaList: () => ReturnType;
    };
    upperRomanList: {
      toggleUpperRomanList: () => ReturnType;
    };
  }
}

export type OrderedListExtensionName =
  | "lowerAlphaList"
  | "decimalList"
  | "decimalLeadingZeroList"
  | "lowerRomanList"
  | "upperAlphaList"
  | "upperRomanList";

export type OrderedListToggleFnName =
  | "toggleLowerAlphaList"
  | "toggleDecimalList"
  | "toggleDecimalLeadingZeroList"
  | "toggleLowerRomanList"
  | "toggleUpperAlphaList"
  | "toggleUpperRomanList";

export type OrderedListStyle =
  | "decimal"
  | "decimal-leading-zero"
  | "lower-alpha"
  | "lower-roman"
  | "upper-alpha"
  | "upper-roman";
