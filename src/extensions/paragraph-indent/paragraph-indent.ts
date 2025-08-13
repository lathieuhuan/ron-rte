import { Extension } from "@tiptap/core";

import { DEFAULT_INDENT_STEP, PARA_INDENT_ATTR_NAME } from "./config";
import type { ParagraphIndentOptions } from "./types";
import { buildIndentCommand } from "./utils/build-indent-command";

declare module "@tiptap/react" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Commands<ReturnType> {
    increaseIndent: {
      increaseIndent: () => ReturnType;
    };
    decreaseIndent: {
      decreaseIndent: () => ReturnType;
    };
  }
}

export const ParagraphIndentExt = Extension.create<ParagraphIndentOptions>({
  name: "paragraphIndent",

  addOptions() {
    return {
      ...this.parent?.(),
      step: DEFAULT_INDENT_STEP,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          [PARA_INDENT_ATTR_NAME]: {
            default: null,
            renderHTML: (attributes) => {
              return attributes[PARA_INDENT_ATTR_NAME]
                ? {
                    style: `padding-left: ${attributes[PARA_INDENT_ATTR_NAME]}`,
                  }
                : {};
            },
            parseHTML: (element) => element.style.paddingLeft || null,
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      increaseIndent: () => buildIndentCommand(this.options.step),
      decreaseIndent: () => buildIndentCommand(this.options.step * -1),
    };
  },
});
