import {
  Editor,
  EditorContent,
  useEditor,
  type EditorEvents,
  type UseEditorOptions,
} from "@tiptap/react";
import { useEffect, useRef } from "react";

import { buildExtensions, type ExtensionOptions } from "./extensions";
import { cn } from "./utils/common";
import { getHTML } from "./utils/getHTML";
import { prepareInputHTML } from "./utils/prepareInputHTML";

import { EditorStateProvider } from "./components/EditorStateProvider";
import { Toolbar } from "./components/Toolbar";

import "./index.css";

export type TTextEditorProps = {
  className?: string;
  editorContentClass?: string;
  value?: string;
  isEditable?: boolean;
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
  isEditable = true,
  showToolbar = true,
  editorOptions,
  extensionOptions,
  onChange,
}: TTextEditorProps) => {
  const isFirstRender = useRef(true);

  const handleUpdate = ({ editor }: EditorEvents["update"]) => {
    const htmlContent = getHTML(editor);
    onChange?.(htmlContent, editor);
  };

  const editor = useEditor({
    extensions: buildExtensions(extensionOptions),
    content: prepareInputHTML(value),
    editable: isEditable,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-52 outline-none pt-2 pb-4 px-2 border-t border-gray-300 overflow-auto",
          editorContentClass
        ),
      },
    },
    onUpdate: handleUpdate,
    ...editorOptions,
  });

  useEffect(() => {
    editor?.setEditable(isEditable);
  }, [editor, isEditable]);

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
    <div className={cn("mx-auto bg-white border border-gray-300", className)}>
      <EditorStateProvider editor={editor} disabled={!isEditable}>
        {showToolbar && <Toolbar editor={editor} disabled={!isEditable} />}
        <EditorContent editor={editor} />
        {/* <TableBubbleMenu editor={editor} disabled={!isEditable} /> */}
      </EditorStateProvider>
    </div>
  );
};
