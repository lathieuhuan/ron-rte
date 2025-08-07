import { useMemo, type ReactNode } from "react";
import { EditorContext, type EditorContextState } from "../../contexts";

type EditorContextProviderProps = EditorContextState & {
  children: ReactNode;
};

export const EditorContextProvider = ({
  id,
  editor,
  children,
  editable,
}: EditorContextProviderProps) => {
  const editorState = useMemo(() => {
    return {
      id,
      editor,
      editable,
    };
  }, [id, editor, editable]);

  return <EditorContext.Provider value={editorState}>{children}</EditorContext.Provider>;
};
