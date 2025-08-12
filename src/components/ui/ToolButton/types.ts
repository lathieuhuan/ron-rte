import type { ReactNode } from "react";
import type { ClassValue } from "clsx";

type RenderMenuProps = {
  closeMenu: () => void;
};

export type MenuProp = ReactNode | ((props: RenderMenuProps) => ReactNode);

export type MenuProps = {
  menu: MenuProp;
  menuCls?: ClassValue;
};
