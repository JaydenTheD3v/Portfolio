export default function ArticleCard({title, description, image, href}) {

    return (
        <article className="article-card group relative h-[76px] flex flex-row items-center justify-start gap-6 border-r-2 py-6 border-[#171411] pr-8 mr-4 pl-6 transition-all duration-500 ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:scale-105 hover:z-10 cursor-pointer">
            
            {/* 1. Text Container (Left Side) */}
            <div className="min-w-0 flex-1">
            <h3 className="newspaper-display text-[17px] leading-none uppercase">
                {title}
            </h3>

            <p className="newspaper-typewriter mt-1 text-[10px] leading-tight uppercase">
                {description}
            </p>
            </div>
            
            {/* 2. Image & Button Container (Right Side) */}
            <div className="relative shrink-0 border border-[#171411]">
                <img src={image} alt={title} className="h-[64px] w-[100px]
                    shrink-0 object-cover
                    border border-[#171411]" />
                <a 
                    href={href} 
                    className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#171411] text-[#F1E8D6] text-xs hover:scale-110 transition-transform border border-[#f1e8d6]"
                >
                    →
                </a>
            </div>

        </article>
    )
}