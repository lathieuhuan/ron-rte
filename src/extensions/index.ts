import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { StarterKit } from "@tiptap/starter-kit";
import { EXTENSION_NAME } from "./extensions.config";
import { ParagraphIndentExt } from "./paragraph-indent";

export { EXTENSION_NAME } from "./extensions.config";

export type ExtensionOptions = {
  [key: string]: any;
};

export const buildExtensions = (options?: ExtensionOptions) => {
  return [
    StarterKit,
    TextStyleKit.configure({
      fontSize: {
        types: ["heading", "paragraph"],
      },
      color: {
        types: [EXTENSION_NAME.TextStyle],
      },
      fontFamily: {
        types: [EXTENSION_NAME.TextStyle],
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    ParagraphIndentExt,
  ];
};
