import { Check, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/utils/common";
import { Input } from "./Input";
import { ToolButton } from "./ToolButton";

type TLinkAttachFormProps = {
  className?: string;
  style?: React.CSSProperties;
  initialHref?: string;
  onSubmit?: (href: string) => void;
  onClose?: () => void;
};

export const LinkAttachForm = ({
  className,
  style,
  initialHref = "",
  onSubmit,
  onClose,
}: TLinkAttachFormProps) => {
  const [href, setHref] = useState(initialHref);

  return (
    <div className={cn("flex w-60 max-w-60 items-center gap-2", className)} style={style}>
      <Input
        placeholder="Enter link"
        className="h-7.5 rounded-xs"
        autoFocus
        value={href}
        onChange={(e) => setHref(e.target.value)}
      />
      <ToolButton tooltip="Save" disabled={!href} onClick={() => onSubmit?.(href)}>
        <Check className="size-5" />
      </ToolButton>
      <ToolButton tooltip="Close" onClick={onClose}>
        <X className="size-5" />
      </ToolButton>
    </div>
  );
};
