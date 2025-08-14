import { ListItem } from "@tiptap/extension-list/item";
import { TextAlign, type TextAlignOptions } from "@tiptap/extension-text-align";
import { TextStyle, type TextStyleKitOptions } from "@tiptap/extension-text-style";
import type { StarterKitOptions } from "@tiptap/starter-kit";

export const EXTENSION_NAME = Object.freeze({
  Italic: "italic",
  Bold: "bold",
  Underline: "underline",
  Strike: "strike",
  TextStyle: TextStyle.name,
  TextAlign: TextAlign.name,
  ListItem: ListItem.name,
  Blockquote: "blockquote",
});

export const STARTER_KIT_CONFIG = {
  bulletList: false,
  orderedList: false,
  blockquote: {
    HTMLAttributes: {
      style: "padding-left: 24px; border-left: 3px solid #e0e0e0;",
    },
  },
  link: {
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    HTMLAttributes: {
      style: "color: #2563eb;",
    },
  },
} satisfies Partial<StarterKitOptions>;

export const TEXT_STYLE_KIT_CONFIG = {
  fontSize: {
    types: ["heading", "paragraph"],
  },
  color: {
    types: [EXTENSION_NAME.TextStyle, "listItem"],
  },
  fontFamily: {
    types: [EXTENSION_NAME.TextStyle],
  },
} satisfies Partial<TextStyleKitOptions>;

export const TEXT_ALIGN_CONFIG = {
  types: ["heading", "paragraph"],
} satisfies Partial<TextAlignOptions>;
