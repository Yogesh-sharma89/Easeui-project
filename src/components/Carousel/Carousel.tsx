import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/libs/utils";

export type CarouselOrientation = "horizontal" | "vertical";

export type CarouselAnimation =
  | "slide"
  | "fade"
  | "scale"
  | "depth";

export interface CarouselRef {
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  play: () => void;
  pause: () => void;
  getCurrentIndex: () => number;
  isPlaying: () => boolean;
}

export interface CarouselProps {
  children: ReactNode;

  /** Number of items visible in the viewport. Values are normalized to >= 1. */
  slidesPerView?: number;

  /** Gap between slides in pixels. */
  gap?: number;

  /** Wrap from the final page back to the first page. */
  loop?: boolean;

  /** Automatically advance slides. */
  autoplay?: boolean;

  /** Delay between autoplay transitions in milliseconds. */
  autoplayInterval?: number;

  /** Temporarily pauses autoplay while the pointer is over the carousel. */
  pauseOnHover?: boolean;

  /**
   * Pauses autoplay when keyboard focus enters the carousel.
   * Autoplay remains paused until the user explicitly starts it again.
   */
  pauseOnFocus?: boolean;

  /**
   * Shows the built-in start/stop rotation control when autoplay is enabled.
   * Enabled by default because auto-rotation should always have an explicit
   * user-facing stop/start mechanism.
   */
  showAutoplayControl?: boolean;

  /** Shows previous/next controls. */
  showControls?: boolean;

  /** Shows slide picker indicators. */
  showIndicators?: boolean;

  orientation?: CarouselOrientation;

  animation?: CarouselAnimation;

  /** Accessible name for the carousel region. */
  ariaLabel?: string;

  /** Enables pointer/touch swipe navigation. */
  draggable?: boolean;

  /** Minimum drag distance in pixels required to change slides. */
  swipeThreshold?: number;

  className?: string;
  viewportClassName?: string;

  /** Initial page index. */
  initialSlide?: number;

  onSlideChange?: (index: number) => void;
}

export interface CarouselItemProps {
  children: ReactNode;
  className?: string;
}

const CarouselItem = ({ children, className }: CarouselItemProps) => {
  return (
    <div className={cn("min-w-0 shrink-0", className)}>
      {children}
    </div>
  );
};

CarouselItem.displayName = "CarouselItem";

const normalizePositiveInteger = (value: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(1, Math.floor(value));
};

const normalizeNonNegativeNumber = (value: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(0, value);
};

