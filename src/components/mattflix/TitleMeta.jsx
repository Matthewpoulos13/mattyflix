const chip = "rounded border border-white/25 px-1.5 py-0.5 text-[11px] leading-none";

export default function TitleMeta({ item }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-white/70 sm:text-sm">
      <span className="font-semibold text-[#46d369]">98% Match</span>
      <span>{item.year}</span>
      <span className={chip}>{item.rating || "TV-14"}</span>
      <span className={chip}>{item.duration || "2 Seasons"}</span>
      <span className={chip}>HD</span>
    </div>
  );
}