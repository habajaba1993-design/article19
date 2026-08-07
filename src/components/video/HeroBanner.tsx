"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Video } from "@/lib/data";

interface HeroBannerProps {
  videos: Video[];
}

const typeLabels: Record<string, string> = {
  documentary: "Documentary",
  report: "Report",
  series: "Series",
  editorial: "Editorial",
};

export default function HeroBanner({ videos }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [contentReady, setContentReady] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  const current = videos[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => setContentReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Close share dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Auto-advance: resets on manual slide change, pauses when share is open
  useEffect(() => {
    if (shareOpen) return; // pause auto-slide while share menu is open

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setContentReady(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
        setIsTransitioning(false);
        setTimeout(() => setContentReady(true), 50);
      }, 500);
    }, 7000);

    return () => clearTimeout(timer);
  }, [videos.length, currentIndex, shareOpen]);

  const goTo = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setContentReady(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
      setTimeout(() => setContentReady(true), 50);
    }, 500);
  };

  const goPrev = () => {
    goTo(currentIndex === 0 ? videos.length - 1 : currentIndex - 1);
  };

  const goNext = () => {
    goTo((currentIndex + 1) % videos.length);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "85vh", minHeight: "550px", maxHeight: "800px" }}
      id="hero-banner"
    >
      {/* ── Full Bleed Background Image ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"
          }`}
      >
        {!imageError[currentIndex] ? (
          <Image
            key={currentIndex}
            src={current.heroImage || current.thumbnail}
            alt={current.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
            quality={90}
            onError={() =>
              setImageError((prev) => ({ ...prev, [currentIndex]: true }))
            }
          />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1510, #0C0E12, #14120e)" }} />
        )}
      </div>

      {/* ── Gradient Overlays ── */}
      {/* Top fade — ensures navbar text is readable */}
      <div
        className="absolute inset-x-0 top-0 h-[40%] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12, 14, 18, 0.8) 0%, rgba(12, 14, 18, 0) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, var(--bg-primary) 0%, rgba(12,14,18,0.7) 50%, transparent 100%)",
        }}
      />
      {/* Left text zone */}
      <div
        className="absolute inset-y-0 left-0 w-[55%] pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(12,14,18,0.8) 0%, rgba(12,14,18,0.4) 50%, transparent 100%)",
        }}
      />

      {/* ── Left / Right Nav Arrows ── */}
      <button
        onClick={goPrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300"
        style={{ color: "rgba(240, 237, 232, 0.5)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(240, 237, 232, 0.5)";
          e.currentTarget.style.background = "transparent";
        }}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all duration-300"
        style={{ color: "rgba(240, 237, 232, 0.5)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(240, 237, 232, 0.5)";
          e.currentTarget.style.background = "transparent";
        }}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Content (bottom-left, editorial) ── */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Type Badge */}
            <div
              className="transition-all duration-500"
              style={{
                opacity: contentReady ? 1 : 0,
                transform: contentReady ? "translateY(0)" : "translateY(14px)",
              }}
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-4"
                style={{
                  background: "var(--accent-gold-dim)",
                  color: "var(--accent-gold)",
                  border: "1px solid rgba(212, 160, 74, 0.25)",
                }}
              >
                {typeLabels[current.type] || current.type}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight mb-4 transition-all duration-500"
              style={{
                opacity: contentReady ? 1 : 0,
                transform: contentReady ? "translateY(0)" : "translateY(20px)",
                color: "var(--text-primary)",
                textShadow: "0 4px 30px rgba(0,0,0,0.7)",
              }}
            >
              {current.title}
            </h1>

            {/* Short Description */}
            <p
              className="text-sm sm:text-base leading-relaxed mb-6 line-clamp-2 transition-all duration-500"
              style={{
                opacity: contentReady ? 1 : 0,
                transform: contentReady ? "translateY(0)" : "translateY(14px)",
                transitionDelay: "80ms",
                color: "var(--text-secondary)",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {current.description}
            </p>

            {/* CTA Row */}
            <div
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: contentReady ? 1 : 0,
                transform: contentReady ? "translateY(0)" : "translateY(14px)",
                transitionDelay: "160ms",
              }}
            >
              <Link
                href={`/watch/${current.id}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{
                  background: "var(--accent-gold)",
                  color: "#0C0E12",
                }}
                id="hero-watch-now"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </Link>

              {/* Share Button */}
              <div className="relative" ref={shareRef}>
                <button
                  onClick={() => setShareOpen(!shareOpen)}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "var(--text-primary)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Share
                </button>

                {/* Share Dropdown */}
                {shareOpen && (
                  <div
                    className="absolute bottom-full left-0 mb-3 w-52 rounded-xl p-2 animate-scale-in shadow-xl"
                    style={{
                      background: "rgba(20, 22, 28, 0.95)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider px-3 py-2" style={{ color: "var(--text-muted)" }}>Share via</p>
                    {[
                      {
                        name: "Facebook",
                        color: "#1877F2",
                        icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                        getUrl: (url: string, title: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                      },
                      {
                        name: "X (Twitter)",
                        color: "#ffffff",
                        icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                        getUrl: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
                      },
                      {
                        name: "WhatsApp",
                        color: "#25D366",
                        icon: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
                        getUrl: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
                      },
                      {
                        name: "LinkedIn",
                        color: "#0A66C2",
                        icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                        getUrl: (url: string, title: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                      },
                    ].map((platform) => (
                      <button
                        key={platform.name}
                        onClick={() => {
                          const url = typeof window !== "undefined" ? `${window.location.origin}/watch/${current.id}` : "";
                          window.open(platform.getUrl(url, current.title), "_blank", "width=600,height=400");
                          setShareOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                          e.currentTarget.style.color = "var(--text-primary)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--text-secondary)";
                        }}
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill={platform.color}>
                          <path d={platform.icon} />
                        </svg>
                        {platform.name}
                      </button>
                    ))}

                    {/* Copy Link */}
                    <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: "4px", paddingTop: "4px" }}>
                      <button
                        onClick={() => {
                          const url = typeof window !== "undefined" ? `${window.location.origin}/watch/${current.id}` : "";
                          navigator.clipboard.writeText(url);
                          setCopied(true);
                          setTimeout(() => { setCopied(false); setShareOpen(false); }, 1500);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{ color: copied ? "#22c55e" : "var(--text-secondary)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {copied ? (
                          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#22c55e">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        )}
                        {copied ? "Link Copied!" : "Copy Link"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Slide Progress Indicators ── */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className="rounded-full transition-all duration-400 ease-out"
              style={{
                width: idx === currentIndex ? "24px" : "8px",
                height: "4px",
                borderRadius: "2px",
                background: idx === currentIndex ? "var(--accent-gold)" : "rgba(240, 237, 232, 0.25)",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(212, 160, 74, 0.4)" : "none",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
