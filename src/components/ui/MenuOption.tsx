import { type ComponentProps } from "react";

type MenuOptionProps = ComponentProps<"li"> & {
  selected: boolean;
};

export const MenuOption = ({ selected, ...restProps }: MenuOptionProps) => {
  return (
    <li
      data-selected={selected}
      className="px-2 py-1 cursor-pointer rounded-xs hover:bg-accent data-[selected=true]:font-bold data-[selected=true]:text-primary"
      {...restProps}
    />
  );
};
