import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { StarterKit } from "@tiptap/starter-kit";

import { BulletListExt } from "./bullet-list";
import { STARTER_KIT_CONFIG, TEXT_ALIGN_CONFIG, TEXT_STYLE_KIT_CONFIG } from "./extensions-config";
import { OrderedListExt } from "./ordered-list";
import { ParagraphIndentExt } from "./paragraph-indent";

export { EXTENSION_NAME } from "./extensions-config";

export type ExtensionOptions = {
  [key: string]: any;
};

export const buildExtensions = (options?: ExtensionOptions) => {
  return [
    StarterKit.configure(STARTER_KIT_CONFIG),
    TextStyleKit.configure(TEXT_STYLE_KIT_CONFIG),
    TextAlign.configure(TEXT_ALIGN_CONFIG),
    ParagraphIndentExt,
    BulletListExt,
    OrderedListExt,
  ];
};
