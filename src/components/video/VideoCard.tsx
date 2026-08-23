"use client";

import Image from "next/image";
import Link from "next/link";
import { Video } from "@/lib/data";
import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import type { CardVariant } from "./VideoCarousel";
import { useLang } from "@/lib/LangContext";

interface VideoCardProps {
  video: Video;
  index?: number;
  variant?: CardVariant;
}

const typeLabels: Record<string, string> = {
  documentary: "Documentary",
  report: "Report",
  series: "Series",
  editorial: "Editorial",
};

export default function VideoCard({ video, index = 0, variant = "default" }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  const [hoverState, setHoverState] = useState<"idle" | "entering" | "visible" | "leaving">("idle");
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);
  const [originX, setOriginX] = useState<"left" | "center" | "right">("center");
  const cardRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const l = (path: string) => `/${lang}${path}`;
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Store the card's exact document position captured at mouseenter time
  const savedRect = useRef<{ top: number; left: number; width: number; height: number; right: number } | null>(null);

  // Determine if the card is on the left edge, center, or right edge of the viewport
  const computeOrigin = useCallback((left: number, width: number) => {
    const viewportW = window.innerWidth;
    const cardCenter = left + width / 2;
    const leftThreshold = viewportW * 0.18;
    const rightThreshold = viewportW * 0.82;

    if (cardCenter < leftThreshold) return "left";
    if (cardCenter > rightThreshold) return "right";
    return "center";
  }, []);

  const handleCardEnter = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }

    // If we're in the leaving state, go straight back to visible
    if (hoverState === "leaving") {
      setHoverState("visible");
      return;
    }

    // For non-spotlight: capture position immediately (stable layout)
    if (variant !== "spotlight" && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      savedRect.current = {
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        right: rect.right,
      };
    }

    // Spotlight needs a longer delay so sibling margins settle after closing
    const delay = variant === "spotlight" ? 450 : 300;

    enterTimer.current = setTimeout(() => {
      // For spotlight: re-capture position from LIVE DOM (card may have shifted)
      if (variant === "spotlight" && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        savedRect.current = {
          top: rect.top + window.scrollY,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          right: rect.right,
        };
      }

      if (savedRect.current) {
        const r = savedRect.current;
        setCardRect({ top: r.top, left: r.left, width: r.width, height: r.height, right: r.right } as DOMRect);
        setOriginX(computeOrigin(r.left, r.width));
        setHoverState("entering");
        // After entrance animation completes (matches CSS duration)
        setTimeout(() => setHoverState("visible"), 380);
      }
    }, delay);
  }, [hoverState, computeOrigin, variant]);

  const handleCardLeave = useCallback(() => {
    if (enterTimer.current) {
      clearTimeout(enterTimer.current);
      enterTimer.current = null;
    }

    if (hoverState === "idle") return;

    leaveTimer.current = setTimeout(() => {
      setHoverState("leaving");
      // After exit animation, go idle (matches longest CSS animation)
      setTimeout(() => setHoverState("idle"), 400);
    }, 80);
  }, [hoverState]);

  const handleOverlayEnter = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    if (hoverState === "leaving") {
      setHoverState("visible");
    }
  }, [hoverState]);

  const handleOverlayLeave = useCallback(() => {
    setHoverState("leaving");
    setTimeout(() => setHoverState("idle"), 400);
  }, []);

  const isOverlayVisible = hoverState !== "idle";
  // Spotlight push: only during entering/visible — NOT during leaving
  // This ensures margin collapses early so next card can settle to its true position
  const isSpotlightOpen = variant === "spotlight" && (hoverState === "entering" || hoverState === "visible");

  return (
    <>
      {/* Resting card — variant-specific */}
      <div
        ref={cardRef}
        className={`pv-card pv-card--${variant}${isSpotlightOpen ? " pv-card--spotlight-open" : ""}`}
        onMouseEnter={handleCardEnter}
        onMouseLeave={handleCardLeave}
      >
        <Link href={l(`/watch/${video.id}`)} className="block">
          <div className={`pv-card-thumb pv-card-thumb--${variant}`}>
            {!imageError ? (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                onError={() => setImageError(true)}
              />
            ) : (
              <GradientPlaceholder title={video.title} />
            )}
            <div className="pv-card-gradient" />

            {/* ── Variant: featured — big centered title + gold accent ── */}
            {variant === "featured" && (
              <>
                <div className="pv-card-featured-overlay">
                  <span className="pv-card-featured-title">{video.title}</span>
                  <span className="pv-card-rating-badge">★ {video.rating}</span>
                </div>
                <div className="pv-card-featured-accent" />
              </>
            )}

            {/* ── Variant: new — glassmorphism title bar + ribbon ── */}
            {variant === "new" && (
              <>
                <div className="pv-card-new-ribbon">NEW</div>
                <div className="pv-card-new-glass-bar">
                  <span className="pv-card-new-title">{video.title}</span>
                </div>
              </>
            )}

            {/* ── Variant: spotlight — centered title overlay ── */}
            {variant === "spotlight" && (
              <div className="pv-card-spotlight-overlay">
                <span className="pv-card-spotlight-type">{typeLabels[video.type]}</span>
                <span className="pv-card-spotlight-title">{video.title}</span>
                <span className="pv-card-spotlight-year">{video.year}</span>
              </div>
            )}

            {/* ── Variant: cinematic — bottom info bar ── */}
            {variant === "cinematic" && (
              <div className="pv-card-cinematic-bar">
                <span className="pv-card-cinematic-title">{video.title}</span>
                <div className="pv-card-cinematic-meta">
                  <span>{video.duration}</span>
                  <span className="pv-card-cinematic-dot">·</span>
                  <span>★ {video.rating}</span>
                </div>
              </div>
            )}

            {/* ── Default title bar ── */}
            {variant === "default" && (
              <div className="pv-card-title-bar">
                <span className="pv-card-title">{video.title}</span>
              </div>
            )}
          </div>
        </Link>

        {/* ── Variant: minimal — Title OUTSIDE the thumbnail ── */}
        {variant === "minimal" && (
          <div className="pv-card-minimal-info">
            <h4 className="pv-card-minimal-title">{video.title}</h4>
            <div className="pv-card-minimal-meta">
              <span>{video.year}</span>
              <span className="pv-card-minimal-dot">·</span>
              <span>{typeLabels[video.type]}</span>
            </div>
            <div className="pv-card-minimal-line" />
          </div>
        )}
      </div>

      {/* Hover overlay — portal to body */}
      {mounted && isOverlayVisible && cardRect && createPortal(
        <HoverOverlay
          video={video}
          rect={cardRect}
          imageError={imageError}
          originX={originX}
          animState={hoverState}
          variant={variant}
          lang={lang}
          onMouseEnter={handleOverlayEnter}
          onMouseLeave={handleOverlayLeave}
        />,
        document.body
      )}
    </>
  );
}

