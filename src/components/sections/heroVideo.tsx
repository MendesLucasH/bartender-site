"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const element = video.current;
      if (!element) return;
      element.muted = true;
      element.defaultMuted = true;
      element.autoplay = !preference.matches;
      if (preference.matches) element.pause();
      else void element.play().catch(() => {});
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  return (
    <>
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="auto"
        width={720}
        height={1280}
        poster="/images/backgroundsobre.jpg"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/media/hero-background.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-black/85" />
      <button
        type="button"
        className="absolute bottom-6 right-6 z-30 rounded-full border border-white/30 bg-black/60 p-3 text-white"
        onClick={() => {
          if (playing) video.current?.pause();
          else void video.current?.play().catch(() => {});
        }}
        aria-label={
          playing ? "Pausar vídeo de fundo" : "Reproduzir vídeo de fundo"
        }
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
    </>
  );
}
