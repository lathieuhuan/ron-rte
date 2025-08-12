import { ALargeSmall } from "lucide-react";

import { useEditorContext } from "@/hooks/useEditorContext";
import { HEADING_OPTIONS, PARAGRAPH_OPTION, type Level } from "./FontSizeSelect.config";

import { MenuOption } from "../ui/MenuOption";
import { ToolButton } from "../ui/ToolButton";

type FontSizeMenuProps = {
  closeMenu: () => void;
};
function FontSizeMenu({ closeMenu }: FontSizeMenuProps) {
  const { id, editor } = useEditorContext();

  const afterSelect = () => {
    closeMenu();
    // re-focus the editor
    document.getElementById(id)?.focus();
  };

  const handleSelectHeading = (level: Level) => {
    editor.commands.toggleHeading({ level });
    afterSelect();
  };

  const handleSelectParagraph = () => {
    editor.commands.setParagraph();
    afterSelect();
  };

  return (
    <ul className="flex flex-col gap-0.5">
      <MenuOption selected={editor.isActive("paragraph")} onClick={handleSelectParagraph}>
        {PARAGRAPH_OPTION.label}
      </MenuOption>

      {HEADING_OPTIONS.map(({ label, value }) => {
        const headingLevel = parseInt(value.slice(-1), 10) as Level;

        return (
          <MenuOption
            key={value}
            selected={editor.isActive("heading", { level: headingLevel })}
            onClick={() => handleSelectHeading(headingLevel)}
          >
            {label}
          </MenuOption>
        );
      })}
    </ul>
  );
}

type FontSizeSelectProps = {
  disabled?: boolean;
};
export const FontSizeSelect = ({ disabled }: FontSizeSelectProps) => {
  return (
    <ToolButton
      tooltip="Font Size"
      disabled={disabled}
      menu={({ closeMenu }) => <FontSizeMenu closeMenu={closeMenu} />}
    >
      <ALargeSmall className="size-5" />
    </ToolButton>
  );
};
