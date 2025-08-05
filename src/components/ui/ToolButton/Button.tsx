import { ChevronDown } from "lucide-react";
import type { ComponentProps, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/common";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";

export type ButtonProps = Omit<ComponentProps<"button">, "ref"> & {
  tooltip: string;
  active?: boolean;
  withArrow?: boolean | "separate";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, tooltip, active, withArrow, ...restProps } = props;

  const renderButton = (customProps?: ComponentProps<"button">, _ref = ref) => {
    return (
      <button
        {...restProps}
        {...customProps}
        type="button"
        data-active={active}
        ref={_ref as ForwardedRef<HTMLButtonElement>}
        className={cn(
          "h-7.5 min-w-7.5 flex justify-center items-center gap-0.75 rounded-xs border border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed hover:not-disabled:bg-neutral-200 focus:shadow-[0_0_0_3px_#cae1fc] focus:border-[hsl(218,81.8%,56.9%)]",
          "transition-all [&>span]:inline-flex",
          "data-[active=true]:text-[#2977ff]! data-[active=true]:bg-[#f0f7ff]! data-[active=true]:not-disabled:hover:bg-[#dbecff]!",
          className,
          customProps?.className,
        )}
      />
    );
  };

  let content: ReactNode = null;

  if (withArrow === "separate") {
    console.log("restProps", restProps);
    content = (
      <div
        // ref={(refa) => {
        //   console.log('refa', refa)
        //   ref(refa as ForwardedRef<HTMLDivElement>)
        // }}
        className="flex"
      >
        {renderButton(undefined, null)}
        <button
          ref={ref as ForwardedRef<HTMLButtonElement>}
          type="button"
          className="hover:bg-neutral-200 rounded-xs"
        >
          <ChevronDown className="size-4" />
        </button>
      </div>
    );
  } else if (withArrow) {
    content = renderButton({
      className: "px-1",
      children: (
        <>
          {restProps.children}
          <ChevronDown className="size-4" />
        </>
      ),
    });
  } else {
    content = renderButton();
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
});
