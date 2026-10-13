import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Image } from "@/components/ui/image";
import { getResumeTime, markCompleted, saveProgress } from "@/lib/watchState";

const SAVE_EVERY_MS = 4000;

export default function VideoPlayer({ item, onClose }) {
  const videoRef = useRef(null);
  const lastSaved = useRef(0);
  const hasSource = Boolean(item.video);

  const handleClose = useCallback(() => {
    const video = videoRef.current;
    if (video && isFinite(video.duration) && video.duration > 0 && !video.ended) {
      saveProgress(item.title, video.currentTime, video.duration);
    }
    onClose();
  }, [item.title, onClose]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasSource) return;
    const resume = () => {
      const resumeAt = getResumeTime(item.title);
      if (resumeAt > 1 && isFinite(video.duration)) {
        video.currentTime = Math.min(resumeAt, Math.max(0, video.duration - 1));
      }
      video.play().catch(() => {});
    };
    video.addEventListener("loadedmetadata", resume);
    return () => video.removeEventListener("loadedmetadata", resume);
  }, [item.title, hasSource]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const now = Date.now();
    if (now - lastSaved.current < SAVE_EVERY_MS) return;
    lastSaved.current = now;
    saveProgress(item.title, video.currentTime, video.duration);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black">
      <button
        onClick={handleClose}
        aria-label="Close player"
        className="absolute right-5 top-5 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
      >
        <X className="h-5 w-5" />
      </button>
      <p className="absolute left-6 top-7 z-20 font-display text-lg uppercase tracking-[0.12em] text-white/90">
        {item.title}
      </p>

      {hasSource ? (
        <video
          ref={videoRef}
          src={item.video}
          controls
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onPause={handleTimeUpdate}
          onEnded={() => markCompleted(item.title, videoRef.current?.duration)}
          className="h-full w-full object-contain"
        />
      ) : (
        <div className="relative h-full w-full">
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.title} artwork`}
              originWidth={1600}
              originHeight={900}
              className="h-full w-full object-contain"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `radial-gradient(circle at 70% 40%, ${item.gradient[0]}, ${item.gradient[1]} 62%, #000)`,
              }}
            />
          )}
          <div className="absolute inset-x-0 bottom-16 text-center">
            <p className="mx-auto max-w-md rounded-full border border-white/15 bg-black/70 px-5 py-3 text-sm text-white/70">
              The video file for this title hasn't been added yet — your artwork and
              progress are ready for it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}