import { ALargeSmall, Eraser, Palette } from "lucide-react";
import { useRef, useState, type ChangeEvent } from "react";

import { EXTENSION_NAME } from "@/extensions";
import { useEditorContext } from "@/hooks/useEditorContext";
import { cn } from "@/utils/common";
import { COLOR_OPTIONS, DEFAULT_COLOR } from "./config";
import { checkIsVeryLightColor } from "./utils";

import { ToolButton } from "../ui/ToolButton";

export const ColorSelect = () => {
  const { editor, editable } = useEditorContext();

  const [displayedColor, setDisplayedColor] = useState<{
    value: string;
    isLight: boolean;
  }>({
    value: DEFAULT_COLOR,
    isLight: false,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const currentColor = editor.getAttributes(EXTENSION_NAME.TextStyle).color;

  const updateDisplayedColor = (color = DEFAULT_COLOR) => {
    setDisplayedColor({
      value: color,
      isLight: checkIsVeryLightColor(color),
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

  const handleClickButton = () => {
    handleSelectColor(displayedColor.value);
  };

  return (
    <div className="relative">
      <ToolButton
        tooltip="Color"
        className="relative"
        disabled={!editable}
        menuCls="p-0 overflow-hidden"
        separateMenu
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
              "border border-gray-300": displayedColor.isLight,
            })}
            style={{
              backgroundColor: displayedColor.value || DEFAULT_COLOR,
            }}
          />
        </span>
      </ToolButton>
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
  const buttonCls =
    "w-full px-2.5 py-1.5 font-medium rounded-none flex justify-start items-center gap-2 hover:bg-accent";

  return (
    <div>
      <button type="button" className={buttonCls} onClick={onClearColor}>
        <Eraser className="size-3.5" />
        Remove color
      </button>

      <div className="p-2 grid grid-cols-5 items-center justify-center gap-1 border-t border-b border-border">
        {COLOR_OPTIONS.map((option) => {
          const selected =
            option.value === currentColor ||
            (currentColor === "" && option.value === DEFAULT_COLOR);

          return (
            <div
              key={option.value}
              title={option.label}
              style={{ backgroundColor: option.value }}
              onClick={() => onSelectColor(option.value)}
              className={cn(
                "size-6 rounded-xs cursor-pointer hover:scale-110 transition-transform",
                {
                  "ring-2 ring-primary ring-offset-1": selected,
                  "border border-gray-300": checkIsVeryLightColor(option.value),
                },
              )}
            />
          );
        })}
      </div>

      <button type="button" className={buttonCls} onClick={onClickColorPicker}>
        <Palette className="size-3.5" />
        Color picker
      </button>
    </div>
  );
};
