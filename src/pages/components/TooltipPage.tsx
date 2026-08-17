import { useState } from "react";
import {
  AlertCircle,
  Check,
  CircleHelp,
  Info,
  Keyboard,
  MousePointer2,
  Settings,
  Sparkles,
  Trash2,
} from "lucide-react";

import {
  Tooltip,
  TooltipProvider,
} from "@/components/Tooltip/Tooltip";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const propsData = [
  {
    prop: "content",
    type: "React.ReactNode",
    default: "-",
    description: "Content rendered inside the tooltip. Supports text, JSX, icons, and rich layouts.",
  },
  {
    prop: "children",
    type: "React.ReactElement",
    default: "-",
    description: "Element that triggers the tooltip when hovered, focused, or keyboard-activated.",
  },
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "Preferred side of the trigger where the tooltip should appear.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description: "Alignment of the tooltip relative to the trigger.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "6",
    description: "Distance in pixels between the trigger and tooltip.",
  },
  {
    prop: "alignOffset",
    type: "number",
    default: "0",
    description: "Additional alignment offset applied to the tooltip.",
  },
  {
    prop: "collisionPadding",
    type: "number | Padding",
    default: "8",
    description: "Padding used by Radix when resolving viewport collisions.",
  },
  {
    prop: "arrowPadding",
    type: "number",
    default: "4",
    description: "Padding used when positioning the tooltip arrow.",
  },
  {
    prop: "sticky",
    type: '"partial" | "always"',
    default: '"partial"',
    description: "Controls how the tooltip remains positioned while its trigger moves.",
  },
  {
    prop: "hideWhenDetached",
    type: "boolean",
    default: "false",
    description: "Hides the tooltip when the trigger is detached from its positioning boundary.",
  },
  {
    prop: "avoidCollisions",
    type: "boolean",
    default: "true",
    description: "Automatically changes the tooltip side or position to avoid viewport collisions.",
  },
  {
    prop: "delayDuration",
    type: "number",
    default: "300",
    description: "Delay in milliseconds before the tooltip opens.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables the tooltip and renders only the trigger.",
  },
  {
    prop: "open",
    type: "boolean",
    default: "-",
    description: "Controlled open state for the tooltip.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "-",
    description: "Initial open state for uncontrolled usage.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    default: "-",
    description: "Called when the tooltip open state changes.",
  },
  {
    prop: "disableHoverableContent",
    type: "boolean",
    default: "false",
    description: "Disables hoverable tooltip-content interaction.",
  },
  {
    prop: "variant",
    type: '"default" | "primary" | "success" | "destructive" | "warning"',
    default: '"default"',
    description: "Controls the semantic visual style of the tooltip.",
  },
  {
    prop: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: "Controls tooltip width and text size.",
  },
  {
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional classes applied to tooltip content.",
  },
];

const variantData = [
  {
    name: "Default",
    description: "Theme-aware surface tooltip for general supporting information.",
  },
  {
    name: "Primary",
    description: "Brand-accented tooltip for highlighted actions and important hints.",
  },
  {
    name: "Success",
    description: "Positive feedback, confirmation, or successful state.",
  },
  {
    name: "Warning",
    description: "Cautionary information that needs attention without being destructive.",
  },
  {
    name: "Destructive",
    description: "Dangerous or irreversible action guidance.",
  },
];

