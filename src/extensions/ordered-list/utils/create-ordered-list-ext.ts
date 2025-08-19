import { type CommandProps, mergeAttributes, Node, wrappingInputRule } from "@tiptap/core";
import { ListItem } from "@tiptap/extension-list/item";
import {
  orderedListInputRegex,
  type OrderedListOptions,
} from "@tiptap/extension-list/ordered-list";
import { TextStyle } from "@tiptap/extension-text-style";

import type { OrderedListExtensionName, OrderedListStyle, OrderedListToggleFnName } from "../types";

type TCreateOrderedListExtensionOptions = {
  name: OrderedListExtensionName;
  listType: OrderedListStyle;
  toggleFnName: OrderedListToggleFnName;
};

type OrderedListExtOptions = OrderedListOptions & {
  itemTypeName: string;
};

export const createOrderedListExt = ({
  name,
  listType,
  toggleFnName,
}: TCreateOrderedListExtensionOptions) => {
  return Node.create<OrderedListExtOptions>({
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
          tag: "ol",
          getAttrs: (node) => {
            const style = (node as HTMLElement).getAttribute("style") || "";
            if (!style.includes("list-style-type:")) {
              return listType === "decimal" ? {} : false;
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
        : { style: `list-style-type: ${listType || "initial"};` };

      return ["ol", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, styleToAdd), 0];
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
        find: orderedListInputRegex,
        type: this.type,
      });

      if (this.options.keepMarks || this.options.keepAttributes) {
        inputRule = wrappingInputRule({
          find: orderedListInputRegex,
          type: this.type,
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
