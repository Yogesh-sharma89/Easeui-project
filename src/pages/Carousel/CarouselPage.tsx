import { useRef, useState, type ReactNode } from "react";
import {
  Accessibility,
  Camera,
  Check,
  ChevronRight,
  Heart,
  Info,
  Keyboard,
  Pause,
  Quote,
  Star,
  Zap,
} from "lucide-react";

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
  },
  {
    title: "Orbit Keyboard",
    category: "Workspace",
    price: "$149",
    rating: "4.8",
  },
  {
    title: "Focus Monitor",
    category: "Display",
    price: "$349",
    rating: "4.7",
  },
  {
    title: "Studio Mic",
    category: "Creator",
    price: "$199",
    rating: "4.9",
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
  },
  {
    title: "Electric",
    subtitle: "Built for movement",
  },
  {
    title: "Aurora",
    subtitle: "A different perspective",
  },
  {
    title: "Cosmic",
    subtitle: "Designed beyond limits",
  },
];

const basicUsageCode = `import {
  Carousel,
  CarouselItem,
} from "@/components/Carousel/Carousel";

<Carousel ariaLabel="Featured content">
  <CarouselItem>
    <div className="rounded-xl bg-(--primary-color) p-10 text-white">
      Slide One
    </div>
  </CarouselItem>

  <CarouselItem>
    <div className="rounded-xl bg-(--primary-color) p-10 text-white">
      Slide Two
    </div>
  </CarouselItem>

  <CarouselItem>
    <div className="rounded-xl bg-(--primary-color) p-10 text-white">
      Slide Three
    </div>
  </CarouselItem>
</Carousel>;`;

const multiCardCode = `<Carousel
  slidesPerView={3}
  gap={16}
  animation="scale"
  ariaLabel="Featured products"
>
  {products.map((product) => (
    <CarouselItem key={product.title}>
      <ProductCard {...product} />
    </CarouselItem>
  ))}
</Carousel>`;

const autoplayCode = `<Carousel
  autoplay
  autoplayInterval={2500}
  loop
  pauseOnHover
  pauseOnFocus
  showAutoplayControl
  animation="depth"
  ariaLabel="Featured stories"
>
  {slides.map((slide) => (
    <CarouselItem key={slide.id}>
      <Slide {...slide} />
    </CarouselItem>
  ))}
</Carousel>`;

const customControlsCode = `const carouselRef = useRef<CarouselRef>(null);

<Carousel
  ref={carouselRef}
  showControls={false}
  showIndicators={false}
  showAutoplayControl={false}
  loop
  ariaLabel="Custom controlled gallery"
>
  {/* slides */}
</Carousel>

<div className="flex gap-2">
  <button onClick={() => carouselRef.current?.previous()}>
    Previous
  </button>

  <button onClick={() => carouselRef.current?.next()}>
    Next
  </button>

  <button onClick={() => carouselRef.current?.goTo(0)}>
    First slide
  </button>
</div>`;

const verticalCode = `<Carousel
  orientation="vertical"
  slidesPerView={1}
  animation="depth"
  loop
  draggable
  ariaLabel="Vertical content carousel"
  className="h-[420px]"
  viewportClassName="h-full"
>
  {slides.map((slide) => (
    <CarouselItem key={slide.id}>
      <Slide {...slide} />
    </CarouselItem>
  ))}
</Carousel>`;

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
    description: "Automatically advances slides.",
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
    description: "Pauses autoplay while the pointer is over the carousel.",
  },
  {
    prop: "pauseOnFocus",
    type: "boolean",
    default: "true",
    description:
      "Pauses autoplay when keyboard/programmatic focus enters the carousel.",
  },
  {
    prop: "showAutoplayControl",
    type: "boolean",
    default: "true",
    description:
      "Shows the built-in start/stop control for autoplay when applicable.",
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
    description: "Displays pagination indicators.",
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
    description: "Controls the transition animation.",
  },
  {
    prop: "ariaLabel",
    type: "string",
    default: '"Carousel"',
    description: "Accessible name for the carousel region.",
  },
  {
    prop: "draggable",
    type: "boolean",
    default: "true",
    description: "Enables pointer/touch swipe navigation.",
  },
  {
    prop: "swipeThreshold",
    type: "number",
    default: "50",
    description: "Minimum drag distance in pixels required to change slides.",
  },
  {
    prop: "initialSlide",
    type: "number",
    default: "0",
    description: "Determines the initially active slide.",
  },
  {
    prop: "onSlideChange",
    type: "(index: number) => void",
    default: "-",
    description: "Called whenever the active slide changes.",
  },
  {
    prop: "className",
    type: "string",
    default: "-",
    description: "Additional classes for the carousel container.",
  },
  {
    prop: "viewportClassName",
    type: "string",
    default: "-",
    description: "Additional classes for the carousel viewport.",
  },
];


