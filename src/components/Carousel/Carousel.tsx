import React, {
  Children,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
 
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type {PanInfo} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/libs/utils";

export type CarouselOrientation =
  | "horizontal"
  | "vertical";

export type CarouselAnimation =
  | "slide"
  | "fade"
  | "scale"
  | "depth";

export interface CarouselRef {
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  getCurrentIndex: () => number;
}

export interface CarouselProps {
  children: ReactNode;

  slidesPerView?: number;
  gap?: number;

  loop?: boolean;

  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;

  showControls?: boolean;
  showIndicators?: boolean;

  orientation?: CarouselOrientation;

  animation?: CarouselAnimation;

  className?: string;
  viewportClassName?: string;

  initialSlide?: number;

  onSlideChange?: (index: number) => void;
}

export interface CarouselItemProps {
  children: ReactNode;
  className?: string;
}

const CarouselItem = ({
  children,
  className,
}: CarouselItemProps) => {
  return (
    <div
      className={cn(
        "min-w-0 shrink-0",
        className
      )}
    >
      {children}
    </div>
  );
};

const Carousel = React.forwardRef<
  CarouselRef,
  CarouselProps
>(
  (
    {
      children,
      slidesPerView = 1,
      gap = 16,
      loop = false,
      autoplay = false,
      autoplayInterval = 4000,
      pauseOnHover = true,
      showControls = true,
      showIndicators = true,
      orientation = "horizontal",
      animation = "slide",
      className,
      viewportClassName,
      initialSlide = 0,
      onSlideChange,
    },
    ref
  ) => {
    const slides = useMemo(
      () => Children.toArray(children),
      [children]
    );

    const totalSlides = slides.length;

    const [currentIndex, setCurrentIndex] =
      useState(() =>
        Math.max(
          0,
          Math.min(
            initialSlide,
            Math.max(totalSlides - 1, 0)
          )
        )
      );

    const [isHovered, setIsHovered] =
      useState(false);

    const [isDragging, setIsDragging] =
      useState(false);

    const autoplayRef =
      useRef<ReturnType<typeof setInterval> | null>(
        null
      );

    const pageCount = Math.max(
      totalSlides - slidesPerView + 1,
      1
    );

    const safeIndex = Math.max(
      0,
      Math.min(currentIndex, pageCount - 1)
    );

    const goTo = useCallback(
      (index: number) => {
        if (!totalSlides) return;

        let nextIndex = index;

        if (loop) {
          if (index < 0) {
            nextIndex = pageCount - 1;
          }

          if (index >= pageCount) {
            nextIndex = 0;
          }
        } else {
          nextIndex = Math.max(
            0,
            Math.min(index, pageCount - 1)
          );
        }

        setCurrentIndex(nextIndex);
      },
      [loop, pageCount, totalSlides]
    );

    const next = useCallback(() => {
      goTo(safeIndex + 1);
    }, [goTo, safeIndex]);

    const previous = useCallback(() => {
      goTo(safeIndex - 1);
    }, [goTo, safeIndex]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        goTo,
        getCurrentIndex: () => safeIndex,
      }),
      [next, previous, goTo, safeIndex]
    );

    useEffect(() => {
      onSlideChange?.(safeIndex);
    }, [safeIndex, onSlideChange]);

    useEffect(() => {
      if (
        !autoplay ||
        isHovered ||
        isDragging ||
        totalSlides <= slidesPerView
      ) {
        return;
      }

      autoplayRef.current = setInterval(() => {
        next();
      }, autoplayInterval);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }, [
      autoplay,
      autoplayInterval,
      isHovered,
      isDragging,
      next,
      slidesPerView,
      totalSlides,
    ]);

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (
        orientation === "horizontal" &&
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        next();
      }

      if (
        orientation === "horizontal" &&
        event.key === "ArrowLeft"
      ) {
        event.preventDefault();
        previous();
      }

      if (
        orientation === "vertical" &&
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        next();
      }

      if (
        orientation === "vertical" &&
        event.key === "ArrowUp"
      ) {
        event.preventDefault();
        previous();
      }
    };

    const handleDragEnd = (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      setIsDragging(false);

      const threshold = 50;

      if (
        orientation === "horizontal"
      ) {
        if (info.offset.x < -threshold) {
          next();
        }

        if (info.offset.x > threshold) {
          previous();
        }

        return;
      }

      if (info.offset.y < -threshold) {
        next();
      }

      if (info.offset.y > threshold) {
        previous();
      }
    };

    const getAnimation = () => {
      switch (animation) {
        case "fade":
          return {
            initial: {
              opacity: 0,
              scale: 0.98,
            },
            animate: {
              opacity: 1,
              scale: 1,
            },
          };

        case "scale":
          return {
            initial: {
              opacity: 0,
              scale: 0.88,
            },
            animate: {
              opacity: 1,
              scale: 1,
            },
          };

        case "depth":
          return {
            initial: {
              opacity: 0.35,
              scale: 0.94,
              filter: "blur(3px)",
            },
            animate: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            },
          };

        case "slide":
        default:
          return {
            initial: {
              opacity: 1,
              scale: 1,
            },
            animate: {
              opacity: 1,
              scale: 1,
            },
          };
      }
    };

    const animationConfig = getAnimation();

    const itemSize =
      orientation === "horizontal"
        ? {
            width: `calc((100% - ${
              gap * (slidesPerView - 1)
            }px) / ${slidesPerView})`,
          }
        : {
            height: `calc((100% - ${
              gap * (slidesPerView - 1)
            }px) / ${slidesPerView})`,
          };

    if (!totalSlides) return null;

    const canGoPrevious =
      loop || safeIndex > 0;

    const canGoNext =
      loop || safeIndex < pageCount - 1;

    return (
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
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
          className
        )}
      >
        {/* VIEWPORT */}

        <div
          className={cn(
            "relative overflow-hidden",
            orientation === "horizontal"
              ? "w-full"
              : "h-full",
            viewportClassName
          )}
        >
          <motion.div
            className={cn(
              "flex select-none",
              orientation === "horizontal"
                ? "flex-row"
                : "flex-col"
            )}
            style={{ gap }}
            animate={
              orientation === "horizontal"
                ? {
                    x: `calc(-${
                      safeIndex *
                      (100 / slidesPerView)
                    }% - ${
                      safeIndex *
                      ((gap *
                        (slidesPerView - 1)) /
                        slidesPerView)
                    }px)`,
                  }
                : {
                    y: `calc(-${
                      safeIndex *
                      (100 / slidesPerView)
                    }% - ${
                      safeIndex *
                      ((gap *
                        (slidesPerView - 1)) /
                        slidesPerView)
                    }px)`,
                  }
            }
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={
              orientation === "horizontal"
                ? "x"
                : "y"
            }
            dragConstraints={
              orientation === "horizontal"
                ? {
                    left: 0,
                    right: 0,
                  }
                : {
                    top: 0,
                    bottom: 0,
                  }
            }
            dragElastic={0.08}
            onDragStart={() =>
              setIsDragging(true)
            }
            onDragEnd={handleDragEnd}
          >
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                style={itemSize}
                initial={animationConfig.initial}
                animate={
                  animationConfig.animate
                }
                transition={{
                  duration:
                    animation === "depth"
                      ? 0.65
                      : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {slide}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BUILT-IN CONTROLS */}

        {showControls &&
          totalSlides > slidesPerView && (
            <>
              <motion.button
                type="button"
                aria-label={
                  orientation ===
                  "horizontal"
                    ? "Previous slide"
                    : "Previous item"
                }
                disabled={!canGoPrevious}
                onClick={previous}
                whileHover={
                  canGoPrevious
                    ? { scale: 1.08 }
                    : undefined
                }
                whileTap={
                  canGoPrevious
                    ? { scale: 0.92 }
                    : undefined
                }
                className={cn(
                  `
                  absolute
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-(--border-color)
                  bg-(--surface-color)/95
                  text-(--text-color)
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  cursor-pointer
                  hover:border-(--primary-color)
                  hover:text-(--primary-color)
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  `,
                  orientation === "horizontal"
                    ? "left-3 top-1/2 -translate-y-1/2"
                    : "left-1/2 top-3 -translate-x-1/2"
                )}
              >
                <ChevronLeft
                  size={18}
                  className={
                    orientation ===
                    "vertical"
                      ? "rotate-90"
                      : ""
                  }
                />
              </motion.button>

              <motion.button
                type="button"
                aria-label={
                  orientation ===
                  "horizontal"
                    ? "Next slide"
                    : "Next item"
                }
                disabled={!canGoNext}
                onClick={next}
                whileHover={
                  canGoNext
                    ? { scale: 1.08 }
                    : undefined
                }
                whileTap={
                  canGoNext
                    ? { scale: 0.92 }
                    : undefined
                }
                className={cn(
                  `
                  absolute
                  z-20
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-(--border-color)
                  bg-(--surface-color)/95
                  text-(--text-color)
                  shadow-md
                  backdrop-blur-md
                  transition-all
                  cursor-pointer
                  hover:border-(--primary-color)
                  hover:text-(--primary-color)
                  disabled:cursor-not-allowed
                  disabled:opacity-30
                  `,
                  orientation === "horizontal"
                    ? "right-3 top-1/2 -translate-y-1/2"
                    : "bottom-3 left-1/2 -translate-x-1/2"
                )}
              >
                <ChevronRight
                  size={18}
                  className={
                    orientation ===
                    "vertical"
                      ? "rotate-90"
                      : ""
                  }
                />
              </motion.button>
            </>
          )}

        {/* INDICATORS */}

        {showIndicators &&
          totalSlides > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              {Array.from({
                length: pageCount,
              }).map((_, index) => (
                <motion.button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${
                    index + 1
                  }`}
                  onClick={() =>
                    goTo(index)
                  }
                  animate={{
                    width:
                      index === safeIndex
                        ? 28
                        : 8,
                    opacity:
                      index === safeIndex
                        ? 1
                        : 0.4,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    h-2
                    shrink-0
                    cursor-pointer
                    rounded-full
                    bg-(--primary-color)
                  "
                />
              ))}
            </div>
          )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";
CarouselItem.displayName =
  "CarouselItem";

export { Carousel, CarouselItem };