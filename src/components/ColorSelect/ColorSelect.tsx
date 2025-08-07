import { ALargeSmall, Eraser, Palette } from "lucide-react";
import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";

import { useEditorContext } from "@/hooks/useEditorContext";
import { cn } from "@/utils/common";
import { EXTENSION_NAME } from "../../extensions";
import { COLOR_OPTIONS, DEFAULT_COLOR } from "./ColorSelect.config";
import { checkIsVeryLightColor } from "./ColorSelect.utils";

import { ToolButton } from "../ui/ToolButton";

export const ColorSelect = () => {
  const { editor, editable } = useEditorContext();

  const [displayedColor, setDisplayedColor] = useState<{
    value: string | undefined;
    isVeryLight: boolean;
  }>({
    value: "",
    isVeryLight: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const currentColor = editor.getAttributes(EXTENSION_NAME.TextStyle).color;

  const updateDisplayedColor = (color?: string) => {
    setDisplayedColor({
      value: color,
      isVeryLight: color ? checkIsVeryLightColor(color) : false,
    });
  };

  const handleSelectColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
    updateDisplayedColor(color);
  };

  const handleClearColor = () => {
    editor.chain().focus().unsetColor().run();
    updateDisplayedColor();
  };

  const handleClickColorPicker = () => {
    inputRef.current?.click();
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    editor.chain().focus().setColor(color).run();
    updateDisplayedColor(color);
  };

  const handleClickButton = (e: MouseEvent<HTMLButtonElement>) => {
    // if (displayedColor.value) {
    //   // e.stopPropagation();
    //   handleSelectColor(displayedColor.value);
    // }
  };

  return (
    <div className="relative">
      <ToolButton.SeparateMenu
        tooltip="Color"
        className="relative"
        disabled={!editable}
        menu={({ closeMenu }) => (
          <ColorMenu
            currentColor={currentColor}
            onSelectColor={(color) => {
              handleSelectColor(color);
              closeMenu();
            }}
            onClearColor={() => {
              handleClearColor();
              closeMenu();
            }}
            onClickColorPicker={() => {
              handleClickColorPicker();
              closeMenu();
            }}
          />
        )}
        onClick={handleClickButton}
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5">
          <ALargeSmall className="size-4" />
          <span
            className={cn("block h-1 w-full rounded-xs", {
              "border border-gray-300": displayedColor.isVeryLight,
            })}
            style={{
              backgroundColor: displayedColor.value || DEFAULT_COLOR,
            }}
          />
        </span>
      </ToolButton.SeparateMenu>
      <input
        type="color"
        ref={inputRef}
        className="sr-only"
        value={displayedColor.value || DEFAULT_COLOR}
        onChange={handleChangeColor}
      />
    </div>
  );
};

type ColorMenuProps = {
  currentColor: string;
  onSelectColor: (color: string) => void;
  onClearColor: () => void;
  onClickColorPicker: () => void;
};
const ColorMenu = ({
  currentColor,
  onSelectColor,
  onClearColor,
  onClickColorPicker,
}: ColorMenuProps) => {
  return (
    <div>
      <button
        type="button"
        className="px-2.5 py-1.5 font-medium rounded-none flex justify-start gap-2"
        onClick={onClearColor}
      >
        <Eraser className="size-3.5" />
        Remove color
      </button>

      <div className="grid grid-cols-5 items-center justify-center gap-1 p-2">
        {COLOR_OPTIONS.map((option) => {
          return (
            <div
              key={option.value}
              title={option.label}
              style={{ backgroundColor: option.value }}
              onClick={() => onSelectColor(option.value)}
              className={cn(
                "size-6 rounded-xs cursor-pointer hover:scale-110 transition-transform",
                {
                  "ring-2 ring-blue-500 ring-offset-1":
                    option.value === currentColor ||
                    (currentColor === "" && option.value === DEFAULT_COLOR),
                  "border border-gray-300": checkIsVeryLightColor(option.value),
                },
              )}
            />
          );
        })}
      </div>
      <div className="h-px bg-gray-200" />
      <button
        type="button"
        className="px-2.5 py-1.5 font-medium rounded-none flex justify-start gap-2"
        onClick={onClickColorPicker}
      >
        <Palette className="size-3.5" />
        Color picker
      </button>
    </div>
  );
};
