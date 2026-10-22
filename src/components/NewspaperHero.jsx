import ComicPanel from "./ComicPanel";



export default function NewspaperHero() {
  return (
    <section className="min-h-screen bg-[#F1E8D6] text-[#171411] px-6 py-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between border-b border-black pb-3 text-xs uppercase tracking-widest">
          <span>Vol. 01 · Issue 001</span>
          <span>Est. 2026</span>
        </div>

        <header className="border-b-4 border-black py-8 text-center">
            <h1 className="newspaper-display text-center text-[clamp(4rem,10vw,10rem)] uppercase">
            The Developer Chronicles
            </h1>
          <p className="mt-4 text-sm uppercase tracking-[0.3em]">
            The Interactive Story of Jayden Price
          </p>
        </header>

        <div className="border-b border-black py-8 text-center">
        <h2 className="newspaper-display text-center text-[clamp(2.5rem,6vw,6rem)] uppercase">
        Local Developer Turns Ideas Into Reality!
        </h2>
        </div>

        <ComicPanel />

        <footer className="flex justify-between border-t border-black pt-4 text-xs uppercase tracking-wider">
          <span>Engineering · Design · Security</span>
          <span>Scroll to Explore ↓</span>
        </footer>
      </div>
    </section>
  );
}