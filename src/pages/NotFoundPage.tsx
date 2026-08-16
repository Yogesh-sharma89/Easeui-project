import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  Search,
  Sparkles,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const NotFoundPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-(--bg-color)
        text-(--text-color)
      "
    >
      {/* ================================================================
          BACKGROUND GRID
      ================================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
        "
        style={{
          backgroundImage: `
            linear-gradient(
              var(--border-color) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              var(--border-color) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* ================================================================
          GLOW EFFECTS
      ================================================================= */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-indigo-500/20
          blur-[120px]
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          h-96
          w-96
          rounded-full
          bg-blue-500/15
          blur-[120px]
        "
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ================================================================
          MAIN CONTENT
      ================================================================= */}
      
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            w-full
            max-w-4xl
          "
        >
          {/* ============================================================
              404 CARD
          ============================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-(--border-color)
              bg-(--surface-color)
              shadow-(--shadow-lg)
            "
          >
            {/* Top animated line */}

            <motion.div
              className="
                absolute
                left-0
                right-0
                top-0
                h-px
                bg-linear-to-r
                from-transparent
                via-indigo-500
                to-transparent
              "
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />

            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              {/* ========================================================
                  LEFT
              ========================================================= */}

              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                {/* Badge */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                  className="
                    mb-7
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-indigo-500/20
                    bg-indigo-500/10
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-indigo-500
                    dark:text-indigo-400
                  "
                >
                  <Search size={14} />

                  Component not found
                </motion.div>

                {/* 404 */}

                <div className="relative">
                  <motion.h1
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 140,
                    }}
                    className="
                      bg-linear-to-r
                      from-indigo-500
                      via-blue-500
                      to-cyan-500
                      bg-clip-text
                      text-[clamp(6rem,18vw,11rem)]
                      font-black
                      leading-none
                      tracking-[-0.08em]
                      text-transparent
                    "
                  >
                    404
                  </motion.h1>

                  {/* Floating spark */}

                  <motion.div
                    className="
                      absolute
                      right-[18%]
                      top-[12%]
                      text-indigo-500
                    "
                    animate={{
                      y: [-6, 6, -6],
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Sparkles size={28} />
                  </motion.div>
                </div>

                {/* Heading */}

                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.3,
                  }}
                  className="
                    mt-5
                    text-2xl
                    font-bold
                    tracking-tight
                    sm:text-3xl
                  "
                >
                  That component doesn't exist.
                </motion.h2>

                {/* Description */}

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.38,
                  }}
                  className="
                    mt-4
                    max-w-xl
                    text-base
                    leading-7
                    text-(--text-secondary)
                  "
                >
                  We searched everywhere, but the page or
                  component you're looking for isn't registered
                  in the application router.
                </motion.p>

                {/* Requested path */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.45,
                  }}
                  className="
                    mt-6
                    max-w-xl
                    overflow-hidden
                    rounded-xl
                    border
                    border-(--code-border)
                    bg-(--code-bg)
                    px-4
                    py-3
                  "
                >
                  <div className="mb-1 flex items-center gap-2 text-xs font-medium text-(--text-muted)">
                    <Compass size={13} />

                    Requested path
                  </div>

                  <code className="block overflow-x-auto text-sm font-medium text-(--primary-color)">
                    {location.pathname}
                  </code>
                </motion.div>

                {/* Actions */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.52,
                  }}
                  className="
                    mt-8
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  {/* Back */}

                  <motion.button
                    type="button"
                    onClick={handleGoBack}
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      inline-flex
                      cursor-pointer
                      items-center
                      gap-2
                      rounded-xl
                      border
                      border-(--border-color)
                      bg-(--surface-color)
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-(--text-color)
                      shadow-sm
                      transition
                      hover:border-(--primary-color)
                      hover:text-(--primary-color)
                      hover:shadow-md
                    "
                  >
                    <ArrowLeft size={17} />

                    Go Back
                  </motion.button>

                  {/* Home */}

                  <motion.button
                    type="button"
                    onClick={handleGoHome}
                    whileHover={{
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      inline-flex
                      cursor-pointer
                      items-center
                      gap-2
                      rounded-xl
                      bg-(--primary-color)
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-indigo-500/20
                      transition
                      hover:brightness-110
                      hover:shadow-xl
                    "
                  >
                    <Home size={17} />

                    Back Home

                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              </div>

              {/* ========================================================
                  RIGHT VISUAL
              ========================================================= */}

              <div
                className="
                  relative
                  min-h-[380px]
                  overflow-hidden
                  border-t
                  border-(--border-color)
                  bg-(--surface-muted)
                  lg:min-h-[620px]
                  lg:border-l
                  lg:border-t-0
                "
              >
                {/* Radar rings */}

                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      className="
                        absolute
                        left-1/2
                        top-1/2
                        rounded-full
                        border
                        border-indigo-500/20
                      "
                      style={{
                        width: `${ring * 130}px`,
                        height: `${ring * 130}px`,
                        marginLeft: -(ring * 65),
                        marginTop: -(ring * 65),
                      }}
                      animate={{
                        scale: [0.85, 1.15, 0.85],
                        opacity: [0.15, 0.4, 0.15],
                      }}
                      transition={{
                        duration: 4 + ring,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: ring * 0.25,
                      }}
                    />
                  ))}

                  {/* Center */}

                  <motion.div
                    animate={{
                      y: [-8, 8, -8],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="
                      relative
                      z-10
                      flex
                      h-32
                      w-32
                      items-center
                      justify-center
                      rounded-3xl
                      border
                      border-indigo-500/30
                      bg-(--surface-color)
                      shadow-[0_20px_70px_rgba(79,70,229,0.18)]
                    "
                  >
                    {/* Glow */}

                    <motion.div
                      className="
                        absolute
                        inset-4
                        rounded-2xl
                        bg-indigo-500/10
                      "
                      animate={{
                        scale: [1, 1.12, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />

                    <div className="relative">
                      <Search
                        size={42}
                        strokeWidth={1.5}
                        className="text-indigo-500"
                      />

                      {/* X */}

                      <motion.div
                        initial={{
                          scale: 0,
                          rotate: -90,
                        }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                        }}
                        transition={{
                          delay: 0.8,
                          type: "spring",
                        }}
                        className="
                          absolute
                          -right-2
                          -top-2
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          bg-red-500
                          text-white
                          shadow-lg
                        "
                      >
                        <span className="text-xs font-bold">
                          ×
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating labels */}

                <motion.div
                  className="
                    absolute
                    left-6
                    top-10
                    rounded-lg
                    border
                    border-(--border-color)
                    bg-(--surface-color)/90
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-(--text-secondary)
                    shadow-md
                    backdrop-blur
                  "
                  animate={{
                    y: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Searching...
                </motion.div>

                <motion.div
                  className="
                    absolute
                    bottom-12
                    right-6
                    rounded-lg
                    border
                    border-(--border-color)
                    bg-(--surface-color)/90
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-(--text-secondary)
                    shadow-md
                    backdrop-blur
                  "
                  animate={{
                    y: [5, -5, 5],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  No match found
                </motion.div>

                {/* Scan line */}

                <motion.div
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    right-0
                    h-px
                    bg-linear-to-r
                    from-transparent
                    via-indigo-500
                    to-transparent
                  "
                  animate={{
                    top: ["15%", "85%", "15%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-t
              border-(--border-color)
              px-6
              py-4
              text-xs
              text-(--text-muted)
              sm:px-8
            "
          >
            <span>
              Check the route or component name and try again.
            </span>

            <span className="hidden sm:block">
              Error 404
            </span>
          </div>
        </motion.div> 

      </div>

    
      
    </main>
  );
};

export default NotFoundPage;