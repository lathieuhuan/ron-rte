import { type CommandProps, mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { bulletListInputRegex, type BulletListOptions } from "@tiptap/extension-list/bullet-list";

import { EXTENSION_NAME } from "@/extensions/extensions-config";
import type { BulletListExtensionName, BulletListStyle, BulletListToggleFnName } from "../types";

type TCreateBulletListExtensionOptions = {
  name: BulletListExtensionName;
  listType: BulletListStyle;
  toggleFnName: BulletListToggleFnName;
};

export const createBulletListExt = ({
  name,
  listType,
  toggleFnName,
}: TCreateBulletListExtensionOptions) => {
  return Node.create<BulletListOptions>({
    name,
    group: "block list",

    addOptions() {
      return {
        itemTypeName: EXTENSION_NAME.ListItem,
        HTMLAttributes: {
          style: "padding-left: 36px;",
        },
        keepMarks: false,
        keepAttributes: false,
      };
    },

    content() {
      return `${this.options.itemTypeName}+`;
    },

    parseHTML() {
      return [
        {
          tag: "ul",
          getAttrs: (node) => {
            const style = (node as HTMLElement).getAttribute("style") || "";

            if (!style.includes("list-style-type:")) {
              return listType === "disc" ? {} : false;
            }

            return style.includes(`list-style-type: ${listType}`) ? {} : false;
          },
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      const existingStyle = HTMLAttributes.style || "";
      const hasListStyleType = existingStyle.includes("list-style-type:");

      const styleToAdd = hasListStyleType
        ? {}
        : { style: `list-style-type: ${listType || "disc"};` };

      return ["ul", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, styleToAdd), 0];
    },

    addCommands() {
      return {
        [toggleFnName]:
          () =>
          ({ commands, chain }: CommandProps) => {
            if (this.options.keepAttributes) {
              return chain()
                .toggleList(this.name, this.options.itemTypeName, this.options.keepMarks)
                .updateAttributes(
                  EXTENSION_NAME.ListItem,
                  this.editor.getAttributes(EXTENSION_NAME.TextStyle),
                )
                .run();
            }

            return commands.toggleList(
              this.name,
              this.options.itemTypeName,
              this.options.keepMarks,
            );
          },
      };
    },

    addInputRules() {
      let inputRule = wrappingInputRule({
        find: bulletListInputRegex,
        type: this.type,
      });

      if (this.options.keepMarks || this.options.keepAttributes) {
        inputRule = wrappingInputRule({
          type: this.type,
          find: bulletListInputRegex,
          editor: this.editor,
          keepMarks: this.options.keepMarks,
          keepAttributes: this.options.keepAttributes,
          getAttributes: () => this.editor.getAttributes(EXTENSION_NAME.TextStyle),
        });
      }

      return [inputRule];
    },
  });
};
