"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Video, formatViews } from "@/lib/data";
import VideoCard from "@/components/video/VideoCard";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CategoryPageClientProps {
  title: string;
  icon: string;
  videos: Video[];
  slug: string;
}

export default function CategoryPageClient({ title, icon, videos, slug }: CategoryPageClientProps) {
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "rating">("popular");
  const [filterType, setFilterType] = useState<"all" | "documentary" | "report" | "series">("all");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    if (!sortOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick as EventListener);
    };
  }, [sortOpen]);

  let displayVideos = [...videos];

  if (filterType !== "all") {
    displayVideos = displayVideos.filter((v) => v.type === filterType);
  }

  switch (sortBy) {
    case "popular":
      displayVideos.sort((a, b) => b.views - a.views);
      break;
    case "newest":
      displayVideos.sort((a, b) => b.year - a.year);
      break;
    case "rating":
      displayVideos.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
  }

  // Pick hero video (highest rated)
  const heroVideo = videos.length > 0
    ? [...videos].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))[0]
    : null;

  // Category descriptions
  const descriptions: Record<string, string> = {
    documentaries: "Powerful documentaries that expose injustice, amplify voices, and illuminate the human rights stories the world needs to hear.",
    series: "Multi-episode investigative series diving deep into the most critical human rights issues of our time.",
    reports: "Sharp editorial reports and analysis providing expert insights on press freedom, governance, and justice.",
    bangla: "Compelling stories from Bangladesh — documentaries, reports, and series in Bangla capturing the nation's fight for justice.",
    english: "Global perspectives on human rights — documentaries and reports in English covering stories from across the world.",
    trending: "The most-watched content on Article 19 right now. See what the world is paying attention to.",
    "new-releases": "Fresh off the press — the latest documentaries, reports, and series added to Article 19.",
    "human-rights": "Content dedicated to defending fundamental human rights and the pursuit of justice worldwide.",
    "press-freedom": "Stories about the journalists, editors, and activists fighting for a free and independent press.",
    "climate-justice": "Documenting the intersection of climate change and human rights — the communities fighting for survival.",
  };

  const description = descriptions[slug] || `Explore our curated collection of ${title.toLowerCase()} content on human rights and social justice.`;

  // Total views for stats
  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);
  const avgRating = videos.length > 0 ? (videos.reduce((sum, v) => sum + parseFloat(v.rating), 0) / videos.length).toFixed(1) : "0";

  return (
    <div className="min-h-screen" style={{ paddingTop: "64px", background: "var(--bg-primary)" }}>

      {/* ── Premium Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Blurred Background */}
        <div className="absolute inset-0">
          {heroVideo && (
            <Image
              src={heroVideo.thumbnail}
              alt=""
              fill
              className="object-cover"
              style={{ filter: "blur(40px) brightness(0.25)", transform: "scale(1.2)" }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(12,14,18,0.6) 0%, rgba(12,14,18,0.95) 80%, var(--bg-primary) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Left: Title & Stats */}
            <div className="flex-1 animate-fade-in-up">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-5"
                style={{
                  background: "rgba(212,160,74,0.1)",
                  border: "1px solid rgba(212,160,74,0.25)",
                  color: "var(--accent-gold)",
                }}
              >
                <span className="text-sm">{icon}</span>
                Category
              </div>
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h1>
              <p
                className="text-sm sm:text-base leading-relaxed max-w-xl mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {description}
              </p>
              <div className="flex items-center gap-5 flex-wrap">
                <StatBlock value={String(videos.length)} label="Titles" />
                <div className="w-px h-6" style={{ background: "var(--border-subtle)" }} />
                <StatBlock value={formatViews(totalViews)} label="Total Views" />
                <div className="w-px h-6" style={{ background: "var(--border-subtle)" }} />
                <StatBlock value={`★ ${avgRating}`} label="Avg Rating" />
              </div>
            </div>

            {/* Right: Top Rated Preview Card */}
            {heroVideo && (
              <div className="w-full lg:w-[380px] shrink-0 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(212,160,74,0.15)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(212,160,74,0.05)",
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={heroVideo.thumbnail} alt={heroVideo.title} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,29,37,1) 0%, rgba(26,29,37,0.4) 50%, transparent 100%)" }} />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(212,160,74,0.9)", color: "#0C0E12" }}>Top Rated</div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-extrabold"
                      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", color: "#4ade80" }}>★ {heroVideo.rating}</div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--accent-gold)" }}>{heroVideo.type}</span>
                      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>·</span>
                      <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>{heroVideo.duration}</span>
                      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>·</span>
                      <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>{heroVideo.year}</span>
                    </div>
                    <h3 className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>{heroVideo.title}</h3>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>{heroVideo.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Sticky Filter Bar ── */}
      <section className="sticky top-16 z-30" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ background: "rgba(12,14,18,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              {/* Filters */}
              <div className="w-full sm:w-auto overflow-x-auto hide-scrollbar">
                <div className="flex items-center gap-2 sm:gap-3 min-w-max">
                  <FilterPill active={filterType === "all"} onClick={() => setFilterType("all")}>All Content</FilterPill>
                  <FilterPill active={filterType === "documentary"} onClick={() => setFilterType("documentary")}>Documentaries</FilterPill>
                  <FilterPill active={filterType === "report"} onClick={() => setFilterType("report")}>Reports</FilterPill>
                  <FilterPill active={filterType === "series"} onClick={() => setFilterType("series")}>Series</FilterPill>
                </div>
              </div>

              {/* Sort Selector */}
              <div className="relative shrink-0" ref={sortRef}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Sort:</span>
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all duration-300"
                    style={{
                      background: "var(--bg-elevated)",
                      border: sortOpen ? "1px solid rgba(212, 160, 74, 0.3)" : "1px solid var(--border-subtle)",
                      borderRadius: "12px",
                      padding: "8px 14px",
                      color: "var(--text-primary)",
                      boxShadow: sortOpen ? "0 0 12px rgba(212, 160, 74, 0.08)" : "none",
                    }}
                    id="sort-select"
                  >
                    <span>{sortBy === "popular" ? "Most Viewed" : sortBy === "newest" ? "Newest" : "Top Rated"}</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300"
                      style={{ transform: sortOpen ? "rotate(180deg)" : "rotate(0)", color: "var(--accent-gold)" }}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Dropdown Menu */}
                {sortOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden animate-scale-in z-50"
                    style={{
                      background: "rgba(18, 20, 26, 0.97)",
                      backdropFilter: "blur(24px)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderTop: "2px solid rgba(212, 160, 74, 0.4)",
                      boxShadow: "0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)",
                    }}
                  >
                    <div className="py-1.5">
                      {([
                        { value: "popular" as const, label: "Most Viewed", icon: "🔥" },
                        { value: "newest" as const, label: "Newest", icon: "✨" },
                        { value: "rating" as const, label: "Top Rated", icon: "⭐" },
                      ]).map((option) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setSortOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-all duration-200"
                          style={{
                            color: sortBy === option.value ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.6)",
                            background: sortBy === option.value ? "rgba(212, 160, 74, 0.08)" : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            if (sortBy !== option.value) {
                              e.currentTarget.style.color = "#fff";
                              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = sortBy === option.value ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.6)";
                            e.currentTarget.style.background = sortBy === option.value ? "rgba(212, 160, 74, 0.08)" : "transparent";
                          }}
                        >
                          <span className="text-sm">{option.icon}</span>
                          <span className="flex-1 text-left">{option.label}</span>
                          {sortBy === option.value && (
                            <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Grid ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 rounded-full" style={{ background: "var(--accent-gold)", boxShadow: "0 0 8px rgba(212,160,74,0.3)" }} />
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight" style={{ color: "var(--text-primary)" }}>
            {filterType === "all" ? title : filterType.charAt(0).toUpperCase() + filterType.slice(1) + " in " + title}
          </h2>
          <span className="text-sm font-semibold ml-1" style={{ color: "var(--text-muted)" }}>({displayVideos.length})</span>
        </div>

        {displayVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
            {displayVideos.map((video, index) => (
              <ScrollReveal key={video.id}>
                <div className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <VideoCard video={video} index={index} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl animate-scale-in" style={{ background: "rgba(20, 22, 28, 0.3)", border: "1px solid var(--border-subtle)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--bg-elevated)" }}>
              <svg className="w-8 h-8" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>No content found</h3>
            <p className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>Try switching filters or browse another topic.</p>
          </div>
        )}
      </section>
    </div>
  );
}

/* ── Helpers ── */
function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl sm:text-2xl font-black" style={{ color: "var(--accent-gold)" }}>{value}</span>
      <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300"
      style={{
        ...(active
          ? { background: "linear-gradient(135deg, var(--accent-gold), #C07D20)", color: "#0C0E12", boxShadow: "0 4px 15px rgba(212, 160, 74, 0.25)" }
          : { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }),
        transform: active ? "scale(1.02)" : "scale(1)",
      }}
    >{children}</button>
  );
}
