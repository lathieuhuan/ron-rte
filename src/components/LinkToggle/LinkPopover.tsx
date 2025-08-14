import { type ReactElement, type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type LinkPopoverProps = {
  x: number;
  y: number;
  children: ReactNode;
};

export const LinkPopover = ({ x, y, children }: LinkPopoverProps): ReactElement => {
  const [state, setState] = useState({
    isReady: false,
    isOutOfRange: false,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();

      setState((prev) => ({
        ...prev,
        isReady: true,
        isOutOfRange: x + width > window.innerWidth,
      }));
    }
  }, []);

  return createPortal(
    <div
      ref={ref}
      data-ready={state.isReady}
      className="absolute min-w-44 max-w-60 p-2 flex items-center gap-2 bg-background border border-border rounded-sm shadow-md z-50"
      style={
        state.isReady
          ? {
              top: y + window.scrollY,
              left: state.isOutOfRange ? "unset" : x,
              right: state.isOutOfRange ? 0 : "unset",
            }
          : undefined
      }
    >
      {children}
    </div>,
    document.body,
  );
};
