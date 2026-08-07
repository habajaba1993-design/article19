import { videos, categories } from "@/lib/data";
import type { Video } from "@/lib/data";
import CategoryPageClient from "./CategoryPageClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const categoryMap: Record<string, { title: string; icon: string; filter: (v: Video) => boolean }> = {
  movies: { title: "Movies", icon: "🎬", filter: (v) => v.type === "movie" },
  series: { title: "Series", icon: "📺", filter: (v) => v.type === "series" },
  bangla: { title: "Bangla Content", icon: "🇧🇩", filter: (v) => v.language === "Bangla" },
  english: { title: "English Content", icon: "🎬", filter: (v) => v.language === "English" },
  trending: { title: "Trending Now", icon: "🔥", filter: () => true },
  "new-releases": { title: "New Releases", icon: "✨", filter: (v) => v.year === 2025 },
  "action-thriller": { title: "Action & Thriller", icon: "💥", filter: (v) => v.genre.some((g) => ["Action", "Thriller"].includes(g)) },
  romance: { title: "Romance", icon: "💕", filter: (v) => v.genre.includes("Romance") },
  drama: { title: "Drama", icon: "🎭", filter: (v) => v.genre.includes("Drama") },
  "bangla-movies": { title: "Bangla Movies", icon: "🇧🇩", filter: (v) => v.language === "Bangla" && v.type === "movie" },
  "english-movies": { title: "English Movies", icon: "🎬", filter: (v) => v.language === "English" && v.type === "movie" },
  "web-series": { title: "Web Series", icon: "📺", filter: (v) => v.type === "series" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryMap[slug];
  return {
    title: cat ? `${cat.title} | Article 19` : "Category | Article 19",
    description: cat ? `Browse ${cat.title} on Article 19 streaming platform` : "Browse content on Article 19",
  };
}

export function generateStaticParams() {
  return [
    ...Object.keys(categoryMap).map((slug) => ({ slug })),
    ...categories.map((c) => ({ slug: c.slug })),
  ];
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = categoryMap[slug] || { title: slug.replace(/-/g, " "), icon: "📂", filter: () => true };
  
  let filteredVideos = videos.filter(cat.filter);
  
  // Sort by views for trending
  if (slug === "trending") {
    filteredVideos = [...filteredVideos].sort((a, b) => b.views - a.views);
  }

  return (
    <CategoryPageClient
      title={cat.title}
      icon={cat.icon}
      videos={filteredVideos}
      slug={slug}
    />
  );
}
