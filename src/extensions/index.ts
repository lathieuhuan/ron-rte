import { StarterKit } from "@tiptap/starter-kit";
export { EXTENSION_NAME } from "./extensions.config";

export type ExtensionOptions = {
  [key: string]: any;
};

export const buildExtensions = (options?: ExtensionOptions) => {
  return [StarterKit];
};