const TooltipPage = () => {
  const [controlledOpen, setControlledOpen] = useState(false);

  const basicUsageCode = `import { Tooltip } from "@/components/Tooltip/Tooltip";

<Tooltip content="Edit your profile">
  <button
    type="button"
    className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-(--text-color)"
  >
    Edit
  </button>
</Tooltip>`;

  const variantsCode = `<Tooltip variant="default" content="Default tooltip">
  <button type="button">Default</button>
</Tooltip>

<Tooltip variant="primary" content="Primary tooltip">
  <button type="button">Primary</button>
</Tooltip>

<Tooltip variant="success" content="Saved successfully">
  <button type="button">Success</button>
</Tooltip>

<Tooltip variant="warning" content="This action needs attention">
  <button type="button">Warning</button>
</Tooltip>

<Tooltip variant="destructive" content="This action cannot be undone">
  <button type="button">Delete</button>
</Tooltip>`;

  const positionsCode = `<Tooltip content="Tooltip on top" side="top">
  <button type="button">Top</button>
</Tooltip>

<Tooltip content="Tooltip on bottom" side="bottom">
  <button type="button">Bottom</button>
</Tooltip>

<Tooltip content="Tooltip on left" side="left">
  <button type="button">Left</button>
</Tooltip>

<Tooltip content="Tooltip on right" side="right">
  <button type="button">Right</button>
</Tooltip>`;

  const alignmentCode = `<Tooltip content="Start aligned" side="bottom" align="start">
  <button type="button">Start</button>
</Tooltip>

<Tooltip content="Center aligned" side="bottom" align="center">
  <button type="button">Center</button>
</Tooltip>

<Tooltip content="End aligned" side="bottom" align="end">
  <button type="button">End</button>
</Tooltip>`;

  const sizesCode = `<Tooltip size="sm" content="Small tooltip">
  <button type="button">Small</button>
</Tooltip>

<Tooltip size="default" content="Default tooltip">
  <button type="button">Default</button>
</Tooltip>

<Tooltip size="lg" content="A larger tooltip with more room for supporting information.">
  <button type="button">Large</button>
</Tooltip>`;

  const richContentCode = `<Tooltip
  size="lg"
  content={
    <div className="space-y-2">
      <div className="flex items-center gap-2 font-semibold">
        <Keyboard size={14} />
        Keyboard shortcut
      </div>

      <p className="text-xs text-(--text-secondary)">
        Open the command menu quickly.
      </p>

      <kbd className="inline-flex rounded-md border border-(--border-color) bg-(--surface-muted) px-2 py-1 font-mono text-[11px] text-(--text-color)">
        ⌘ K
      </kbd>
    </div>
  }
>
  <button type="button">Search</button>
</Tooltip>`;

  const timingCode = `<Tooltip
  content="Appears after 800ms"
  delayDuration={800}
>
  <button type="button">
    Delayed tooltip
  </button>
</Tooltip>

<Tooltip
  content="Appears almost immediately"
  delayDuration={100}
>
  <button type="button">
    Fast tooltip
  </button>
</Tooltip>`;

  const positioningCode = `<Tooltip
  content="Collision-aware tooltip"
  side="bottom"
  sideOffset={10}
  alignOffset={8}
  collisionPadding={12}
  arrowPadding={6}
>
  <button type="button">
    Advanced positioning
  </button>
</Tooltip>`;

  const controlledCode = `const [open, setOpen] = useState(false);

<Tooltip
  content="Controlled tooltip"
  open={open}
  onOpenChange={setOpen}
>
  <button type="button">
    Toggle with focus/hover
  </button>
</Tooltip>

<button
  type="button"
  onClick={() => setOpen((value) => !value)}
>
  {open ? "Close" : "Open"} programmatically
</button>`;

  const disabledCode = `<Tooltip
  disabled
  content="You will never see this tooltip"
>
  <button type="button">
    Disabled
  </button>
</Tooltip>`;

  const iconsCode = `<div className="flex items-center gap-4">
  <Tooltip content="Additional information">
    <button type="button" aria-label="Information">
      <Info size={18} />
    </button>
  </Tooltip>

  <Tooltip content="Configure settings">
    <button type="button" aria-label="Settings">
      <Settings size={18} />
    </button>
  </Tooltip>

  <Tooltip
    variant="destructive"
    content="Delete permanently"
  >
    <button type="button" aria-label="Delete">
      <Trash2 size={18} />
    </button>
  </Tooltip>
</div>`;

  const providerCode = `import {
  Tooltip,
  TooltipProvider,
} from "@/components/Tooltip/Tooltip";

<TooltipProvider
  delayDuration={300}
  skipDelayDuration={300}
>
  <App />
</TooltipProvider>`;

  return (
    <TooltipProvider>
      <main className="mx-auto w-full max-w-6xl space-y-16 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--border-color) bg-(--primary-soft) px-3 py-1.5 text-xs font-semibold text-(--primary-color)">
            <Sparkles size={13} aria-hidden="true" />
            Feedback & guidance
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-(--text-color) sm:text-5xl">
              Tooltip
            </h1>

            <p className="max-w-2xl text-base leading-7 text-(--text-secondary) sm:text-lg">
              A lightweight, accessible tooltip for contextual information,
              keyboard shortcuts, action hints, and supporting UI guidance.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-medium">
            {[
              "Theme aware",
              "Rich content",
              "Collision aware",
              "Controlled",
              "Keyboard friendly",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-(--border-color) bg-(--surface-color) px-3 py-1.5 text-(--text-secondary)"
              >
                {item}
              </span>
            ))}
          </div>
        </header>

        {/* Basic */}
        <section aria-labelledby="basic" className="space-y-5">
          <SectionHeading
            id="basic"
            title="Basic Usage"
            description="Use a tooltip to add short contextual information to an existing interactive element."
          />

          <ComponentDemo code={basicUsageCode}>
            <div className="flex flex-wrap items-center gap-3">
              <Tooltip content="Edit your profile">
                <button
                  type="button"
                  className="rounded-lg bg-(--primary-color) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:ring-offset-2"
                >
                  Edit
                </button>
              </Tooltip>

              <Tooltip
                variant="destructive"
                content="Delete this item permanently"
              >
                <button
                  type="button"
                  className="rounded-lg border border-(--danger-color) px-4 py-2 text-sm font-semibold text-(--danger-color) transition hover:bg-(--danger-soft) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--danger-color) focus-visible:ring-offset-2"
                >
                  Delete
                </button>
              </Tooltip>

              <Tooltip content="View additional information" side="right">
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-semibold text-(--text-color) transition hover:bg-(--surface-hover)"
                >
                  Details
                </button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </section>

        {/* Variants */}
        <section aria-labelledby="variants" className="space-y-5">
          <SectionHeading
            id="variants"
            title="Variants"
            description="Use semantic variants to communicate the meaning of the tooltip without rebuilding its styling."
          />

          <ComponentDemo code={variantsCode}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <VariantDemo
                label="Default"
                description="Theme surface"
              >
                <Tooltip
                  variant="default"
                  content="General supporting information"
                >
                  <button
                    type="button"
                    className="w-full rounded-lg border border-(--border-color) bg-(--surface-color) px-3 py-2 text-sm font-medium text-(--text-color) transition hover:bg-(--surface-hover)"
                  >
                    Default
                  </button>
                </Tooltip>
              </VariantDemo>

              <VariantDemo
                label="Primary"
                description="Brand emphasis"
              >
                <Tooltip
                  variant="primary"
                  content="Highlighted information"
                >
                  <button
                    type="button"
                    className="w-full rounded-lg bg-(--primary-color) px-3 py-2 text-sm font-medium text-white transition hover:bg-(--primary-hover)"
                  >
                    Primary
                  </button>
                </Tooltip>
              </VariantDemo>

              <VariantDemo
                label="Success"
                description="Positive state"
              >
                <Tooltip
                  variant="success"
                  content="Saved successfully"
                >
                  <button
                    type="button"
                    className="w-full rounded-lg bg-(--success-color) px-3 py-2 text-sm font-medium text-white"
                  >
                    Success
                  </button>
                </Tooltip>
              </VariantDemo>

              <VariantDemo
                label="Warning"
                description="Needs attention"
              >
                <Tooltip
                  variant="warning"
                  content="This action needs attention"
                >
                  <button
                    type="button"
                    className="w-full rounded-lg bg-(--warning-color) px-3 py-2 text-sm font-medium text-white"
                  >
                    Warning
                  </button>
                </Tooltip>
              </VariantDemo>

              <VariantDemo
                label="Destructive"
                description="Dangerous action"
              >
                <Tooltip
                  variant="destructive"
                  content="This action cannot be undone"
                >
                  <button
                    type="button"
                    className="w-full rounded-lg bg-(--danger-color) px-3 py-2 text-sm font-medium text-white"
                  >
                    Delete
                  </button>
                </Tooltip>
              </VariantDemo>
            </div>
          </ComponentDemo>
        </section>

        {/* Positions */}
        <section aria-labelledby="positions" className="space-y-5">
          <SectionHeading
            id="positions"
            title="Positions"
            description="Choose the preferred side of the trigger. Radix can automatically change the final side when collision handling is required."
          />

          <ComponentDemo code={positionsCode}>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              {(["top", "bottom", "left", "right"] as const).map((side) => (
                <Tooltip
                  key={side}
                  content={`Tooltip on ${side}`}
                  side={side}
                >
                  <button
                    type="button"
                    className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-semibold capitalize text-(--text-color) transition hover:bg-(--surface-hover)"
                  >
                    {side}
                  </button>
                </Tooltip>
              ))}
            </div>
          </ComponentDemo>
        </section>

        {/* Alignment */}
        <section aria-labelledby="alignment" className="space-y-5">
          <SectionHeading
            id="alignment"
            title="Alignment"
            description="Control how the tooltip aligns with the trigger when using the same side."
          />

          <ComponentDemo code={alignmentCode}>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              {(["start", "center", "end"] as const).map((align) => (
                <Tooltip
                  key={align}
                  content={`${align} aligned tooltip`}
                  side="bottom"
                  align={align}
                >
                  <button
                    type="button"
                    className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-semibold capitalize text-(--text-color) transition hover:bg-(--surface-hover)"
                  >
                    {align}
                  </button>
                </Tooltip>
              ))}
            </div>
          </ComponentDemo>
        </section>

        {/* Sizes */}
        <section aria-labelledby="sizes" className="space-y-5">
          <SectionHeading
            id="sizes"
            title="Sizes"
            description="Use different sizes when your tooltip content needs more or less room."
          />

          <ComponentDemo code={sizesCode}>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              <Tooltip size="sm" content="Compact supporting information">
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-medium text-(--text-color)"
                >
                  Small
                </button>
              </Tooltip>

              <Tooltip size="default" content="Default tooltip content">
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-medium text-(--text-color)"
                >
                  Default
                </button>
              </Tooltip>

              <Tooltip
                size="lg"
                content="Large tooltip content provides more room for longer supporting information."
              >
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-medium text-(--text-color)"
                >
                  Large
                </button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </section>

        {/* Rich content */}
        <section aria-labelledby="rich-content" className="space-y-5">
          <SectionHeading
            id="rich-content"
            title="Rich Content"
            description="The content prop accepts ReactNode, so tooltips can contain structured supporting information."
          />

          <ComponentDemo code={richContentCode}>
            <div className="flex items-center justify-center py-8">
              <Tooltip
                size="lg"
                content={
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold">
                      <Keyboard size={14} aria-hidden="true" />
                      <span>Keyboard shortcut</span>
                    </div>

                    <p className="text-xs text-(--text-secondary)">
                      Open the command menu quickly.
                    </p>

                    <kbd className="inline-flex rounded-md border border-(--border-color) bg-(--surface-muted) px-2 py-1 font-mono text-[11px] text-(--text-color)">
                      ⌘ K
                    </kbd>
                  </div>
                }
              >
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-semibold text-(--text-color) transition hover:bg-(--surface-hover)"
                >
                  Search
                </button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </section>

        {/* Icon tooltips */}
        <section aria-labelledby="icons" className="space-y-5">
          <SectionHeading
            id="icons"
            title="Icon Tooltips"
            description="Use tooltips to make icon-only actions understandable without adding permanent labels."
          />

          <ComponentDemo code={iconsCode}>
            <div className="flex items-center justify-center gap-3 py-6">
              <Tooltip content="Additional information">
                <button
                  type="button"
                  aria-label="Information"
                  className="rounded-xl border border-(--border-color) bg-(--surface-color) p-3 text-(--text-color) transition hover:bg-(--surface-hover)"
                >
                  <Info size={18} aria-hidden="true" />
                </button>
              </Tooltip>

              <Tooltip content="Configure settings">
                <button
                  type="button"
                  aria-label="Settings"
                  className="rounded-xl border border-(--border-color) bg-(--surface-color) p-3 text-(--text-color) transition hover:bg-(--surface-hover)"
                >
                  <Settings size={18} aria-hidden="true" />
                </button>
              </Tooltip>

              <Tooltip
                variant="destructive"
                content="Delete permanently"
              >
                <button
                  type="button"
                  aria-label="Delete"
                  className="rounded-xl border border-(--danger-color) bg-(--surface-color) p-3 text-(--danger-color) transition hover:bg-(--danger-soft)"
                >
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </section>

        {/* Timing */}
        <section aria-labelledby="timing" className="space-y-5">
          <SectionHeading
            id="timing"
            title="Timing"
            description="Adjust the opening delay when a tooltip should appear immediately or only after a deliberate hover."
          />

          <ComponentDemo code={timingCode}>
            <div className="flex flex-wrap items-center justify-center gap-4 py-8">
              <Tooltip
                content="Appears almost immediately"
                delayDuration={100}
              >
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-semibold text-(--text-color)"
                >
                  Fast tooltip
                </button>
              </Tooltip>

              <Tooltip
                content="Appears after a longer delay"
                delayDuration={800}
              >
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-semibold text-(--text-color)"
                >
                  Delayed tooltip
                </button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </section>

        {/* Positioning */}
        <section aria-labelledby="positioning" className="space-y-5">
          <SectionHeading
            id="positioning"
            title="Advanced Positioning"
            description="Fine-tune spacing while keeping Radix collision handling enabled."
          />

          <ComponentDemo code={positioningCode}>
            <div className="flex items-center justify-center py-8">
              <Tooltip
                content="Positioned with custom offsets and collision padding"
                side="bottom"
                sideOffset={10}
                alignOffset={8}
                collisionPadding={12}
                arrowPadding={6}
              >
                <button
                  type="button"
                  className="rounded-lg bg-(--primary-color) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
                >
                  Advanced positioning
                </button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </section>

        {/* Controlled */}
        <section aria-labelledby="controlled" className="space-y-5">
          <SectionHeading
            id="controlled"
            title="Controlled Tooltip"
            description="Control the open state yourself when tooltip visibility needs to interact with application state."
          />

          <ComponentDemo code={controlledCode}>
            <div className="flex flex-wrap items-center justify-center gap-3 py-8">
              <Tooltip
                content="This tooltip is controlled"
                open={controlledOpen}
                onOpenChange={setControlledOpen}
              >
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-color) px-4 py-2 text-sm font-semibold text-(--text-color)"
                >
                  Focus or hover
                </button>
              </Tooltip>

              <button
                type="button"
                onClick={() => setControlledOpen((value) => !value)}
                className="rounded-lg bg-(--primary-color) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--primary-hover)"
              >
                {controlledOpen ? "Close" : "Open"} programmatically
              </button>

              <span
                className="inline-flex items-center gap-1 rounded-full border border-(--border-color) bg-(--surface-muted) px-3 py-1.5 text-xs font-medium text-(--text-secondary)"
                aria-live="polite"
              >
                <MousePointer2 size={13} aria-hidden="true" />
                {controlledOpen ? "Open" : "Closed"}
              </span>
            </div>
          </ComponentDemo>
        </section>

        {/* Disabled */}
        <section aria-labelledby="disabled" className="space-y-5">
          <SectionHeading
            id="disabled"
            title="Disabled"
            description="Disable the tooltip when contextual guidance is not needed for a particular state."
          />

          <ComponentDemo code={disabledCode}>
            <div className="flex items-center justify-center py-8">
              <Tooltip
                disabled
                content="You will not see this tooltip"
              >
                <button
                  type="button"
                  className="rounded-lg border border-(--border-color) bg-(--surface-muted) px-4 py-2 text-sm font-semibold text-(--text-muted)"
                >
                  Tooltip disabled
                </button>
              </Tooltip>
            </div>
          </ComponentDemo>
        </section>

        {/* Provider */}
        <section aria-labelledby="provider" className="space-y-5">
          <SectionHeading
            id="provider"
            title="Tooltip Provider"
            description="Wrap the application once when you want shared timing behavior across many tooltips."
          />

          <ComponentDemo code={providerCode}>
            <div className="rounded-2xl border border-(--border-color) bg-(--surface-color) p-6">
              <div className="flex items-start gap-3">
                <CircleHelp
                  size={18}
                  className="mt-0.5 shrink-0 text-(--primary-color)"
                  aria-hidden="true"
                />

                <div>
                  <h3 className="font-semibold text-(--text-color)">
                    Shared tooltip behavior
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
                    TooltipProvider lets multiple Tooltip instances share
                    delay configuration and Radix tooltip behavior.
                  </p>
                </div>
              </div>
            </div>
          </ComponentDemo>
        </section>

        {/* Accessibility */}
        <section
          aria-labelledby="accessibility"
          className="rounded-3xl border border-(--border-color) bg-(--primary-soft) p-6 sm:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="hidden shrink-0 rounded-xl bg-(--primary-color) p-2 text-white sm:block">
              <AlertCircle size={20} aria-hidden="true" />
            </div>

            <div className="space-y-5">
              <div>
                <h2
                  id="accessibility"
                  className="text-2xl font-semibold text-(--text-color)"
                >
                  Accessibility
                </h2>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-(--text-secondary)">
                  Radix manages the tooltip interaction model, including
                  keyboard opening and closing behavior. Use a tooltip to
                  supplement an accessible trigger rather than replacing the
                  trigger's visible name.{" "}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <AccessibilityItem
                  icon={<Keyboard size={16} aria-hidden="true" />}
                  title="Keyboard"
                  description="Keep tooltip triggers keyboard focusable."
                />
                <AccessibilityItem
                  icon={<Info size={16} aria-hidden="true" />}
                  title="Clear content"
                  description="Keep descriptions concise and task-focused."
                />
                <AccessibilityItem
                  icon={<Check size={16} aria-hidden="true" />}
                  title="Supplemental"
                  description="Use tooltips as supporting information, not essential instructions."
                />
              </div>
            </div>
          </div>
        </section>

        {/* API */}
        <section aria-labelledby="api" className="space-y-5">
          <SectionHeading
            id="api"
            title="API Reference"
            description="Props exposed by the Tooltip component."
          />

          <PropsTable data={propsData} />
        </section>
      </main>
    </TooltipProvider>
  );
};

type SectionHeadingProps = {
  id: string;
  title: string;
  description: string;
};

const SectionHeading = ({
  id,
  title,
  description,
}: SectionHeadingProps) => (
  <div>
    <h2
      id={id}
      className="text-2xl font-semibold tracking-tight text-(--text-color)"
    >
      {title}
    </h2>

    <p className="mt-1 max-w-3xl text-sm leading-6 text-(--text-secondary)">
      {description}
    </p>
  </div>
);

type VariantDemoProps = {
  label: string;
  description: string;
  children: React.ReactNode;
};

const VariantDemo = ({
  label,
  description,
  children,
}: VariantDemoProps) => (
  <div className="space-y-2">
    {children}

    <div>
      <p className="text-xs font-semibold text-(--text-color)">
        {label}
      </p>
      <p className="text-xs text-(--text-muted)">
        {description}
      </p>
    </div>
  </div>
);

type AccessibilityItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const AccessibilityItem = ({
  icon,
  title,
  description,
}: AccessibilityItemProps) => (
  <div className="rounded-2xl border border-(--border-color) bg-(--surface-color) p-4">
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-(--primary-color)">
        {icon}
      </span>

      <div>
        <h3 className="text-sm font-semibold text-(--text-color)">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default TooltipPage;
