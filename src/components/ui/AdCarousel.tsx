"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { adSlots, type Ad } from "@/lib/adData";

export default function AdCarousel({ maxSlots }: { maxSlots?: number } = {}) {
  if (adSlots.length === 0) return null;

  const slotsToShow = maxSlots ? adSlots.slice(0, maxSlots) : adSlots;

  return (
    <div className="ad-sidebar-column" id="ad-sidebar">
      {/* Stacked Ad Slots — each slot is a carousel */}
      <div className="flex flex-col gap-5">
        {slotsToShow.map((slotAds, slotIndex) => (
          <AdSlotCarousel
            key={slotIndex}
            ads={slotAds}
            slotIndex={slotIndex}
          />
        ))}
      </div>
    </div>
  );
}

// ── Single Ad Slot — Carousel of multiple ads ──
interface AdSlotCarouselProps {
  ads: Ad[];
  slotIndex: number;
}

function AdSlotCarousel({ ads, slotIndex }: AdSlotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stagger auto-rotate timing per slot
  const rotateInterval = 5000 + slotIndex * 1500;

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  }, [isTransitioning, ads.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 250);
    },
    [isTransitioning, currentIndex]
  );

  // Auto-rotate
  useEffect(() => {
    if (isPaused || ads.length <= 1) return;
    intervalRef.current = setInterval(goToNext, rotateInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, goToNext, ads.length, rotateInterval]);

  const handleImageError = (adId: string) => {
    setImageErrors((prev) => new Set(prev).add(adId));
  };

  const ad = ads[currentIndex];

  return (
    <div
      className="ad-slot-carousel animate-fade-in-up"
      style={{ animationDelay: `${slotIndex * 120 + 200}ms` }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="ad-card rounded-xl overflow-hidden"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-subtle)",
          transition:
            "border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        {/* Ad Content — with fade transition */}
        <div
          className="ad-slot-content"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(4px)" : "translateY(0)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
          }}
        >
          {/* Banner Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {!imageErrors.has(ad.id) ? (
              <Image
                src={ad.bannerImage}
                alt={ad.headline}
                fill
                className="object-cover"
                sizes="300px"
                onError={() => handleImageError(ad.id)}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${ad.accentColor || "var(--accent-gold)"}18, var(--bg-elevated))`,
                }}
              >
                <span className="text-4xl">{ad.logo}</span>
              </div>
            )}

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, var(--bg-secondary) 0%, rgba(20, 22, 28, 0.3) 60%, transparent 100%)",
              }}
            />

            {/* Company Badge */}
            <div
              className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <span className="text-xs">{ad.logo}</span>
              <span
                className="text-[10px] font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {ad.company}
              </span>
            </div>

            {/* Category tag */}
            <div
              className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded"
              style={{
                background: `${ad.accentColor || "var(--accent-gold)"}20`,
                border: `1px solid ${ad.accentColor || "var(--accent-gold)"}30`,
              }}
            >
              <span
                className="text-[8px] font-extrabold uppercase tracking-[0.1em]"
                style={{ color: ad.accentColor || "var(--accent-gold)" }}
              >
                {ad.category}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-3.5">
            <h3
              className="text-[13px] font-bold leading-snug mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {ad.headline}
            </h3>
            <p
              className="text-[11px] leading-relaxed mb-3"
              style={{
                color: "var(--text-muted)",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}
            >
              {ad.description}
            </p>

            {/* CTA Button */}
            <a
              href={ad.ctaUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="ad-cta-button flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${ad.accentColor || "var(--accent-gold)"}18, ${ad.accentColor || "var(--accent-gold)"}08)`,
                border: `1px solid ${ad.accentColor || "var(--accent-gold)"}30`,
                color: ad.accentColor || "var(--accent-gold)",
              }}
            >
              {ad.ctaText}
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Dot Navigation + Accent Line */}
        {ads.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pb-3 pt-1">
            {ads.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="transition-all duration-300"
                style={{
                  width: i === currentIndex ? "16px" : "5px",
                  height: "5px",
                  borderRadius: "3px",
                  background:
                    i === currentIndex
                      ? ad.accentColor || "var(--accent-gold)"
                      : "rgba(255, 255, 255, 0.12)",
                  boxShadow:
                    i === currentIndex
                      ? `0 0 6px ${ad.accentColor || "rgba(212, 160, 74, 0.4)"}`
                      : "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
                aria-label={`Go to ad ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom accent line */}
        <div
          style={{
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${ad.accentColor || "var(--accent-gold)"}, transparent)`,
            opacity: 0.3,
            transition: "background 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}
