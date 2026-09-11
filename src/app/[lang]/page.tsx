import HeroBanner from "@/components/video/HeroBanner";
import VideoCarousel from "@/components/video/VideoCarousel";
import ArticleCarousel from "@/components/article/ArticleCarousel";
import PodcastCarousel from "@/components/podcast/PodcastCarousel";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  featuredVideos,
  newReleases,
  banglaContent,
  englishContent,
  latestArticles,
  latestPodcasts,
} from "@/lib/data";
import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const l = (path: string) => `/${lang}${path}`;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Hero Banner */}
      <HeroBanner videos={featuredVideos} />

      {/* Content Carousels */}
      <div className="relative z-20 pb-8">
        <ArticleCarousel title={dict.sections.articlesEditorials} articles={latestArticles} cardVariant="featured" />
        <PodcastCarousel title={dict.sections.podcastEpisodes} podcasts={latestPodcasts} />
        <VideoCarousel title={dict.sections.latestReleases} videos={newReleases} cardVariant="new" categorySlug="new-releases" />
        <VideoCarousel title={dict.sections.bangladeshFocus} videos={banglaContent} cardVariant="spotlight" categorySlug="bangla" />
        <VideoCarousel title={dict.sections.globalFocus} videos={englishContent} cardVariant="minimal" categorySlug="english" />

      </div>



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
                &ldquo;{dict.udhr.quote}&rdquo;
              </p>
              <p className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: "var(--accent-gold)" }}>
                {dict.udhr.attribution}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
