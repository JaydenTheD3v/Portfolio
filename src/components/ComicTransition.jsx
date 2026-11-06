
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "motion/react";
import StudioScene from "./StudioScene";

export default function ComicTransition() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const panelWidth = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["78%", "100%"]
  );

  const panelHeight = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["65vh", "100vh"]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["4px", "0px"]
  );

  const effectsOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.9],
    [0, 1]
  );

  const captionOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.58, 0.75, 0.95],
    [0, 1, 1, 0]
  );

  const cameraScale = useTransform(
    scrollYProgress,
    [0.85, 1],
    [1, 1.035]
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const ready = value >= 0.92;
    setInteractive((previous) =>
      previous === ready ? previous : ready
    );
  });

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="relative h-[250vh] bg-[#F1E8D6]"
      aria-label="Entering the comic world"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          className="relative overflow-hidden bg-[#090512]"
          style={
            reducedMotion
              ? {
                  width: "100%",
                  height: "100vh",
                  borderRadius: 0,
                }
              : {
                  width: panelWidth,
                  height: panelHeight,
                  borderRadius,
                }
          }
        >
          <motion.div
            className="absolute inset-0"
            style={{
              scale: reducedMotion ? 1 : cameraScale,
              transformOrigin: "center center",
            }}
          >
            {/* The exact original artwork, unchanged */}
            <img
              src={`${import.meta.env.BASE_URL}images/kurator-origin.png`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Same artwork plus environmental animation */}
            <motion.div
              className="absolute inset-0"
              style={{
                opacity: reducedMotion ? 1 : effectsOpacity,
                pointerEvents:
                  interactive || reducedMotion ? "auto" : "none",
              }}
            >
              <StudioScene
                embedded
                interactive={interactive || Boolean(reducedMotion)}
              />
            </motion.div>
          </motion.div>

          {/* Readability for chapter title */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          <motion.div
            className="pointer-events-none absolute bottom-12 left-8 right-8 text-[#F1E8D6] md:left-20"
            style={{
              opacity: reducedMotion ? 0 : captionOpacity,
            }}
          >
            <p className="mb-3 text-sm uppercase tracking-[0.3em]">
              CHAPTER 01
            </p>

            <h2 className="newspaper-display text-6xl md:text-8xl">
              ENTER THE WORLD.
            </h2>

            <p className="mt-4 max-w-xl text-lg">
              Every line of code begins with a question.
              Every project begins with an idea.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
