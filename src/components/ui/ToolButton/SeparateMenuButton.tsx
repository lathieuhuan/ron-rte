import { ChevronDown } from "lucide-react";
import { useMenu } from "./hooks/useMenu";
import type { MenuProp } from "./types";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { SimpleButton, type SimpleButtonProps } from "./SimpleButton";

type SeparateMenuButtonProps = SimpleButtonProps & {
  menu?: MenuProp;
};

export const SeparateMenuButton = ({ menu: menuProp, ...restProps }: SeparateMenuButtonProps) => {
  const { openMenu, setOpenMenu, menu } = useMenu(menuProp);

  const handleOpenChange = (open: boolean) => {
    setOpenMenu(open);
  };

  return (
    <Popover open={openMenu} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex">
          <SimpleButton {...restProps} />
          <button type="button" className="hover:bg-accent rounded-xs">
            <ChevronDown className="size-4" />
          </button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 rounded-sm bg-background" align="start">
        {menu}
      </PopoverContent>
    </Popover>
  );
};
