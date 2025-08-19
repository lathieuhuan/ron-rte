import { useState } from "react";
import { Table } from "lucide-react";

import { cn } from "@/utils/common";
import { ToolButton } from "../ui/ToolButton";
import { EXTENSION_NAME } from "@/extensions";
import { useEditorContext } from "@/hooks/useEditorContext";

const MAX_ROWS = 10;
const MAX_COLS = 10;

export function TableInsertButton() {
  const { editor, editable } = useEditorContext();

  const handleCreateTable = (size: TableSize) => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: size.rows, cols: size.cols, withHeaderRow: false })
      .run();
  };

  return (
    <ToolButton
      tooltip="Table"
      aria-label="Table"
      withArrow={false}
      menu={({ closeMenu }) => (
        <TableGrid
          onCreateTable={(size) => {
            handleCreateTable(size);
            closeMenu();
          }}
        />
      )}
      disabled={!editable || editor.isActive(EXTENSION_NAME.Table)}
    >
      <Table />
    </ToolButton>
  );
}

type TableSize = {
  rows: number;
  cols: number;
};

type TTableGridProps = {
  onCreateTable: (size: TableSize) => void;
};
function TableGrid({ onCreateTable }: TTableGridProps) {
  const [selectedSize, setSelectedSize] = useState<TableSize>({
    rows: 0,
    cols: 0,
  });

  const handleMouseOverCell = (row: number, col: number) => {
    setSelectedSize({ rows: row, cols: col });
  };

  const handleMouseDownCell = () => {
    onCreateTable({
      rows: selectedSize.rows + 1,
      cols: selectedSize.cols + 1,
    });
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap justify-between gap-px">
        {Array.from({ length: MAX_ROWS }, (_, row) => (
          <div key={`r${row}`} className="flex gap-px">
            {Array.from({ length: MAX_COLS }, (_, col) => (
              <div
                key={`c${col}`}
                className={cn("h-4 w-4 cursor-pointer border", {
                  "bg-primary": col <= selectedSize.cols && row <= selectedSize.rows,
                })}
                onMouseOver={() => handleMouseOverCell(row, col)}
                onMouseDown={handleMouseDownCell}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 text-center text-sm text-muted-foreground font-semibold">
        {selectedSize.rows + 1} x {selectedSize.cols + 1}
      </div>
    </div>
  );
}
