// Article 19 — Human Rights Media Platform
// Content data for documentaries, reports, series, and articles

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  heroImage?: string;
  duration: string;
  views: number;
  year: number;
  rating: string;
  genre: string[];
  language: "Bangla" | "English" | "Hindi";
  type: "documentary" | "report" | "series" | "editorial";
  featured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audioUrl: string;
  duration: string;
  episode: number;
  season: number;
  host: string;
  guest?: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "1", name: "Featured Reports", slug: "featured-reports", icon: "📋" },
  { id: "3", name: "Freedom of Press", slug: "freedom-of-press", icon: "📰" },
  { id: "4", name: "Human Dignity", slug: "human-dignity", icon: "⚖️" },
  { id: "5", name: "Women's Rights", slug: "womens-rights", icon: "✊" },
  { id: "7", name: "Climate Justice", slug: "climate-justice", icon: "🌍" },
  { id: "8", name: "Refugee Stories", slug: "refugee-stories", icon: "🕊️" },
  { id: "9", name: "Latest Releases", slug: "latest-releases", icon: "✨" },
  { id: "10", name: "Bangladesh Focus", slug: "bangladesh-focus", icon: "🇧🇩" },
  { id: "11", name: "Global Focus", slug: "global-focus", icon: "🌐" },
];

export const videos: Video[] = [
  {
    id: "1",
    title: "Voices from the Margins",
    description:
      "An unflinching look at the Rohingya crisis — from the exodus to the camps, this documentary follows survivors who refuse to be silenced. Through their testimonies, we witness the resilience of a people fighting for recognition and justice.",
    thumbnail: "/thumbnails/movie1.jpg",
    heroImage: "/thumbnails/hero1.png",
    duration: "1h 42m",
    views: 245000,
    year: 2025,
    rating: "9.2",
    genre: ["Human Rights", "Refugee Crisis"],
    language: "Bangla",
    type: "documentary",
    featured: true,
  },
  {
    id: "2",
    title: "The Price of Truth",
    description:
      "Investigative journalists risk everything to expose corruption and injustice. This gripping documentary follows three reporters across three continents as they pursue stories that powerful forces want buried — at immense personal cost.",
    thumbnail: "/thumbnails/movie2.jpg",
    heroImage: "/thumbnails/hero2.png",
    duration: "2h 05m",
    views: 189000,
    year: 2025,
    rating: "9.5",
    genre: ["Press Freedom", "Investigation"],
    language: "English",
    type: "documentary",
    featured: true,
  },
  {
    id: "3",
    title: "Breaking the Silence",
    description:
      "A powerful series documenting women's rights movements across South Asia. Each episode spotlights activists, survivors, and changemakers who are reshaping societies and challenging centuries of oppression.",
    thumbnail: "/thumbnails/series1.jpg",
    duration: "8 Episodes",
    views: 312000,
    year: 2024,
    rating: "9.0",
    genre: ["Women's Rights", "Social Justice"],
    language: "Bangla",
    type: "series",
  },
  {
    id: "4",
    title: "Digital Chains",
    description:
      "As governments weaponize technology for surveillance, this report examines how digital rights are being eroded worldwide. From facial recognition to internet shutdowns, the battle for digital freedom is the human rights struggle of our time.",
    thumbnail: "/thumbnails/movie3.jpg",
    duration: "58m",
    views: 156000,
    year: 2025,
    rating: "8.8",
    genre: ["Digital Rights", "Surveillance"],
    language: "English",
    type: "report",
  },
  {
    id: "5",
    title: "Rivers of Resistance",
    description:
      "Climate change disproportionately affects the most vulnerable communities. This documentary follows activists in Bangladesh's coastal regions fighting land erosion, displacement, and corporate negligence — demanding climate justice.",
    thumbnail: "/thumbnails/movie4.jpg",
    duration: "1h 35m",
    views: 198000,
    year: 2024,
    rating: "8.7",
    genre: ["Climate Justice", "Environmental Rights"],
    language: "Bangla",
    type: "documentary",
  },
  {
    id: "6",
    title: "Behind the Wire",
    description:
      "An investigative series exposing labor exploitation in global supply chains. From garment factories to mining operations, this series reveals the human cost of the products we consume daily — and the workers fighting for their rights.",
    thumbnail: "/thumbnails/series2.jpg",
    heroImage: "/thumbnails/hero3.png",
    duration: "6 Episodes",
    views: 267000,
    year: 2025,
    rating: "9.3",
    genre: ["Labor Rights", "Investigation"],
    language: "English",
    type: "series",
    featured: true,
  },
  {
    id: "7",
    title: "The Disappeared",
    description:
      "Families of the forcibly disappeared share their agonizing stories of loss and their relentless search for truth. This documentary shines a light on one of the most underreported human rights violations across multiple countries.",
    thumbnail: "/thumbnails/movie5.jpg",
    duration: "1h 48m",
    views: 178000,
    year: 2025,
    rating: "9.1",
    genre: ["Human Rights", "Justice"],
    language: "Bangla",
    type: "documentary",
  },
  {
    id: "8",
    title: "Code Red: Press Under Fire",
    description:
      "A hard-hitting editorial report on the state of press freedom globally. Journalists are being jailed, attacked, and killed at alarming rates. This report documents the threats and celebrates the courage of those who persist.",
    thumbnail: "/thumbnails/series1.jpg",
    duration: "45m",
    views: 134000,
    year: 2024,
    rating: "8.9",
    genre: ["Press Freedom", "Editorial"],
    language: "English",
    type: "report",
  },
  {
    id: "9",
    title: "Echoes of 1971",
    description:
      "A definitive documentary on the Bangladesh Liberation War and its lasting impact on human rights in the region. Survivors, historians, and activists reflect on the lessons of '71 and their relevance to today's struggles for justice.",
    thumbnail: "/thumbnails/movie1.jpg",
    duration: "2h 20m",
    views: 445000,
    year: 2024,
    rating: "9.6",
    genre: ["Historical", "Human Rights"],
    language: "Bangla",
    type: "documentary",
  },
  {
    id: "10",
    title: "Borderless",
    description:
      "Following the journeys of refugees and asylum seekers across borders, this documentary captures the human stories behind the statistics — their hopes, their fears, and their fight for dignity in a world that too often looks away.",
    thumbnail: "/thumbnails/movie2.jpg",
    duration: "1h 52m",
    views: 223000,
    year: 2025,
    rating: "9.0",
    genre: ["Refugee Crisis", "Migration"],
    language: "English",
    type: "documentary",
  },
  {
    id: "11",
    title: "Unheard Voices",
    description:
      "An intimate series exploring indigenous communities' struggles to protect their land, culture, and rights against corporate and governmental encroachment. Each episode amplifies voices that are systematically silenced.",
    thumbnail: "/thumbnails/series2.jpg",
    duration: "10 Episodes",
    views: 380000,
    year: 2025,
    rating: "8.8",
    genre: ["Indigenous Rights", "Cultural"],
    language: "Bangla",
    type: "series",
  },
  {
    id: "12",
    title: "The Right to Know",
    description:
      "An editorial report examining freedom of information laws worldwide and how access to information is fundamental to accountability. Through case studies and expert analysis, this report makes the case for transparency as a human right.",
    thumbnail: "/thumbnails/movie3.jpg",
    duration: "52m",
    views: 112000,
    year: 2025,
    rating: "8.5",
    genre: ["Freedom of Expression", "Governance"],
    language: "English",
    type: "report",
  },
];

