import { Editor, useEditorState } from "@tiptap/react";
import {
  Bold,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";
import { Fragment, type Key, type ReactNode } from "react";

import { EXTENSION_NAME } from "@/extensions";
import { cn } from "@/utils/common";

import { BulletListSelect } from "../BulletListSelect";
import { ColorSelect } from "../ColorSelect";
import { FontFamilySelect } from "../FontFamilySelect";
import { FontSizeSelect } from "../FontSizeSelect";
import { OrderedListSelect } from "../OrderedListSelect";
import { TextAlignSelect } from "../TextAlignSelect";
import { ToolButton, type ToolButtonProps } from "../ui/ToolButton";

type TTool = (ToolButtonProps | { customElement: ReactNode }) & {
  key: Key;
};

type TToolGroup = {
  name: string;
  items: TTool[];
};

type TToolbarProps = {
  className?: string;
  editor: Editor;
  disabled?: boolean;
};

export const Toolbar = ({ editor, disabled, className }: TToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const e = ctx.editor;
      const eCan = e.can();

      return {
        canUndo: eCan.chain().undo().run() ?? false,
        canRedo: eCan.chain().redo().run() ?? false,
        isBold: e.isActive(EXTENSION_NAME.Bold) ?? false,
        canBold: eCan.chain().toggleBold().run() ?? false,
        isItalic: e.isActive(EXTENSION_NAME.Italic) ?? false,
        canItalic: eCan.chain().toggleItalic().run() ?? false,
        isUnderline: e.isActive(EXTENSION_NAME.Underline) ?? false,
        canUnderline: eCan.chain().toggleUnderline().run() ?? false,
        isStrike: e.isActive(EXTENSION_NAME.Strike) ?? false,
        canStrike: eCan.chain().toggleStrike().run() ?? false,
        // isCode: e.isActive("code") ?? false,
        // canCode: eCan.toggleCode().run() ?? false,
        canClearMarks: eCan.chain().unsetAllMarks().run() ?? false,
        isBulletList: e.isActive("bulletList") ?? false,
        isOrderedList: e.isActive("orderedList") ?? false,
        // isCodeBlock: e.isActive("codeBlock") ?? false,
        isBlockquote: e.isActive(EXTENSION_NAME.Blockquote) ?? false,
        canToggleBlockquote: eCan.chain().toggleBlockquote().run() ?? false,
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
        {
          key: EXTENSION_NAME.Underline,
          tooltip: "Underline",
          children: <Underline className="size-5" />,
          active: editorState.isUnderline,
          disabled: !editorState.canUnderline,
          onClick: () => editor.chain().focus().toggleUnderline().run(),
        },
        {
          key: EXTENSION_NAME.Strike,
          tooltip: "Strike",
          children: <Strikethrough className="size-5" />,
          active: editorState.isStrike,
          disabled: !editorState.canStrike,
          onClick: () => editor.chain().focus().toggleStrike().run(),
        },
      ],
    },
    {
      name: "text-style",
      items: [
        {
          key: "font-family",
          customElement: <FontFamilySelect disabled={disabled} />,
        },
        {
          key: "font-size",
          customElement: <FontSizeSelect disabled={disabled} />,
        },
        {
          key: "color",
          customElement: <ColorSelect />,
        },
      ],
    },
    {
      name: "text-align-indent",
      items: [
        {
          key: "text-align",
          customElement: <TextAlignSelect />,
        },
        {
          key: "decrease-indent",
          tooltip: "Decrease Indent",
          children: <IndentDecrease className="size-5" />,
          onClick: () => editor.chain().focus().decreaseIndent().run(),
        },
        {
          key: "increase-indent",
          tooltip: "Increase Indent",
          children: <IndentIncrease className="size-5" />,
          onClick: () => editor.chain().focus().increaseIndent().run(),
        },
      ],
    },
    {
      name: "block",
      items: [
        {
          key: "bullet-list",
          customElement: <BulletListSelect />,
        },
        {
          key: "ordered-list",
          customElement: <OrderedListSelect />,
        },
        {
          key: EXTENSION_NAME.Blockquote,
          tooltip: "Block quote",
          children: <Quote className="size-5" />,
          active: editorState.isBlockquote,
          disabled: !editorState.canToggleBlockquote,
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
        },
      ],
    },
  ];

  return (
    <div
      className={cn("flex flex-wrap gap-1 p-1 bg-background", className)}
      role="toolbar"
      aria-label="Text EditorToolbar"
    >
      {TOOL_GROUPS.map((group, groupIndex) => {
        return (
          <div key={group.name} className="flex gap-1">
            <div hidden={!groupIndex} className="inline-block h-7.5 w-0.25 bg-border" />
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
