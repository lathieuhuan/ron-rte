import { ChevronDown } from "lucide-react";

import { cn } from "@/utils/common";
import { useMenu } from "./hooks/useMenu";
import type { MenuProps } from "./types";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { SimpleButton, type SimpleButtonProps } from "./SimpleButton";

export type MenuButtonProps = SimpleButtonProps &
  MenuProps & {
    withArrow?: boolean;
  };

export const MenuButton = ({
  className,
  menu: menuProp,
  menuCls,
  withArrow,
  children,
  ...restProps
}: MenuButtonProps) => {
  const { openMenu, setOpenMenu, menu } = useMenu(menuProp);

  const handleOpenChange = (open: boolean) => {
    setOpenMenu(open);
  };

  return (
    <Popover open={openMenu} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <SimpleButton {...restProps} className={cn("px-1", className)}>
          {children}
          {withArrow && <ChevronDown className="size-4" />}
        </SimpleButton>
      </PopoverTrigger>
      <PopoverContent className={cn("w-auto p-2 rounded-sm bg-white", menuCls)} align="start">
        {menu}
      </PopoverContent>
    </Popover>
  );
};
