import NewspaperHero from './components/NewspaperHero';

export default function App() {
  return (
    <main>
      <NewspaperHero />
      <section className="flex min-h-screen items-center justify-center bg-[#171411] px-6 text-[#F1E8D6]">
        <div className="text-center">
          <p className="mb-4 uppercase tracking-[0.3em]">
            To Be Continued...
          </p>

          <h2 className="newspaper-display text-6xl md:text-8xl">
            THE STORY IS JUST BEGINNING.
          </h2>
        </div>
      </section>
    </main>
  );
}

