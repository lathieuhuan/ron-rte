import { useEditorState } from "@tiptap/react";
import { List } from "lucide-react";

import { useEditorContext } from "@/hooks/useEditorContext";
import { BULLET_LIST_OPTIONS, type BulletListOption } from "./config";

import { ToolButton } from "../ui/ToolButton";

type BulletListMenuProps = {
  activeStyle?: BulletListOption["value"];
  onSelect: (option: BulletListOption) => void;
};
function BulletListMenu({ activeStyle, onSelect }: BulletListMenuProps) {
  return (
    <ul className="flex flex-col gap-0.5">
      {BULLET_LIST_OPTIONS.map((option) => {
        const active = option.value === activeStyle;

        return (
          <ToolButton
            key={option.value}
            active={active}
            autoFocus={active}
            tooltip={option.label}
            tooltipSide="left"
            onClick={() => onSelect(option)}
          >
            <option.Icon className="size-5" />
          </ToolButton>
        );
      })}
    </ul>
  );
}

export const BulletListSelect = () => {
  const { editor, editable } = useEditorContext();
  const { activeOption } = useEditorState({
    editor,
    selector: (snapshot) => ({
      activeOption: BULLET_LIST_OPTIONS.find((option) => snapshot.editor.isActive(option.value)),
    }),
  });

  const handleSelectOption = (option: BulletListOption) => {
    editor.chain().focus()[option.toggleFnName]?.().run();
  };

  const handleClick = () => {
    handleSelectOption(activeOption || BULLET_LIST_OPTIONS[0]);
  };

  return (
    <ToolButton
      tooltip="Bullet List"
      disabled={!editable}
      active={!!activeOption}
      separateMenu
      menu={({ closeMenu }) => (
        <BulletListMenu
          activeStyle={activeOption?.value}
          onSelect={(option) => {
            handleSelectOption(option);
            closeMenu();
          }}
        />
      )}
      onClick={handleClick}
    >
      <List className="size-5" />
    </ToolButton>
  );
};