// ── Articles / Blog Posts ──

export const articles: Article[] = [
  {
    id: "a1",
    title: "Why Press Freedom Is the Foundation of All Other Freedoms",
    excerpt:
      "Without a free press, there can be no accountability, no transparency, and no justice. Here's why defending journalism is defending democracy itself.",
    content:
      "Press freedom is not merely a privilege enjoyed by journalists — it is the oxygen of democracy. When reporters are silenced, societies lose their ability to hold power accountable. Across the globe, we are witnessing an alarming erosion of this fundamental right...\n\nIn Bangladesh alone, dozens of journalists face threats, harassment, and legal action for doing their jobs. Digital surveillance tools are being deployed to monitor reporters, while vague cybersecurity laws are weaponized to criminalize dissent...\n\nArticle 19 of the Universal Declaration of Human Rights enshrines the right to freedom of expression. This includes the freedom to seek, receive, and impart information through any media. Yet in 2025, this right is under siege in more than 70 countries...\n\nDefending press freedom means defending the right of every citizen to know the truth. It means standing up for the reporters who risk everything to tell stories that matter. And it means building institutions that protect — not persecute — those who speak truth to power.",
    thumbnail: "/thumbnails/movie2.jpg",
    author: "Farhan Ahmed",
    publishedAt: "2025-07-28",
    readTime: "8 min read",
    category: "Press Freedom",
    tags: ["Press Freedom", "Democracy", "Journalism"],
    featured: true,
  },
  {
    id: "a2",
    title: "The Rohingya Crisis: Five Years On, Justice Remains Elusive",
    excerpt:
      "Half a decade after the mass displacement, over a million Rohingya remain in refugee camps. What has the international community actually done — and what has it failed to do?",
    content:
      "Five years have passed since the world witnessed the systematic persecution of the Rohingya people in Myanmar. The images of burning villages, fleeing families, and overcrowded boats shocked the global conscience. International courts declared it a genocide...\n\nToday, over one million Rohingya refugees live in sprawling camps in Cox's Bazar, Bangladesh. The camps, originally built as temporary shelters, have become semi-permanent cities of despair. Education is limited, employment is restricted, and hope is fading...\n\nThe International Court of Justice ordered Myanmar to prevent acts of genocide, but enforcement mechanisms remain weak. The military junta that seized power in 2021 has only deepened the crisis, both for the Rohingya and for the people of Myanmar...\n\nJustice for the Rohingya is not just a legal question — it is a moral imperative. The international community must move beyond statements of concern and take concrete action to ensure accountability, support repatriation with dignity, and address the root causes of this crisis.",
    thumbnail: "/thumbnails/movie1.jpg",
    author: "Nusrat Jahan",
    publishedAt: "2025-07-22",
    readTime: "12 min read",
    category: "Refugee Crisis",
    tags: ["Rohingya", "Myanmar", "Refugee Rights", "Genocide"],
    featured: true,
  },
  {
    id: "a3",
    title: "Digital Surveillance in South Asia: A Growing Threat to Rights",
    excerpt:
      "From Pegasus spyware to internet shutdowns, governments across South Asia are deploying sophisticated tools to monitor and suppress dissent.",
    content:
      "The digital revolution promised to democratize information and empower citizens. But across South Asia, governments are turning these same technologies into instruments of control. Sophisticated surveillance tools, once the domain of intelligence agencies in wealthy nations, are now being deployed against journalists, activists, and ordinary citizens...\n\nIn India, the Pegasus spyware scandal revealed that the phones of reporters, opposition leaders, and even Supreme Court judges had been compromised. In Bangladesh, the Digital Security Act has been used to arrest hundreds of people for social media posts...\n\nThe right to privacy is a prerequisite for freedom of expression. When people fear they are being watched, they self-censor. When activists know their communications are monitored, movements are chilled. The surveillance state is fundamentally incompatible with democratic governance...\n\nWe need a new framework for digital rights — one that balances legitimate security concerns with the fundamental freedoms that make societies worth securing.",
    thumbnail: "/thumbnails/movie3.jpg",
    author: "Rahul Dey",
    publishedAt: "2025-07-15",
    readTime: "10 min read",
    category: "Digital Rights",
    tags: ["Surveillance", "Digital Rights", "Privacy", "South Asia"],
  },
  {
    id: "a4",
    title: "Climate Justice Is Human Rights Justice",
    excerpt:
      "The communities least responsible for climate change are suffering its worst consequences. Why environmental action must be framed as a rights issue.",
    content:
      "Bangladesh contributes less than 0.5% of global greenhouse gas emissions, yet it is one of the countries most devastated by climate change. Rising sea levels threaten to displace 20 million people by 2050. Cyclones are becoming more frequent and more destructive. Rivers are eroding entire communities...\n\nThis is not just an environmental crisis — it is a human rights catastrophe. The right to life, the right to housing, the right to food — all are being undermined by a crisis that the most vulnerable did nothing to cause...\n\nClimate justice demands that we recognize this inequity and act accordingly. Wealthy nations that have historically driven emissions have a moral and legal obligation to support adaptation in vulnerable countries. Corporate polluters must be held accountable for the damage they have caused...\n\nThe climate movement and the human rights movement are not separate struggles. They are the same struggle, seen through different lenses. Until we understand this, our responses to both will remain inadequate.",
    thumbnail: "/thumbnails/movie4.jpg",
    author: "Tasnim Rahman",
    publishedAt: "2025-07-08",
    readTime: "9 min read",
    category: "Climate Justice",
    tags: ["Climate Change", "Environmental Rights", "Bangladesh"],
  },
  {
    id: "a5",
    title: "The Fight for Labor Rights in the Garment Industry",
    excerpt:
      "A decade after the Rana Plaza collapse, workers in Bangladesh's garment sector still face dangerous conditions. What has changed — and what hasn't?",
    content:
      "On April 24, 2013, the Rana Plaza building in Dhaka collapsed, killing 1,134 garment workers and injuring thousands more. It was the deadliest structural failure in modern history and a damning indictment of the global fashion industry's pursuit of profit over people...\n\nThe tragedy sparked global outrage and led to significant reforms. The Bangladesh Accord on Fire and Building Safety, signed by over 200 brands, improved structural safety in thousands of factories. Minimum wages were raised, and new labor inspection mechanisms were established...\n\nBut progress has been uneven. Workers still report excessive overtime, wage theft, and retaliation for union organizing. The pandemic exposed the fragility of these gains, as brands cancelled billions of dollars in orders, leaving workers destitute...\n\nTrue labor rights require more than safety inspections — they require a fundamental shift in the power dynamics of global supply chains. Workers must have a genuine voice in the decisions that affect their lives.",
    thumbnail: "/thumbnails/movie5.jpg",
    author: "Maliha Khan",
    publishedAt: "2025-06-30",
    readTime: "11 min read",
    category: "Labor Rights",
    tags: ["Labor Rights", "Garment Industry", "Rana Plaza", "Workers Rights"],
    featured: true,
  },
  {
    id: "a6",
    title: "Freedom of Expression in the Age of Misinformation",
    excerpt:
      "How do we protect free speech while combating the spread of harmful misinformation? The answer is more complex than most admit.",
    content:
      "Article 19 of the Universal Declaration of Human Rights protects the right to freedom of expression. But in an era of viral misinformation, deepfakes, and algorithmic amplification, this right faces unprecedented challenges...\n\nGovernments around the world are responding to misinformation with content regulation laws. But many of these laws are overly broad, vaguely worded, and easily weaponized against legitimate speech. In multiple countries, 'fake news' laws have been used to silence journalists and critics...\n\nThe solution to misinformation is not censorship — it is more speech, better speech, and stronger institutions. Media literacy education, independent fact-checking organizations, and transparent platform governance are far more effective than government-controlled content moderation...\n\nWe must resist the temptation to sacrifice freedom in the name of protecting truth. History teaches us that when governments decide what is true and what is false, it is always the powerful who benefit and the marginalized who suffer.",
    thumbnail: "/thumbnails/series1.jpg",
    author: "Farhan Ahmed",
    publishedAt: "2025-06-22",
    readTime: "7 min read",
    category: "Freedom of Expression",
    tags: ["Free Speech", "Misinformation", "Article 19", "UDHR"],
  },
];

