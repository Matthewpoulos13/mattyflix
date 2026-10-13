const LINKS = ["Privacy", "Terms", "Help", "Contact"];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 px-[4.5%] py-12 text-center text-xs text-white/40">
      <p className="font-display text-lg tracking-tight text-[#e50914]">MATTFLIX</p>
      <div className="mt-5 flex flex-wrap justify-center gap-6">
        {LINKS.map((link) => (
          <span key={link} className="cursor-default transition hover:text-white/70">
            {link}
          </span>
        ))}
      </div>
      <p className="mt-6">© 2026 Mattflix</p>
    </footer>
  );
}