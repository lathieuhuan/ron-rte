import { type CommandProps, mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { bulletListInputRegex, type BulletListOptions } from "@tiptap/extension-list/bullet-list";
import { ListItem } from "@tiptap/extension-list/item";
import { TextStyle } from "@tiptap/extension-text-style";

import type { BulletListExtensionName, BulletListStyle, BulletListToggleFnName } from "../types";

type TCreateBulletListExtensionOptions = {
  name: BulletListExtensionName;
  listType: BulletListStyle;
  toggleFnName: BulletListToggleFnName;
};

type BulletListExtOptions = BulletListOptions & {
  itemTypeName: string;
};

export const createBulletListExt = ({
  name,
  listType,
  toggleFnName,
}: TCreateBulletListExtensionOptions) => {
  return Node.create<BulletListExtOptions>({
    name,
    group: "block list",

    addOptions() {
      return {
        itemTypeName: ListItem.name,
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
            const { itemTypeName } = this.options;

            if (this.options.keepAttributes) {
              return chain()
                .toggleList(this.name, itemTypeName, this.options.keepMarks)
                .updateAttributes(itemTypeName, this.editor.getAttributes(TextStyle.name))
                .run();
            }

            return commands.toggleList(this.name, itemTypeName, this.options.keepMarks);
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
          getAttributes: () => this.editor.getAttributes(TextStyle.name),
        });
      }

      return [inputRule];
    },
  });
};
