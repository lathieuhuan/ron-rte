import type { SimpleButtonProps } from "./SimpleButton";

const INJECTED_PROPS = [
  "aria-controls",
  "aria-expanded",
  "aria-haspopup",
  "data-slot",
  "data-state",
  "onClick",
];

export const separateProps = (props: Record<string, any>) => {
  const injectedProps: Record<string, any> = {};
  const remainingProps: Record<string, any> = {};

  for (const key in props) {
    if (INJECTED_PROPS.includes(key)) {
      injectedProps[key] = props[key];
    } else {
      remainingProps[key] = props[key];
    }
  }
  return { injectedProps, remainingProps } as {
    injectedProps: Record<string, any>;
    remainingProps: SimpleButtonProps;
  };
};
