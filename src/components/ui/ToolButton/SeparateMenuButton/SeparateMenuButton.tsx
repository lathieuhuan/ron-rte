import { cn } from "@/utils/common";
import { useMenu } from "../hooks/useMenu";
import type { SimpleButtonProps } from "../SimpleButton";
import type { MenuProps } from "../types";

import { Popover, PopoverContent, PopoverTrigger } from "../../Popover";
import { CompoundButton } from "./CompoundButton";

type SeparateMenuButtonProps = SimpleButtonProps & MenuProps;

export const SeparateMenuButton = ({
  menu: menuProp,
  menuCls,
  onClick,
  ...restProps
}: SeparateMenuButtonProps) => {
  const { openMenu, setOpenMenu, menu } = useMenu(menuProp);

  const handleOpenChange = (open: boolean) => {
    setOpenMenu(open);
  };

  return (
    <div className="flex relative">
      <Popover open={openMenu} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <CompoundButton {...restProps} onClickMainButton={onClick} />
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-2 rounded-sm bg-background", menuCls)}
          align="start"
        >
          {menu}
        </PopoverContent>
      </Popover>
    </div>
  );
};
