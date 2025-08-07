import { useState, type ReactNode } from "react";
import type { MenuProp } from "../types";

export const useMenu = (menuProp: MenuProp) => {
  const [openMenu, setOpenMenu] = useState(false);

  let menu: ReactNode = null;

  if (typeof menuProp === "function") {
    const closeMenu = () => {
      setOpenMenu(false);
    };

    menu = menuProp({ closeMenu });
  } else {
    menu = menuProp;
  }

  return { openMenu, setOpenMenu, menu };
};
