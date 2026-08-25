"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Podcast, formatDate } from "@/lib/data";
import ScrollReveal from "@/components/ui/ScrollReveal";
import DonationBanner from "@/components/ui/DonationBanner";
import AdCarousel from "@/components/ui/AdCarousel";
import AudioPlayer from "@/components/ui/AudioPlayer";
import { useLang } from "@/lib/LangContext";

interface PodcastDetailClientProps {
  podcast: Podcast;
  relatedPodcasts: Podcast[];
}

export default function PodcastDetailClient({ podcast, relatedPodcasts }: PodcastDetailClientProps) {
  const { lang, dict } = useLang();
  const l = (path: string) => `/${lang}${path}`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [podcast.id]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="min-h-screen" style={{ paddingTop: "80px", paddingBottom: isPlaying ? 80 : 0, background: "var(--bg-primary)", transition: "padding-bottom 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>

      {/* ── Hero Thumbnail (Article-style) ── */}
      <div className="relative w-full overflow-hidden" style={{ maxHeight: "450px" }}>
        <div className="relative aspect-[21/9] w-full max-w-[1440px] mx-auto">
          {!imageError ? (
            <Image
              src={podcast.thumbnail}
              alt={podcast.title}
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
          {/* Centered Play Button on thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              onClick={togglePlay}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: isPlaying ? "rgba(255,255,255,0.15)" : "linear-gradient(135deg, var(--accent-gold), #C07D20)",
                color: isPlaying ? "#fff" : "#0C0E12",
                boxShadow: isPlaying ? "none" : "0 8px 40px rgba(212, 160, 74, 0.4)",
                backdropFilter: isPlaying ? "blur(12px)" : "none",
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg className="w-10 h-10 sm:w-12 sm:h-12 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
          </div>
          {/* Playing Status Badge */}
          {isPlaying && (
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold animate-slide-down" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", border: "1px solid var(--border-subtle)", color: "var(--text-primary)" }}>
              <div className="flex items-end gap-[2px] h-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-[2.5px] rounded-full eq-bar" style={{ background: "var(--accent-gold)" }} />)}
              </div>
              <span>{dict.podcastDetail.nowPlaying} · {podcast.duration}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Details & Content Grid ── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 -mt-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Episode Badge */}
            <div className="flex items-center gap-2 mb-3 animate-fade-in-up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ background: "rgba(212,160,74,0.1)", border: "1px solid rgba(212,160,74,0.25)", color: "var(--accent-gold)" }}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
                S{podcast.season} · E{podcast.episode}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-4 animate-fade-in-up" style={{ color: "var(--text-primary)" }}>
              {podcast.title}
            </h1>

            {/* Info & Actions Bar — Single Line */}
            <div className="flex flex-wrap items-center gap-3 py-5 mb-6 animate-fade-in-up" style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", animationDelay: "80ms" }}>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                {podcast.duration}
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                {formatDate(podcast.publishedAt)}
              </span>
              <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold" style={{ background: "var(--accent-gold-dim)", color: "var(--accent-gold)", border: "1px solid rgba(212,160,74,0.2)" }}>
                {podcast.category}
              </span>

              {/* Divider */}
              <div className="w-px h-6 mx-1 hidden sm:block" style={{ background: "var(--border-subtle)" }} />

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                {copied ? (
                  <svg className="w-5 h-5 animate-scale-in" style={{ color: "#22c55e" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )}
                <span style={copied ? { color: "#22c55e" } : undefined}>
                  {copied ? dict.podcastDetail.linkCopied : dict.podcastDetail.share}
                </span>
              </button>
            </div>

            {/* Host & Guest Info */}
            <ScrollReveal>
              <div className="flex flex-wrap items-center gap-4 mb-8 p-4 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: "var(--accent-gold-dim)", color: "var(--accent-gold)" }}>
                    {podcast.host.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{dict.podcastDetail.host}</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{podcast.host}</p>
                  </div>
                </div>
                {podcast.guest && (
                  <>
                    <div className="w-px h-8" style={{ background: "var(--border-subtle)" }} />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: "rgba(212,160,74,0.08)", color: "var(--accent-gold)" }}>
                        {podcast.guest.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{dict.podcastDetail.guest}</p>
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{podcast.guest}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollReveal>

            {/* Episode Overview */}
            <ScrollReveal>
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{dict.podcastDetail.overview}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {podcast.description}
                </p>
              </div>
            </ScrollReveal>

            {/* Topics & Tags */}
            <ScrollReveal delay={100}>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>{dict.podcastDetail.topicsTags}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {podcast.tags.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Support Banner — Desktop: after tags */}
            <div className="hidden lg:block mt-10">
              <DonationBanner />
            </div>
          </div>

          {/* Right Column: Ads + Related Episodes */}
          <div className="lg:col-span-1">
            <div className="sticky" style={{ top: "calc(var(--nav-height) + 20px)" }}>
              {/* Ad Sidebar */}
              <AdCarousel maxSlots={1} />

              {/* All Episodes Link */}
              <Link
                href={l("/podcast")}
                className="flex items-center justify-center gap-2 w-full mt-6 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300"
                style={{ background: "var(--accent-gold-dim)", border: "1px solid rgba(212,160,74,0.2)", color: "var(--accent-gold)" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {dict.podcastDetail.allEpisodes}
              </Link>

              {/* Related Episodes */}
              <h2 className="text-lg font-bold mb-5 mt-8 flex items-center gap-2 animate-fade-in-up" style={{ color: "var(--text-primary)" }}>
                <span className="w-1 h-5 rounded-full" style={{ background: "var(--accent-gold)" }} />
                {dict.podcastDetail.relatedEpisodes}
              </h2>
              <div className="space-y-4">
                {relatedPodcasts.map((rp, index) => (
                  <ScrollReveal key={rp.id} delay={index * 80}>
                    <RelatedEpisodeCard podcast={rp} lang={lang} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Banner — Mobile only */}
        <div className="lg:hidden">
          <DonationBanner />
        </div>
      </div>

      {/* Audio Player */}
      <AudioPlayer podcast={isPlaying ? podcast : null} onClose={() => setIsPlaying(false)} />
    </div>
  );
}

function RelatedEpisodeCard({ podcast, lang }: { podcast: Podcast; lang: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/${lang}/podcast/${podcast.id}`}
      className="flex gap-3.5 group rounded-xl p-3 transition-all duration-300 hover:bg-slate-800/30"
      style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)" }}
    >
      {/* Thumbnail */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0" style={{ background: "var(--bg-elevated)" }}>
        {!imgError ? (
          <Image
            src={podcast.thumbnail}
            alt={podcast.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="96px"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ background: "var(--bg-elevated)", color: "var(--text-muted)" }}>
            {podcast.title.slice(0, 3)}
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)", color: "#0C0E12" }}>
            <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-bold" style={{ color: "var(--accent-gold)" }}>S{podcast.season} · E{podcast.episode}</span>
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>·</span>
          <span className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>{podcast.duration}</span>
        </div>
        <h3 className="text-sm font-bold line-clamp-2 transition-colors duration-300" style={{ color: "var(--text-primary)" }}>
          {podcast.title}
        </h3>
        <p className="text-[11px] line-clamp-1 mt-1" style={{ color: "var(--text-muted)" }}>
          {podcast.host}{podcast.guest ? ` · ${podcast.guest}` : ""}
        </p>
      </div>
    </Link>
  );
}
