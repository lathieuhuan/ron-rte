import { Edit, Link, X } from "lucide-react";

import { cn } from "@/utils/common";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";

import { ToolButton } from "./ToolButton";

type TLinkAttachViewProps = {
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClickEdit?: () => void;
  onClickUnlink?: () => void;
  onClose?: () => void;
};

export const LinkAttachView = ({
  className,
  style,
  href = "",
  onClickEdit,
  onClickUnlink,
  onClose,
}: TLinkAttachViewProps) => {
  return (
    <div className={cn("flex w-60 max-w-60 items-center gap-2", className)} style={style}>
      <div className="flex-grow truncate">
        <Tooltip>
          <TooltipTrigger asChild>
            <a className="text-blue-600" href={href} target="_blank" rel="noreferrer">
              <span className="p-1.5">{href}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="top">Open link in new tab</TooltipContent>
        </Tooltip>
      </div>
      <ToolButton tooltip="Edit link" onClick={onClickEdit}>
        <Edit className="size-5" />
      </ToolButton>
      <ToolButton tooltip="Unset link" onClick={onClickUnlink}>
        <Link className="size-5" />
      </ToolButton>
      <ToolButton tooltip="Close" onClick={onClose}>
        <X className="size-5" />
      </ToolButton>
    </div>
  );
};
