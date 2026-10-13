import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "TV Shows", href: "#shows" },
  { label: "Movies", href: "#movies" },
  { label: "New & Popular", href: "#new" },
  { label: "My List", href: "#my-list" },
];

export default function TopBar({ onSearch, onNotify, onProfile }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex h-[68px] items-center gap-5 px-[4.5%] transition-colors duration-300 sm:gap-8 ${
        scrolled ? "bg-[#070708]/95 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md" : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <a href="#top" className="font-display text-2xl leading-none tracking-tight text-[#e50914] sm:text-[28px]">
        MATTFLIX
      </a>

      <nav className="hidden flex-1 items-center gap-6 md:flex">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`text-sm transition-colors lg:text-[15px] ${
              link.label === "Home" ? "font-medium text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-3 sm:gap-4">
        <button
          onClick={onSearch}
          aria-label="Search"
          className="text-white/80 transition hover:text-white"
        >
          <Search className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          onClick={onNotify}
          aria-label="Notifications"
          className="hidden text-white/80 transition hover:text-white sm:block"
        >
          <Bell className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <button
          onClick={onProfile}
          aria-label="Profile"
          className="grid h-8 w-8 place-items-center rounded-md bg-[#e50914] text-sm font-bold text-white transition hover:bg-[#f6121d]"
        >
          M
        </button>
      </div>
    </header>
  );
}