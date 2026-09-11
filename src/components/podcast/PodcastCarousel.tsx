"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { Podcast, formatDate } from "@/lib/data";
import { useLang } from "@/lib/LangContext";

interface PodcastCarouselProps {
    title: string;
    podcasts: Podcast[];
}

export default function PodcastCarousel({ title, podcasts }: PodcastCarouselProps) {
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
    }, [checkScroll, podcasts]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.75;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (podcasts.length === 0) return null;

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
                    href={l("/podcast")}
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
                    className={`absolute left-0 top-0 bottom-0 z-30 w-24 sm:w-32 transition-opacity duration-500 hidden sm:flex items-center justify-start px-2 sm:px-6 ${canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
                    {podcasts.map((podcast, index) => (
                        <div
                            key={podcast.id}
                            className="flex-shrink-0 animate-slide-in-left"
                            style={{
                                width: "clamp(340px, 30vw, 440px)",
                                animationDelay: `${index * 60}ms`,
                            }}
                        >
                            <PodcastCard podcast={podcast} lang={lang} />
                        </div>
                    ))}
                </div>

                <div
                    className={`absolute right-0 top-0 bottom-0 z-30 w-24 sm:w-32 transition-opacity duration-500 hidden sm:flex items-center justify-end px-2 sm:px-6 ${canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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

function PodcastCard({ podcast, lang }: { podcast: Podcast; lang: string }) {
    const [imgError, setImgError] = useState(false);

    return (
        <Link href={`/${lang}/podcast/${podcast.id}`}>
            <div
                className="group flex rounded-2xl overflow-hidden cursor-pointer h-full"
                style={{
                    background: "var(--bg-secondary)",
                    borderWidth: 1, borderStyle: "solid",
                    borderColor: "var(--border-subtle)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    transition: "border-color 0.3s ease, background 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,160,74,0.25)"; e.currentTarget.style.background = "rgba(212,160,74,0.04)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"; }}
            >
                {/* Square Thumbnail */}
                <div className="relative w-[140px] sm:w-[160px] shrink-0 overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                    {!imgError ? (
                        <Image src={podcast.thumbnail} alt={podcast.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="160px" onError={() => setImgError(true)} />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1510, #14161C)" }}>
                            <svg className="w-8 h-8 opacity-20" style={{ color: "var(--accent-gold)" }} fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
                                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                            </svg>
                        </div>
                    )}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 40%, rgba(26,29,37,0.6) 100%)" }} />
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{ background: "linear-gradient(135deg, var(--accent-gold), #C07D20)", color: "#0C0E12", boxShadow: "0 4px 15px rgba(212,160,74,0.35)" }}>
                            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
                    <div>
                        {/* Top Row: Season/Episode + Category */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                                style={{ background: "rgba(212,160,74,0.12)", border: "1px solid rgba(212,160,74,0.2)", color: "var(--accent-gold)" }}>
                                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                </svg>
                                S{podcast.season} · E{podcast.episode}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                                style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}>
                                {podcast.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-base sm:text-lg leading-snug line-clamp-2 mb-2 transition-colors duration-300 group-hover:text-[var(--accent-gold)]" style={{ color: "var(--text-primary)" }}>
                            {podcast.title}
                        </h3>
                    </div>

                    {/* Bottom: Waveform + Duration + Date */}
                    <div className="flex items-center gap-3 mt-auto">
                        {/* Waveform bars visual */}
                        <div className="flex items-end gap-[2px] h-4 opacity-60">
                            {[40, 70, 55, 85, 45, 75, 60, 90, 50, 80, 65, 35, 70, 55, 85].map((h, i) => (
                                <div key={i} className="w-[2px] rounded-full" style={{ height: `${h}%`, background: "var(--accent-gold)" }} />
                            ))}
                        </div>
                        <span className="text-[11px] font-bold" style={{ color: "var(--accent-gold)" }}>
                            {podcast.duration}
                        </span>
                        <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>·</span>
                        <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                            {formatDate(podcast.publishedAt)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

