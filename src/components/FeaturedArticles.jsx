import ArticleCard from "./ArticleCard";
import usePageSound from "../hooks/usePageSound";
import article1 from '../assets/article1.png';
import article2 from '../assets/article2.png';
import article3 from '../assets/article3.png';
import article4 from '../assets/article4.png';

export default function FeaturedArticles() {
  const { soundEnabled, setSoundEnabled, playPageSound } = usePageSound();
  const articles = [
    {
        id: 1,
        title: "PROJECTS",
        description: "IDEAS TURNED INTO REAL-WORLD SOLUTIONS.",
        image: article1,
        href: "#projects"
      },
      {
        id: 2,
        title: "SKILLS & TOOLS",
        description: "A BLEND OF ENGINEERING, DESIGN, AND SECURITY.",
        image: article2,
        href: "#skills"
      },
      {
        id: 3,
        title: "THE JOURNEY",
        description: "STILL LEARNING. STILL BUILDING.",
        image: article3,
        href: "#journey"
      },
      {
        id: 4,
        title: "WHAT'S NEXT?",
        description: "BIGGER IDEAS. REAL IMPACT.",
        image: article4,
        href: "#whats-next"
      }
  ];
  return (
      <section aria-label="Featured Articles" className=" border-b-4 border-double border-[#171411] py-2">
            <div className="-mt-3.75  flex flex-row items-center border-[#171411] w-full">
                <div className="hidden shrink-0 border-r-2 border-[#171411] px-4 py-2 md:block">

                <h2 className="newspaper-display text-sm uppercase">
                    FEATURED INSIDE:
                </h2>

                <hr className="my-1 border-[#171411]" />

                <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    aria-pressed={soundEnabled}
                    className="newspaper-typewriter cursor-pointer text-[10px] uppercase"
                >
                    SOUND: {soundEnabled ? "ON 🔊" : "OFF 🔇"}
                </button>

                </div>
              
      {/* 1. Parent Scroll Wrapper */}
            <div className="newspaper-scroll flex flex-row w-full overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0">
              {articles.map((article) => (
                
                  <div 
                    key={article.id} 
                    onClick={playPageSound}
                    className="w-[85vw] shrink-0 snap-center md:w-auto md:flex-1 md:shrink-0"
                  >
                    {/* 2 & 3. Responsive Child Container */}
                    <ArticleCard 
                      title={article.title}
                      description={article.description}
                      image={article.image}
                      href={article.href}
                    />
                  </div>

                ))}
              </div>
            </div>
      </section>
  );
}
