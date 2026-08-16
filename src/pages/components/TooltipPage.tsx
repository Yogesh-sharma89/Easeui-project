
import { Tooltip } from "@/components/Tooltip/Tooltip";
import ComponentDemo from "../ComponentsDemo";

import PropsTable from "@/components/Personal/PropsTable";

const TooltipPage = () => {

  const basicUsageCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"

<Tooltip content="Edit your profile">
  <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
    Edit
  </button>
</Tooltip>

<Tooltip content="Delete this item" side="bottom">
  <button className="px-4 py-2 rounded-md bg-red-600 text-white">
    Delete
  </button>
</Tooltip>

<Tooltip content="View more information" side="right">
  <button className="px-4 py-2 rounded-md border">
    Details
  </button>
</Tooltip>

<Tooltip
  content="This tooltip appears after a short delay"
  side="top"
  delayDuration={500}
>
  <button className="px-4 py-2 rounded-md bg-gray-900 text-white">
    Hover me
  </button>
</Tooltip>
`;

 const propsData = [
  {
    prop: "content",
    type: "React.ReactNode",
    default: "-",
    description: "Content displayed inside the tooltip.",
  },
  {
    prop: "children",
    type: "React.ReactElement",
    default: "-",
    description: "Element that triggers the tooltip when hovered or focused.",
  },
  {
    prop: "side",
    type: '"top" | "bottom" | "left" | "right"',
    default: '"top"',
    description: "Controls which side of the trigger the tooltip appears on.",
  },
  {
    prop: "align",
    type: '"start" | "center" | "end"',
    default: '"center"',
    description:
      "Controls the alignment of the tooltip relative to its trigger.",
  },
  {
    prop: "sideOffset",
    type: "number",
    default: "6",
    description:
      "Controls the distance between the tooltip and the trigger.",
  },
  {
    prop: "delayDuration",
    type: "number",
    default: "300",
    description:
      "Delay in milliseconds before displaying the tooltip.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Disables the tooltip and renders only the trigger element.",
  },
  {
    prop: "variant",
    type:
      '"default" | "primary" | "success" | "destructive" | "warning"',
    default: '"default"',
    description: "Controls the visual style of the tooltip.",
  },
  {
    prop: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: "Controls the maximum width and text size of the tooltip.",
  },
  {
    prop: "avoidCollisions",
    type: "boolean",
    default: "true",
    description:
      "Automatically adjusts the tooltip position to prevent viewport collisions.",
  },
];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Header */}
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Tooltip
        </p>

        <p className="text-lg text-gray-600">
          Displays additional information when users hover over or focus on an
          element.
        </p>
      </header>

      {/* Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>

        <ComponentDemo code={basicUsageCode}>
          <div className="flex gap-4 flex-wrap items-center">
            {/* Top */}
            <Tooltip content="Edit your profile">
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
                Edit
              </button>
            </Tooltip>

            {/* Bottom */}
            <Tooltip
              content="Delete this item"
              side="bottom"
            >
              <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                Delete
              </button>
            </Tooltip>

            {/* Right */}
            <Tooltip
              content="View more information"
              side="right"
            >
              <button className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition">
                Details
              </button>
            </Tooltip>

            {/* Delayed */}
            <Tooltip
              content="This tooltip appears after a short delay"
              side="top"
              delayDuration={500}
            >
              <button className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition">
                Hover me
              </button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* Positions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Positions</h2>

        <ComponentDemo
          code={`
<Tooltip content="Tooltip on top" side="top">
  <button>Top</button>
</Tooltip>

<Tooltip content="Tooltip on bottom" side="bottom">
  <button>Bottom</button>
</Tooltip>

<Tooltip content="Tooltip on left" side="left">
  <button>Left</button>
</Tooltip>

<Tooltip content="Tooltip on right" side="right">
  <button>Right</button>
</Tooltip>
`}
        >
          <div className="flex items-center justify-center gap-4 flex-wrap py-6">
            <Tooltip content="Tooltip on top" side="top">
              <button className="px-4 py-2 rounded-md border hover:bg-gray-100">
                Top
              </button>
            </Tooltip>

            <Tooltip content="Tooltip on bottom" side="bottom">
              <button className="px-4 py-2 rounded-md border hover:bg-gray-100">
                Bottom
              </button>
            </Tooltip>

            <Tooltip content="Tooltip on left" side="left">
              <button className="px-4 py-2 rounded-md border hover:bg-gray-100">
                Left
              </button>
            </Tooltip>

            <Tooltip content="Tooltip on right" side="right">
              <button className="px-4 py-2 rounded-md border hover:bg-gray-100">
                Right
              </button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* Rich content */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Rich Content</h2>

        <ComponentDemo
          code={`
<Tooltip
  content={
    <div>
      <p className="font-semibold">Keyboard Shortcut</p>
      <p className="text-xs opacity-80">Press ⌘ + K</p>
    </div>
  }
>
  <button>Search</button>
</Tooltip>
`}
        >
          <div className="flex justify-center py-6">
            <Tooltip
              content={
                <div>
                  <p className="font-semibold">Keyboard Shortcut</p>
                  <p className="text-xs opacity-80">Press ⌘ + K</p>
                </div>
              }
            >
              <button className="px-4 py-2 rounded-md border hover:bg-gray-100 transition">
                Search
              </button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      {/* API */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>

        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;