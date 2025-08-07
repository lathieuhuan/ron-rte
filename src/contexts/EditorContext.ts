import { Editor } from "@tiptap/react";
import { createContext } from "react";

export type EditorContextState = {
  id: string;
  editor: Editor | null;
  editable: boolean;
};

export const EditorContext = createContext<EditorContextState>({
  id: "",
  editor: null,
  editable: false,
});
