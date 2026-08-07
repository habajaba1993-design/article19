import { articles, getArticleById, getRelatedArticles } from "@/lib/data";
import ArticleDetailClient from "./ArticleDetailClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) return { title: "Article Not Found | Article 19" };
  return {
    title: `${article.title} | Article 19`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  const relatedArticles = getRelatedArticles(article);

  return <ArticleDetailClient article={article} relatedArticles={relatedArticles} />;
}
