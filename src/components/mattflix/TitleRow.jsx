import { useState } from "react";
import TitleCard from "@/components/mattflix/TitleCard";

const PER_VIEW = 6;

export default function TitleRow({
  id,
  title,
  items = [],
  progress = {},
  myList = [],
  onPlay,
  onInfo,
  onToggleList,
  emptyMessage,
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, PER_VIEW);
  const hasMore = items.length > PER_VIEW;

  return (
    <section id={id} className="mt-9 scroll-mt-24 px-[4.5%] sm:mt-12">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="font-display text-base uppercase tracking-[0.16em] text-white/90 sm:text-lg">
          {title}
        </h2>
        {hasMore && (
          <button
            onClick={() => setExpanded((value) => !value)}
            className="text-xs font-medium text-white/40 transition hover:text-white"
          >
            {expanded ? "Show less" : "See all"}
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-white/35">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          {visible.map((item) => {
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
    </section>
  );
}