import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import TitleCard from "@/components/mattflix/TitleCard";
import { catalog } from "@/lib/catalog";

export default function SearchOverlay({ onClose, progress, myList, onPlay, onInfo, onToggleList }) {
  const [query, setQuery] = useState("");

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

  const term = query.trim().toLowerCase();
  const results = term
    ? catalog.filter(
        (item) =>
          item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
      )
    : catalog.slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 px-4 py-16 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-[#101012] p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg uppercase tracking-[0.14em] text-white/90">
            Search Mattflix
          </h2>
          <button onClick={onClose} aria-label="Close search" className="text-white/60 transition hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4">
          <Search className="h-4 w-4 text-white/40" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies and shows..."
            className="w-full bg-transparent py-3.5 text-base text-white outline-none placeholder:text-white/35"
          />
        </div>

        {results.length === 0 ? (
          <p className="mt-6 text-sm text-white/50">No titles found for “{query}”.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {results.map((item) => {
              const saved = progress[item.title];
              const percent =
                saved && !saved.completed && saved.duration > 0
                  ? Math.max(0, Math.min(100, (saved.seconds / saved.duration) * 100))
                  : 0;
              return (
                <TitleCard
                  key={item.title}
                  item={item}
                  progressPct={percent}
                  inList={myList.includes(item.title)}
                  onPlay={onPlay}
                  onInfo={onInfo}
                  onToggleList={onToggleList}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}