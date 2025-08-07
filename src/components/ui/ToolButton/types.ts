import type { ReactNode } from "react";

type RenderMenuProps = {
  closeMenu: () => void;
};

export type MenuProp = ReactNode | ((props: RenderMenuProps) => ReactNode);
