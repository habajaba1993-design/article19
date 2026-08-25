"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Video, formatViews } from "@/lib/data";
import VideoCard from "@/components/video/VideoCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DonationBanner from "@/components/ui/DonationBanner";
import AdCarousel from "@/components/ui/AdCarousel";
import { useLang } from "@/lib/LangContext";

interface WatchPageClientProps {
  video: Video;
  relatedVideos: Video[];
}

export default function WatchPageClient({ video, relatedVideos }: WatchPageClientProps) {
  const { lang, dict } = useLang();
  const l = (path: string) => `/${lang}${path}`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [heartBounce, setHeartBounce] = useState(false);
  const scrubBarRef = useRef<HTMLDivElement>(null);

  // Always scroll to top when watch page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [video.id]);

  // Calculate progress from mouse/touch position
  const calcProgress = useCallback((clientX: number) => {
    if (!scrubBarRef.current) return;
    const rect = scrubBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setProgress(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  }, []);

  // Drag handlers for scrub bar
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      calcProgress(e.clientX);
    };
    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, calcProgress]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const handleFavorite = () => {
    setFavorited(!favorited);
    setHeartBounce(true);
    setTimeout(() => setHeartBounce(false), 400);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen" style={{ paddingTop: "80px", background: "var(--bg-primary)" }}>
      {/* Video Player Container */}
      <div className="relative w-full animate-fade-in" style={{ background: "#000" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center group" style={{ maxHeight: "75vh", background: "#09090b" }}>
            {/* Background Thumbnail Poster */}
            {!imageError ? (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className={`object-cover transition-all duration-700 ${isPlaying ? "scale-105 opacity-30 blur-sm" : "opacity-60"
                  }`}
                sizes="100vw"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1510, #0C0E12, #14120e)" }} />
            )}

            {/* Play Overlay Screen when paused */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center z-20 animate-fade-in"
                style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
              >
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse-glow"
                  style={{ background: "var(--accent-gold)", color: "#0C0E12", boxShadow: "0 8px 40px rgba(212, 160, 74, 0.4)" }}
                  aria-label="Play video"
                  id="main-play-trigger"
                >
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <p className="mt-4 text-sm font-semibold tracking-wide" style={{ color: "rgba(240,237,232,0.9)" }}>
                  {dict.watch.clickToPlay} · <span style={{ color: "var(--accent-gold)" }}>{video.duration}</span>
                </p>
              </div>
            )}

            {/* Playing Status Overlay */}
            {isPlaying && (
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold animate-slide-down" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}>
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "var(--accent-crimson)" }} />
                <span>{dict.watch.nowPlaying} · {video.duration}</span>
              </div>
            )}

            {/* Player Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 z-30 p-4 transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), transparent)" }}>
              {/* Scrub Bar */}
              <div
                ref={scrubBarRef}
                className="relative w-full rounded-full cursor-pointer mb-3 group/scrub"
                style={{ height: "6px", background: "rgba(255,255,255,0.2)" }}
                onClick={(e) => { if (!isDragging) calcProgress(e.clientX); }}
                onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); calcProgress(e.clientX); }}
              >
                <div
                  className="h-full rounded-full relative pointer-events-none transition-all duration-100"
                  style={{ width: `${progress}%`, background: "var(--accent-gold)" }}
                >
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white transition-transform scale-0 group-hover/scrub:scale-100 pointer-events-auto cursor-grab active:cursor-grabbing"
                    style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.4), 0 0 8px rgba(212,160,74,0.3)", transform: "translate(50%, -50%)" }}
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between text-white text-sm">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="transition-all duration-200 hover:scale-110" aria-label="Toggle play">
                    {isPlaying ? (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                    ) : (
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    )}
                  </button>
                  <button onClick={toggleMute} className="transition-all duration-200 hover:scale-110" aria-label="Toggle mute">
                    {isMuted ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                  <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    00:00:00 / {video.duration}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-[11px] font-bold" style={{ background: "var(--accent-gold-dim)", border: "1px solid rgba(212,160,74,0.3)", color: "var(--accent-gold)" }}>
                    HD
                  </span>
                  <button className="transition-all duration-200 hover:scale-110" aria-label="Fullscreen">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details & Content Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-4 animate-fade-in-up" style={{ color: "var(--text-primary)" }}>
              {video.title}
            </h1>

            {/* Info & Actions Bar — Single Line */}
            <div className="flex flex-wrap items-center gap-3 py-5 mb-6 animate-fade-in-up" style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", animationDelay: "80ms" }}>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                {video.year}
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                {video.duration}
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold" style={{ background: "var(--accent-gold-dim)", color: "var(--accent-gold)", border: "1px solid rgba(212,160,74,0.2)" }}>
                {video.language}
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider" style={{ background: "var(--accent-crimson-dim)", color: "#E87070" }}>
                {video.type}
              </span>

              {/* Divider */}
              <div className="w-px h-6 mx-1 hidden sm:block" style={{ background: "var(--border-subtle)" }} />

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                {copied ? (
                  <svg className="w-5 h-5 animate-scale-in" style={{ color: "#22c55e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )}
                <span style={copied ? { color: "#22c55e" } : undefined}>
                  {copied ? dict.watch.linkCopied : dict.watch.share}
                </span>
              </button>

              <div className="ml-auto text-xs flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {formatViews(video.views)} {dict.watch.views}
              </div>
            </div>

            {/* Story Overview */}
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{dict.watch.overview}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {video.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Genres */}
            <ScrollReveal delay={100}>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>{dict.watch.topicsTags}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {video.genre.map((g) => (
                    <span
                      key={g}
                      className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Support Banner — Desktop: after tags */}
            <div className="hidden lg:block mt-10">
              <DonationBanner />
            </div>
          </div>

          {/* Right Column: Ads + Related Content */}
          <div className="lg:col-span-1">
            <div className="sticky" style={{ top: "calc(var(--nav-height) + 20px)" }}>
              {/* Ad Sidebar — top of sidebar */}
              <AdCarousel maxSlots={1} />

              {/* Related Content — below ads */}
              <h2 className="text-lg font-bold mb-5 mt-8 flex items-center gap-2 animate-fade-in-up" style={{ color: "var(--text-primary)" }}>
                <span className="w-1 h-5 rounded-full" style={{ background: "var(--accent-gold)" }} />
                {dict.watch.relatedContent}
              </h2>
              <div className="space-y-4">
                {relatedVideos.map((rv, index) => (
                  <ScrollReveal key={rv.id} delay={index * 80}>
                    <RelatedVideoCard video={rv} lang={lang} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Banner — Mobile only: at the bottom */}
        <div className="lg:hidden">
          <DonationBanner />
        </div>
      </div>
    </div>
  );
}

function RelatedVideoCard({ video, lang }: { video: Video; lang: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/${lang}/watch/${video.id}`}
      className="flex gap-3.5 group rounded-xl p-3 transition-all duration-300 hover:bg-slate-800/30"
      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
      id={`related-${video.id}`}
    >
      {/* Thumbnail */}
      <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0" style={{ background: "var(--bg-elevated)" }}>
        {!imgError ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="128px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
            {video.title.slice(0, 3)}
          </div>
        )}
        <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: "rgba(0,0,0,0.8)", color: "#fff", backdropFilter: "blur(4px)" }}>
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-sm font-bold line-clamp-1 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
          {video.title}
        </h3>
        <p className="text-xs line-clamp-1 mt-1" style={{ color: "var(--text-muted)" }}>
          {video.genre.join(", ")}
        </p>
        <div className="flex items-center gap-2 mt-1.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
          <span className="font-bold" style={{ color: "var(--accent-gold-light)" }}>★ {video.rating}</span>
          <span>•</span>
          <span>{formatViews(video.views)} views</span>
        </div>
      </div>
    </Link>
  );
}
