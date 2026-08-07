import { latestArticles } from "@/lib/data";
import ArticleCard from "@/components/article/ArticleCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles & Editorials | Article 19",
  description: "In-depth articles, editorials, and analysis on human rights, press freedom, and social justice.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen" style={{ paddingTop: "100px", background: "var(--bg-primary)" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ borderBottom: "1px solid var(--border-subtle)", background: "linear-gradient(to bottom, rgba(212, 160, 74, 0.04), transparent)" }}>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-14">
          <div className="animate-fade-in-up">
            <h1 className="font-display text-3xl sm:text-4xl tracking-tight" style={{ color: "var(--text-primary)" }}>
              Articles & Editorials
            </h1>
            <p className="text-sm font-medium mt-2 max-w-xl" style={{ color: "var(--text-secondary)" }}>
              In-depth analysis, opinion, and investigative writing on human rights issues that matter.
            </p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article, index) => (
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
    </div>
  );
}
