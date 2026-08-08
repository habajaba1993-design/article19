import HeroBanner from "@/components/video/HeroBanner";
import VideoCarousel from "@/components/video/VideoCarousel";
import ArticleCard from "@/components/article/ArticleCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";
import {
  featuredVideos,
  trendingVideos,
  newReleases,
  banglaContent,
  englishContent,
  featuredArticles,
  latestArticles,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Hero Banner */}
      <HeroBanner videos={featuredVideos} />

      {/* Content Carousels */}
      <div className="relative z-20 pb-8">
        <VideoCarousel title="Featured Reports" videos={trendingVideos} cardVariant="featured" />
        <VideoCarousel title="Latest Releases" videos={newReleases} cardVariant="new" />
        <VideoCarousel title="Bangladesh Focus" videos={banglaContent} cardVariant="spotlight" />
        <VideoCarousel title="Global Focus" videos={englishContent} cardVariant="minimal" />

      </div>

      {/* ── Articles / Editorials Section ── */}
      <ScrollReveal>
        <section className="px-6 sm:px-8 lg:px-12 py-16" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="max-w-[1440px] mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-7 rounded-full"
                  style={{ background: "var(--accent-gold)", boxShadow: "0 0 8px rgba(212, 160, 74, 0.3)" }}
                />
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl tracking-tight" style={{ color: "var(--text-primary)" }}>
                    Articles & Editorials
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                    In-depth analysis and opinion on human rights issues
                  </p>
                </div>
              </div>
              <Link
                href="/articles"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold transition-all duration-300 hover:text-[var(--accent-gold)]"
                style={{ color: "var(--text-muted)" }}
              >
                View All Articles
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.slice(0, 3).map((article, index) => (
                <div
                  key={article.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ── UDHR Quote Banner ── */}
      <ScrollReveal>
        <section className="px-6 sm:px-8 lg:px-12 py-16">
          <div
            className="max-w-[1440px] mx-auto relative overflow-hidden rounded-2xl p-10 sm:p-14 text-center"
            style={{
              background: "linear-gradient(135deg, var(--bg-elevated), var(--bg-secondary))",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
              style={{ background: "rgba(212, 160, 74, 0.06)", filter: "blur(80px)" }}
            />
            <div className="relative z-10">
              <p
                className="font-display text-2xl sm:text-3xl lg:text-4xl leading-relaxed mb-6 max-w-3xl mx-auto"
                style={{ color: "var(--text-primary)" }}
              >
                &ldquo;Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference.&rdquo;
              </p>
              <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                Article 19 — Universal Declaration of Human Rights
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
