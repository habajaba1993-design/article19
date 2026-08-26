"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article, formatDate } from "@/lib/data";
import ArticleCard from "@/components/article/ArticleCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DonationBanner from "@/components/ui/DonationBanner";
import AdCarousel from "@/components/ui/AdCarousel";
import { useLang } from "@/lib/LangContext";

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetailClient({ article, relatedArticles }: ArticleDetailClientProps) {
  const { lang, dict } = useLang();
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [article.id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Split content into paragraphs
  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen" style={{ paddingTop: "80px", background: "var(--bg-primary)" }}>

      {/* ═══ HERO SECTION — Split Layout (2/3 article preview + 1/3 ad) ═══ */}
      <div className="relative w-full animate-fade-in" style={{ background: "#000" }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="watch-hero-grid">
            {/* ── Left: Article Hero Image (2/3) ── */}
            <div
              className="relative w-full overflow-hidden flex items-center justify-center watch-hero-video"
              style={{ background: "#09090b" }}
            >
              {/* Background Thumbnail */}
              {!imageError ? (
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover opacity-80"
                  sizes="100vw"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1510, #0C0E12, #14120e)" }} />
              )}

              {/* Cinematic gradient overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.1) 100%)",
                }}
              />

              {/* Bottom-left: Category + Title + Meta */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-10">
                <div className="mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.15em]"
                    style={{ background: "var(--accent-gold)", color: "#0C0E12" }}
                  >
                    {article.category}
                  </span>
                </div>

                <p
                  className="font-display text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3"
                  style={{ color: "var(--text-primary)", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
                >
                  {article.title}
                </p>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ background: "rgba(212,160,74,0.2)", color: "var(--accent-gold)" }}
                    >
                      {article.author.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                      {article.author}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>·</span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>·</span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right: Ad Carousel Sidebar (1/3) ── */}
            <div className="watch-hero-ad-sidebar">
              <div className="h-full flex flex-col justify-center p-4 lg:p-5">
                <AdCarousel maxSlots={1} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT SECTION — 2/3 + 1/3 Grid Layout ═══ */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column — Article Content */}
          <div className="lg:col-span-2">
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 animate-fade-in-up"
              style={{ color: "var(--text-primary)" }}
            >
              {article.title}
            </h1>

            {/* Meta Bar */}
            <div
              className="flex flex-wrap items-center gap-4 mb-8 pb-8 animate-fade-in-up"
              style={{ borderBottom: "1px solid var(--border-subtle)", animationDelay: "80ms" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--accent-gold-dim)", color: "var(--accent-gold)" }}
                >
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{article.author}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatDate(article.publishedAt)} · {article.readTime}
                  </p>
                </div>
              </div>

              <div className="ml-auto">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" style={{ color: "#22c55e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span style={{ color: "#22c55e" }}>{dict.articleDetail.copied}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      {dict.articleDetail.share}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Article Body */}
            <article className="mb-12">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-[1.85] mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p}
                </p>
              ))}
            </article>

            {/* Tags */}
            <div className="mb-12 pb-8" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>
                {dict.articleDetail.tags}
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Support Banner */}
            <DonationBanner />
          </div>

          {/* Right Column: Related Articles */}
          <div className="lg:col-span-1">
            <div className="sticky" style={{ top: "calc(var(--nav-height) + 20px)" }}>
              <h2 className="text-lg font-bold mb-5 flex items-center gap-2 animate-fade-in-up" style={{ color: "var(--text-primary)" }}>
                <span className="w-1 h-5 rounded-full" style={{ background: "var(--accent-gold)" }} />
                {dict.articleDetail.relatedArticles}
              </h2>
              <div className="space-y-5">
                {relatedArticles.map((a, index) => (
                  <ScrollReveal key={a.id} delay={index * 80}>
                    <ArticleCard article={a} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
