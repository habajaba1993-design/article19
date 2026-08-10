"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article, formatDate } from "@/lib/data";
import ArticleCard from "@/components/article/ArticleCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DonationBanner from "@/components/ui/DonationBanner";

interface ArticleDetailClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetailClient({ article, relatedArticles }: ArticleDetailClientProps) {
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
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden" style={{ maxHeight: "450px" }}>
        <div className="relative aspect-[21/9] w-full max-w-[1440px] mx-auto">
          {!imageError ? (
            <Image
              src={article.thumbnail}
              alt={article.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1510, #0C0E12)" }} />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, var(--bg-primary) 0%, rgba(12,14,18,0.5) 50%, rgba(12,14,18,0.3) 100%)" }}
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-[800px] mx-auto px-6 sm:px-8 -mt-20 relative z-10">
        {/* Category Badge */}
        <div className="mb-4 animate-fade-in-up">
          <span
            className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.15em]"
            style={{ background: "var(--accent-gold)", color: "#0C0E12" }}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6 animate-fade-in-up"
          style={{ color: "var(--text-primary)", animationDelay: "80ms" }}
        >
          {article.title}
        </h1>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center gap-4 mb-8 pb-8 animate-fade-in-up"
          style={{ borderBottom: "1px solid var(--border-subtle)", animationDelay: "160ms" }}
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
                  <span style={{ color: "#22c55e" }}>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
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
            Tags
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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <ScrollReveal>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ background: "var(--accent-gold)" }} />
              <h2 className="font-display text-xl" style={{ color: "var(--text-primary)" }}>
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((a, index) => (
                <div key={a.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
