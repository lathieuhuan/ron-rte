import type { Command } from "@tiptap/core";
import { PARA_INDENT_ATTR_NAME } from "../config";

// TODO: add max indent
export const buildIndentCommand = (value: number): Command => {
  return ({ tr, state, dispatch }) => {
    const { doc, selection } = state;
    const { from, to } = selection;

    doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === "heading" || node.type.name === "paragraph") {
        const textIndex = node.attrs[PARA_INDENT_ATTR_NAME];
        const currentIndent = textIndex ? parseFloat(textIndex) : 0;
        const newIndent = Math.max(currentIndent + value, 0);

        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          [PARA_INDENT_ATTR_NAME]: newIndent ? newIndent + "em" : null,
        });
      }
    });

    if (tr.docChanged && dispatch) {
      dispatch(tr);
      return true;
    }

    return false;
  };
};
