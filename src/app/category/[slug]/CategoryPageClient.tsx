"use client";

import { useState } from "react";
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
    <div className="min-h-screen" style={{ paddingTop: "100px", background: "var(--bg-primary)" }}>
      {/* Category Header */}
      <div className="relative overflow-hidden" style={{ borderBottom: "1px solid var(--border-subtle)", background: "linear-gradient(to bottom, rgba(212, 160, 74, 0.04), transparent)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="flex items-center gap-5 animate-fade-in-up">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl tracking-tight" style={{ color: "var(--text-primary)" }}>{title}</h1>
              <p className="text-sm font-medium mt-1.5" style={{ color: "var(--text-secondary)" }}>
                Showing {displayVideos.length} {displayVideos.length === 1 ? "title" : "titles"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl" style={{ background: "rgba(20, 22, 28, 0.4)", border: "1px solid var(--border-subtle)" }}>
          {/* Filters */}
          <div className="flex items-center gap-3">
            <FilterPill active={filterType === "all"} onClick={() => setFilterType("all")}>All Content</FilterPill>
            <FilterPill active={filterType === "documentary"} onClick={() => setFilterType("documentary")}>Documentaries</FilterPill>
            <FilterPill active={filterType === "report"} onClick={() => setFilterType("report")}>Reports</FilterPill>
            <FilterPill active={filterType === "series"} onClick={() => setFilterType("series")}>Series</FilterPill>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="outline-none cursor-pointer text-sm font-semibold transition-all duration-300"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "12px",
                padding: "8px 16px",
                color: "var(--text-primary)",
              }}
              id="sort-select"
            >
              <option value="popular">Most Viewed</option>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Video Responsive Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        {displayVideos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6">
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
