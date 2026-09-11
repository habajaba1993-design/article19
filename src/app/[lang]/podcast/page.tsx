"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { latestPodcasts, featuredPodcasts, formatDate } from "@/lib/data";
import type { Podcast } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import AdCarousel from "@/components/ui/AdCarousel";
import { useLang } from "@/lib/LangContext";

export default function PodcastPage() {
  const { lang, dict } = useLang();
  const l = (path: string) => `/${lang}${path}`;
  const [filter, setFilter] = useState("all");
  const allCategories = Array.from(new Set(latestPodcasts.map((p) => p.category)));
  const filteredPodcasts = filter === "all" ? latestPodcasts : latestPodcasts.filter((p) => p.category === filter);
  const heroEpisode = featuredPodcasts[0];

  return (
    <div className="min-h-screen" style={{ paddingTop: "64px", background: "var(--bg-primary)" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroEpisode.thumbnail} alt="" fill className="object-cover" style={{ filter: "blur(40px) brightness(0.3)", transform: "scale(1.2)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(12,14,18,0.7) 0%, rgba(12,14,18,0.95) 80%, var(--bg-primary) 100%)" }} />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8 sm:pt-24 sm:pb-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            <div className="flex-1 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-6"
                style={{ background: "rgba(212,160,74,0.1)", border: "1px solid rgba(212,160,74,0.25)", color: "var(--accent-gold)" }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
                {dict.podcast.audioPodcast}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
                Article<span style={{ color: "var(--accent-gold)" }}>19</span> Podcast
              </h1>
              <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-8" style={{ color: "var(--text-secondary)" }}>
                {dict.podcast.heroSubtitle}
              </p>
              <div className="flex items-center gap-6 flex-wrap" style={{ display: "none" }}>
                <StatBlock value={String(latestPodcasts.length)} label={dict.podcast.episodes} />
                <div className="w-px h-6" style={{ background: "var(--border-subtle)" }} />
                <StatBlock value="1" label={dict.podcast.season} />
                <div className="w-px h-6" style={{ background: "var(--border-subtle)" }} />
                <StatBlock value={dict.podcast.weekly} label={dict.podcast.newEpisodes} />
              </div>
            </div>

            {/* Featured card — links to detail page */}
            <div className="w-full lg:w-[420px] shrink-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <Link href={l(`/podcast/${heroEpisode.id}`)}>
                <div className="rounded-2xl overflow-hidden group cursor-pointer" style={{
                  background: "var(--bg-elevated)", border: "1px solid rgba(212,160,74,0.15)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(212,160,74,0.05)",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                }}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={heroEpisode.thumbnail} alt={heroEpisode.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,29,37,1) 0%, rgba(26,29,37,0.4) 50%, transparent 100%)" }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ background: "linear-gradient(135deg, var(--accent-gold), #C07D20)", color: "#0C0E12", boxShadow: "0 4px 20px rgba(212,160,74,0.4)" }}>
                        <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(212,160,74,0.9)", color: "#0C0E12" }}>{dict.podcast.latestEpisode}</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold" style={{ color: "var(--accent-gold)" }}>S{heroEpisode.season} · E{heroEpisode.episode}</span>
                      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>·</span>
                      <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>{heroEpisode.duration}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--accent-gold)]" style={{ color: "var(--text-primary)" }}>{heroEpisode.title}</h3>
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>{heroEpisode.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="sticky top-16 z-30" style={{ borderBottom: "1px solid var(--border-subtle)", display: "none" }}>
        <div style={{ background: "rgba(12,14,18,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-4">
            <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">
              <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>{dict.podcast.allEpisodes}</FilterBtn>
              {allCategories.map(c => <FilterBtn key={c} active={filter === c} onClick={() => setFilter(c)}>{c}</FilterBtn>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Episodes ── */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-4 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "var(--accent-gold)", boxShadow: "0 0 8px rgba(212,160,74,0.3)" }} />
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight" style={{ color: "var(--text-primary)" }}>
            {filter === "all" ? dict.podcast.allEpisodes : filter}
          </h2>
          <span className="text-sm font-semibold ml-1" style={{ color: "var(--text-muted)" }}>({filteredPodcasts.length})</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-8 lg:gap-10">
          {/* Left: Episodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ alignContent: "start" }}>
            {filteredPodcasts.map((p, index) => (
              <ScrollReveal key={p.id} className="h-full">
                <div className="animate-fade-in-up h-full" style={{ animationDelay: `${index * 80}ms` }}>
                  <EpisodeCard podcast={p} lang={lang} />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: Ad Sidebar — Desktop Only */}
          <aside className="hidden lg:block">
            <div className="sticky" style={{ top: "calc(var(--nav-height) + 24px)" }}>
              <AdCarousel />
            </div>
          </aside>
        </div>
        {filteredPodcasts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-semibold" style={{ color: "var(--text-muted)" }}>{dict.podcast.noEpisodes}</p>
          </div>
        )}
      </section>

      {/* ── Subscribe CTA ── */}
      <ScrollReveal>
        <section className="px-6 sm:px-8 lg:px-12 pb-20">
          <div className="max-w-[1440px] mx-auto relative overflow-hidden rounded-2xl p-10 sm:p-14 text-center"
            style={{ background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-secondary))", border: "1px solid var(--border-subtle)" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none" style={{ background: "rgba(212,160,74,0.06)", filter: "blur(80px)" }} />
            <div className="relative z-10">
              <svg className="w-12 h-12 mx-auto mb-5" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>{dict.podcast.neverMiss}</h2>
              <p className="text-sm leading-relaxed max-w-lg mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
                {dict.podcast.subscribeText}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <SubBtn color="#1DB954" label="Spotify" />
                <SubBtn color="#D56DFB" label="Apple Podcasts" />
                <SubBtn color="var(--accent-gold)" label="RSS Feed" />
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

/* ── Episode Card — vertical layout matching ArticleCard ── */
function EpisodeCard({ podcast, lang }: { podcast: Podcast; lang: string }) {
  const { dict } = useLang();
  return (
    <Link href={`/${lang}/podcast/${podcast.id}`}>
      <div className="group block rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col"
        style={{
          background: "var(--bg-secondary)",
          borderWidth: 1, borderStyle: "solid",
          borderColor: "var(--border-subtle)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transition: "border-color 0.3s ease, background 0.3s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,160,74,0.2)"; e.currentTarget.style.background = "rgba(212,160,74,0.04)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.background = "var(--bg-secondary)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"; }}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] w-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
          <Image src={podcast.thumbnail} alt={podcast.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,29,37,0.8) 0%, transparent 60%)" }} />
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: "rgba(255,255,255,0.9)", color: "#0C0E12", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
              <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "rgba(212,160,74,0.9)", color: "#0C0E12" }}>{podcast.category}</span>
          </div>
          {/* Duration Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", color: "var(--text-secondary)" }}>{podcast.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold" style={{ color: "var(--accent-gold)" }}>S{podcast.season} · E{podcast.episode}</span>
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>·</span>
            <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>{formatDate(podcast.publishedAt)}</span>
          </div>
          <h3 className="font-display text-lg leading-snug line-clamp-2 mb-3 transition-colors duration-300 group-hover:text-[var(--accent-gold)]" style={{ color: "var(--text-primary)" }}>
            {podcast.title}
          </h3>
          <p className="text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{podcast.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{podcast.host}</span>
            {podcast.guest && (
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{dict.podcast.guest}: {podcast.guest}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Helpers ── */
function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-black" style={{ color: "var(--accent-gold)" }}>{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap"
      style={{
        background: active ? "linear-gradient(135deg, var(--accent-gold), #C07D20)" : "transparent",
        color: active ? "#0C0E12" : "var(--text-secondary)",
        border: active ? "none" : "1px solid var(--border-subtle)",
        boxShadow: active ? "0 4px 15px rgba(212,160,74,0.25)" : "none",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>{children}</button>
  );
}

function SubBtn({ color, label }: { color: string; label: string }) {
  return (
    <button className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold"
      style={{ background: "var(--bg-primary)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)", transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,160,74,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(212,160,74,0.1)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
      {label}
    </button>
  );
}
