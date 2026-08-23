import { latestArticles, featuredArticles } from "@/lib/data";
import ArticleCard from "@/components/article/ArticleCard";
import AdCarousel from "@/components/ui/AdCarousel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.meta.articlesTitle,
    description: dict.meta.articlesDescription,
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const l = (path: string) => `/${lang}${path}`;

  const heroArticle = featuredArticles[0];
  const categories = Array.from(new Set(latestArticles.map((a) => a.category)));

  return (
    <div className="min-h-screen" style={{ paddingTop: "64px", background: "var(--bg-primary)" }}>

      {/* ── Premium Hero Section ── */}
      <section className="relative overflow-hidden">
        {/* Blurred Background */}
        <div className="absolute inset-0">
          <Image
            src={heroArticle.thumbnail}
            alt=""
            fill
            className="object-cover"
            style={{ filter: "blur(40px) brightness(0.3)", transform: "scale(1.2)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(12,14,18,0.7) 0%, rgba(12,14,18,0.95) 80%, var(--bg-primary) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Left: Title & Stats */}
            <div className="flex-1 animate-fade-in-up">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-6"
                style={{
                  background: "rgba(212,160,74,0.1)",
                  border: "1px solid rgba(212,160,74,0.25)",
                  color: "var(--accent-gold)",
                }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                {dict.articlesPage.badge}
              </div>
              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {dict.articlesPage.heroTitle} <span style={{ color: "var(--accent-gold)" }}>{dict.articlesPage.heroTitleAccent}</span> {dict.articlesPage.heroTitleSuffix}
              </h1>
              <p
                className="text-base sm:text-lg leading-relaxed max-w-xl mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {dict.articlesPage.heroSubtitle}
              </p>
              <div className="flex items-center gap-6 flex-wrap">
                <StatBlock value={String(latestArticles.length)} label={dict.articlesPage.articles} />
                <div className="w-px h-6" style={{ background: "var(--border-subtle)" }} />
                <StatBlock value={String(categories.length)} label={dict.articlesPage.topics} />
                <div className="w-px h-6" style={{ background: "var(--border-subtle)" }} />
                <StatBlock value={dict.articlesPage.weekly} label={dict.articlesPage.newArticles} />
              </div>
            </div>

            {/* Right: Featured Article Card */}
            <div
              className="w-full lg:w-[420px] shrink-0 animate-fade-in-up"
              style={{ animationDelay: "150ms" }}
            >
              <Link href={l(`/articles/${heroArticle.id}`)}>
                <div
                  className="rounded-2xl overflow-hidden group cursor-pointer"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid rgba(212,160,74,0.15)",
                    boxShadow:
                      "0 8px 40px rgba(0,0,0,0.4), 0 0 30px rgba(212,160,74,0.05)",
                    transition:
                      "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                  }}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={heroArticle.thumbnail}
                      alt={heroArticle.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(26,29,37,1) 0%, rgba(26,29,37,0.4) 50%, transparent 100%)",
                      }}
                    />
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: "rgba(212,160,74,0.9)", color: "#0C0E12" }}
                    >
                      {dict.articlesPage.featured}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: "var(--accent-gold)" }}
                      >
                        {heroArticle.category}
                      </span>
                      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                        ·
                      </span>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {heroArticle.readTime}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--accent-gold)]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {heroArticle.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed line-clamp-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {heroArticle.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles Grid + Ad Sidebar ── */}
      <section className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-12 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-1 h-7 rounded-full"
            style={{ background: "var(--accent-gold)", boxShadow: "0 0 8px rgba(212,160,74,0.3)" }}
          />
          <h2
            className="font-display text-2xl sm:text-3xl tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {dict.articlesPage.allArticles}
          </h2>
          <span className="text-sm font-semibold ml-1" style={{ color: "var(--text-muted)" }}>
            ({latestArticles.length})
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-8 lg:gap-10">
          {/* Left: Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ alignContent: "start" }}>
            {latestArticles.map((article, index) => (
              <ScrollReveal key={article.id}>
                <div
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <ArticleCard article={article} />
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
      </section>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-black" style={{ color: "var(--accent-gold)" }}>
        {value}
      </span>
      <span
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}
