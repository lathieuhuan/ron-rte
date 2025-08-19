import { Link } from "lucide-react";
import { useEffect, useState } from "react";

import { useEditorContext } from "@/hooks/useEditorContext";
import { ToolButton } from "../ui/ToolButton";
import { LinkAttachForm } from "../ui/LinkAttachForm";
import { LinkPopover } from "./LinkPopover";
import { LinkAttachView } from "../ui/LinkAttachView";

type PopoverState = {
  status: "form" | "view" | "closed";
  x: number;
  y: number;
  href: string;
};

export const LinkToggle = () => {
  const { editor, editable } = useEditorContext();
  const [popover, setPopover] = useState<PopoverState>({
    status: "closed",
    x: 0,
    y: 0,
    href: "",
  });

  // TODO: check interaction with other marks: bold, italic, underline, color, etc.

  const updatePopover = (data: Partial<PopoverState>) => {
    setPopover((prev) => ({ ...prev, ...data }));
  };

  const openPopover = () => {
    const selection = editor.state.selection;
    if (selection.empty) return;
    const coords = editor.view.coordsAtPos(selection.from);
    const attrs = editor.getAttributes("link");

    updatePopover({
      status: "form",
      x: coords.left,
      y: coords.bottom,
      href: attrs.href,
    });
  };

  const handleClickUnlink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    updatePopover({ status: "closed" });
  };

  const handleSaveLink = (href: string) => {
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    updatePopover({ status: "closed" });
  };

  const handleClose = () => {
    updatePopover({
      status: popover.status === "form" && popover.href ? "view" : "closed",
    });
  };

  const handleClickEdit = () => {
    updatePopover({ status: "form" });
  };

  useEffect(() => {
    const handleClickText = (event: MouseEvent) => {
      const attrs = editor.getAttributes("link");
      if (!attrs.href) {
        updatePopover({ status: "closed" });
        return;
      }

      const { clientX, clientY } = event;
      const position = editor.view.posAtCoords({
        left: clientX,
        top: clientY,
      })?.pos;
      if (position === undefined) return;
      const coords = editor.view.coordsAtPos(position);

      updatePopover({
        status: "view",
        href: attrs.href,
        x: coords.left,
        y: coords.bottom,
      });
    };

    editor.view.dom.addEventListener("click", handleClickText);

    return () => {
      editor.view.dom.removeEventListener("click", handleClickText);
    };
  }, [editor]);

  return (
    <>
      <ToolButton onClick={openPopover} disabled={!editable}>
        <Link className="size-5" />
      </ToolButton>

      {popover.status !== "closed" && (
        <LinkPopover x={popover.x} y={popover.y}>
          {popover.status === "form" ? (
            <LinkAttachForm
              initialHref={popover.href}
              onSubmit={handleSaveLink}
              onClose={handleClose}
            />
          ) : (
            <LinkAttachView
              href={popover.href}
              onClickEdit={handleClickEdit}
              onClickUnlink={handleClickUnlink}
              onClose={handleClose}
            />
          )}
        </LinkPopover>
      )}
    </>
  );
};
