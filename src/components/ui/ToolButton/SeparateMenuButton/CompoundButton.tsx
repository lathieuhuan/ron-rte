import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { SimpleButton, type SimpleButtonProps } from "../SimpleButton";

type CompoundButtonProps = SimpleButtonProps & {
  onClickMainButton?: () => void;
};

/**
 * Used under PopoverTrigger so it gets injected prop and ref.
 * Injected ref will be used to anchor the popover.
 */
export const CompoundButton = forwardRef<HTMLDivElement, CompoundButtonProps>((props, ref) => {
  const { injectedProps, remainingProps, onClickMainButton } = separateProps(props);

  return (
    <div className="flex" ref={ref}>
      <SimpleButton {...remainingProps} onClick={onClickMainButton} />
      <button type="button" className="hover:bg-accent rounded-xs" {...injectedProps}>
        <ChevronDown className="size-4" />
      </button>
    </div>
  );
});

const INJECTED_PROPS = [
  "aria-controls",
  "aria-expanded",
  "aria-haspopup",
  "data-slot",
  "data-state",
  "onClick",
];

function separateProps(props: CompoundButtonProps) {
  const injectedProps: Record<string, any> = {};
  const remainingProps = {} as Omit<CompoundButtonProps, (typeof INJECTED_PROPS)[number]>;

  for (const key in props) {
    if (key !== "onClickMainButton") {
      const value = props[key as keyof CompoundButtonProps];

      if (INJECTED_PROPS.includes(key)) {
        injectedProps[key] = value;
      } else {
        // @ts-ignore
        remainingProps[key] = value;
      }
    }
  }

  return {
    injectedProps,
    remainingProps,
    onClickMainButton: props.onClickMainButton,
  };
}
