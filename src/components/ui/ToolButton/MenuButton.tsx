import { ChevronDown } from "lucide-react";

import { cn } from "@/utils/common";
import { useMenu } from "./hooks/useMenu";
import type { MenuProp } from "./types";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { SimpleButton, type SimpleButtonProps } from "./SimpleButton";

export type MenuButtonProps = SimpleButtonProps & {
  menu?: MenuProp;
};

export const MenuButton = ({
  className,
  menu: menuProp,
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
          <ChevronDown className="size-4" />
        </SimpleButton>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 rounded-sm bg-white" align="start">
        {menu}
      </PopoverContent>
    </Popover>
  );
};
