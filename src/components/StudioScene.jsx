
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ProjectCaseFiles from "./ProjectCaseFiles";
import "./StudioScene.css";

const imageUrl = `${import.meta.env.BASE_URL}images/kurator-origin.png`;

const monitors = [
  {
    id: "left",
    label: "Open projects from the code monitor",
    points: "1060,337 1290,319 1290,520 1060,531",
  },
  {
    id: "center",
    label: "Open projects from the center monitor",
    points: "1303,318 1573,280 1573,521 1303,521",
  },
  {
    id: "right",
    label: "Open projects from the design monitor",
    points: "1592,277 1765,241 1767,522 1592,518",
  },
];

export default function StudioScene({
  embedded = false,
  interactive = true,
}) {
  const [activeMonitor, setActiveMonitor] = useState(null);
  const [hoveredMonitor, setHoveredMonitor] = useState(null);
  const [showProjects, setShowProjects] = useState(false);
  const timerRef = useRef(null);

  const openMonitor = (id = "center") => {
    if (!interactive || activeMonitor || showProjects) return;

    setActiveMonitor(id);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    timerRef.current = window.setTimeout(() => {
      setShowProjects(true);
      setActiveMonitor(null);
    }, reducedMotion ? 0 : 1400);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="studio"
      className={
        embedded
          ? "living-studio living-studio--embedded"
          : "living-studio"
      }
      aria-label="The Kurator's interactive studio"
    >
      <div className="living-studio__viewport">
        <div className="living-studio__artwork">
          <img
            className="living-studio__image"
            src={imageUrl}
            alt="The Kurator working in a purple-lit creative studio overlooking a nighttime city skyline"
          />

          <svg
            className="living-studio__effects"
            viewBox="0 0 1983 793"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="studio-lamp-light">
                <stop offset="0%" stopColor="#ffd98b" stopOpacity=".45" />
                <stop offset="55%" stopColor="#ffb64a" stopOpacity=".12" />
                <stop offset="100%" stopColor="#ffb64a" stopOpacity="0" />
              </radialGradient>

              <clipPath id="studio-window-clip">
                <polygon points="814,8 1123,18 1123,307 1012,321 814,329" />
                <polygon points="1152,22 1281,28 1281,289 1152,307" />
              </clipPath>

              <filter id="studio-screen-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
            </defs>

            {/* Rain confined to the window regions */}
            <g clipPath="url(#studio-window-clip)" className="studio-rain">
              {Array.from({ length: 38 }, (_, index) => {
                const x = 815 + ((index * 47) % 475);
                const y = (index * 83) % 400 - 80;

                return (
                  <line
                    key={index}
                    className="studio-raindrop"
                    x1={x}
                    y1={y}
                    x2={x - 7}
                    y2={y + 29}
                    stroke="#d9b5ff"
                    strokeWidth={index % 3 === 0 ? 1.7 : 1}
                    opacity=".35"
                    style={{
                      animationDelay: `${-(index % 11) * 0.24}s`,
                      animationDuration: `${1.8 + (index % 5) * 0.25}s`,
                    }}
                  />
                );
              })}
            </g>

            {/* Warm light gently fluctuates */}
            <ellipse
              className="studio-lamp-light"
              cx="260"
              cy="188"
              rx="300"
              ry="245"
              fill="url(#studio-lamp-light)"
            />

            {/* Coffee steam: rises from the original mug */}
            <g className="studio-steam" fill="none" stroke="#f9e2d0" strokeWidth="3" strokeLinecap="round">
              <path className="studio-steam__wisp studio-steam__wisp--one" d="M779 548 C758 528 795 509 780 487 C765 466 798 453 787 430" />
              <path className="studio-steam__wisp studio-steam__wisp--two" d="M806 547 C827 525 790 508 810 483 C829 462 800 448 814 425" />
              <path className="studio-steam__wisp studio-steam__wisp--three" d="M833 548 C813 525 848 505 830 483 C817 462 845 449 835 432" />
            </g>

            {/* Screen illumination follows the artwork */}
            {monitors.map((monitor) => (
              <g
                key={monitor.id}
                className={[
                  "studio-screen",
                  hoveredMonitor === monitor.id ? "is-hovered" : "",
                  activeMonitor === monitor.id ? "is-active" : "",
                ].join(" ")}
              >
                <polygon
                  points={monitor.points}
                  className="studio-screen__halo"
                  fill="#a763ff"
                  filter="url(#studio-screen-blur)"
                />
                <polygon
                  points={monitor.points}
                  className="studio-screen__light"
                  fill="#b579ff"
                />
              </g>
            ))}
          </svg>

          {/* Accessible interactive targets aligned to the same SVG viewBox */}
          <svg
            className="living-studio__hotspots"
            viewBox="0 0 1983 793"
            preserveAspectRatio="none"
          >
            {monitors.map((monitor) => (
              <polygon
                key={monitor.id}
                points={monitor.points}
                role="button"
                tabIndex={interactive ? 0 : -1}
                aria-label={monitor.label}
                aria-disabled={!interactive}
                className="studio-screen__target"
                onMouseEnter={() => setHoveredMonitor(monitor.id)}
                onMouseLeave={() => setHoveredMonitor(null)}
                onFocus={() => setHoveredMonitor(monitor.id)}
                onBlur={() => setHoveredMonitor(null)}
                onClick={() => openMonitor(monitor.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openMonitor(monitor.id);
                  }
                }}
              />
            ))}
          </svg>

          {activeMonitor && (
            <div className="living-studio__boot" aria-live="polite">
              <span className="living-studio__boot-dot" />
              ACCESSING CASE FILES...
            </div>
          )}
        </div>
      </div>

      <div className="living-studio__controls">
        <span>CHAPTER 01 / THE ORIGIN</span>
        <button
          type="button"
          disabled={!interactive || Boolean(activeMonitor)}
          onClick={() => openMonitor("center")}
        >
          EXPLORE PROJECTS ↗
        </button>
      </div>

      {showProjects &&
        createPortal(
          <ProjectCaseFiles
            onClose={() => setShowProjects(false)}
          />,
          document.body
        )}
    </section>
  );
}