export const featuredVideos = videos.filter((v) => v.featured);

export const trendingVideos = [...videos]
  .sort((a, b) => b.views - a.views)
  .slice(0, 8);

export const newReleases = [...videos]
  .filter((v) => v.year === 2025)
  .slice(0, 8);

export const banglaContent = videos.filter((v) => v.language === "Bangla");
export const englishContent = videos.filter((v) => v.language === "English");
export const seriesContent = videos.filter((v) => v.type === "series");
export const documentaryContent = videos.filter((v) => v.type === "documentary");
export const reportContent = videos.filter((v) => v.type === "report");

export const featuredArticles = articles.filter((a) => a.featured);
export const latestArticles = [...articles].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getVideoById(id: string): Video | undefined {
  return videos.find((v) => v.id === id);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getRelatedVideos(video: Video): Video[] {
  return videos
    .filter(
      (v) =>
        v.id !== video.id &&
        (v.genre.some((g) => video.genre.includes(g)) ||
          v.language === video.language)
    )
    .slice(0, 6);
}

export function getRelatedArticles(article: Article): Article[] {
  const related = articles
    .filter(
      (a) =>
        a.id !== article.id &&
        (a.category === article.category ||
          a.tags.some((t) => article.tags.includes(t)))
    );

  if (related.length < 4) {
    const additional = articles.filter((a) => a.id !== article.id && !related.some(r => r.id === a.id));
    return [...related, ...additional].slice(0, 4);
  }

  return related.slice(0, 4);
}

export function formatViews(views: number): string {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Podcasts ──

export const podcasts: Podcast[] = [
  {
    id: "p1",
    title: "The Silenced Majority",
    description:
      "In this opening episode, we explore how censorship operates in the digital age — not through blunt force, but through algorithmic suppression, shadow banning, and the quiet erosion of public discourse. Featuring interviews with activists from Bangladesh, Myanmar, and Egypt.",
    thumbnail: "/thumbnails/movie1.jpg",
    audioUrl: "",
    duration: "42 min",
    episode: 1,
    season: 1,
    host: "Farhan Ahmed",
    guest: "Dr. Ayesha Siddiqua",
    publishedAt: "2025-08-10",
    category: "Freedom of Expression",
    tags: ["Censorship", "Digital Rights", "Free Speech"],
    featured: true,
  },
  {
    id: "p2",
    title: "Borders, Walls & Human Lives",
    description:
      "Refugees don't just flee countries — they flee into legal limbo. This episode examines the human cost of immigration policy, the role of international law, and the voices of those caught between borders with no place to call home.",
    thumbnail: "/thumbnails/movie2.jpg",
    audioUrl: "",
    duration: "38 min",
    episode: 2,
    season: 1,
    host: "Farhan Ahmed",
    guest: "Nusrat Jahan",
    publishedAt: "2025-08-03",
    category: "Refugee Crisis",
    tags: ["Refugees", "Migration", "International Law"],
    featured: true,
  },
  {
    id: "p3",
    title: "Press Under Siege",
    description:
      "Journalists are being jailed, surveilled, and killed at record rates. We speak with reporters who have risked everything to publish the truth — and ask what press freedom really means in 2025.",
    thumbnail: "/thumbnails/series1.jpg",
    audioUrl: "",
    duration: "51 min",
    episode: 3,
    season: 1,
    host: "Farhan Ahmed",
    guest: "Rahul Dey",
    publishedAt: "2025-07-27",
    category: "Press Freedom",
    tags: ["Journalism", "Press Freedom", "Surveillance"],
    featured: true,
  },
  {
    id: "p4",
    title: "Climate Displacement: The Invisible Crisis",
    description:
      "By 2050, 200 million people could be displaced by climate change. This episode travels to Bangladesh's disappearing coastline to hear from communities already living this reality — and the activists fighting for climate justice.",
    thumbnail: "/thumbnails/movie4.jpg",
    audioUrl: "",
    duration: "45 min",
    episode: 4,
    season: 1,
    host: "Farhan Ahmed",
    guest: "Tasnim Rahman",
    publishedAt: "2025-07-20",
    category: "Climate Justice",
    tags: ["Climate Change", "Displacement", "Bangladesh"],
  },
  {
    id: "p5",
    title: "Women on the Frontlines",
    description:
      "From the streets of Dhaka to the courts of The Hague, women human rights defenders are driving some of the most consequential movements of our time. This episode celebrates their courage and examines the unique threats they face.",
    thumbnail: "/thumbnails/movie5.jpg",
    audioUrl: "",
    duration: "47 min",
    episode: 5,
    season: 1,
    host: "Farhan Ahmed",
    guest: "Maliha Khan",
    publishedAt: "2025-07-13",
    category: "Women's Rights",
    tags: ["Women's Rights", "Activism", "South Asia"],
  },
  {
    id: "p6",
    title: "Digital Chains: Surveillance & the State",
    description:
      "Pegasus spyware, internet shutdowns, and social media monitoring — how governments are turning technology against their own people. A deep-dive into digital authoritarianism and the fight for privacy.",
    thumbnail: "/thumbnails/movie3.jpg",
    audioUrl: "",
    duration: "55 min",
    episode: 6,
    season: 1,
    host: "Farhan Ahmed",
    guest: "Dr. Kamal Hossain",
    publishedAt: "2025-07-06",
    category: "Digital Rights",
    tags: ["Surveillance", "Privacy", "Digital Rights"],
  },
  {
    id: "p7",
    title: "The Rana Plaza Decade: Has Anything Changed?",
    description:
      "Ten years after the worst industrial disaster in modern history, we revisit the garment workers, the survivors, and the promises that were made. What progress has been achieved — and what has been quietly forgotten?",
    thumbnail: "/thumbnails/series2.jpg",
    audioUrl: "",
    duration: "49 min",
    episode: 7,
    season: 1,
    host: "Farhan Ahmed",
    guest: "Maliha Khan",
    publishedAt: "2025-06-29",
    category: "Labor Rights",
    tags: ["Labor Rights", "Garment Industry", "Rana Plaza"],
  },
  {
    id: "p8",
    title: "Echoes of Justice: The ICC and Accountability",
    description:
      "Can international courts truly deliver justice? From the Rohingya genocide case to war crimes tribunals, we examine whether the international legal system is up to the challenge of holding the powerful accountable.",
    thumbnail: "/thumbnails/movie1.jpg",
    audioUrl: "",
    duration: "44 min",
    episode: 8,
    season: 1,
    host: "Farhan Ahmed",
    publishedAt: "2025-06-22",
    category: "Justice",
    tags: ["International Law", "ICC", "Accountability", "Rohingya"],
  },
];

export const featuredPodcasts = podcasts.filter((p) => p.featured);
export const latestPodcasts = [...podcasts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getPodcastById(id: string): Podcast | undefined {
  return podcasts.find((p) => p.id === id);
}

export function getRelatedPodcasts(podcast: Podcast): Podcast[] {
  return podcasts
    .filter(
      (p) =>
        p.id !== podcast.id &&
        (p.category === podcast.category ||
          p.tags.some((t) => podcast.tags.includes(t)))
    )
    .slice(0, 6);
}

