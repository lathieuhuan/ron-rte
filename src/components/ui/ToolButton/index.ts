import { MenuButton } from "./MenuButton";
import { SeparateMenuButton } from "./SeparateMenuButton";
import { SimpleButton } from "./SimpleButton";

export type { SimpleButtonProps as ToolButtonProps } from "./SimpleButton";
export type { MenuProp as ToolButtonMenu } from "./types";

type CompoundToolButton = typeof SimpleButton & {
  SeparateMenu: typeof SeparateMenuButton;
  Menu: typeof MenuButton;
};

const ToolButton = SimpleButton as CompoundToolButton;

ToolButton.Menu = MenuButton;
ToolButton.SeparateMenu = SeparateMenuButton;

export { ToolButton };