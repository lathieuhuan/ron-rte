import { TextStyleKit } from "@tiptap/extension-text-style";
import { StarterKit } from "@tiptap/starter-kit";
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
    }),
  ];
};
