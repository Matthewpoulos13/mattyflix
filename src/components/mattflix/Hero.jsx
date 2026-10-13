import { useEffect, useState } from "react";
import { Info, Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import TitleMeta from "@/components/mattflix/TitleMeta";
import { heroSlides, findTitle } from "@/lib/catalog";

export default function Hero({ onPlay, onInfo }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((value) => (value + 1) % heroSlides.length), 8000);
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[index];
  const item = findTitle(slide.title);

  return (
    <section className="relative flex min-h-[580px] items-end overflow-hidden pb-16 pt-32 sm:min-h-[660px] sm:pb-20 lg:min-h-[720px]">
      {slide.image ? (
        <Image
          key={slide.image}
          src={slide.image}
          alt={`${slide.title} key art`}
          originWidth={1600}
          originHeight={900}
          focalPointX={0.5}
          focalPointY={0.35}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 72% 36%, ${slide.gradient[0]} 0%, #2c0a0d 24%, ${slide.gradient[1]} 50%, #070708 78%)`,
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[#070708] via-[#070708]/75 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/20 to-[#070708]/60" />

      <div className="relative z-10 w-full max-w-[680px] px-[4.5%]">
        <p className="mb-3 font-display text-[11px] uppercase tracking-[0.42em] text-white/70">
          Mattflix Original
        </p>
        <h1 className="font-display text-[13vw] uppercase leading-[0.88] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {slide.title}
        </h1>
        <div className="mt-5">
          <TitleMeta item={{ ...item, year: slide.year, duration: slide.duration }} />
        </div>
        <p className="mt-4 max-w-[560px] text-sm leading-relaxed text-white/80 sm:text-base">
          {item?.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => onPlay(item)}
            className="flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/85 sm:text-base"
          >
            <Play className="h-4 w-4" /> Play
          </button>
          <button
            onClick={() => onInfo(item)}
            className="flex items-center gap-2 rounded-md bg-white/20 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/30 sm:text-base"
          >
            <Info className="h-4 w-4" /> More Info
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 right-[4.5%] z-10 flex gap-2">
        {heroSlides.map((entry, dotIndex) => (
          <button
            key={entry.title}
            aria-label={`Show ${entry.title}`}
            onClick={() => setIndex(dotIndex)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIndex === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}