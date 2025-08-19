import { TableKit, type TableKitOptions } from "@tiptap/extension-table";

export const TableExtension = TableKit.extend<TableKitOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      table: {
        resizable: true,
        lastColumnResizable: true,
        allowTableNodeSelection: false,
        handleWidth: 3,
        cellMinWidth: 64,
        HTMLAttributes: {
          style: "border-collapse: collapse; margin: 0; overflow: hidden; table-layout: fixed;",
        },
      },
      tableHeader: {
        HTMLAttributes: {
          style:
            "background-color: rgba(61, 37, 20, 0.05); font-weight: bold; text-align: left; padding: 6px 8px; border: 1px solid rgba(61, 37, 20, 0.12); box-sizing: border-box; min-width: 1em; position: relative; vertical-align: top;",
        },
      },
      tableRow: {
        HTMLAttributes: {
          style: "display: table-row; vertical-align: middle;",
        },
      },
      tableCell: {
        HTMLAttributes: {
          style:
            "border: 1px solid rgba(61, 37, 20, 0.12); box-sizing: border-box; min-width: 1em; padding: 6px 8px; position: relative; vertical-align: top;",
        },
      },
    };
  },
});
