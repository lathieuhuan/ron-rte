import { Editor, useEditorState } from "@tiptap/react";
import { Bold, Italic, Redo2, Undo2 } from "lucide-react";
import { Fragment, type Key, type ReactNode } from "react";

import { EXTENSION_NAME } from "@/extensions";
import { ToolButton, type ToolButtonProps } from "../ui/ToolButton";

type TTool = (ToolButtonProps | { customElement: ReactNode }) & {
  key: Key;
};

type TToolGroup = {
  name: string;
  items: TTool[];
};

type TToolbarProps = {
  editor: Editor;
  disabled?: boolean;
};

export const Toolbar = ({ editor, disabled }: TToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const e = ctx.editor;
      const eCan = e.can();

      return {
        canUndo: eCan.chain().undo().run() ?? false,
        canRedo: eCan.chain().redo().run() ?? false,
        isBold: e.isActive("bold") ?? false,
        canBold: eCan.chain().toggleBold().run() ?? false,
        isItalic: e.isActive("italic") ?? false,
        canItalic: eCan.chain().toggleItalic().run() ?? false,
        isStrike: e.isActive("strike") ?? false,
        canStrike: eCan.chain().toggleStrike().run() ?? false,
        // isCode: e.isActive("code") ?? false,
        // canCode: eCan.chain().toggleCode().run() ?? false,
        canClearMarks: eCan.chain().unsetAllMarks().run() ?? false,
        isParagraph: e.isActive("paragraph") ?? false,
        isHeading1: e.isActive("heading", { level: 1 }) ?? false,
        isHeading2: e.isActive("heading", { level: 2 }) ?? false,
        isHeading3: e.isActive("heading", { level: 3 }) ?? false,
        isHeading4: e.isActive("heading", { level: 4 }) ?? false,
        isHeading5: e.isActive("heading", { level: 5 }) ?? false,
        isHeading6: e.isActive("heading", { level: 6 }) ?? false,
        isBulletList: e.isActive("bulletList") ?? false,
        isOrderedList: e.isActive("orderedList") ?? false,
        // isCodeBlock: e.isActive("codeBlock") ?? false,
        isBlockquote: e.isActive("blockquote") ?? false,
      };
    },
  });

  const TOOL_GROUPS: TToolGroup[] = [
    {
      name: "history",
      items: [
        {
          key: "undo",
          tooltip: "Undo",
          children: <Undo2 className="size-5" />,
          disabled: !editorState.canUndo,
          onClick: () => editor.chain().focus().undo().run(),
        },
        {
          key: "redo",
          tooltip: "Redo",
          children: <Redo2 className="size-5" />,
          disabled: !editorState.canRedo,
          onClick: () => editor.chain().focus().redo().run(),
        },
      ],
    },
    {
      name: "text-decoration",
      items: [
        {
          key: EXTENSION_NAME.Bold,
          tooltip: "Bold",
          children: <Bold className="size-5" />,
          active: editorState.isBold,
          disabled: !editorState.canBold,
          onClick: () => editor.chain().focus().toggleBold().run(),
        },
        {
          key: EXTENSION_NAME.Italic,
          tooltip: "Italic",
          children: <Italic className="size-5" />,
          active: editorState.isItalic,
          disabled: !editorState.canItalic,
          onClick: () => editor.chain().focus().toggleItalic().run(),
        },
      ],
    },
  ];

  return (
    <div
      className="flex flex-wrap gap-1 p-1"
      role="toolbar"
      aria-label="Text editor formatting toolbar"
    >
      {TOOL_GROUPS.map((group, groupIndex) => {
        return (
          <div key={group.name} className="flex gap-1">
            <div hidden={!groupIndex} className="inline-block h-7.5 w-0.25 bg-gray-200" />
            {group.items.map((item) => {
              return "customElement" in item ? (
                <Fragment key={item.key}>{item.customElement}</Fragment>
              ) : (
                <ToolButton
                  {...item}
                  key={item.key}
                  disabled={disabled || item.disabled}
                  aria-label={item.tooltip}
                  role="button"
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
