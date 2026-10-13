import { useEffect } from "react";
import { Check, Play, Plus, X } from "lucide-react";
import { Image } from "@/components/ui/image";
import TitleMeta from "@/components/mattflix/TitleMeta";

export default function InfoModal({ item, inList, onClose, onPlay, onToggleList }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-10 backdrop-blur-sm sm:items-center"
      onClick={onClose}>
      
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#101012] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.95)]"
        onClick={(event) => event.stopPropagation()}>
        
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-white transition hover:bg-black">
          
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-52 w-full sm:h-72">
          {item.image ?
          <Image
            src={item.image}
            alt={`${item.title} artwork`}
            originWidth={1600}
            originHeight={900}
            className="absolute inset-0 h-full w-full object-cover" /> :


          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 76% 28%, ${item.gradient[0]}, ${item.gradient[1]} 64%, #0a0a0a)`
            }} />

          }
          <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/25 to-transparent opacity-100 rounded" />
        </div>

        <div className="px-6 pb-8 sm:px-8">
          <p className="font-display text-[11px] uppercase tracking-[0.4em] text-white/60">Mattflix</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight text-white sm:text-4xl">
            {item.title}
          </h2>
          <div className="mt-4">
            <TitleMeta item={item} />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-white/75 sm:text-base">{item.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => onPlay(item)}
              className="flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/85">
              
              <Play className="h-4 w-4" /> Play
            </button>
            <button
              onClick={() => onToggleList(item)}
              className="flex items-center gap-2 rounded-md bg-white/15 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/25">
              
              {inList ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {inList ? "In My List" : "My List"}
            </button>
          </div>
        </div>
      </div>
    </div>);

}