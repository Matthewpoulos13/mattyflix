import { useEffect } from "react";

export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDone, 2200);
    return () => clearTimeout(id);
  }, [message, onDone]);

  return (
    <div
      className={`pointer-events-none fixed bottom-7 left-1/2 z-[300] -translate-x-1/2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#111] shadow-2xl transition-all duration-300 ${
        message ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}