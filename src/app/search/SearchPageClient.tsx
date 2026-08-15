"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { videos, articles, podcasts, formatViews, formatDate } from "@/lib/data";

const typeLabels: Record<string, string> = { documentary: "Documentary", report: "Report", series: "Series", editorial: "Editorial" };

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQuery);
  const [activeTab, setActiveTab] = useState<"all" | "videos" | "articles" | "podcasts">("all");

  useEffect(() => { if (urlQuery) setQuery(urlQuery); }, [urlQuery]);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q && !query) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const videoResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return videos.filter(v => v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.genre.some(g => g.toLowerCase().includes(q)) || v.language.toLowerCase().includes(q) || v.type.toLowerCase().includes(q));
  }, [query]);

  const articleResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)));
  }, [query]);

  const podcastResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return podcasts.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.host.toLowerCase().includes(q) || (p.guest && p.guest.toLowerCase().includes(q)) || p.tags.some(t => t.toLowerCase().includes(q)));
  }, [query]);

  const totalResults = videoResults.length + articleResults.length + podcastResults.length;
  const showVideos = (activeTab === "all" || activeTab === "videos") && videoResults.length > 0;
  const showArticles = (activeTab === "all" || activeTab === "articles") && articleResults.length > 0;
  const showPodcasts = (activeTab === "all" || activeTab === "podcasts") && podcastResults.length > 0;

  const tabs = [
    { key: "all" as const, label: "All", count: totalResults },
    { key: "videos" as const, label: "Videos", count: videoResults.length },
    { key: "articles" as const, label: "Articles", count: articleResults.length },
    { key: "podcasts" as const, label: "Podcasts", count: podcastResults.length },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Hero Search Header */}
      <div className="relative overflow-hidden" style={{ paddingTop: "80px" }}>
        {/* Ambient background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(212, 160, 74, 0.06) 0%, transparent 70%)" }} />
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 160, 74, 0.2), transparent)" }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 pt-12 pb-8 relative">
          {/* Title with gold accent */}
          <div className="text-center mb-8 animate-fade-in-up">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--accent-gold)" }}>Discover Content</p>
            <h1 className="font-display text-4xl sm:text-5xl" style={{ color: "var(--text-primary)" }}>
              {query.trim() ? (
                <>Results for <span style={{ color: "var(--accent-gold)" }}>&quot;{query}&quot;</span></>
              ) : "Search"}
            </h1>
          </div>

          {/* Premium search input */}
          <form className="relative max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "100ms" }} onSubmit={e => e.preventDefault()}>
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(212, 160, 74, 0.3), rgba(212, 160, 74, 0.1), rgba(212, 160, 74, 0.3))" }} />
              <div className="relative flex items-center rounded-2xl overflow-hidden" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                <div className="pl-5 pr-2 flex items-center">
                  <svg className="w-5 h-5" style={{ color: "var(--accent-gold)", opacity: 0.6 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search documentaries, reports, articles, podcasts..."
                  className="w-full py-4 pr-12 bg-transparent outline-none text-base sm:text-lg"
                  style={{ color: "var(--text-primary)", caretColor: "var(--accent-gold)" }}
                  autoFocus={!urlQuery} id="search-page-input"
                />
                {query && (
                  <button type="button" onClick={() => setQuery("")} className="absolute right-4 p-1 rounded-full transition-all duration-200 hover:scale-110" style={{ color: "var(--text-muted)", background: "rgba(255,255,255,0.05)" }}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Result count + filter tabs */}
          {query.trim() && (
            <div className="mt-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                  <span className="font-bold" style={{ color: "var(--accent-gold)" }}>{totalResults}</span> {totalResults === 1 ? "result" : "results"} found
                </p>
                <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                  {tabs.map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                      style={{
                        background: activeTab === tab.key ? "rgba(212, 160, 74, 0.15)" : "transparent",
                        color: activeTab === tab.key ? "var(--accent-gold)" : "var(--text-muted)",
                        boxShadow: activeTab === tab.key ? "0 0 12px rgba(212, 160, 74, 0.1)" : "none",
                      }}
                    >
                      {tab.label} {tab.count > 0 && <span className="ml-1 opacity-60">({tab.count})</span>}
                    </button>
                  ))}
                </div>
              </div>
              {/* Separator */}
              <div className="mt-6 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--border-subtle), transparent)" }} />
            </div>
          )}
        </div>
      </div>

      {/* Results Body */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        {query.trim() ? (
          <>
            {/* ── Videos ── */}
            {showVideos && (
              <section className="mb-14 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212, 160, 74, 0.1)" }}>
                    <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <h2 className="font-display text-2xl" style={{ color: "var(--text-primary)" }}>Videos</h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(212, 160, 74, 0.1)", color: "var(--accent-gold)" }}>{videoResults.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {videoResults.map((v, i) => (
                    <Link key={v.id} href={`/watch/${v.id}`} className="group block rounded-xl overflow-hidden border transition-all duration-300 card-hover-lift" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
                      <div className="relative aspect-video overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                        <Image src={v.thumbnail} alt={v.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 400px" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
                        {/* Duration badge */}
                        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ background: "rgba(0,0,0,0.8)", color: "#fff", backdropFilter: "blur(4px)" }}>{v.duration}</span>
                        {/* Rating */}
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-extrabold" style={{ background: "linear-gradient(135deg, var(--accent-gold), #C07D20)", color: "#0C0E12" }}>★ {v.rating}</span>
                        {/* Type badge */}
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider" style={{ background: "rgba(212, 160, 74, 0.15)", color: "var(--accent-gold)", border: "1px solid rgba(212, 160, 74, 0.2)", backdropFilter: "blur(4px)" }}>{typeLabels[v.type]}</span>
                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(212, 160, 74, 0.9)", boxShadow: "0 0 30px rgba(212, 160, 74, 0.4)" }}>
                            <svg className="w-5 h-5 ml-0.5" style={{ color: "#0C0E12" }} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-bold line-clamp-1 mb-1.5 transition-colors duration-200 group-hover:text-[var(--accent-gold)]" style={{ color: "var(--text-primary)" }}>{v.title}</h3>
                        <p className="text-xs line-clamp-2 mb-3" style={{ color: "var(--text-muted)" }}>{v.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {v.genre.slice(0, 2).map(g => (
                            <span key={g} className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)" }}>{g}</span>
                          ))}
                          <span className="text-[10px] ml-auto" style={{ color: "var(--text-muted)" }}>{formatViews(v.views)} views</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ── Articles ── */}
            {showArticles && (
              <section className="mb-14 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212, 160, 74, 0.1)" }}>
                    <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h2 className="font-display text-2xl" style={{ color: "var(--text-primary)" }}>Articles</h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(212, 160, 74, 0.1)", color: "var(--accent-gold)" }}>{articleResults.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {articleResults.map(a => (
                    <Link key={a.id} href={`/articles/${a.id}`} className="group block rounded-xl overflow-hidden border transition-all duration-300 card-hover-lift" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
                      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
                        <Image src={a.thumbnail} alt={a.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="400px" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider" style={{ background: "rgba(212, 160, 74, 0.9)", color: "#0C0E12" }}>{a.category}</span>
                        <span className="absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-bold" style={{ background: "rgba(0,0,0,0.7)", color: "var(--text-secondary)", backdropFilter: "blur(8px)" }}>{a.readTime}</span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-base leading-snug line-clamp-2 mb-2 transition-colors duration-300 group-hover:text-[var(--accent-gold)]" style={{ color: "var(--text-primary)" }}>{a.title}</h3>
                        <p className="text-xs line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>{a.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold" style={{ color: "var(--text-secondary)" }}>{a.author}</span>
                          <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{formatDate(a.publishedAt)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ── Podcasts ── */}
            {showPodcasts && (
              <section className="mb-14 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212, 160, 74, 0.1)" }}>
                    <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zm7 9v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z" /></svg>
                  </div>
                  <h2 className="font-display text-2xl" style={{ color: "var(--text-primary)" }}>Podcasts</h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(212, 160, 74, 0.1)", color: "var(--accent-gold)" }}>{podcastResults.length}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {podcastResults.map(p => (
                    <Link key={p.id} href={`/podcast?play=${p.id}`} className="group flex gap-5 p-5 rounded-xl border transition-all duration-300 card-hover-lift" style={{ background: "var(--bg-secondary)", borderColor: "var(--border-subtle)" }}>
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 relative" style={{ background: "var(--bg-elevated)" }}>
                        <Image src={p.thumbnail} alt={p.title} fill className="object-cover" sizes="96px" />
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(212, 160, 74, 0.9)" }}>
                            <svg className="w-4 h-4 ml-0.5" style={{ color: "#0C0E12" }} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(212, 160, 74, 0.15)", color: "var(--accent-gold)" }}>S{p.season} E{p.episode}</span>
                          <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>{p.duration}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold line-clamp-1 mb-1 transition-colors duration-200 group-hover:text-[var(--accent-gold)]" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                        <p className="text-xs line-clamp-2 mb-2" style={{ color: "var(--text-muted)" }}>{p.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold" style={{ color: "var(--text-secondary)" }}>Host: {p.host}</span>
                          {p.guest && <><span className="text-[10px]" style={{ color: "var(--text-muted)" }}>·</span><span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>Guest: {p.guest}</span></>}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ── No Results ── */}
            {totalResults === 0 && (
              <div className="flex flex-col items-center justify-center py-28 text-center animate-scale-in">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 relative" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                  <div className="absolute -inset-2 rounded-3xl" style={{ background: "radial-gradient(circle, rgba(212, 160, 74, 0.08), transparent)" }} />
                  <svg className="w-10 h-10 relative" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl mb-2" style={{ color: "var(--text-primary)" }}>No results found</h3>
                <p className="text-sm max-w-md mb-8" style={{ color: "var(--text-muted)" }}>We couldn&apos;t find anything matching &quot;{query}&quot;. Try different keywords or explore our topics below.</p>
                <Link href="/" className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105" style={{ background: "linear-gradient(135deg, var(--accent-gold), #C07D20)", color: "#0C0E12" }}>
                  Browse All Content
                </Link>
              </div>
            )}
          </>
        ) : (
          /* ── Browse by Topic (empty state) ── */
          <div className="py-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(212, 160, 74, 0.1)" }}>
                <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              </div>
              <h2 className="font-display text-2xl" style={{ color: "var(--text-primary)" }}>Browse by Topic</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "Press Freedom", slug: "press-freedom", gradient: "linear-gradient(135deg, #92400e, #b45309)", icon: "📰" },
                { name: "Human Dignity", slug: "human-dignity", gradient: "linear-gradient(135deg, #7f1d1d, #991b1b)", icon: "⚖️" },
                { name: "Digital Rights", slug: "digital-rights", gradient: "linear-gradient(135deg, #4a1d96, #6d28d9)", icon: "🔒" },
                { name: "Climate Justice", slug: "climate-justice", gradient: "linear-gradient(135deg, #064e3b, #065f46)", icon: "🌍" },
                { name: "Refugee Stories", slug: "refugee-stories", gradient: "linear-gradient(135deg, #78350f, #a16207)", icon: "🕊️" },
                { name: "Women's Rights", slug: "womens-rights", gradient: "linear-gradient(135deg, #831843, #9d174d)", icon: "✊" },
                { name: "Podcasts", slug: "/podcast", gradient: "linear-gradient(135deg, #1e3a5f, #1e40af)", icon: "🎙️" },
                { name: "Articles", slug: "/articles", gradient: "linear-gradient(135deg, #3f3f46, #52525b)", icon: "📄" },
              ].map(cat => (
                <Link key={cat.slug} href={cat.slug.startsWith("/") ? cat.slug : `/category/${cat.slug}`} className="relative overflow-hidden rounded-xl p-6 sm:p-7 group transition-all duration-300 hover:scale-105 border" style={{ background: cat.gradient, borderColor: "rgba(255,255,255,0.06)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
                  <div className="absolute top-0 right-0 text-3xl opacity-20 p-3 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-30">{cat.icon}</div>
                  <span className="text-sm font-bold relative" style={{ color: "#fff" }}>{cat.name}</span>
                  <svg className="w-4 h-4 mt-3 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-0" style={{ color: "#fff" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
