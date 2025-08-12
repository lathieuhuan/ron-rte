import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";

export const EXTENSION_NAME = Object.freeze({
  Italic: "italic",
  Bold: "bold",
  Underline: "underline",
  Strike: "strike",
  TextStyle: TextStyle.name,
  TextAlign: TextAlign.name,
});
