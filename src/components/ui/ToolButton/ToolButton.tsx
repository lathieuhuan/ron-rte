import { useState, type ReactNode } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button, type ButtonProps } from "./Button";

type RenderMenuProps = {
  closeMenu: () => void;
};

export type ToolButtonProps = Omit<ButtonProps, "withArrow"> & {
  // tooltipPlacement?: TooltipProps['placement']
  tooltipZIndex?: number;
  menu?: ReactNode | ((props: RenderMenuProps) => ReactNode);
  separateMenu?: boolean;
};

export const ToolButton = ({
  tooltip,
  // tooltipPlacement,
  tooltipZIndex,
  menu,
  separateMenu,
  ...restProps
}: ToolButtonProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  if (menu) {
    let popoverContent: ReactNode = null;

    if (typeof menu === "function") {
      const closeMenu = () => setIsOpenMenu(false);

      popoverContent = menu({ closeMenu });
    } else {
      popoverContent = menu;
    }

    return (
      <Popover open={isOpenMenu} onOpenChange={setIsOpenMenu}>
        <PopoverTrigger asChild>
          <Button tooltip={tooltip} withArrow={separateMenu ? "separate" : true} {...restProps} />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 rounded-sm bg-white" align="start">
          {popoverContent}
        </PopoverContent>
      </Popover>
    );
  }

  return <Button tooltip={tooltip} {...restProps} />;
};
