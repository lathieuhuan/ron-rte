import { CaseSensitive } from "lucide-react";

import { EXTENSION_NAME } from "@/extensions";
import { useEditorContext } from "@/hooks/useEditorContext";
import { FONT_FAMILY_OPTIONS } from "./config";

import { MenuOption } from "../ui/MenuOption";
import { ToolButton } from "../ui/ToolButton";

type FontFamilyMenuProps = {
  closeMenu: () => void;
};
function FontFamilyMenu({ closeMenu }: FontFamilyMenuProps) {
  const { editor } = useEditorContext();

  const handleSelectFont = (value: string) => {
    editor.chain().focus().setFontFamily(value).run();
    closeMenu();
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

type FontFamilySelectProps = {
  disabled?: boolean;
};
export const FontFamilySelect = ({ disabled }: FontFamilySelectProps) => {
  return (
    <ToolButton
      tooltip="Font Family"
      disabled={disabled}
      menu={({ closeMenu }) => <FontFamilyMenu closeMenu={closeMenu} />}
    >
      <CaseSensitive className="size-5" />
    </ToolButton>
  );
};
