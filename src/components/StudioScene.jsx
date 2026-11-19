
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ProjectCaseFiles from "./ProjectCaseFiles";
import "./StudioScene.css";

const imageUrl = `${import.meta.env.BASE_URL}images/kurator-origin.png`;

const VIEWBOX = "0 0 1983 793";

// MONITOR HOTSPOTS
// These are your custom-aligned coordinates.
// Keep adjusting them here if needed.
const monitors = [
  {
    id: "left",
    label: "Open projects from the code monitor",
    points:
      "1100,545 1100,358 1330,331 1330,480 1220,472 1190,545",
  },
  {
    id: "center",
    label: "Open projects from the center monitor",
    points:
      "1350,327 1350,480 1445,490 1430,540 1620,538 1618,293",
  },
  {
    id: "right",
    label: "Open projects from the design monitor",
    points:
      "1645,288 1790,255 1780,535 1653,535",
  },
];

// WINDOW RAIN MASKS
// One source of truth for BOTH clipping and debug guides.
// These are the coordinates you aligned previously.
const windowRegions = [
  "875,8 1160,34 1160,336 1080,340 1080,350 1050,350 1030,340 1020,320 960,320 910,180 900,180 875,150",
  "1185,40 1325,55 1325,315 1185,330",
];

// Set to true whenever you want to see window outlines.
const DEBUG_WINDOWS = false;

// Precompute rain positions so they remain stable.
const rainDrops = Array.from({ length: 38 }, (_, index) => ({
  id: index,
  x: 815 + ((index * 47) % 475),
  y: ((index * 83) % 400) - 80,
  width: index % 3 === 0 ? 1.7 : 1,
  delay: -(index % 11) * 0.24,
  duration: 1.8 + (index % 5) * 0.25,
}));

//cup steam
const smokeUrl = `${import.meta.env.BASE_URL}images/studio/smoke.png`;

export default function StudioScene({
  embedded = false,
  interactive = true,
}) {
  const [activeMonitor, setActiveMonitor] = useState(null);
  const [hoveredMonitor, setHoveredMonitor] = useState(null);
  const [showProjects, setShowProjects] = useState(false);

  const timerRef = useRef(null);

  // Unique SVG IDs prevent conflicts if the studio
  // is ever rendered more than once on the page.
  const instanceId = useId().replace(/:/g, "");
  const lampId = `${instanceId}-studio-lamp-light`;
  const windowClipId = `${instanceId}-studio-window-clip`;
  const blurId = `${instanceId}-studio-screen-blur`;

  const openMonitor = (id = "center") => {
    if (!interactive || activeMonitor || showProjects) return;

    setActiveMonitor(id);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    timerRef.current = window.setTimeout(() => {
      setShowProjects(true);
      setActiveMonitor(null);
      timerRef.current = null;
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
          {/* ORIGINAL STUDIO ARTWORK */}
          <img
            className="living-studio__image"
            src={imageUrl}
            alt="The Kurator working in a purple-lit creative studio overlooking a nighttime city skyline"
          />

          {/* ANIMATED EFFECTS */}
          <svg
            className="living-studio__effects"
            viewBox={VIEWBOX}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              {/* Warm lamp gradient */}
              <radialGradient id={lampId}>
                <stop
                  offset="0%"
                  stopColor="#ffd98b"
                  stopOpacity=".45"
                />
                <stop
                  offset="55%"
                  stopColor="#ffb64a"
                  stopOpacity=".12"
                />
                <stop
                  offset="100%"
                  stopColor="#ffb64a"
                  stopOpacity="0"
                />
              </radialGradient>

              {/* Rain stays inside the window regions */}
              <clipPath
                id={windowClipId}
                clipPathUnits="userSpaceOnUse"
              >
                {windowRegions.map((points, index) => (
                  <polygon key={index} points={points} />
                ))}
              </clipPath>

              {/* Soft monitor illumination */}
              <filter
                id={blurId}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="12" />
              </filter>

              {/* Coffee steam blur */}
              <filter
                id="studio-steam-blur"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" />
              </filter> 
            </defs>

            {/* WINDOW RAIN */}
            {/* Clip the individual drops, not an animated group */}
            <g
              className="studio-rain"
              clipPath={`url(#${windowClipId})`}
            >
              {rainDrops.map((drop) => (
                <line
                  key={drop.id}
                  className="studio-raindrop"
                  x1={drop.x}
                  y1={drop.y}
                  x2={drop.x - 7}
                  y2={drop.y + 29}
                  stroke="#d9b5ff"
                  strokeWidth={drop.width}
                  opacity=".35"
                  style={{
                    animationDelay: `${drop.delay}s`,
                    animationDuration: `${drop.duration}s`,
                  }}
                />
              ))}
            </g>

            {/* OPTIONAL WINDOW ALIGNMENT GUIDES */}
            {DEBUG_WINDOWS && (
              <g
                fill="rgba(0, 255, 180, 0.12)"
                stroke="#00ffb4"
                strokeWidth="3"
                pointerEvents="none"
              >
                {windowRegions.map((points, index) => (
                  <polygon key={index} points={points} />
                ))}
              </g>
            )}

            {/* FLICKERING LAMP */}
            <ellipse
              className="studio-lamp-light"
              cx="260"
              cy="188"
              rx="300"
              ry="245"
              fill={`url(#${lampId})`}
            />
            {/* Realistic animated coffee steam */}
            <g className="studio-smoke" aria-hidden="true">
              {[0, 1, 2].map((index) => (
                <image
                  key={index}
                  href={smokeUrl}
                  x="785"
                  y="420"
                  width="110"
                  height="155"
                  preserveAspectRatio="xMidYMid meet"
                  className={`studio-smoke__layer studio-smoke__layer--${index + 1}`}
                />
              ))}
            </g>

            {/* MONITOR LIGHTING */}
            {monitors.map((monitor) => (
              <g
                key={monitor.id}
                className={[
                  "studio-screen",
                  hoveredMonitor === monitor.id
                    ? "is-hovered"
                    : "",
                  activeMonitor === monitor.id
                    ? "is-active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <polygon
                  points={monitor.points}
                  className="studio-screen__halo"
                  fill="#a763ff"
                  filter={`url(#${blurId})`}
                />
                <polygon
                  points={monitor.points}
                  className="studio-screen__light"
                  fill="#b579ff"
                />
              </g>
            ))}
          </svg>

          {/* INTERACTIVE MONITOR HOTSPOTS */}
          <svg
            className="living-studio__hotspots"
            viewBox={VIEWBOX}
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
                onMouseEnter={() => {
                  if (interactive) {
                    setHoveredMonitor(monitor.id);
                  }
                }}
                onMouseLeave={() => setHoveredMonitor(null)}
                onFocus={() => {
                  if (interactive) {
                    setHoveredMonitor(monitor.id);
                  }
                }}
                onBlur={() => setHoveredMonitor(null)}
                onClick={() => openMonitor(monitor.id)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    openMonitor(monitor.id);
                  }
                }}
              />
            ))}
          </svg>

          {/* MONITOR BOOT MESSAGE */}
          {activeMonitor && (
            <div
              className="living-studio__boot"
              aria-live="polite"
            >
              <span className="living-studio__boot-dot" />
              ACCESSING CASE FILES...
            </div>
          )}
        </div>
      </div>

      {/* PROJECTS BUTTON */}
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

      {/* PROJECT CASE FILES MODAL */}
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
