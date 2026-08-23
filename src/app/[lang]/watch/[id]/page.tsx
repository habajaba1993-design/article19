import { videos, getVideoById, getRelatedVideos } from "@/lib/data";
import WatchPageClient from "./WatchPageClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const video = getVideoById(id);
  if (!video) return { title: "Not Found" };
  return {
    title: `${video.title} | Article 19`,
    description: video.description,
  };
}

export function generateStaticParams() {
  return videos.map((v) => ({ id: v.id }));
}

export default async function WatchPage({ params }: PageProps) {
  const { id } = await params;
  const video = getVideoById(id);
  if (!video) notFound();

  const relatedVideos = getRelatedVideos(video);

  return <WatchPageClient video={video} relatedVideos={relatedVideos} />;
}
