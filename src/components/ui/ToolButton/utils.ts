const INJECTED_PROPS = [
  "aria-controls",
  "aria-expanded",
  "aria-haspopup",
  "data-slot",
  "data-state",
  "onClick",
];

// type InjectOmmited<T> = Omit<T, (typeof INJECTED_PROPS)[number]>;

export const separateProps = <T extends Record<string, any>>(props: T) => {
  const injectedProps: Record<string, any> = {};
  const remainingProps = {} as T;

  for (const key in props) {
    if (INJECTED_PROPS.includes(key)) {
      injectedProps[key] = props[key];
    } else {
      remainingProps[key] = props[key];
    }
  }
  return { injectedProps, remainingProps };
};
