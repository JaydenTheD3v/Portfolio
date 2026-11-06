
import { useEffect, useRef, useState } from "react";
import "./ProjectCaseFiles.css";

const projects = [
  {
    id: "01",
    title: "Fridge&Fork",
    category: "FULL-STACK APPLICATION",
    description:
      "A household planning app connecting groceries, pantry inventory, recipes, and sales.",
    stack: ["React", "JavaScript", "UI/UX"],
  },
  {
    id: "02",
    title: "SkillSwap",
    category: "WEB APPLICATION",
    description:
      "A project exploring how people can connect through shared skills and learning.",
    stack: ["React", "JavaScript", "Web Development"],
  },
  {
    id: "03",
    title: "Intel Timeline",
    category: "INTERACTIVE WEB EXPERIENCE",
    description:
      "An animated timeline combining storytelling, responsive design, and accessible interaction.",
    stack: ["JavaScript", "GSAP", "Bootstrap"],
  },
];

export default function ProjectCaseFiles({ onClose }) {
  const closeRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();

      if (event.key === "Tab") {
        const focusables = Array.from(
          document.querySelectorAll(
            ".case-files button:not([disabled])"
          )
        );

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === last
        ) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="case-files"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-files-title"
    >
      <header className="case-files-header">
        <div>
          <span>THE DEVELOPER CHRONICLES</span>
          <h2 id="case-files-title">THE CASE FILES.</h2>
        </div>

        <button
          ref={closeRef}
          type="button"
          className="case-files-close"
          onClick={onClose}
        >
          ✕ CLOSE
        </button>
      </header>

      <div className="case-files-layout">
        <nav aria-label="Project case files" className="case-files-nav">
          {projects.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={
                selected === index ? "case-file-link active" : "case-file-link"
              }
              aria-current={selected === index ? "true" : undefined}
              onClick={() => setSelected(index)}
            >
              <span>FILE {item.id}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </nav>

        <article className="case-file-detail" key={project.id}>
          <span className="case-file-eyebrow">
            CLASSIFIED / {project.category}
          </span>

          <div className="case-file-illustration" aria-hidden="true">
            <span>{project.id}</span>
            <strong>{project.title}</strong>
          </div>

          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div className="case-file-stack">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <p className="case-file-footnote">
            FULL PROJECT BREAKDOWN COMING SOON.
          </p>
        </article>
      </div>

      <footer className="case-files-footer">
        <span>IDEAS TODAY. A BETTER TOMORROW.</span>
        <span>VOL. 01 / SELECTED WORK</span>
      </footer>
    </div>
  );
}
