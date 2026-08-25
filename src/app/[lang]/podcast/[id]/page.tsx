import { podcasts, getPodcastById, getRelatedPodcasts } from "@/lib/data";
import PodcastDetailClient from "./PodcastDetailClient";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const podcast = getPodcastById(id);
  if (!podcast) return { title: "Not Found" };
  return {
    title: `${podcast.title} | Article 19 Podcast`,
    description: podcast.description,
  };
}

export function generateStaticParams() {
  return podcasts.map((p) => ({ id: p.id }));
}

export default async function PodcastPage({ params }: PageProps) {
  const { id } = await params;
  const podcast = getPodcastById(id);
  if (!podcast) notFound();

  const relatedPodcasts = getRelatedPodcasts(podcast);

  return <PodcastDetailClient podcast={podcast} relatedPodcasts={relatedPodcasts} />;
}
