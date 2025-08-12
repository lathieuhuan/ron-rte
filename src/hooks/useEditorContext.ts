import { useContext } from "react";
import { EditorContext } from "../contexts";

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within a EditorContextProvider");
  }
  const { editor, ...rest } = context;
  if (!editor) {
    throw new Error("Editor is not initialized");
  }

  const focusEditor = () => {
    document.getElementById(context.id)?.focus();
  };

  return { editor, focusEditor, ...rest };
};
