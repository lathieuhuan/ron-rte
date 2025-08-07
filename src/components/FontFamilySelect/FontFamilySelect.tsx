import { CaseSensitive } from "lucide-react";

import { useEditorContext } from "@/hooks/useEditorContext";
import { EXTENSION_NAME } from "../../extensions";
import { FONT_FAMILY_OPTIONS } from "./FontFamilySelect.config";

import { MenuOption } from "../ui/MenuOption";
import { ToolButton } from "../ui/ToolButton";

type FontFamilyMenuProps = {
  closeMenu: () => void;
};
function FontFamilyMenu({ closeMenu }: FontFamilyMenuProps) {
  const { id, editor } = useEditorContext();

  const handleSelectFont = (value: string) => {
    editor?.commands.setFontFamily(value);
    closeMenu();
    // re-focus the editor
    document.getElementById(id)?.focus();
  };

  return (
    <ul className="flex flex-col gap-0.5">
      {FONT_FAMILY_OPTIONS.map(({ label, value }) => {
        const isSelected = editor.isActive(EXTENSION_NAME.TextStyle, {
          fontFamily: value,
        });

        return (
          <MenuOption
            key={value}
            selected={isSelected}
            style={{ fontFamily: value }}
            onClick={() => handleSelectFont(value)}
          >
            {label}
          </MenuOption>
        );
      })}
    </ul>
  );
}

type TFontFamilySelectProps = {
  disabled?: boolean;
};
export const FontFamilySelect = ({ disabled }: TFontFamilySelectProps) => {
  return (
    <ToolButton.Menu
      tooltip="Font Family"
      disabled={disabled}
      menu={({ closeMenu }) => <FontFamilyMenu closeMenu={closeMenu} />}
    >
      <CaseSensitive className="size-5" />
    </ToolButton.Menu>
  );
};
