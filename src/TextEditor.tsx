import {
  Editor,
  EditorContent,
  useEditor,
  type EditorEvents,
  type UseEditorOptions,
} from "@tiptap/react";
import { useEffect, useId, useRef } from "react";

import { buildExtensions, type ExtensionOptions } from "./extensions";
import { cn } from "./utils/common";
import { getHTML } from "./utils/getHTML";
import { prepareInputHTML } from "./utils/prepareInputHTML";

import { EditorContextProvider } from "./components/EditorContextProvider";
import { Toolbar } from "./components/Toolbar";

import "./index.css";

export type TTextEditorProps = {
  className?: string;
  editorContentClass?: string;
  value?: string;
  editable?: boolean;
  showToolbar?: boolean;
  editorOptions?: Omit<
    UseEditorOptions,
    "editorProps" | "onUpdate" | "extensions" | "content" | "editable"
  >;
  extensionOptions?: ExtensionOptions;
  onChange?: (content: string, editor: Editor) => void;
};

export const TextEditor = ({
  value = "",
  className,
  editorContentClass,
  editable = true,
  showToolbar = true,
  editorOptions,
  extensionOptions,
  onChange,
}: TTextEditorProps) => {
  const isFirstRender = useRef(true);
  const id = useId();

  const handleUpdate = ({ editor }: EditorEvents["update"]) => {
    const htmlContent = getHTML(editor);
    onChange?.(htmlContent, editor);
  };

  const editor = useEditor({
    extensions: buildExtensions(extensionOptions),
    content: prepareInputHTML(value),
    editable,
    editorProps: {
      attributes: {
        id,
        class: cn(
          "min-h-52 outline-none pt-2 pb-4 px-2 border-t border-border overflow-auto",
          editorContentClass,
        ),
      },
    },
    onUpdate: handleUpdate,
    ...editorOptions,
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);

  useEffect(() => {
    if (editor && !isFirstRender.current) {
      const currentHTML = editor.getHTML();
      const preparedHTML = prepareInputHTML(value);

      if (preparedHTML !== currentHTML) {
        editor.commands.setContent(preparedHTML);
      }
    }

    isFirstRender.current = false;
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn("mx-auto bg-background border border-border relative overflow-auto", className)}
    >
      <EditorContextProvider id={id} editor={editor} editable={editable}>
        {showToolbar && (
          <Toolbar
            className="sticky top-0 z-10 shadow-border shadow"
            editor={editor}
            disabled={!editable}
          />
        )}
        <EditorContent editor={editor} />
        {/* <TableBubbleMenu editor={editor} disabled={!isEditable} /> */}
      </EditorContextProvider>
    </div>
  );
};
