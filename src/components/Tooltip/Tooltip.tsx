import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const tooltipContentVariants = cva(
  `
    z-50
    max-w-[calc(100vw-2rem)]
    overflow-hidden
    rounded-lg
    border
    px-3
    py-2
    text-xs
    font-medium
    shadow-lg
    backdrop-blur-md
    select-none

    origin-[var(--radix-tooltip-content-transform-origin)]

    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=closed]:zoom-out-95

    data-[state=open]:animate-in
    data-[state=open]:fade-in-0
    data-[state=open]:zoom-in-95

    data-[side=bottom]:slide-in-from-top-1
    data-[side=left]:slide-in-from-right-1
    data-[side=right]:slide-in-from-left-1
    data-[side=top]:slide-in-from-bottom-1
  `,
  {
    variants: {
      variant: {
        default: `
          border-(--border-color)
          bg-(--surface-color)
          text-(--text-color)
        `,

        primary: `
          border-(--primary-color)
          bg-(--primary-color)
          text-white
        `,

        success: `
          border-(--success-color)
          bg-(--success-color)
          text-white
        `,

        destructive: `
          border-(--danger-color)
          bg-(--danger-color)
          text-white
        `,

        warning: `
          border-(--warning-color)
          bg-(--warning-color)
          text-(--text-color)
        `,
      },

      size: {
        sm: "max-w-[180px] text-xs",
        default: "max-w-[240px] text-xs",
        lg: "max-w-[320px] text-sm",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface TooltipProps
  extends VariantProps<typeof tooltipContentVariants> {
  /** Tooltip content. JSX is supported for rich content. */
  content: React.ReactNode;

  /** Element which triggers the tooltip. */
  children: React.ReactElement;

  side?: "top" | "bottom" | "left" | "right";

  align?: "start" | "center" | "end";

  sideOffset?: number;

  alignOffset?: number;

  collisionPadding?: number | Partial<{
    top: number;
    right: number;
    bottom: number;
    left: number;
  }>;

  arrowPadding?: number;

  sticky?: "partial" | "always";

  hideWhenDetached?: boolean;

  avoidCollisions?: boolean;

  delayDuration?: number;

  disabled?: boolean;

  open?: boolean;

  defaultOpen?: boolean;

  onOpenChange?: (open: boolean) => void;

  disableHoverableContent?: boolean;

  className?: string;
}

const Tooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  sideOffset = 6,
  alignOffset = 0,
  collisionPadding = 8,
  arrowPadding = 4,
  sticky = "partial",
  hideWhenDetached = false,
  avoidCollisions = true,
  delayDuration = 300,
  disabled = false,
  open,
  defaultOpen,
  onOpenChange,
  disableHoverableContent = false,
  variant,
  size,
  className,
}: TooltipProps) => {
  if (disabled) {
    return children;
  }

  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          avoidCollisions={avoidCollisions}
          collisionPadding={collisionPadding}
          arrowPadding={arrowPadding}
          sticky={sticky}
          hideWhenDetached={hideWhenDetached}
          className={cn(
            tooltipContentVariants({
              variant,
              size,
            }),
            className,
          )}
        >
          {content}

          <TooltipPrimitive.Arrow
            width={10}
            height={5}
            className={
              variant === "primary"
                ? "fill-(--primary-color)"
                : variant === "success"
                  ? "fill-(--success-color)"
                  : variant === "destructive"
                    ? "fill-(--danger-color)"
                    : variant === "warning"
                      ? "fill-(--warning-color)"
                      : "fill-(--surface-color)"
            }
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

Tooltip.displayName = "Tooltip";

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

const TooltipProvider = ({
  children,
  delayDuration = 300,
  skipDelayDuration = 300,
  disableHoverableContent = false,
}: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
};

TooltipProvider.displayName = "TooltipProvider";

export {
  Tooltip,
  TooltipProvider,
  tooltipContentVariants,
};