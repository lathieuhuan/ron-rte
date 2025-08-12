import { cva } from "class-variance-authority";
import type { ClassValue } from "clsx";
import { forwardRef, type ComponentProps } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";

const buttonVariants = cva(
  "h-7.5 min-w-7.5 flex justify-center items-center gap-0.75 rounded-xs border border-transparent transition-all [&>span]:inline-flex",
  {
    variants: {
      active: {
        true: "text-primary bg-primary/10 hover:bg-primary/20",
        false: "hover:bg-accent focus:ring-2 focus:ring-foreground/20 focus:border-foreground/40",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    compoundVariants: [
      {
        active: true,
        disabled: false,
        className: "hover:bg-primary/20 focus:ring-2 focus:ring-primary/20 focus:border-primary/80",
      },
    ],
    defaultVariants: {
      active: false,
      disabled: false,
    },
  },
);

export type SimpleButtonProps = Omit<ComponentProps<"button">, "ref" | "className" | "onClick"> & {
  className?: ClassValue;
  active?: boolean;
  tooltip?: string;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  onClick?: () => void;
};

export const SimpleButton = forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({ className, type = "button", active, disabled, tooltip, tooltipSide, ...restProps }, ref) => {
    const button = (
      <button
        {...restProps}
        ref={ref}
        type={type}
        className={buttonVariants({ active, disabled, className })}
      />
    );

    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
        </Tooltip>
      );
    }

    return button;
  },
);
