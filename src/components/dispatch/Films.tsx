"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* The three films, played in a panel over the page.

   The transport is ours rather than the browser's: a square play/pause, a
   hairline scrub track with a brass fill, and a mono time readout. The fill
   is driven by a --p custom property because Firefox paints
   ::-moz-range-track over the input's own background, so setting it on the
   element alone would show nothing there. */

const FILMS = [
  {
    id: "a",
    title: "The dispatch board",
    dur: "1:43",
    body: "Booking a call-in, auto-assign, a manual override, and the day's record",
    src: "/media/film-a.mp4",
    poster: "/media/film-a.jpg",
  },
  {
    id: "b",
    title: "The passenger app",
    dur: "1:06",
    body: "Search, fare, driver assigned, and the car tracked to the door",
    src: "/media/film-b.mp4",
    poster: "/media/film-b.jpg",
  },
  {
    id: "c",
    title: "The driver app",
    dur: "1:15",
    body: "Going online, an offer, navigation, and closing out a cash fare",
    src: "/media/film-c.mp4",
    poster: "/media/film-c.jpg",
  },
];

const clock = (sec: number) => {
  const s = Math.max(0, Math.floor(sec || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export function Films() {
  const [open, setOpen] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const scrubbing = useRef(false);

  const close = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }
    setOpen(null);
    setTime(0);
    setDuration(0);
    document.body.style.overflow = "";
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    /* The panel opened from a click, so this is still inside the user
       gesture — saves a second press. Refused, and the poster stays with the
       transport showing Play. */
    videoRef.current?.play()?.catch(() => {});
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const film = open === null ? null : FILMS[open];
  const pct = duration ? Math.min(100, (time / duration) * 100) : 0;

  return (
    <>
      <div className="border-t border-rule">
        {FILMS.map((f, i) => (
          <button
            key={f.id}
            type="button"
            onClick={(e) => {
              lastFocus.current = e.currentTarget;
              setOpen(i);
            }}
            className="index-row group grid w-full grid-cols-1 items-center gap-x-8 gap-y-4 border-b border-rule px-1 py-7 text-left hover:bg-surface-2 md:grid-cols-[12rem_3rem_minmax(0,1fr)_6rem] md:py-6"
          >
            {/* Full-resolution, because the same file is the panel's poster —
                one fetch serves the 12rem thumbnail and the 70rem still. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.poster}
              alt=""
              loading="lazy"
              decoding="async"
              className="block h-auto w-full border border-rule-2"
            />
            <span className="numeral text-[0.8125rem] text-fg-3">{f.dur}</span>
            <span>
              <span className="block text-[1.05rem] font-medium tracking-[-0.015em] text-fg">
                {f.title}
              </span>
              <span className="mt-1 block max-w-[52ch] text-[0.9375rem] text-fg-2">
                {f.body}
              </span>
            </span>
            <span className="label transition-colors duration-400 group-hover:text-brass md:justify-self-end">
              Play &rarr;
            </span>
          </button>
        ))}
      </div>

      {film && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-[rgba(9,10,12,0.93)] p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-[min(70rem,100%)]">
            <div className="mb-3 flex items-baseline justify-between gap-6">
              <p className="label">
                {film.title} — {film.dur}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="label transition-colors hover:text-fg"
              >
                Close &times;
              </button>
            </div>

            <video
              ref={videoRef}
              src={film.src}
              poster={film.poster}
              playsInline
              autoPlay
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
              onTimeUpdate={(e) => {
                if (!scrubbing.current) setTime(e.currentTarget.currentTime);
              }}
              onPlay={() => setPaused(false)}
              onPause={() => setPaused(true)}
              onEnded={() => setPaused(true)}
              className="block h-auto w-full border border-rule-2 bg-black"
            />

            <div className="mt-3 flex items-center gap-4">
              <button
                type="button"
                aria-label={paused ? "Play" : "Pause"}
                onClick={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  if (v.paused) v.play()?.catch(() => {});
                  else v.pause();
                }}
                className="grid h-6 w-6 flex-none place-items-center border border-rule-2 text-fg-2 transition-colors hover:border-brass-dim hover:text-brass"
              >
                {paused ? (
                  <svg width="9" height="10" viewBox="0 0 9 10" aria-hidden>
                    <path d="M0 0 L9 5 L0 10 Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="8" height="10" viewBox="0 0 8 10" aria-hidden>
                    <path d="M0 0h3v10H0zM5 0h3v10H5z" fill="currentColor" />
                  </svg>
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1000}
                value={duration ? Math.round((time / duration) * 1000) : 0}
                aria-label={`Seek ${film.title}`}
                onPointerDown={() => (scrubbing.current = true)}
                onPointerUp={() => (scrubbing.current = false)}
                onKeyDown={() => (scrubbing.current = true)}
                onKeyUp={() => (scrubbing.current = false)}
                onChange={(e) => {
                  const v = videoRef.current;
                  const t = (Number(e.target.value) / 1000) * duration;
                  setTime(t);
                  if (v) {
                    try {
                      v.currentTime = t;
                    } catch {}
                  }
                }}
                className="tp-seek flex-1"
                style={{ ["--p" as string]: `${pct.toFixed(2)}%` }}
              />

              <span className="numeral flex-none text-[0.6875rem] text-fg-3">
                {clock(time)} / {clock(duration)}
              </span>

              <button
                type="button"
                aria-label={muted ? "Unmute" : "Mute"}
                onClick={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  v.muted = !v.muted;
                  setMuted(v.muted);
                }}
                className="label flex-none transition-colors hover:text-fg"
              >
                {muted ? "Unmute" : "Mute"}
              </button>

              <button
                type="button"
                aria-label="Full screen"
                onClick={() => videoRef.current?.requestFullscreen?.()}
                className="label flex-none transition-colors hover:text-fg"
              >
                Full screen
              </button>
            </div>

            <p className="label mt-4 text-[0.625rem]">
              Recorded in a demonstration environment. Figures are illustrative.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
