import { Extension } from "@tiptap/core";

import { createBulletListExt } from "./utils/create-bullet-list-ext";

export const BulletListExt = Extension.create({
  name: "bulletList",

  addExtensions() {
    return [
      createBulletListExt({
        name: "discList",
        toggleFnName: "toggleDiscList",
        listType: "disc",
      }),
      createBulletListExt({
        name: "circleList",
        toggleFnName: "toggleCircleList",
        listType: "circle",
      }),
      createBulletListExt({
        name: "squareList",
        toggleFnName: "toggleSquareList",
        listType: "square",
      }),
    ];
  },
});
