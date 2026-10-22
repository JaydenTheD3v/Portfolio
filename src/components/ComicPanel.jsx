import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

export default function ComicPanel() {
  const panelRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  // Image moves vertically as the panel travels through the viewport.
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-6%", "6%"]
  );

  // Slight cinematic zoom.
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.12, 1.04, 1.12]
  );

  // Black-and-white artwork gradually reveals its color.
  const saturation = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7],
    [0, 0.45, 1]
  );

  const imageFilter = useTransform(
    saturation,
    (value) => `saturate(${value})`
  );

  return (
    <section
      ref={panelRef}
      aria-label="Chapter 01: The Origin"
      className="relative my-8 min-h-[420px] overflow-hidden bg-[#171411] text-[#F1E8D6]"
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/kurator-origin.png`}
        alt="Illustration of Jayden working at his desk in a neon-lit creative studio"
        className="absolute inset-0 h-full w-full object-cover"
        style={
          reducedMotion
            ? {}
            : {
                y: imageY,
                scale: imageScale,
                filter: imageFilter,
              }
        }
      />

      {/* Gradient keeps the editorial copy readable. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="relative flex min-h-[420px] flex-col justify-end p-8 md:p-12">
        <p className="mb-3 text-sm uppercase tracking-widest">
          Chapter 01 — The Origin
        </p>

        <h3 className="max-w-2xl text-4xl font-black md:text-6xl">
          Every Great Story Starts Somewhere.
        </h3>

        <p className="mt-4 max-w-lg text-lg">
          A journey through creativity, code, and curiosity.
        </p>
      </div>
    </section>
  );
}