"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { Article } from "@/lib/data";
import ArticleCard from "./ArticleCard";
import { useLang } from "@/lib/LangContext";

export type CardVariant = "default" | "featured" | "new" | "spotlight" | "minimal" | "cinematic";

interface ArticleCarouselProps {
  title: string;
  articles: Article[];
  cardVariant?: CardVariant;
  categorySlug?: string;
}

const variantWidths: Record<CardVariant, string> = {
  default: "clamp(240px, 22vw, 320px)",
  featured: "clamp(280px, 26vw, 380px)",
  new: "clamp(220px, 20vw, 280px)",
  spotlight: "clamp(200px, 18vw, 260px)",
  minimal: "clamp(220px, 20vw, 280px)",
  cinematic: "clamp(320px, 30vw, 460px)",
};

export default function ArticleCarousel({ title, articles, cardVariant = "default", categorySlug }: ArticleCarouselProps) {
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
  }, [checkScroll, articles]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (articles.length === 0) return null;

  return (
    <section className="carousel-container relative" style={{ marginTop: "40px", marginBottom: "16px", paddingBottom: "20px" }}>
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
          href={categorySlug ? l(`/articles/category/${categorySlug}`) : l("/articles")}
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

      <div className="relative group/carousel">
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

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="cards-track flex gap-5 sm:gap-6 hide-scrollbar px-6 sm:px-8 lg:px-12 py-3"
        >
          {articles.map((article, index) => (
            <div
              key={article.id}
              className={`flex-shrink-0 animate-slide-in-left`}
              style={{
                width: variantWidths[cardVariant],
                animationDelay: `${index * 60}ms`,
              }}
            >
              <ArticleCard article={article} variant={cardVariant === "featured" ? "featured" : "default"} />
            </div>
          ))}
        </div>

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
