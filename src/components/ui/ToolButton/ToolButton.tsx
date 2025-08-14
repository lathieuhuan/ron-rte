import type { SimpleButtonProps } from "./SimpleButton";
import type { MenuProps } from "./types";
import { SeparateMenuButton } from "./SeparateMenuButton";
import { MenuButton } from "./MenuButton";
import { SimpleButton } from "./SimpleButton";

export type ToolButtonProps = SimpleButtonProps &
  Partial<MenuProps> & {
    /** Only for menu and separateMenu false */
    withArrow?: boolean;
    separateMenu?: boolean;
  };

export const ToolButton = ({
  menu,
  menuCls,
  separateMenu,
  withArrow = true,
  ...restProps
}: ToolButtonProps) => {
  if (menu) {
    return separateMenu ? (
      <SeparateMenuButton menu={menu} menuCls={menuCls} {...restProps} />
    ) : (
      <MenuButton menu={menu} menuCls={menuCls} withArrow={withArrow} {...restProps} />
    );
  }

  return <SimpleButton {...restProps} />;
};
