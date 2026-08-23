"use client";

import Link from "next/link";

import { useRef, useState, useEffect, useCallback } from "react";
import { Video } from "@/lib/data";
import VideoCard from "./VideoCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLang } from "@/lib/LangContext";

export type CardVariant = "default" | "featured" | "new" | "spotlight" | "minimal" | "cinematic";

interface VideoCarouselProps {
  title: string;
  icon?: string;
  videos: Video[];
  cardVariant?: CardVariant;
  categorySlug?: string;
}

const variantWidths: Record<CardVariant, string> = {
  default: "clamp(200px, 18vw, 280px)",
  featured: "clamp(260px, 24vw, 360px)",
  new: "clamp(180px, 16vw, 240px)",
  spotlight: "clamp(160px, 14vw, 220px)",
  minimal: "clamp(180px, 16vw, 240px)",
  cinematic: "clamp(300px, 28vw, 440px)",
};

export default function VideoCarousel({ title, videos, cardVariant = "default", categorySlug }: VideoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { lang, dict } = useLang();
  const l = (path: string) => `/${lang}${path}`;

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll, videos]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (videos.length === 0) return null;

  return (
    <section className="carousel-container relative" style={{ marginTop: "40px", marginBottom: "16px", paddingBottom: "20px" }}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 animate-slide-in-left">
          <div
            className="w-1 h-6 rounded-full"
            style={{ background: "var(--accent-gold)", boxShadow: "0 0 8px rgba(212, 160, 74, 0.3)" }}
          />
          <h2 className="font-display text-xl sm:text-2xl tracking-tight" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
        </div>

        <Link
          href={categorySlug ? l(`/category/${categorySlug}`) : "#"}
          className="group/more flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 view-all-hover"
          style={{
            color: "var(--text-muted)",
            background: "transparent",
          }}
        >
          <span>{dict.sections.viewAll}</span>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/more:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative group/carousel">
        {/* Left Edge Gradient & Button */}
        <div
          className={`absolute left-0 top-0 bottom-0 z-30 w-24 sm:w-32 transition-opacity duration-500 hidden sm:flex items-center justify-start px-2 sm:px-6 ${
            canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{
            background: "linear-gradient(to right, rgba(12,14,18,0.8) 0%, rgba(12,14,18,0.2) 60%, transparent 100%)",
          }}
        >
          <button
            onClick={() => scroll("left")}
            className="carousel-btn flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 pointer-events-auto w-11 h-11 rounded-full hover:scale-110"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Cards Track */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="cards-track flex gap-5 sm:gap-6 hide-scrollbar px-6 sm:px-8 lg:px-12 py-3"
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`flex-shrink-0 animate-slide-in-left${cardVariant === "spotlight" ? " pv-spotlight-slot" : ""}`}
              style={{
                width: variantWidths[cardVariant],
                animationDelay: `${index * 60}ms`,
              }}
            >
              <VideoCard video={video} index={index} variant={cardVariant} />
            </div>
          ))}
        </div>

        {/* Right Edge Gradient & Button */}
        <div
          className={`absolute right-0 top-0 bottom-0 z-30 w-24 sm:w-32 transition-opacity duration-500 hidden sm:flex items-center justify-end px-2 sm:px-6 ${
            canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{
            background: "linear-gradient(to left, rgba(12,14,18,0.8) 0%, rgba(12,14,18,0.2) 60%, transparent 100%)",
          }}
        >
          <button
            onClick={() => scroll("right")}
            className="carousel-btn flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 pointer-events-auto w-11 h-11 rounded-full hover:scale-110"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
