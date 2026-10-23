import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

export default function ComicTransition() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

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

  const captionOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.65],
    [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-[#F1E8D6]"
      aria-label="Entering the comic world"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          className="relative overflow-hidden bg-[#171411]"
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
          <img
            src={`${import.meta.env.BASE_URL}images/kurator-origin.png`}
            alt="The Kurator working in a purple-lit studio"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <motion.div
            className="absolute bottom-12 left-8 right-8 text-[#F1E8D6] md:left-20"
            style={{ opacity: reducedMotion ? 1 : captionOpacity }}
          >
            <p className="mb-3 text-sm uppercase tracking-[0.3em]">
              Chapter 01
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