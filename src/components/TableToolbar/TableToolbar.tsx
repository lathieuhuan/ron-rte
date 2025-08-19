import { type Editor, useEditorState } from "@tiptap/react";
import { TableCellsMerge, TableCellsSplit, Trash2 } from "lucide-react";

import {
  AddColumnLeft,
  AddColumnRight,
  AddRowBottom,
  AddRowTop,
  DeleteColumn,
  DeleteRow,
} from "@/icons";
import { cn } from "@/utils/common";
import { ToolButton, type ToolButtonProps } from "../ui/ToolButton";

type TTool = ToolButtonProps & {
  Icon: React.ElementType;
};

type ToolGroup = {
  name: string;
  tools: TTool[];
};

type TTableToolbarProps = {
  className?: string;
  editor: Editor;
  disabled?: boolean;
};

export const TableToolbar = ({ editor, className, disabled }: TTableToolbarProps) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const e = ctx.editor;
      const eCan = e.can();

      return {
        canAddColumnBefore: eCan.chain().addColumnBefore().run() ?? false,
        canAddColumnAfter: eCan.chain().addColumnAfter().run() ?? false,
        canDeleteColumn: eCan.chain().deleteColumn().run() ?? false,
        canAddRowBefore: eCan.chain().addRowBefore().run() ?? false,
        canAddRowAfter: eCan.chain().addRowAfter().run() ?? false,
        canDeleteRow: eCan.chain().deleteRow().run() ?? false,
        canMergeCells: eCan.chain().mergeCells().run() ?? false,
        canSplitCell: eCan.chain().splitCell().run() ?? false,
        canDeleteTable: eCan.chain().deleteTable().run() ?? false,
      };
    },
  });

  const toolGroups: ToolGroup[] = [
    {
      name: "Column",
      tools: [
        {
          tooltip: "Add column left",
          disabled: !editorState.canAddColumnBefore,
          Icon: AddColumnLeft,
          onClick: () => editor.chain().focus().addColumnBefore().run(),
        },
        {
          tooltip: "Add column right",
          disabled: !editorState.canAddColumnAfter,
          Icon: AddColumnRight,
          onClick: () => editor.chain().focus().addColumnAfter().run(),
        },
        {
          tooltip: "Delete column",
          disabled: !editorState.canDeleteColumn,
          Icon: DeleteColumn,
          onClick: () => editor.chain().focus().deleteColumn().run(),
        },
      ],
    },
    {
      name: "Row",
      tools: [
        {
          tooltip: "Add row above",
          disabled: !editorState.canAddRowBefore,
          Icon: AddRowTop,
          onClick: () => editor.chain().focus().addRowBefore().run(),
        },
        {
          tooltip: "Add row below",
          disabled: !editorState.canAddRowAfter,
          Icon: AddRowBottom,
          onClick: () => editor.chain().focus().addRowAfter().run(),
        },
        {
          tooltip: "Delete row",
          disabled: !editorState.canDeleteRow,
          Icon: DeleteRow,
          onClick: () => editor.chain().focus().deleteRow().run(),
        },
      ],
    },
    {
      name: "Cell",
      tools: [
        {
          tooltip: "Merge cells",
          disabled: !editorState.canMergeCells,
          Icon: TableCellsMerge,
          onClick: () => editor.chain().focus().mergeCells().run(),
        },
        {
          tooltip: "Split cell",
          disabled: !editorState.canSplitCell,
          Icon: TableCellsSplit,
          onClick: () => editor.chain().focus().splitCell().run(),
        },
      ],
    },
    {
      name: "Table",
      tools: [
        // {
        //   tooltip: "Toggle header column",
        //   disabled: !editor.can().toggleHeaderColumn(),
        //   Icon: RiLayoutColumnFill,
        //   onClick: () => editor.commands.toggleHeaderColumn(),
        // },
        // {
        //   tooltip: "Toggle header row",
        //   disabled: !editor.can().toggleHeaderRow(),
        //   Icon: RiLayoutRowFill,
        //   onClick: () => editor.commands.toggleHeaderRow(),
        // },
        {
          tooltip: "Delete table",
          disabled: !editorState.canDeleteTable,
          Icon: Trash2,
          onClick: () => editor.chain().focus().deleteTable().run(),
        },
      ],
    },
  ];

  return (
    <div className={cn("flex gap-1.5", className)}>
      {toolGroups.map(({ name, tools }, index) => (
        <div key={name} className="flex gap-1.5">
          <div hidden={!index} className="bg-border h-full w-px" />
          {tools.map(({ Icon, ...restProps }) => (
            <ToolButton
              key={restProps.tooltip}
              {...restProps}
              disabled={disabled || restProps.disabled}
            >
              <Icon className="size-5" />
            </ToolButton>
          ))}
        </div>
      ))}
    </div>
  );
};