/* ─── Hover Overlay ─── */

interface HoverOverlayProps {
  video: Video;
  rect: DOMRect;
  imageError: boolean;
  originX: "left" | "center" | "right";
  animState: "entering" | "visible" | "leaving" | "idle";
  variant: CardVariant;
  lang: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Aspect ratios per variant (width / height)
const variantAspect: Record<CardVariant, number> = {
  default: 16 / 9,
  featured: 3 / 2,
  new: 3 / 4,
  spotlight: 2 / 3,
  minimal: 1 / 1,
  cinematic: 21 / 9,
};

function HoverOverlay({
  video,
  rect,
  imageError,
  originX,
  animState,
  variant,
  lang,
  onMouseEnter,
  onMouseLeave,
}: HoverOverlayProps) {

  // ── SPOTLIGHT: Side-panel slide layout ──
  if (variant === "spotlight") {
    return (
      <SpotlightOverlay
        video={video}
        rect={rect}
        imageError={imageError}
        originX={originX}
        animState={animState}
        lang={lang}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  // ── All other variants: Zoom overlay ──
  const scale = 1.4;
  const startScale = 1 / scale;
  const expandedWidth = rect.width * scale;
  const aspect = variantAspect[variant];

  // The vertical center of the thumbnail part of the expanded card
  const thumbHeight = expandedWidth / aspect;
  const originY = thumbHeight / 2;

  // Base top position so the expanded thumbnail center perfectly aligns with the original card center
  const top = rect.top + rect.height / 2 - originY;

  let baseLeft: number;
  let baseOriginX: number;

  if (originX === "left") {
    baseLeft = rect.left;
    baseOriginX = 0;
  } else if (originX === "right") {
    baseLeft = rect.right - expandedWidth;
    baseOriginX = expandedWidth;
  } else {
    baseLeft = rect.left + rect.width / 2 - expandedWidth / 2;
    baseOriginX = expandedWidth / 2;
  }

  // Clamp to viewport
  let left = baseLeft;
  if (left < 4) left = 4;
  if (left + expandedWidth > window.innerWidth - 4) {
    left = window.innerWidth - expandedWidth - 4;
  }

  // Adjust transform-origin X so the stationary point remains perfectly aligned with the original card
  const originXpx = baseLeft + baseOriginX - left;

  // Animation class
  const animClass =
    animState === "entering"
      ? "pv-overlay-enter"
      : animState === "leaving"
        ? "pv-overlay-leave"
        : "pv-overlay-visible";

  return (
    <div
      className={`pv-hover-overlay ${animClass}`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${expandedWidth}px`,
        transformOrigin: `${originXpx}px ${originY}px`,
        "--start-scale": startScale,
      } as React.CSSProperties}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`pv-hover-card pv-hover-card--${variant}`}>
        {/* Thumbnail */}
        <Link href={`/${lang}/watch/${video.id}`} className="block">
          <div className={`pv-hover-thumb pv-hover-thumb--${variant}`}>
            {!imageError ? (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover object-center"
                sizes="500px"
              />
            ) : (
              <GradientPlaceholder title={video.title} />
            )}
            <div className={`pv-hover-play-overlay pv-hover-play-overlay--${variant}`}>
              <div className={`pv-hover-play-btn pv-hover-play-btn--${variant}`}>
                <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {/* Variant accent decorations on hover card */}
        {variant === "featured" && <div className="pv-hover-featured-accent" />}
        {variant === "minimal" && <div className="pv-hover-minimal-line" />}

        {/* Metadata panel */}
        <div className={`pv-hover-meta pv-hover-meta--${variant}`}>
          <Link href={`/${lang}/watch/${video.id}`}>
            <h3 className="pv-hover-title">{video.title}</h3>
          </Link>

          {/* Action buttons */}
          <div className="pv-hover-actions">
            <Link href={`/${lang}/watch/${video.id}`} className={`pv-hover-action-play pv-hover-action-play--${variant}`}>
              <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </Link>
            <button className={`pv-hover-action-btn pv-hover-action-btn--${variant}`} aria-label="Add to Watchlist">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className={`pv-hover-action-btn pv-hover-action-btn--${variant}`} aria-label="More Info">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </button>
          </div>

          {/* Tags */}
          <div className="pv-hover-tags">
            <span className={`pv-hover-rating pv-hover-rating--${variant}`}>★ {video.rating}</span>
            <span className="pv-hover-dot">·</span>
            <span className="pv-hover-year">{video.year}</span>
            <span className="pv-hover-dot">·</span>
            <span className="pv-hover-duration">{video.duration}</span>
            <span className={`pv-hover-badge pv-hover-badge--${variant}`}>{typeLabels[video.type]}</span>
          </div>

          {/* Synopsis */}
          <p className="pv-hover-synopsis">{video.description}</p>

          {/* Genres */}
          <div className="pv-hover-genres">
            {video.genre.map((g, i) => (
              <span key={g}>
                {i > 0 && <span className="pv-hover-dot">·</span>}
                <span className="pv-hover-genre">{g}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Spotlight Side-Panel Overlay ─── */

function SpotlightOverlay({
  video,
  rect,
  imageError,
  originX,
  animState,
  lang,
  onMouseEnter,
  onMouseLeave,
}: Omit<HoverOverlayProps, "variant">) {
  const panelWidth = 260;
  const posterWidth = rect.width;
  const posterHeight = rect.height;

  // Decide whether to open right or left based on viewport space
  const spaceRight = window.innerWidth - rect.right;
  const openRight = spaceRight > panelWidth + 20;

  const top = rect.top;
  const left = openRight ? rect.left : rect.left - panelWidth;

  // Animation class
  const animClass =
    animState === "entering"
      ? "pv-spotlight-enter"
      : animState === "leaving"
        ? "pv-spotlight-leave"
        : "pv-spotlight-visible";

  const dirClass = openRight ? "pv-spotlight--right" : "pv-spotlight--left";

  return (
    <div
      className={`pv-spotlight-overlay ${animClass} ${dirClass}`}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        height: `${posterHeight}px`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Poster (stays in place) */}
      <div
        className="pv-spotlight-poster"
        style={{
          width: `${posterWidth}px`,
          height: `${posterHeight}px`,
          order: openRight ? 0 : 1,
        }}
      >
        <Link href={`/${lang}/watch/${video.id}`} className="block relative w-full h-full">
          {!imageError ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover object-center"
              sizes="300px"
            />
          ) : (
            <GradientPlaceholder title={video.title} />
          )}
          <div className="pv-spotlight-poster-gradient" />
          <div className="pv-spotlight-play">
            <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Detail Panel */}
      <div
        className="pv-spotlight-panel"
        style={{
          width: `${panelWidth}px`,
          order: openRight ? 1 : 0,
        }}
      >
        <div className="pv-spotlight-panel-inner">
          <Link href={`/${lang}/watch/${video.id}`}>
            <h3 className="pv-spotlight-panel-title">{video.title}</h3>
          </Link>

          {/* Tags */}
          <div className="pv-spotlight-panel-tags">
            <span className="pv-spotlight-panel-rating">★ {video.rating}</span>
            <span className="pv-hover-dot">·</span>
            <span className="pv-spotlight-panel-year">{video.year}</span>
            <span className="pv-hover-dot">·</span>
            <span className="pv-spotlight-panel-duration">{video.duration}</span>
          </div>

          <span className="pv-spotlight-panel-type">{typeLabels[video.type]}</span>

          {/* Synopsis */}
          <p className="pv-spotlight-panel-desc">{video.description}</p>

          {/* Action buttons */}
          <div className="pv-spotlight-panel-actions">
            <Link href={`/${lang}/watch/${video.id}`} className="pv-spotlight-panel-play-btn">
              <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play</span>
            </Link>
            <button className="pv-spotlight-panel-action" aria-label="Add to Watchlist">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="pv-spotlight-panel-action" aria-label="More Info">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </button>
          </div>

          {/* Genres */}
          <div className="pv-spotlight-panel-genres">
            {video.genre.map((g, i) => (
              <span key={g}>
                {i > 0 && <span className="pv-hover-dot">·</span>}
                <span className="pv-spotlight-panel-genre">{g}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GradientPlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center" style={{ background: "linear-gradient(135deg, #1a1510, #0C0E12)" }}>
      <svg className="w-8 h-8 mb-2 opacity-30" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span className="text-xs font-black uppercase tracking-widest line-clamp-1" style={{ color: "var(--text-muted)" }}>
        {title}
      </span>
    </div>
  );
}
