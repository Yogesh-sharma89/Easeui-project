import { useRef, useState } from "react";
import { Camera, ChevronRight, Heart, Quote, Star, Zap } from "lucide-react";

import {
  Carousel,
  CarouselItem,
  type CarouselRef,
} from "../../components/Carousel/Carousel";

import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import ButtonDemo from "./components/ButtonDemo";

const products = [
  {
    title: "Neon Headphones",
    category: "Audio",
    price: "$129",
    rating: "4.9",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    title: "Orbit Keyboard",
    category: "Workspace",
    price: "$149",
    rating: "4.8",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
  },
  {
    title: "Focus Monitor",
    category: "Display",
    price: "$349",
    rating: "4.7",
    gradient: "from-violet-500 via-fuchsia-500 to-purple-600",
  },
  {
    title: "Studio Mic",
    category: "Creator",
    price: "$199",
    rating: "4.9",
    gradient: "from-orange-400 via-red-500 to-pink-600",
  },
];

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Product Designer",
    text: "The component API is clean, predictable, and incredibly easy to integrate.",
  },
  {
    name: "Sarah Chen",
    role: "Frontend Engineer",
    text: "The animations feel polished without making the interaction feel heavy.",
  },
  {
    name: "Daniel Brooks",
    role: "Full Stack Developer",
    text: "This is exactly what I want from a reusable component library.",
  },
];

const images = [
  {
    title: "Midnight",
    subtitle: "Explore the unknown",
    gradient: "from-slate-950 via-indigo-950 to-purple-900",
  },
  {
    title: "Electric",
    subtitle: "Built for movement",
    gradient: "from-cyan-950 via-blue-900 to-indigo-900",
  },
  {
    title: "Aurora",
    subtitle: "A different perspective",
    gradient: "from-emerald-950 via-cyan-900 to-blue-900",
  },
  {
    title: "Cosmic",
    subtitle: "Designed beyond limits",
    gradient: "from-purple-950 via-fuchsia-900 to-indigo-950",
  },
];

const CarouselPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselRef = useRef<CarouselRef>(null);

  const basicUsageCode = `
import {
  Carousel,
  CarouselItem,
} from "@/components/Carousel/Carousel"

<Carousel>
  <CarouselItem>
    <div className="rounded-xl bg-indigo-600 p-10 text-white">
      Slide One
    </div>
  </CarouselItem>

  <CarouselItem>
    <div className="rounded-xl bg-purple-600 p-10 text-white">
      Slide Two
    </div>
  </CarouselItem>

  <CarouselItem>
    <div className="rounded-xl bg-cyan-600 p-10 text-white">
      Slide Three
    </div>
  </CarouselItem>
</Carousel>
`;

  const multiCardCode = `
<Carousel
  slidesPerView={3}
  gap={16}
  animation="scale"
>
  {products.map((product) => (
    <CarouselItem key={product.title}>
      <ProductCard {...product} />
    </CarouselItem>
  ))}
</Carousel>
`;

  const autoplayCode = `
<Carousel
  autoplay
  autoplayInterval={2500}
  loop
  pauseOnHover
  animation="depth"
>
</Carousel>
`;

  const customControlsCode = `
<Carousel
  showControls={false}
  showIndicators={false}
>
</Carousel>

<div className="flex gap-2">
  <button onClick={...}>Previous</button>
  <button onClick={...}>Next</button>
</div>
`;

  const verticalCode = `
<Carousel
  orientation="vertical"
  slidesPerView={1}
  animation="depth"
  className="h-[420px]"
  viewportClassName="h-full"
>
</Carousel>
`;

  const propsData = [
    {
      prop: "children",
      type: "React.ReactNode",
      default: "-",
      description: "Slides rendered inside the carousel.",
    },
    {
      prop: "slidesPerView",
      type: "number",
      default: "1",
      description: "Number of slides visible at the same time.",
    },
    {
      prop: "gap",
      type: "number",
      default: "16",
      description: "Spacing between slides in pixels.",
    },
    {
      prop: "loop",
      type: "boolean",
      default: "false",
      description:
        "Allows navigation to wrap from the last slide back to the first.",
    },
    {
      prop: "autoplay",
      type: "boolean",
      default: "false",
      description: "Automatically advances the carousel.",
    },
    {
      prop: "autoplayInterval",
      type: "number",
      default: "4000",
      description: "Delay between autoplay transitions in milliseconds.",
    },
    {
      prop: "pauseOnHover",
      type: "boolean",
      default: "true",
      description: "Pauses autoplay while the user hovers over the carousel.",
    },
    {
      prop: "showControls",
      type: "boolean",
      default: "true",
      description: "Displays previous and next navigation buttons.",
    },
    {
      prop: "showIndicators",
      type: "boolean",
      default: "true",
      description: "Displays pagination indicators beneath the carousel.",
    },
    {
      prop: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Controls the direction in which slides move.",
    },
    {
      prop: "animation",
      type: '"slide" | "fade" | "scale" | "depth"',
      default: '"slide"',
      description: "Controls the transition animation used between slides.",
    },
    {
      prop: "initialSlide",
      type: "number",
      default: "0",
      description: "Determines which slide is initially active.",
    },
    {
      prop: "onSlideChange",
      type: "(index: number) => void",
      default: "-",
      description: "Callback fired whenever the active slide changes.",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Additional classes applied to the carousel container.",
    },
    {
      prop: "viewportClassName",
      type: "string",
      default: "-",
      description: "Additional classes applied to the carousel viewport.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-16 p-6">
      {/* HEADER */}

      <header className="space-y-3">
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-indigo-200
            bg-indigo-50
            px-3
            py-1
            text-xs
            font-medium
            text-indigo-600
            dark:border-indigo-400/20
            dark:bg-indigo-400/10
            dark:text-indigo-300
          "
        >
          <Zap size={13} />
          Interactive
        </div>

        <h1
          className="
            text-4xl
            font-bold
            tracking-tight
          "
          style={{
            color: "var(--text-color)",
          }}
        >
          Carousel
        </h1>

        <p className="max-w-2xl text-lg leading-7 text-gray-600 dark:text-gray-400">
          A flexible animated carousel for presenting images, cards,
          testimonials, products, and other scrollable content.
        </p>
      </header>

      {/* BASIC   */}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Basic Usage</h2>

          <p className="mt-1 text-sm text-gray-500">
            A simple single-slide carousel with animated navigation.
          </p>
        </div>

        <ComponentDemo code={basicUsageCode}>
          <Carousel>
            {[
              {
                title: "Slide One",
                color: "from-indigo-600 to-blue-600",
              },
              {
                title: "Slide Two",
                color: "from-purple-600 to-fuchsia-600",
              },
              {
                title: "Slide Three",
                color: "from-cyan-600 to-blue-600",
              },
            ].map((slide) => (
              <CarouselItem key={slide.title}>
                <div
                  className={`
                    flex
                    h-64
                    items-center
                    justify-center
                    rounded-2xl
                    bg-linear-to-br
                    ${slide.color}
                    text-3xl
                    font-bold
                    text-white
                    shadow-xl
                  `}
                >
                  {slide.title}
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* MULTI CARD  */}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Multi-Card Carousel</h2>

          <p className="mt-1 text-sm text-gray-500">
            Display multiple cards simultaneously.
          </p>
        </div>

        <ComponentDemo code={multiCardCode}>
          <Carousel slidesPerView={3} gap={16} animation="scale">
            {products.map((product) => (
              <CarouselItem key={product.title}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div
                    className={`
                      h-40
                      bg-linear-to-br
                      ${product.gradient}
                    `}
                  />

                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>

                        <h3 className="font-semibold">{product.title}</h3>
                      </div>

                      <button className="text-gray-400 hover:text-red-500">
                        <Heart size={17} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span>{product.rating}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{product.price}</span>

                      <button className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* AUTOPLAY  */}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Autoplay + Depth Animation</h2>

          <p className="mt-1 text-sm text-gray-500">
            Automatically advance slides while pausing when the user hovers.
          </p>
        </div>

        <ComponentDemo code={autoplayCode}>
          <Carousel
            autoplay
            autoplayInterval={2500}
            loop
            pauseOnHover
            animation="depth"
          >
            {images.map((image) => (
              <CarouselItem key={image.title}>
                <div
                  className={`
                    relative
                    h-72
                    overflow-hidden
                    rounded-2xl
                    bg-linear-to-br
                    ${image.gradient}
                  `}
                >
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="relative flex h-full flex-col justify-end p-8 text-white">
                    <Camera size={22} className="mb-4 opacity-70" />

                    <h3 className="text-3xl font-bold">{image.title}</h3>

                    <p className="mt-1 text-white/70">{image.subtitle}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* TESTIMONIAL  */}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Testimonial Carousel</h2>

          <p className="mt-1 text-sm text-gray-500">
            A richer content example using custom card layouts.
          </p>
        </div>

        <ComponentDemo
          code={`
<Carousel
  animation="fade"
  loop
>
  {testimonials.map((item) => (
    <CarouselItem>
      <TestimonialCard {...item} />
    </CarouselItem>
  ))}
</Carousel>
`}
        >
          <Carousel animation="fade" loop>
            {testimonials.map((item) => (
              <CarouselItem key={item.name}>
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <Quote size={30} className="mb-6 text-indigo-500" />

                  <p className="max-w-2xl text-xl leading-8 text-slate-700 dark:text-slate-200">
                    “{item.text}”
                  </p>

                  <div className="mt-7">
                    <p className="font-semibold">{item.name}</p>

                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Controlled Slide Tracking</h2>

          <p className="mt-1 text-sm text-gray-500">
            Listen to slide changes and use the active index elsewhere in your
            UI.
          </p>
        </div>

        <ComponentDemo
          code={`
const [activeSlide, setActiveSlide] =
  useState(0)

<Carousel
  onSlideChange={setActiveSlide}
>
  ...
</Carousel>

<p>
  Active slide: {activeSlide + 1}
</p>
`}
        >
          <Carousel onSlideChange={setActiveSlide}>
            {images.map((image) => (
              <CarouselItem key={image.title}>
                <div
                  className={`
                    h-56
                    rounded-2xl
                    bg-linear-to-br
                    ${image.gradient}
                  `}
                />
              </CarouselItem>
            ))}
          </Carousel>

          <div className="mt-5 flex items-center justify-center">
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium dark:bg-slate-800">
              Active slide:{" "}
              <span className="text-indigo-600">{activeSlide + 1}</span>
            </div>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Custom Controls</h2>

          <p className="mt-1 text-sm text-gray-500">
            Hide the built-in controls and build your own navigation UI around
            the carousel.
          </p>
        </div>

        <ComponentDemo code={customControlsCode}>
          <div className="space-y-5">
            <Carousel
              ref={carouselRef}
              showControls={false}
              showIndicators={false}
              animation="scale"
              loop
            >
              {images.map((image) => (
                <CarouselItem key={image.title}>
                  <div
                    className={`
              relative
              h-56
              overflow-hidden
              rounded-2xl
              bg-linear-to-br
              ${image.gradient}
              shadow-lg
            `}
                  >
                    <div className="absolute inset-0 bg-black/20" />

                    <div className="relative flex h-full flex-col justify-end p-7 text-white">
                      <p className="text-xs font-medium uppercase tracking-widest text-white/60">
                        Custom Controls
                      </p>

                      <h3 className="mt-2 text-3xl font-bold">{image.title}</h3>

                      <p className="mt-1 text-sm text-white/75">
                        {image.subtitle}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </Carousel>

            <div className="flex items-center justify-center gap-3">
              <ButtonDemo onClick={() => carouselRef.current?.previous()}>
                <ChevronRight size={16} className="rotate-180" />
                Previous
              </ButtonDemo>

              <ButtonDemo
                variant="primary"
                onClick={() => carouselRef.current?.next()}
              >
                Next
                <ChevronRight size={16} />
              </ButtonDemo>
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* VERTICAL                                                          */}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">Vertical Carousel</h2>

          <p className="mt-1 text-sm text-gray-500">
            Use the same component vertically for dashboards, stories, or
            stacked content.
          </p>
        </div>

        <ComponentDemo code={verticalCode}>
          <div className="mx-auto max-w-xl">
            <Carousel
              orientation="vertical"
              animation="depth"
              loop
              className="h-[420px]"
              viewportClassName="h-full"
            >
              {["01", "02", "03", "04"].map((number) => (
                <CarouselItem key={number}>
                  <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl bg-linear-to-br from-slate-900 via-indigo-950 to-purple-950 text-6xl font-bold text-white">
                    {number}
                  </div>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </ComponentDemo>
      </section>

      {/* API */}

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">API Reference</h2>

          <p className="mt-1 text-sm text-gray-500">
            Props available on the Carousel component.
          </p>
        </div>

        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
