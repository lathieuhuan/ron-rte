import { useEditorState } from "@tiptap/react";
import { useEffect, useState } from "react";

import { useEditorContext } from "@/hooks/useEditorContext";
import { TEXT_ALIGN_OPTIONS, type TextAlignOption, type TextAlignType } from "./config";

import { ToolButton } from "../ui/ToolButton";

type TextAlignMenuProps = {
  activeAlign?: TextAlignType;
  onSelect: (option: TextAlignOption) => void;
};
function TextAlignMenu({ activeAlign, onSelect }: TextAlignMenuProps) {
  return (
    <ul className="flex flex-col gap-0.5">
      {TEXT_ALIGN_OPTIONS.map((option) => {
        const active = activeAlign === option.value;

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

type TextAlignSelectProps = {
  disabled?: boolean;
};
export const TextAlignSelect = ({ disabled }: TextAlignSelectProps) => {
  const { editor, focusEditor } = useEditorContext();
  const { activeOption } = useEditorState({
    editor,
    selector: (snapshot) => ({
      activeOption: TEXT_ALIGN_OPTIONS.find((option) =>
        snapshot.editor.isActive({ textAlign: option.value }),
      ),
    }),
  });
  const [displayedOption, setDisplayedOption] = useState(TEXT_ALIGN_OPTIONS[0]);
  const displayedIsActive = displayedOption.value === activeOption?.value;

  useEffect(() => {
    if (activeOption) {
      setDisplayedOption(activeOption);
    }
  }, [activeOption?.value]);

  const handleSelect = (option: TextAlignOption) => {
    editor.commands.setTextAlign(option.value);
    setDisplayedOption(option);
    // focusEditor();
  };

  const handleClick = () => {
    if (displayedIsActive) {
      editor.commands.unsetTextAlign();
    } else {
      editor.commands.setTextAlign(displayedOption.value);
    }
  };

  return (
    <ToolButton
      tooltip="Text Align"
      disabled={disabled}
      active={displayedIsActive}
      separateMenu
      menu={({ closeMenu }) => (
        <TextAlignMenu
          activeAlign={activeOption?.value}
          onSelect={(option) => {
            handleSelect(option);
            closeMenu();
          }}
        />
      )}
      onClick={handleClick}
    >
      <displayedOption.Icon className="size-5" />
    </ToolButton>
  );
};
