import ComicPanel from "./ComicPanel";
import NavBar from "./NavBar";
import article1 from '../assets/article1.png';
import article2 from '../assets/article2.png';
import article3 from '../assets/article3.png';
import article4 from '../assets/article4.png';
import FeaturedArticles from "./FeaturedArticles";

export default function NewspaperHero() {


  return (
    <section className="min-h-screen bg-[#F1E8D6] text-[#171411] px-6 py-8 md:px-12 ">
      <header className="flex items-center border-y-2 border-[#171411]">
        {/*left section*/}

        <div className="newspaper-typewriter flex flex-1 items-center justify-between pr-6">
          <span>VOL. 01 · ISSUE 001</span>
          <span>JAYDEN PRICE ♛</span>
          <span>EST. 2026</span>
        </div>

        {/* Right section: navigation */}
        <div className="relative border-l-2 border-[#171411] pl-6">
          <NavBar />
        </div>
      </header>

      {/*MASTHEAD START*/}
     {/* MASTHEAD */}
        <div className="flex flex-col md:flex-row md:items-stretch border-b-4 border-double border-[#171411]">

          {/* Main title */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <h1 className="newspaper-masthead text-center uppercase">
              The Developer Chronicles
            </h1>
          </div>

          {/* Sidebar */}
          <aside
            className="newspaper-typewriter
                      w-full md:w-48
                      shrink-0
                      border-t md:border-t-0 md:border-l-2
                      border-[#171411]
                      px-2 py-3 md:py-4
                      text-xs md:text-sm"
          >
            <div className="flex flex-wrap gap-x-3 md:block">
              <p>ENGINEERING</p>
              <p>DESIGN</p>
              <p>SECURITY</p>
              <p>CREATIVITY</p>
            </div>

            <hr className="my-2 border-[#171411]" />

            <p>ONE STORY. MANY CHAPTERS.</p>
          </aside>
        </div>
      {/*MASTHEAD END*/}

      {/*MASTHEAD SUB-START*/}
      <div className="flex items-center gap-4 border-y-5 border-double border-[#171411] py-1 ">
        <div className="h-px flex-1 bg-[#171411]" />

        <p className="newspaper-typewriter text-center text-xs uppercase tracking-widest">
          The Interactive Story of Jayden Price
        </p>

        <span className="text-5xl">♛</span>

        <p className="newspaper-typewriter text-center text-sm italic ">
          Ideas Today. A Better Tomorrow.
        </p>

        <div className="h-px flex-1 bg-[#171411]" />
      </div>

      <div className="border-b border-black py-3 text-center">
        <h2 className="newspaper-display text-center text-[clamp(2.5rem,6vw,6rem)] uppercase">
          Local Developer Turns Ideas Into Reality!
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 py-2">
        <div />

        <p className="newspaper-typewriter text-center text-sm uppercase tracking-[.25em]">
          A Journey Through Creativity, Code, and Curiosity.
        </p>

        <a
          href="#origin"
          className="justify-self-center md:justify-self-end bg-[#171411] px-5 py-2 text-xs uppercase tracking-widest text-[#F1E8D6]"
        >
          Scroll to Enter →
        </a>
      </div>
      <hr className=" border border-[#171411]" />
      {/*MASTHEAD SUB-END*/}

      <ComicPanel />
        
        
      {/* Featured Inside Section */}
      <FeaturedArticles />
       
      <footer className="flex justify-between border-t mt-[100px] border-black pt-4 text-xs uppercase tracking-wider">
        <span>Engineering · Design · Security</span>
        <span>Scroll to Explore ↓</span>
      </footer>
    </section>
  );
}
