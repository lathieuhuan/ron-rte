import { useMemo, type ReactNode } from "react";
import { EditorStateContext, type EditorState } from "../../contexts";

type EditorStateProviderProps = EditorState & {
  children: ReactNode;
};

export const EditorStateProvider = ({
  editor,
  children,
  disabled,
}: EditorStateProviderProps) => {
  const editorState = useMemo(() => {
    return {
      editor,
      disabled,
    };
  }, [editor, disabled]);

  return (
    <EditorStateContext.Provider value={editorState}>
      {children}
    </EditorStateContext.Provider>
  );
};
