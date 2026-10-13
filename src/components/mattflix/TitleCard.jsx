import { Check, Info, Play, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";

const actionBtn =
  "grid h-8 w-8 place-items-center rounded-full border border-white/40 bg-black/60 text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black";

export default function TitleCard({ item, progressPct = 0, inList, onPlay, onInfo, onToggleList }) {
  const stop = (handler) => (event) => {
    event.stopPropagation();
    handler(item);
  };

  return (
    <article
      onClick={() => onInfo(item)}
      className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-white/[0.04] ring-1 ring-white/10 transition duration-300 ease-out hover:z-20 hover:scale-[1.05] hover:shadow-[0_28px_70px_-16px_rgba(0,0,0,0.95)] hover:ring-white/25"
    >
      {item.image ? (
        <>
          <Image
            src={item.image}
            alt={`${item.title} artwork`}
            originWidth={1600}
            originHeight={900}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <h3 className="absolute bottom-3 left-3 font-display text-[13px] uppercase leading-tight tracking-wide text-white drop-shadow-md sm:text-sm">
            {item.title}
          </h3>
        </>
      ) : (
        <div
          className="absolute inset-0 flex items-end p-3"
          style={{ background: `linear-gradient(150deg, ${item.gradient[0]}, ${item.gradient[1]})` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.24),transparent_34%)]" />
          <h3 className="relative font-display text-[13px] uppercase leading-tight tracking-wide text-white drop-shadow-md sm:text-sm">
            {item.title}
          </h3>
        </div>
      )}

      <span className="absolute left-2.5 top-2 font-display text-base leading-none text-[#e50914] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        M
      </span>

      <div className="absolute bottom-2 right-2 flex gap-1.5 opacity-0 transition duration-200 group-hover:opacity-100">
        <button className={actionBtn} aria-label={`Play ${item.title}`} onClick={stop(onPlay)}>
          <Play className="h-3.5 w-3.5" />
        </button>
        <button className={actionBtn} aria-label={`More info about ${item.title}`} onClick={stop(onInfo)}>
          <Info className="h-3.5 w-3.5" />
        </button>
        <button className={actionBtn} aria-label={`Toggle ${item.title} in My List`} onClick={stop(onToggleList)}>
          {inList ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </button>
      </div>

      {progressPct > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
          <div className="h-full bg-[#e50914]" style={{ width: `${progressPct}%` }} />
        </div>
      )}
    </article>
  );
}