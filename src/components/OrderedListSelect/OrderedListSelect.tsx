import { useEditorState } from "@tiptap/react";
import { ListOrdered } from "lucide-react";

import { useEditorContext } from "@/hooks/useEditorContext";
import { ORDERED_LIST_OPTIONS, type OrderedListOption } from "./config";

import { ToolButton } from "../ui/ToolButton";

type OrderedListMenuProps = {
  activeStyle?: OrderedListOption["value"];
  onSelect: (option: OrderedListOption) => void;
};
function OrderedListMenu({ activeStyle, onSelect }: OrderedListMenuProps) {
  return (
    <ul className="grid grid-cols-3 gap-1">
      {ORDERED_LIST_OPTIONS.map((option) => {
        const active = option.value === activeStyle;

        return (
          <ToolButton
            key={option.value}
            className="w-10 h-10"
            active={active}
            autoFocus={active}
            tooltip={option.label}
            tooltipSide="left"
            onClick={() => onSelect(option)}
          >
            <option.Icon className="size-9" />
          </ToolButton>
        );
      })}
    </ul>
  );
}

export const OrderedListSelect = () => {
  const { editor, editable } = useEditorContext();
  const { activeOption } = useEditorState({
    editor,
    selector: (snapshot) => ({
      activeOption: ORDERED_LIST_OPTIONS.find((option) => snapshot.editor.isActive(option.value)),
    }),
  });

  const handleSelectOption = (option: OrderedListOption) => {
    editor.chain().focus()[option.toggleFnName]?.().run();
  };

  const handleClick = () => {
    handleSelectOption(activeOption || ORDERED_LIST_OPTIONS[0]);
  };

  return (
    <ToolButton
      tooltip="Ordered List"
      disabled={!editable}
      active={!!activeOption}
      separateMenu
      menu={({ closeMenu }) => (
        <OrderedListMenu
          activeStyle={activeOption?.value}
          onSelect={(option) => {
            handleSelectOption(option);
            closeMenu();
          }}
        />
      )}
      onClick={handleClick}
    >
      <ListOrdered className="size-5" />
    </ToolButton>
  );
};
