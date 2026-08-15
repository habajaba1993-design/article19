// Article 19 — Ad / Sponsored Content Data
// Companies can place carousel ads on content pages

export interface Ad {
  id: string;
  company: string;
  logo: string;
  bannerImage: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  category: string;
  accentColor?: string;
}

export const ads: Ad[] = [
  // ── Slot 1 Ads ──
  {
    id: "ad1",
    company: "Amnesty International",
    logo: "🕊️",
    bannerImage: "/thumbnails/movie1.jpg",
    headline: "Stand With Human Rights Defenders",
    description:
      "Join millions worldwide defending the rights of people who speak out against injustice.",
    ctaText: "Learn More",
    ctaUrl: "https://www.amnesty.org",
    category: "Human Rights",
    accentColor: "#F7D046",
  },
  {
    id: "ad2",
    company: "Human Rights Watch",
    logo: "🛡️",
    bannerImage: "/thumbnails/movie5.jpg",
    headline: "Defending Rights Worldwide",
    description:
      "Investigating and exposing human rights abuses in over 100 countries around the globe.",
    ctaText: "Read Reports",
    ctaUrl: "https://www.hrw.org",
    category: "Human Rights",
    accentColor: "#E8443A",
  },
  {
    id: "ad3",
    company: "PEN International",
    logo: "✒️",
    bannerImage: "/thumbnails/series1.jpg",
    headline: "Words Should Not Cost Lives",
    description:
      "Defending writers and journalists who face persecution for their work across the world.",
    ctaText: "Support Writers",
    ctaUrl: "https://www.pen-international.org",
    category: "Free Expression",
    accentColor: "#3B82F6",
  },

  // ── Slot 2 Ads ──
  {
    id: "ad4",
    company: "Reporters Without Borders",
    logo: "📰",
    bannerImage: "/thumbnails/movie2.jpg",
    headline: "Press Freedom Index 2025",
    description:
      "Discover where journalism thrives and where it's under threat. Explore the global press freedom map.",
    ctaText: "View Report",
    ctaUrl: "https://rsf.org",
    category: "Press Freedom",
    accentColor: "#E8443A",
  },
  {
    id: "ad5",
    company: "CPJ",
    logo: "🎙️",
    bannerImage: "/thumbnails/series2.jpg",
    headline: "Protect Journalists Everywhere",
    description:
      "The Committee to Protect Journalists defends the right to report the news without fear.",
    ctaText: "Take Action",
    ctaUrl: "https://cpj.org",
    category: "Press Freedom",
    accentColor: "#F59E0B",
  },
  {
    id: "ad6",
    company: "Index on Censorship",
    logo: "📢",
    bannerImage: "/thumbnails/movie3.jpg",
    headline: "Challenging Censorship Worldwide",
    description:
      "Campaigning for free expression for over 50 years. Where censorship exists, we fight back.",
    ctaText: "Join Us",
    ctaUrl: "https://www.indexoncensorship.org",
    category: "Free Speech",
    accentColor: "#8B5CF6",
  },

  // ── Slot 3 Ads ──
  {
    id: "ad7",
    company: "UNHCR",
    logo: "🌍",
    bannerImage: "/thumbnails/movie4.jpg",
    headline: "Protect. Shelter. Empower.",
    description:
      "Over 100 million people are forcibly displaced worldwide. Your support can change lives.",
    ctaText: "Donate Now",
    ctaUrl: "https://www.unhcr.org",
    category: "Refugee Support",
    accentColor: "#0072BC",
  },
  {
    id: "ad8",
    company: "Digital Rights Foundation",
    logo: "🔒",
    bannerImage: "/thumbnails/movie3.jpg",
    headline: "Your Privacy Is Your Right",
    description:
      "Learn how to protect your digital footprint and fight for online freedom of expression.",
    ctaText: "Get Involved",
    ctaUrl: "https://digitalrightsfoundation.pk",
    category: "Digital Rights",
    accentColor: "#7C3AED",
  },
  {
    id: "ad9",
    company: "Transparency International",
    logo: "⚖️",
    bannerImage: "/thumbnails/movie5.jpg",
    headline: "Fight Corruption. Demand Accountability.",
    description:
      "Corruption costs lives. Join the global movement for transparency and justice.",
    ctaText: "Take Action",
    ctaUrl: "https://www.transparency.org",
    category: "Governance",
    accentColor: "#14B8A6",
  },
];

// Group ads into carousel slots (3 ads per slot)
export const adSlots: Ad[][] = [];
const SLOT_SIZE = 3;
for (let i = 0; i < ads.length; i += SLOT_SIZE) {
  adSlots.push(ads.slice(i, i + SLOT_SIZE));
}

export const activeAds = ads;