const refApiData = [
  {
    method: "next()",
    type: "() => void",
    description: "Moves to the next slide/page.",
  },
  {
    method: "previous()",
    type: "() => void",
    description: "Moves to the previous slide/page.",
  },
  {
    method: "goTo(index)",
    type: "(index: number) => void",
    description: "Moves directly to a slide/page. With loop enabled, indexes wrap.",
  },
  {
    method: "play()",
    type: "() => void",
    description: "Resumes autoplay and clears the user/focus pause state.",
  },
  {
    method: "pause()",
    type: "() => void",
    description: "Explicitly pauses autoplay.",
  },
  {
    method: "getCurrentIndex()",
    type: "() => number",
    description: "Returns the current slide/page index.",
  },
  {
    method: "isPlaying()",
    type: "() => boolean",
    description: "Returns whether autoplay is currently active.",
  },
];

const CarouselPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-16 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-(--border-color) bg-(--primary-soft) px-3 py-1.5 text-xs font-semibold text-(--primary-color)">
          <Zap size={13} aria-hidden="true" />
          Interactive component
        </div>

        <div className="space-y-3">
          <h1
            className="text-4xl font-bold tracking-tight text-(--text-color) sm:text-5xl"
          >
            Carousel
          </h1>

          <p className="max-w-2xl text-base leading-7 text-(--text-secondary) sm:text-lg">
            A flexible carousel for images, cards, testimonials, products, and
            other content that benefits from sequential navigation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-medium">
          {["Keyboard friendly", "Autoplay control", "Swipe / touch", "Looping", "Vertical mode"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-(--border-color) bg-(--surface-color) px-3 py-1.5 text-(--text-secondary)"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </header>

      {/* Basic usage */}
      <section aria-labelledby="basic-usage" className="space-y-5">
        <SectionHeading
          id="basic-usage"
          title="Basic Usage"
          description="Start with a simple single-slide carousel and let the component manage navigation."
        />

        <ComponentDemo code={basicUsageCode}>
          <Carousel ariaLabel="Featured content">
            {[
              {
                title: "Slide One",
              },
              {
                title: "Slide Two",
              },
              {
                title: "Slide Three",
              },
            ].map((slide) => (
              <CarouselItem key={slide.title}>
                <div
                  className="flex h-64 items-center justify-center rounded-2xl border border-(--border-color) bg-(--surface-color) px-6 text-center text-3xl font-bold text-(--text-color) shadow-md"
                >
                  {slide.title}
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* Multi card */}
      <section aria-labelledby="multi-card" className="space-y-5">
        <SectionHeading
          id="multi-card"
          title="Multi-Card Carousel"
          description="Show multiple items at once for product grids, testimonials, or content collections."
        />

        <ComponentDemo code={multiCardCode}>
          <Carousel
            slidesPerView={3}
            gap={16}
            animation="scale"
            ariaLabel="Featured products"
          >
            {products.map((product) => (
              <CarouselItem key={product.title}>
                <article className="h-full overflow-hidden rounded-2xl border border-(--border-color) bg-(--surface-color) shadow-sm">
                  <div
                    aria-hidden="true"
                    className={`h-40 bg-(--surface-color)`}
                  />

                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-(--text-muted)">
                          {product.category}
                        </p>
                        <h3 className="font-semibold text-(--text-color)">
                          {product.title}
                        </h3>
                      </div>

                      <button
                        type="button"
                        aria-label={`Add ${product.title} to favorites`}
                        className="rounded-md p-1.5 text-(--text-muted) transition hover:text-(--danger-color) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color)"
                      >
                        <Heart size={17} aria-hidden="true" />
                      </button>
                    </div>

                    <div
                      className="flex items-center gap-1 text-sm"
                      aria-label={`Rated ${product.rating} out of 5`}
                    >
                      <Star
                        size={15}
                        aria-hidden="true"
                        className="fill-(--warning-color) text-(--warning-color)"
                      />
                      <span>{product.rating}</span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-lg font-bold text-(--text-color)">{product.price}</span>

                      <button
                        type="button"
                        className="rounded-lg bg-(--primary-color) px-3 py-2 text-xs font-semibold text-white transition hover:bg-(--primary-hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:ring-offset-2"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* Autoplay */}
      <section aria-labelledby="autoplay" className="space-y-5">
        <SectionHeading
          id="autoplay"
          title="Autoplay + Depth Animation"
          description="Use autoplay for passive content, but always provide a clear way for users to stop movement."
        />

        <ComponentDemo code={autoplayCode}>
          <Carousel
            autoplay
            autoplayInterval={2500}
            loop
            pauseOnHover
            pauseOnFocus
            showAutoplayControl
            animation="depth"
            ariaLabel="Featured stories"
          >
            {images.map((image) => (
              <CarouselItem key={image.title}>
                <article
                  className={`relative h-72 overflow-hidden rounded-2xl bg-(--surface-color)`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/20"
                  />

                  <div className="relative flex h-full flex-col justify-end p-8 text-(--text-color)">
                    <Camera
                      size={22}
                      aria-hidden="true"
                      className="mb-4 text-(--primary-color)"
                    />
                    <h3 className="text-3xl font-bold">{image.title}</h3>
                    <p className="mt-1 text-(--text-secondary)">{image.subtitle}</p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="testimonials" className="space-y-5">
        <SectionHeading
          id="testimonials"
          title="Testimonial Carousel"
          description="Carousels can contain rich content, not just images."
        />

        <ComponentDemo
          code={`<Carousel animation="fade" loop ariaLabel="Customer testimonials">
  {testimonials.map((item) => (
    <CarouselItem key={item.name}>
      <TestimonialCard {...item} />
    </CarouselItem>
  ))}
</Carousel>`}
        >
          <Carousel animation="fade" loop ariaLabel="Customer testimonials">
            {testimonials.map((item) => (
              <CarouselItem key={item.name}>
                <article className="rounded-2xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm sm:p-8">
                  <Quote
                    size={30}
                    aria-hidden="true"
                    className="mb-6 text-(--primary-color)"
                  />

                  <blockquote className="max-w-2xl text-lg leading-8 text-(--text-secondary) sm:text-xl">
                    “{item.text}”
                  </blockquote>

                  <footer className="mt-7">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-(--text-muted)">{item.role}</p>
                  </footer>
                </article>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* Controlled state */}
      <section aria-labelledby="controlled" className="space-y-5">
        <SectionHeading
          id="controlled"
          title="Controlled Slide Tracking"
          description="Use onSlideChange when another part of your UI needs to know which slide is active."
        />

        <ComponentDemo
          code={`const [activeSlide, setActiveSlide] = useState(0);

<Carousel
  onSlideChange={setActiveSlide}
  ariaLabel="Controlled image gallery"
>
  {/* slides */}
</Carousel>

<p>Active slide: {activeSlide + 1}</p>`}
        >
          <Carousel
            onSlideChange={setActiveSlide}
            ariaLabel="Controlled image gallery"
          >
            {images.map((image) => (
              <CarouselItem key={image.title}>
                <div
                  aria-label={image.title}
                  className={`h-56 rounded-2xl bg-(--surface-color)`}
                />
              </CarouselItem>
            ))}
          </Carousel>

          <div
            className="mt-5 flex items-center justify-center"
            aria-live="polite"
          >
            <div className="rounded-full border border-(--border-color) bg-(--surface-muted) px-4 py-2 text-sm font-medium text-(--text-secondary)">
              Active slide:{" "}
              <span className="text-(--primary-color)">
                {activeSlide + 1}
              </span>
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* Custom controls */}
      <section aria-labelledby="custom-controls" className="space-y-5">
        <SectionHeading
          id="custom-controls"
          title="Custom Controls"
          description="Hide the default controls when you need a custom navigation design."
        />

        <ComponentDemo code={customControlsCode}>
          <div className="space-y-5">
            <Carousel
              ref={carouselRef}
              showControls={false}
              showIndicators={false}
              showAutoplayControl={false}
              animation="scale"
              loop
              ariaLabel="Custom controlled gallery"
            >
              {images.map((image) => (
                <CarouselItem key={image.title}>
                  <article
                    className="relative h-56 overflow-hidden rounded-2xl border border-(--border-color) bg-(--surface-color) shadow-md"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-black/20"
                    />

                    <div className="relative flex h-full flex-col justify-end p-7 text-(--text-color)">
                      <p className="text-xs font-medium uppercase tracking-widest text-(--text-muted)">
                        Custom controls
                      </p>
                      <h3 className="mt-2 text-3xl font-bold">{image.title}</h3>
                      <p className="mt-1 text-sm text-(--text-secondary)">
                        {image.subtitle}
                      </p>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </Carousel>

            <div
              className="flex items-center justify-center gap-3"
              aria-label="Carousel navigation"
            >
              <ButtonDemo
                onClick={() => carouselRef.current?.previous()}
              >
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                  className="rotate-180"
                />
                Previous
              </ButtonDemo>

              <ButtonDemo
                variant="primary"
                onClick={() => carouselRef.current?.next()}
              >
                Next
                <ChevronRight size={16} aria-hidden="true" />
              </ButtonDemo>

              <ButtonDemo
                onClick={() => carouselRef.current?.goTo(0)}
              >
                First slide
              </ButtonDemo>
            </div>
          </div>
        </ComponentDemo>
      </section>

      {/* Imperative controls */}
      <section aria-labelledby="imperative-controls" className="space-y-5">
        <SectionHeading
          id="imperative-controls"
          title="Imperative Controls"
          description="Control navigation and autoplay programmatically with CarouselRef."
        />

        <ComponentDemo
          code={`const carouselRef = useRef<CarouselRef>(null);

<Carousel
  ref={carouselRef}
  autoplay
  autoplayInterval={2500}
  loop
  showAutoplayControl={false}
  ariaLabel="Programmatically controlled gallery"
>
  {/* slides */}
</Carousel>

<button onClick={() => carouselRef.current?.play()}>
  Start rotation
</button>

<button onClick={() => carouselRef.current?.pause()}>
  Stop rotation
</button>`}
        >
          <Carousel
            ref={carouselRef}
            autoplay
            autoplayInterval={2500}
            loop
            showAutoplayControl={false}
            ariaLabel="Programmatically controlled gallery"
          >
            {images.map((image) => (
              <CarouselItem key={image.title}>
                <article
                  className="flex h-56 items-end rounded-2xl border border-(--border-color) bg-(--surface-color) p-7 text-(--text-color)"
                >
                  <div>
                    <h3 className="text-3xl font-bold">{image.title}</h3>
                    <p className="mt-1 text-(--text-secondary)">{image.subtitle}</p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </Carousel>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <ButtonDemo onClick={() => carouselRef.current?.play()}>
              Start rotation
            </ButtonDemo>
            <ButtonDemo onClick={() => carouselRef.current?.pause()}>
              Stop rotation
            </ButtonDemo>
          </div>
        </ComponentDemo>
      </section>

      {/* Swipe / touch */}
      <section aria-labelledby="swipe-touch" className="space-y-5">
        <SectionHeading
          id="swipe-touch"
          title="Swipe & Touch"
          description="Use pointer and touch gestures as an additional navigation method."
        />

        <ComponentDemo
          code={`<Carousel
  draggable
  swipeThreshold={50}
  ariaLabel="Swipeable gallery"
>
  {slides.map((slide) => (
    <CarouselItem key={slide.id}>
      <Slide {...slide} />
    </CarouselItem>
  ))}
</Carousel>`}
        >
          <Carousel
            draggable
            swipeThreshold={50}
            ariaLabel="Swipeable gallery"
          >
            {images.map((image) => (
              <CarouselItem key={image.title}>
                <div
                  className="flex h-56 items-center justify-center rounded-2xl border border-(--border-color) bg-(--surface-color) text-3xl font-bold text-(--text-color)"
                >
                  {image.title}
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* Vertical */}
      <section aria-labelledby="vertical" className="space-y-5">
        <SectionHeading
          id="vertical"
          title="Vertical Carousel"
          description="Use the same component vertically for dashboards, stories, or stacked content."
        />

        <ComponentDemo code={verticalCode}>
          <div className="mx-auto max-w-xl">
            <Carousel
              orientation="vertical"
              slidesPerView={1}
              animation="depth"
              loop
              draggable
              ariaLabel="Vertical content carousel"
              className="h-[420px]"
              viewportClassName="h-full"
            >
              {["01", "02", "03", "04"].map((number) => (
                <CarouselItem key={number}>
                  <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-(--border-color) bg-(--surface-color) text-6xl font-bold text-(--primary-color) shadow-md">
                    {number}
                  </div>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </ComponentDemo>
      </section>

      {/* Initial slide */}
      <section aria-labelledby="initial-slide" className="space-y-5">
        <SectionHeading
          id="initial-slide"
          title="Initial Slide"
          description="Start from a specific slide index when the first slide is not the desired starting point."
        />

        <ComponentDemo
          code={`<Carousel
  initialSlide={2}
  ariaLabel="Gallery starting at the third slide"
>
  {/* slides */}
</Carousel>`}
        >
          <Carousel
            initialSlide={2}
            ariaLabel="Gallery starting at the third slide"
          >
            {images.map((image) => (
              <CarouselItem key={image.title}>
                <div
                  className="flex h-56 items-center justify-center rounded-2xl border border-(--border-color) bg-(--surface-color) text-3xl font-bold text-(--text-color)"
                >
                  {image.title}
                </div>
              </CarouselItem>
            ))}
          </Carousel>
        </ComponentDemo>
      </section>

      {/* Accessibility */}
      <section
        aria-labelledby="accessibility"
        className="rounded-3xl border border-(--border-color) bg-(--primary-soft) p-6 sm:p-8"
      >
        <div className="flex gap-4">
          <div className="mt-0.5 hidden shrink-0 rounded-xl bg-(--primary-color) p-2 text-white sm:block">
            <Accessibility size={20} aria-hidden="true" />
          </div>

          <div className="min-w-0 space-y-6">
            <div>
              <h2
                id="accessibility"
                className="text-2xl font-semibold text-(--text-color)"
              >
                Accessibility guidance
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-(--text-secondary)">
                A production carousel should not rely on animation alone.
                Keyboard access, clear controls, meaningful labels, and a
                reliable pause mechanism are part of the component contract.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Guideline
                icon={<Keyboard size={16} aria-hidden="true" />}
                title="Keyboard interaction"
                text="Previous, next, indicators, and any pause control should be reachable with the keyboard."
              />
              <Guideline
                icon={<Pause size={16} aria-hidden="true" />}
                title="Autoplay control"
                text="Autoplay should be stoppable. Hover-only pausing is not enough for every user."
              />
              <Guideline
                icon={<Info size={16} aria-hidden="true" />}
                title="Meaningful labels"
                text="The carousel and its controls should expose useful accessible names."
              />
              <Guideline
                icon={<Check size={16} aria-hidden="true" />}
                title="Reduced motion"
                text="Animations should respect the user's prefers-reduced-motion preference."
              />
              <Guideline
                icon={<Camera size={16} aria-hidden="true" />}
                title="Touch and pointer input"
                text="Swipe is an additional interaction method and should not replace keyboard navigation."
              />
            </div>

            <div className="rounded-2xl border border-(--border-color) bg-(--surface-color) p-4 text-sm leading-6 text-(--text-secondary)">
              <strong className="text-(--text-color)">
                Important:
              </strong>{" "}
              this documentation demonstrates accessible usage patterns, but
              the library should only claim formal WCAG compliance after the
              underlying Carousel implementation has been tested with keyboard
              navigation, screen readers, reduced motion, and automated
              accessibility tooling.
            </div>
          </div>
        </div>
      </section>

      {/* API */}
      <section aria-labelledby="api-reference" className="space-y-5">
        <SectionHeading
          id="api-reference"
          title="API Reference"
          description="Props currently exposed by the Carousel component."
        />

        <PropsTable data={propsData} />
      </section>
      {/* Ref API */}
      <section aria-labelledby="ref-api" className="space-y-5">
        <SectionHeading
          id="ref-api"
          title="Ref API"
          description="Imperative methods exposed through CarouselRef."
        />
        <PropsTable data={refApiData} />
      </section>

    </main>
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
    <p className="mt-1 max-w-3xl text-sm leading-6 text-(--text-muted)">
      {description}
    </p>
  </div>
);

type GuidelineProps = {
  icon: ReactNode;
  title: string;
  text: string;
};

const Guideline = ({ icon, title, text }: GuidelineProps) => (
  <div className="rounded-2xl border border-(--border-color) bg-(--surface-color) p-4">
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-(--primary-color)">{icon}</span>
      <div>
        <h3 className="text-sm font-semibold text-(--text-color)">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-(--text-secondary)">
          {text}
        </p>
      </div>
    </div>
  </div>
);

export default CarouselPage;
