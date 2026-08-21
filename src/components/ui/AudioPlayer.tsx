"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Podcast } from "@/lib/data";

interface Props {
  podcast: Podcast | null;
  onClose: () => void;
}

export default function AudioPlayer({ podcast, onClose }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [volume, setVolume] = useState(80);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Parse duration string to seconds
  const parseDuration = useCallback((d: string) => {
    const m = d.match(/(\d+)/);
    return m ? parseInt(m[1]) * 60 : 300;
  }, []);

  const totalSeconds = podcast ? parseDuration(podcast.duration) : 300;

  // Format seconds to mm:ss
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // Animate entrance
  useEffect(() => {
    if (podcast) {
      setVisible(true);
      setExiting(false);
      setProgress(0);
      setCurrentTime("0:00");
      setIsPlaying(true);
    }
  }, [podcast?.id]);

  // Simulate playback progress
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPlaying && podcast) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          const next = Math.min(p + 100 / totalSeconds, 100);
          setCurrentTime(fmt((next / 100) * totalSeconds));
          if (next >= 100) { setIsPlaying(false); clearInterval(intervalRef.current!); }
          return next;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, podcast?.id, totalSeconds]);

  const handleClose = () => {
    setExiting(true);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => { setVisible(false); setExiting(false); onClose(); }, 400);
  };

  if (!podcast || !visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 ${exiting ? "podcast-player-exit" : "podcast-player-enter"}`}
      style={{ pointerEvents: exiting ? "none" : "auto" }}
    >
      {/* Progress bar on top edge */}
      <div className="h-[2px] w-full" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, var(--accent-gold), #E8C373)",
            transition: "width 1s linear",
          }}
        />
      </div>

      <div
        style={{
          background: "#0C0E12", // Solid background to prevent bleeding
          borderTop: "1px solid rgba(212, 160, 74, 0.2)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.8)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">

          {/* Mobile Top Row: Title & Close */}
          <div className="flex items-center justify-between w-full sm:hidden mb-1">
            <div className="min-w-0 flex-1 mr-2">
              <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{podcast.title}</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                S{podcast.season} · E{podcast.episode} · {podcast.host}
              </p>
            </div>
            <button onClick={handleClose}
              className="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
            {/* Thumbnail */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden shrink-0 hidden sm:block"
              style={{ border: "1px solid rgba(212,160,74,0.2)" }}>
              <Image src={podcast.thumbnail} alt={podcast.title} fill className="object-cover" />
              {isPlaying && (
                <div className="absolute inset-0 flex items-end justify-center gap-[2px] pb-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-[3px] rounded-full eq-bar" style={{ background: "var(--accent-gold)" }} />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Info */}
            <div className="min-w-0 flex-shrink mr-2 hidden sm:block" style={{ maxWidth: 200 }}>
              <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{podcast.title}</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                S{podcast.season} · E{podcast.episode} · {podcast.host}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Rewind 15s */}
              <button onClick={() => setProgress(p => Math.max(0, p - (15 / totalSeconds) * 100))}
                className="p-1.5 transition-colors duration-200" style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5 3C7.81 3 4 6.81 4 11.5h-3l4 4 4-4H6c0-3.59 2.91-6.5 6.5-6.5S19 7.91 19 11.5 16.09 18 12.5 18v2c4.69 0 8.5-3.81 8.5-8.5S17.19 3 12.5 3z" />
                  <text x="9" y="14" fontSize="7" fill="currentColor" fontWeight="bold">15</text>
                </svg>
              </button>

              {/* Play/Pause */}
              <button onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
                  color: "#0C0E12",
                  boxShadow: "0 2px 12px rgba(212,160,74,0.3)",
                }}>
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>

              {/* Forward 15s */}
              <button onClick={() => setProgress(p => Math.min(100, p + (15 / totalSeconds) * 100))}
                className="p-1.5 transition-colors duration-200" style={{ color: "var(--text-muted)" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.5 3C16.19 3 20 6.81 20 11.5h3l-4 4-4-4h3c0-3.59-2.91-6.5-6.5-6.5S5 7.91 5 11.5 7.91 18 11.5 18v2C6.81 20 3 16.19 3 11.5S6.81 3 11.5 3z" />
                  <text x="8" y="14" fontSize="7" fill="currentColor" fontWeight="bold">15</text>
                </svg>
              </button>
            </div>

            {/* Progress slider */}
            <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="text-[10px] font-mono shrink-0 hidden sm:block" style={{ color: "var(--text-muted)" }}>{currentTime}</span>
              <input
                type="range" min="0" max="100" step="0.1" value={progress}
                onChange={e => { setProgress(Number(e.target.value)); setCurrentTime(fmt((Number(e.target.value) / 100) * totalSeconds)); }}
                className="podcast-progress flex-1 h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, var(--accent-gold) ${progress}%, rgba(255,255,255,0.1) ${progress}%)` }}
              />
              <span className="text-[10px] font-mono shrink-0 hidden sm:block" style={{ color: "var(--text-muted)" }}>{podcast.duration}</span>
            </div>

            {/* Volume (desktop) */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <svg className="w-4 h-4" style={{ color: "var(--text-muted)" }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.47 4.47 0 002.5-3.5z" />
              </svg>
              <input
                type="range" min="0" max="100" value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="podcast-volume w-16 h-1 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, var(--text-muted) ${volume}%, rgba(255,255,255,0.08) ${volume}%)` }}
              />
            </div>

            {/* Desktop Close */}
            <button onClick={handleClose}
              className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full ml-2 shrink-0 transition-all duration-300 hover:scale-110"
              style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)"; e.currentTarget.style.color = "#ef4444"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
              <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
