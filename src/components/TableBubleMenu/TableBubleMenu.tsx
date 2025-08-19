import { FloatingMenu } from "@tiptap/react/menus";

import { EXTENSION_NAME } from "@/extensions/extensions-config";
import { useEditorContext } from "@/hooks/useEditorContext";
import { TableToolbar } from "../TableToolbar";

export const TableBubleMenu = () => {
  const { editor, editable } = useEditorContext();

  return (
    <FloatingMenu
      className="p-2 border border-border shadow-sm bg-background"
      editor={editor}
      options={{
        placement: "bottom",
        offset: () => {
          const { node } = editor.view.domAtPos(editor.state.selection.anchor);
          const cell = node.parentElement?.closest("td");
          const table = node.parentElement?.closest("table");

          if (cell && table) {
            // const docRect = editor.view.dom.getBoundingClientRect();
            const tableRect = table.getBoundingClientRect();
            const refRect = cell.getBoundingClientRect();

            const mainAxis = tableRect.bottom - refRect.bottom + 16;
            // const crossAxis = tableRect.left - docRect.left;

            return {
              mainAxis, // vertical
              //   crossAxis, // horizontal
            };
          }

          return {
            mainAxis: 0,
            crossAxis: 0,
          };
        },
      }}
      shouldShow={({ editor }) => {
        return editable && editor.isActive(EXTENSION_NAME.Table);
      }}
    >
      <TableToolbar editor={editor} />
    </FloatingMenu>
  );
};
