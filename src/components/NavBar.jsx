import { useState } from "react";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative" aria-label="Main navigation">
      <button
        id="mobile-navigation"
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        className="md:hidden bg-[#F1E8D6] text-[#171411] p-4 text-2xl"
      >
        {isMenuOpen ? "X" : "☰"}
      </button>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute 
                    right-0 top-full z-50
                    flex w-48 flex-col gap-4
                    border-2 border-[#171411]
                    bg-[#F1E8D6] p-4 
                    shadow-lg
                    md:hidden"
        >
          <a
            href="#home"
            className="border-b-2 border-[#171411]"
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </a>
          <a href="#chapters" onClick={() => setIsMenuOpen(false)}>
            CHAPTERS
          </a>
          <a href="#work" onClick={() => setIsMenuOpen(false)}>
            WORK
          </a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>
            ABOUT
          </a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>
            CONTACT
          </a>
        </div>
      )}

      <div className=" bg-[#F1E8D6] text-[#171411] w-full">
        <div className="newspaper-typewriter hidden md:flex justify-end gap-8  py-4 text-sm font-medium">
          <a href="#home" className="border-b-2 border-[#171411]">
            HOME
          </a>
          <a href="#chapters">CHAPTERS</a>
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </div>
      </div>
    </nav>
  );
}
