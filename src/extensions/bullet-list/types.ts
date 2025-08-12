declare module "@tiptap/core" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Commands<ReturnType> {
    discList: {
      toggleDiscList: () => ReturnType;
    };
    circleList: {
      toggleCircleList: () => ReturnType;
    };
    squareList: {
      toggleSquareList: () => ReturnType;
    };
  }
}

export type BulletListExtensionName = "discList" | "circleList" | "squareList";

export type BulletListToggleFnName = "toggleDiscList" | "toggleCircleList" | "toggleSquareList";

export type BulletListStyle = "disc" | "circle" | "square";
