"use client";

import Image from "next/image";
import Link from "next/link";
import { Article, formatDate } from "@/lib/data";
import { useState } from "react";
import { useLang } from "@/lib/LangContext";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const [imageError, setImageError] = useState(false);
  const { lang } = useLang();

  return (
    <Link
      href={`/${lang}/articles/${article.id}`}
      className="group block h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 card-hover-lift"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border-subtle)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
      id={`article-card-${article.id}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
        {!imageError ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1510, #14161C)" }}>
            <svg className="w-10 h-10 opacity-20" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: "rgba(212, 160, 74, 0.9)",
              color: "#0C0E12",
            }}
          >
            {article.category}
          </span>
        </div>

        {/* Read Time */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              color: "var(--text-secondary)",
            }}
          >
            {article.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3
          className="font-display text-lg leading-snug line-clamp-2 mb-3 transition-colors duration-300 group-hover:text-[var(--accent-gold)]"
          style={{ color: "var(--text-primary)" }}
        >
          {article.title}
        </h3>
        <p className="text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
          {article.excerpt}
        </p>

        {/* Author & Date */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
            {article.author}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
