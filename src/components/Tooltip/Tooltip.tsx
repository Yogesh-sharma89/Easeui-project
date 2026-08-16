import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const tooltipContentVariants = cva(
  `
    z-50
    overflow-hidden
    rounded-lg
    border
    px-3
    py-2
    text-xs
    font-medium
    shadow-xl
    backdrop-blur-md
    select-none

    border-slate-700/70
    bg-slate-900/95
    text-slate-100

    origin-[var(--radix-tooltip-content-transform-origin)]

    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=closed]:zoom-out-95

    data-[side=bottom]:slide-in-from-top-1
    data-[side=left]:slide-in-from-right-1
    data-[side=right]:slide-in-from-left-1
    data-[side=top]:slide-in-from-bottom-1

    data-[state=open]:animate-in
    data-[state=open]:fade-in-0
    data-[state=open]:zoom-in-95
  `,
  {
    variants: {
      variant: {
        default: `
          border-slate-700/70
          bg-slate-900/95
          text-slate-100
        `,

        primary: `
          border-indigo-400/20
          bg-indigo-600
          text-white
        `,

        success: `
          border-green-400/20
          bg-green-600
          text-white
        `,

        destructive: `
          border-red-400/20
          bg-red-600
          text-white
        `,

        warning: `
          border-yellow-400/20
          bg-yellow-500
          text-slate-950
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
  }
);

export interface TooltipProps
  extends VariantProps<typeof tooltipContentVariants> {

  content: React.ReactNode;

  /** Element which triggers the tooltip.*/
  children: React.ReactElement;

  /**
   * Position of the tooltip relative to the trigger.
   */
  side?: "top" | "bottom" | "left" | "right";

  /**
   * Alignment relative to the trigger.
   */
  align?: "start" | "center" | "end";

  /**
   * Distance between tooltip and trigger.
   */
  sideOffset?: number;

  /**
   * Delay before tooltip appears.
   */
  delayDuration?: number;

  /**
   * Disable tooltip completely.
   */
  disabled?: boolean;

  /**
   * Additional class names for tooltip content.
   */
  className?: string;

  /**
   * Whether the tooltip should avoid overlapping
   * the trigger.
   */
  avoidCollisions?: boolean;
}

const Tooltip = ({
  children,
  content,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 300,
  disabled = false,
  avoidCollisions = true,
  variant,
  size,
  className,
}: TooltipProps) => {
  /**
   * When disabled, simply render the children.
   * This avoids unnecessary tooltip logic.
   */
  if (disabled) {
    return children;
  }

  return (
    <TooltipPrimitive.Root delayDuration={delayDuration}>
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          avoidCollisions={avoidCollisions}
          className={cn(
            tooltipContentVariants({
              variant,
              size,
            }),
            className
          )}
        >
          {content}

          <TooltipPrimitive.Arrow
            className="fill-slate-900"
            width={10}
            height={5}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

Tooltip.displayName = "Tooltip";

/**
 * Provider
 *
 * Add this once near the root of your application.
 */
const TooltipProvider = ({
  children,
  delayDuration = 300,
  skipDelayDuration = 300,
}: {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}) => {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
};

TooltipProvider.displayName = "TooltipProvider";

export { Tooltip, TooltipProvider, tooltipContentVariants };