const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      slidesPerView = 1,
      gap = 16,
      loop = false,
      autoplay = false,
      autoplayInterval = 4000,
      pauseOnHover = true,
      pauseOnFocus = true,
      showAutoplayControl = true,
      showControls = true,
      showIndicators = true,
      orientation = "horizontal",
      animation = "slide",
      ariaLabel = "Carousel",
      draggable = true,
      swipeThreshold = 50,
      className,
      viewportClassName,
      initialSlide = 0,
      onSlideChange,
    },
    ref,
  ) => {
    const slides = useMemo(() => Children.toArray(children), [children]);
    const totalSlides = slides.length;

    const normalizedSlidesPerView = normalizePositiveInteger(
      slidesPerView,
      1,
    );

    /*
     * If a consumer asks for 5 visible slides but only provides 3,
     * displaying three full-width items is much more useful than leaving
     * empty space in the viewport.
     */
    const visibleSlides = Math.min(
      normalizedSlidesPerView,
      Math.max(totalSlides, 1),
    );

    const normalizedGap = normalizeNonNegativeNumber(gap, 16);
    const normalizedInterval = Math.max(
      100,
      normalizeNonNegativeNumber(autoplayInterval, 4000),
    );
    const normalizedSwipeThreshold = Math.max(
      1,
      normalizeNonNegativeNumber(swipeThreshold, 50),
    );

    /*
     * A page represents the first visible item.
     *
     * Example:
     * totalSlides = 5, visibleSlides = 3
     * pageCount = 3
     * pages start at 0, 1, 2
     */
    const pageCount = Math.max(
      totalSlides - visibleSlides + 1,
      1,
    );

    const initialIndex = Math.max(
      0,
      Math.min(
        Number.isFinite(initialSlide) ? Math.trunc(initialSlide) : 0,
        pageCount - 1,
      ),
    );

    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    /*
     * User pause is different from hover/focus pause.
     *
     * Hover/focus are temporary environmental pauses.
     * userPaused is an explicit user choice and persists until play()
     * or the rotation control is activated.
     */
    const [userPaused, setUserPaused] = useState(false);
    const [focusPaused, setFocusPaused] = useState(false);

    const prefersReducedMotion = useReducedMotion();

    const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );
    const pointerDownRef = useRef(false);

    const safeIndex = Math.max(
      0,
      Math.min(currentIndex, pageCount - 1),
    );

    const canMovePrevious = loop || safeIndex > 0;
    const canMoveNext = loop || safeIndex < pageCount - 1;

    const isAutoRotationAllowed =
      autoplay &&
      !prefersReducedMotion &&
      totalSlides > visibleSlides;

    const isPlaying =
      isAutoRotationAllowed &&
      !userPaused &&
      !focusPaused &&
      !isHovered &&
      !isDragging &&
      (loop || safeIndex < pageCount - 1);

    /*
     * Keep state valid when children or slidesPerView change dynamically.
     */
    useEffect(() => {
      setCurrentIndex((previous) =>
        Math.max(0, Math.min(previous, pageCount - 1)),
      );
    }, [pageCount]);

    /*
     * If autoplay is disabled by the parent, clear an internal pause
     * so toggling autoplay back on behaves predictably.
     */
    useEffect(() => {
      if (!autoplay) {
        setUserPaused(false);
        setFocusPaused(false);
      }
    }, [autoplay]);

    /*
     * WAI-ARIA carousel guidance recommends stopping rotation when
     * keyboard focus enters an auto-rotating carousel and not restarting
     * until the user explicitly starts it again.
     */
    const handleFocusCapture = useCallback(() => {
      /*
       * Pause on keyboard/programmatic focus, but do not treat a normal
       * mouse/touch click as a keyboard-focus pause. Pointer capture below
       * lets us distinguish the two cases without requiring a global
       * modality manager.
       */
      if (
        pauseOnFocus &&
        isAutoRotationAllowed &&
        !pointerDownRef.current
      ) {
        setFocusPaused(true);
      }
    }, [isAutoRotationAllowed, pauseOnFocus]);

    const goTo = useCallback(
      (index: number) => {
        if (!totalSlides) return;

        const numericIndex = Number.isFinite(index)
          ? Math.trunc(index)
          : 0;

        let nextIndex: number;

        if (loop) {
          /*
           * Proper modulo handling means goTo(-1) becomes the final page
           * and goTo(pageCount + 1) wraps correctly as well.
           */
          nextIndex =
            ((numericIndex % pageCount) + pageCount) %
            pageCount;
        } else {
          nextIndex = Math.max(
            0,
            Math.min(numericIndex, pageCount - 1),
          );
        }

        setCurrentIndex(nextIndex);
      },
      [loop, pageCount, totalSlides],
    );

    const next = useCallback(() => {
      goTo(safeIndex + 1);
    }, [goTo, safeIndex]);

    const previous = useCallback(() => {
      goTo(safeIndex - 1);
    }, [goTo, safeIndex]);

    const play = useCallback(() => {
      if (!autoplay) return;

      setUserPaused(false);
      setFocusPaused(false);
    }, [autoplay]);

    const pause = useCallback(() => {
      setUserPaused(true);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        goTo,
        play,
        pause,
        getCurrentIndex: () => safeIndex,
        isPlaying: () => isPlaying,
      }),
      [goTo, isPlaying, next, pause, play, previous, safeIndex],
    );

    useEffect(() => {
      onSlideChange?.(safeIndex);
    }, [onSlideChange, safeIndex]);

    /*
     * Use a timeout instead of setInterval.
     *
     * This guarantees that a new timer is scheduled only after React has
     * settled on the current slide and makes cleanup deterministic when
     * autoplay is paused, unmounted, or its dependencies change.
     */
    useEffect(() => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }

      if (!isPlaying) return;

      autoplayTimerRef.current = setTimeout(() => {
        next();
      }, normalizedInterval);

      return () => {
        if (autoplayTimerRef.current) {
          clearTimeout(autoplayTimerRef.current);
          autoplayTimerRef.current = null;
        }
      };
    }, [isPlaying, next, normalizedInterval]);

    /*
     * Keyboard support is intentionally limited to navigation keys.
     * Interactive children such as inputs, textareas, selects, links and
     * buttons keep their native keyboard behavior.
     */
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement | null;

        if (
          target &&
          (target.isContentEditable ||
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.tagName === "SELECT" ||
            target.tagName === "BUTTON" ||
            target.tagName === "A")
        ) {
          return;
        }

        if (
          orientation === "horizontal" &&
          event.key === "ArrowRight"
        ) {
          event.preventDefault();
          next();
          return;
        }

        if (
          orientation === "horizontal" &&
          event.key === "ArrowLeft"
        ) {
          event.preventDefault();
          previous();
          return;
        }

        if (
          orientation === "vertical" &&
          event.key === "ArrowDown"
        ) {
          event.preventDefault();
          next();
          return;
        }

        if (
          orientation === "vertical" &&
          event.key === "ArrowUp"
        ) {
          event.preventDefault();
          previous();
        }
      },
      [next, orientation, previous],
    );

    const handleDragEnd = useCallback(
      (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo,
      ) => {
        setIsDragging(false);

        const threshold = normalizedSwipeThreshold;

        if (orientation === "horizontal") {
          if (info.offset.x < -threshold && canMoveNext) {
            next();
          } else if (info.offset.x > threshold && canMovePrevious) {
            previous();
          }

          return;
        }

        if (info.offset.y < -threshold && canMoveNext) {
          next();
        } else if (info.offset.y > threshold && canMovePrevious) {
          previous();
        }
      },
      [
        canMoveNext,
        canMovePrevious,
        next,
        normalizedSwipeThreshold,
        orientation,
        previous,
      ],
    );

    /*
     * The important positioning formula is:
     *
     * item width + gap
     *
     * rather than a percentage of the track width.
     *
     * The previous implementation translated the track using
     * `safeIndex * (100 / slidesPerView)%`, but percentage transforms on
     * the track are relative to the track itself, not the viewport. This
     * becomes increasingly inaccurate with multiple slides and gaps.
     */
    const trackOffset = `calc(-${safeIndex} * ((100% - ${
      normalizedGap * (visibleSlides - 1)
    }px) / ${visibleSlides} + ${normalizedGap}px))`;

    const itemSize =
      orientation === "horizontal"
        ? {
            width: `calc((100% - ${
              normalizedGap * (visibleSlides - 1)
            }px) / ${visibleSlides})`,
          }
        : {
            height: `calc((100% - ${
              normalizedGap * (visibleSlides - 1)
            }px) / ${visibleSlides})`,
          };

    const getItemAnimation = (index: number) => {
      const isVisible =
        index >= safeIndex &&
        index < safeIndex + visibleSlides;

      if (prefersReducedMotion || animation === "slide") {
        return {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        };
      }

      switch (animation) {
        case "fade":
          return {
            opacity: isVisible ? 1 : 0.35,
            scale: 1,
            filter: "blur(0px)",
          };

        case "scale":
          return {
            opacity: isVisible ? 1 : 0.7,
            scale: isVisible ? 1 : 0.96,
            filter: "blur(0px)",
          };

        case "depth":
          return {
            opacity: isVisible ? 1 : 0.5,
            scale: isVisible ? 1 : 0.94,
            filter: isVisible
              ? "blur(0px)"
              : "blur(2px)",
          };

        default:
          return {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          };
      }
    };

    const animationDuration = prefersReducedMotion
      ? 0
      : animation === "depth"
        ? 0.6
        : 0.4;

    const visibleRangeStart = safeIndex + 1;
    const visibleRangeEnd = Math.min(
      safeIndex + visibleSlides,
      totalSlides,
    );

    const liveMessage =
      visibleSlides === 1
        ? `Slide ${visibleRangeStart} of ${totalSlides}`
        : `Showing slides ${visibleRangeStart} to ${visibleRangeEnd} of ${totalSlides}`;

    if (!totalSlides) return null;

    return (
      <section
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        onPointerDownCapture={() => {
          pointerDownRef.current = true;
        }}
        onPointerUpCapture={() => {
          pointerDownRef.current = false;
        }}
        onPointerCancelCapture={() => {
          pointerDownRef.current = false;
        }}
        onFocusCapture={handleFocusCapture}
        onMouseEnter={() => {
          if (pauseOnHover) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (pauseOnHover) {
            setIsHovered(false);
          }
        }}
        className={cn(
          "relative w-full outline-none",
          className,
        )}
      >
        {autoplay &&
          showAutoplayControl &&
          !prefersReducedMotion &&
          totalSlides > visibleSlides && (
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (userPaused || focusPaused) {
                    play();
                  } else {
                    pause();
                  }
                }}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-lg",
                  "border border-(--border-color)",
                  "bg-(--surface-color)",
                  "px-3 py-2 text-sm font-medium",
                  "text-(--text-color)",
                  "shadow-sm transition-colors",
                  "hover:border-(--primary-color)",
                  "hover:text-(--primary-color)",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-(--primary-color)",
                  "focus-visible:ring-offset-2",
                )}
              >
                {userPaused || focusPaused ? (
                  <>
                    <Play size={15} aria-hidden="true" />
                    Start slide rotation
                  </>
                ) : (
                  <>
                    <Pause size={15} aria-hidden="true" />
                    Stop slide rotation
                  </>
                )}
              </button>
            </div>
          )}

        <div
          className={cn(
            "relative overflow-hidden",
            orientation === "horizontal" ? "w-full" : "h-full",
            viewportClassName,
          )}
          style={{
            touchAction:
              orientation === "horizontal"
                ? "pan-y"
                : "pan-x",
          }}
        >
          <motion.div
            className={cn(
              "flex w-full select-none will-change-transform",
              orientation === "horizontal"
                ? "flex-row"
                : "flex-col",
            )}
            style={{ gap: normalizedGap }}
            animate={
              orientation === "horizontal"
                ? { x: trackOffset }
                : { y: trackOffset }
            }
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={
              draggable
                ? orientation === "horizontal"
                  ? "x"
                  : "y"
                : false
            }
            dragConstraints={
              orientation === "horizontal"
                ? { left: 0, right: 0 }
                : { top: 0, bottom: 0 }
            }
            dragElastic={0.08}
            dragMomentum={false}
            dragDirectionLock
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
          >
            {slides.map((slide, index) => {
              const isVisible =
                index >= safeIndex &&
                index < safeIndex + visibleSlides;

              return (
                <motion.div
                  key={slide.key ?? index}
                  style={itemSize}
                  initial={false}
                  animate={getItemAnimation(index)}
                  transition={{
                    duration: animationDuration,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${index + 1} of ${totalSlides}`}
                  aria-hidden={!isVisible}
                  inert={!isVisible ? true : undefined}
                >
                  {slide}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {showControls && totalSlides > visibleSlides && (
          <>
            <motion.button
              type="button"
              aria-label={
                orientation === "horizontal"
                  ? "Previous slide"
                  : "Previous item"
              }
              disabled={!canMovePrevious}
              onClick={previous}
              whileHover={
                canMovePrevious
                  ? { scale: 1.05 }
                  : undefined
              }
              whileTap={
                canMovePrevious
                  ? { scale: 0.95 }
                  : undefined
              }
              className={cn(
                "absolute z-20 flex h-11 w-11 items-center justify-center",
                "rounded-full border",
                "border-(--border-color)",
                "bg-(--surface-color)/95",
                "text-(--text-color)",
                "shadow-md backdrop-blur-md",
                "transition-colors",
                "hover:border-(--primary-color)",
                "hover:text-(--primary-color)",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-(--primary-color)",
                "focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-30",
                orientation === "horizontal"
                  ? "left-3 top-1/2 -translate-y-1/2"
                  : "left-1/2 top-3 -translate-x-1/2",
              )}
            >
              <ChevronLeft
                size={19}
                aria-hidden="true"
                className={
                  orientation === "vertical"
                    ? "rotate-90"
                    : undefined
                }
              />
            </motion.button>

            <motion.button
              type="button"
              aria-label={
                orientation === "horizontal"
                  ? "Next slide"
                  : "Next item"
              }
              disabled={!canMoveNext}
              onClick={next}
              whileHover={
                canMoveNext
                  ? { scale: 1.05 }
                  : undefined
              }
              whileTap={
                canMoveNext
                  ? { scale: 0.95 }
                  : undefined
              }
              className={cn(
                "absolute z-20 flex h-11 w-11 items-center justify-center",
                "rounded-full border",
                "border-(--border-color)",
                "bg-(--surface-color)/95",
                "text-(--text-color)",
                "shadow-md backdrop-blur-md",
                "transition-colors",
                "hover:border-(--primary-color)",
                "hover:text-(--primary-color)",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-(--primary-color)",
                "focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-30",
                orientation === "horizontal"
                  ? "right-3 top-1/2 -translate-y-1/2"
                  : "bottom-3 left-1/2 -translate-x-1/2",
              )}
            >
              <ChevronRight
                size={19}
                aria-hidden="true"
                className={
                  orientation === "vertical"
                    ? "rotate-90"
                    : undefined
                }
              />
            </motion.button>
          </>
        )}

        {showIndicators && pageCount > 1 && (
          <div
            className="mt-3 flex min-h-11 items-center justify-center gap-1"
            role="group"
            aria-label="Choose slide to display"
          >
            {Array.from({ length: pageCount }).map((_, index) => {
              const isActive = index === safeIndex;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  aria-disabled={isActive}
                  onClick={() => {
                    if (!isActive) {
                      goTo(index);
                    }
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color) focus-visible:ring-offset-2"
                >
                  <motion.span
                    aria-hidden="true"
                    animate={{
                      width: isActive ? 28 : 8,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.2,
                    }}
                    className="block h-2 rounded-full bg-(--primary-color)"
                  />
                </button>
              );
            })}
          </div>
        )}

        <div
          className="sr-only"
          aria-live={
            autoplay && isPlaying ? "off" : "polite"
          }
          aria-atomic="true"
        >
          {liveMessage}
        </div>
      </section>
    );
  },
);

Carousel.displayName = "Carousel";

export { Carousel, CarouselItem };
