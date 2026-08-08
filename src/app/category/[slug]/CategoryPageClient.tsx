"use client";

import { useState, useRef, useEffect } from "react";
import { Video } from "@/lib/data";
import VideoCard from "@/components/video/VideoCard";

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

  return (
    <div className="min-h-screen" style={{ paddingTop: "80px", background: "var(--bg-primary)" }}>
      {/* Category Header */}
      <div className="relative overflow-hidden" style={{ borderBottom: "1px solid var(--border-subtle)", background: "linear-gradient(to bottom, rgba(212, 160, 74, 0.04), transparent)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-14">
          <div className="flex items-center gap-5 animate-fade-in-up">
            <div>
              <h1 className="font-display text-2xl sm:text-4xl tracking-tight" style={{ color: "var(--text-primary)" }}>{title}</h1>
              <p className="text-xs sm:text-sm font-medium mt-1" style={{ color: "var(--text-secondary)" }}>
                Showing {displayVideos.length} {displayVideos.length === 1 ? "title" : "titles"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6 animate-fade-in relative z-50" style={{ animationDelay: "150ms" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl" style={{ background: "rgba(20, 22, 28, 0.4)", border: "1px solid var(--border-subtle)" }}>
          {/* Filters — horizontally scrollable on mobile */}
          <div className="w-full sm:w-auto overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 sm:gap-3 min-w-max">
              <FilterPill active={filterType === "all"} onClick={() => setFilterType("all")}>All Content</FilterPill>
              <FilterPill active={filterType === "documentary"} onClick={() => setFilterType("documentary")}>Documentaries</FilterPill>
              <FilterPill active={filterType === "report"} onClick={() => setFilterType("report")}>Reports</FilterPill>
              <FilterPill active={filterType === "series"} onClick={() => setFilterType("series")}>Series</FilterPill>
            </div>
          </div>

          {/* Sort Selector — Custom Dropdown */}
          <div className="relative shrink-0" ref={sortRef}>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Sort By:</span>
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

      {/* Video Responsive Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-20">
        {displayVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6">
            {displayVideos.map((video, index) => (
              <div key={video.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                <VideoCard video={video} index={index} />
              </div>
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
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
      style={{
        ...(active
          ? { background: "var(--accent-gold)", color: "#0C0E12", boxShadow: "0 4px 15px rgba(212, 160, 74, 0.25)" }
          : { background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }),
        transform: active ? "scale(1.02)" : "scale(1)",
      }}
    >
      {children}
    </button>
  );
}
