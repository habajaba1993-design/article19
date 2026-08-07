"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { videos, articles } from "@/lib/data";
import VideoCard from "@/components/video/VideoCard";
import ArticleCard from "@/components/article/ArticleCard";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const videoResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.genre.some((g) => g.toLowerCase().includes(q)) ||
        v.language.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q)
    );
  }, [query]);

  const articleResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const totalResults = videoResults.length + articleResults.length;

  return (
    <div className="min-h-screen" style={{ paddingTop: "100px", background: "var(--bg-primary)" }}>
      {/* Search Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(212, 160, 74, 0.03), transparent)" }} />
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 relative">
          <h1 className="font-display text-3xl mb-6 animate-fade-in-up" style={{ color: "var(--text-primary)" }}>Search</h1>

          <div className="relative max-w-2xl animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-5">
              <svg className="w-5 h-5" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search documentaries, reports, articles..."
              className="w-full pl-14 pr-12 py-4 rounded-2xl outline-none transition-all text-lg search-focus-glow"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                caretColor: "var(--accent-gold)",
              }}
              autoFocus
              id="search-page-input"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-5 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-16">
        {query.trim() ? (
          <>
            <p className="text-sm mb-8 animate-fade-in" style={{ color: "var(--text-muted)" }}>
              {totalResults} {totalResults === 1 ? "result" : "results"} for &quot;{query}&quot;
            </p>

            {/* Video Results */}
            {videoResults.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-xl mb-5" style={{ color: "var(--text-primary)" }}>Videos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 sm:gap-6">
                  {videoResults.map((video, index) => (
                    <div key={video.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                      <VideoCard video={video} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Article Results */}
            {articleResults.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-xl mb-5" style={{ color: "var(--text-primary)" }}>Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articleResults.map((article, index) => (
                    <div key={article.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {totalResults === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center animate-scale-in">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--bg-secondary)" }}>
                  <svg className="w-10 h-10" style={{ color: "var(--text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>No results found</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>Try different keywords or browse our topics.</p>
              </div>
            )}
          </>
        ) : (
          <div className="animate-fade-in-up">
            <h2 className="font-display text-xl mb-6" style={{ color: "var(--text-primary)" }}>Browse by Topic</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "Press Freedom", slug: "press-freedom", gradient: "linear-gradient(135deg, #92400e, #b45309)" },
                { name: "Human Dignity", slug: "human-dignity", gradient: "linear-gradient(135deg, #7f1d1d, #991b1b)" },
                { name: "Investigations", slug: "investigations", gradient: "linear-gradient(135deg, #1e3a5f, #1e40af)" },
                { name: "Digital Rights", slug: "digital-rights", gradient: "linear-gradient(135deg, #4a1d96, #6d28d9)" },
                { name: "Climate Justice", slug: "climate-justice", gradient: "linear-gradient(135deg, #064e3b, #065f46)" },
                { name: "Refugee Stories", slug: "refugee-stories", gradient: "linear-gradient(135deg, #78350f, #a16207)" },
                { name: "Women's Rights", slug: "womens-rights", gradient: "linear-gradient(135deg, #831843, #9d174d)" },
                { name: "Articles", slug: "/articles", gradient: "linear-gradient(135deg, #3f3f46, #52525b)" },
              ].map((cat, index) => (
                <Link
                  key={cat.slug}
                  href={cat.slug.startsWith("/") ? cat.slug : `/category/${cat.slug}`}
                  className="relative overflow-hidden rounded-xl p-6 group transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up"
                  style={{ background: cat.gradient, animationDelay: `${index * 60}ms` }}
                >
                  <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
