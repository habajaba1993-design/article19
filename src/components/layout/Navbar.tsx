"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { categories, videos, articles, podcasts } from "@/lib/data";
import type { Video, Article, Podcast } from "@/lib/data";
import DonateModal from "@/components/ui/DonateModal";
import { useLang } from "@/lib/LangContext";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchClosing, setSearchClosing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { lang, dict } = useLang();

  // Strip locale prefix for path matching
  const pathWithoutLang = pathname.replace(/^\/(en|bn)/, "") || "/";

  // Helper to prefix links with current locale
  const l = (path: string) => `/${lang}${path}`;
  const searchRef = useRef<HTMLFormElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Smooth close with exit animation
  const closeSearch = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setSearchClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setSearchOpen(false);
      setSearchClosing(false);
      setSearchQuery("");
    }, 300);
  };

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside as EventListener);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside as EventListener);
    };
  }, [searchOpen]);

  // Scroll-based navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const q = searchQuery.trim();
      setSearchOpen(false);
      setSearchClosing(false);
      setSearchQuery("");
      window.location.href = `/${lang}/search?q=${encodeURIComponent(q)}`;
    }
  };

  // Live search results
  const liveResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return { videos: [] as Video[], articles: [] as Article[], podcasts: [] as Podcast[] };
    return {
      videos: videos.filter(v => v.title.toLowerCase().includes(q) || v.genre.some(g => g.toLowerCase().includes(q))).slice(0, 3),
      articles: articles.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)).slice(0, 2),
      podcasts: podcasts.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 2),
    };
  }, [searchQuery]);
  const hasLiveResults = liveResults.videos.length + liveResults.articles.length + liveResults.podcasts.length > 0;
  const showDropdown = searchOpen && !searchClosing && searchQuery.trim().length >= 2;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "navbar-solid" : "navbar-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href={l("/")} className="flex items-center gap-2.5 shrink-0 group">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg shadow-md transition-all duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
              color: "#0C0E12",
              boxShadow: "0 4px 15px rgba(212, 160, 74, 0.25)",
            }}
          >
            A
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-wide leading-none" style={{ color: "var(--text-primary)" }}>
              Article<span style={{ color: "var(--accent-gold)" }}>19</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5" style={{ color: "var(--text-muted)" }}>
              {dict.nav.humanRightsMedia}
            </span>
          </div>
        </Link>

        {/* Clean Center Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href={l("/")} active={pathWithoutLang === "/"}>{dict.nav.home}</NavLink>
          <NavLink href={l("/category/documentaries")} active={pathWithoutLang.includes("/category/documentaries")}>{dict.nav.documentaries}</NavLink>
          <NavLink href={l("/podcast")} active={pathWithoutLang.includes("/podcast")}>{dict.nav.podcast}</NavLink>
          <NavLink href={l("/articles")} active={pathWithoutLang.includes("/articles")}>{dict.nav.articles}</NavLink>

          {/* Topics Dropdown */}
          <div className="relative group">
            <button
              className="text-sm font-medium flex items-center gap-1 py-2 transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              {dict.nav.topics}
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180"
                style={{ color: "var(--text-muted)" }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Invisible bridge to prevent hover gap */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div
                className="rounded-xl shadow-2xl overflow-hidden"
                style={{
                  background: "rgba(18, 20, 26, 0.97)",
                  backdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderTop: "2px solid rgba(212, 160, 74, 0.4)",
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04)",
                }}
              >
                <div className="py-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={l(`/category/${cat.slug}`)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium transition-all duration-200 relative"
                      style={{ color: "rgba(255, 255, 255, 0.6)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.paddingLeft = "20px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.paddingLeft = "16px";
                      }}
                    >
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "var(--accent-gold)", opacity: 0.5 }} />
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Right Tools */}
        <div className="flex items-center gap-4">
          {/* Language Switcher — Premium Globe Toggle */}
          <button
            onClick={() => {
              const target = lang === 'en' ? 'bn' : 'en';
              router.push(pathname.replace(/^\/(en|bn)/, `/${target}`));
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 group"
            style={{
              background: 'rgba(212, 160, 74, 0.08)',
              border: '1px solid rgba(212, 160, 74, 0.2)',
              color: 'var(--accent-gold)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 160, 74, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(212, 160, 74, 0.4)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 160, 74, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 160, 74, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(212, 160, 74, 0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            aria-label="Switch language"
          >
            <svg className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-[25deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
            <span className="tracking-wide">{lang === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Donate Button (Desktop) */}
          <button
            onClick={() => setIsDonateOpen(true)}
            className="hidden sm:flex group items-center justify-center px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
            style={{
              background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
              color: "#0C0E12",
              boxShadow: "0 4px 15px rgba(212, 160, 74, 0.4)",
            }}
          >
            <span className="flex items-center gap-1.5">{dict.nav.donate} <svg className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></span>
          </button>

          {/* Search Form */}
          <form ref={searchRef} onSubmit={handleSearchSubmit} className="relative flex items-center">
            {searchOpen ? (
              <>
                {/* Desktop inline search */}
                <div
                  className={`hidden sm:flex items-center rounded-full px-5 py-2 w-72 ${searchClosing ? 'animate-search-collapse' : 'animate-search-expand'}`}
                  style={{
                    background: "rgba(20, 22, 28, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <input
                    type="text"
                    placeholder={dict.nav.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none pr-2"
                    style={{ color: "var(--text-primary)", caretColor: "var(--accent-gold)", fontFamily: "var(--font-body)" }}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="shrink-0 transition-colors p-0.5"
                    style={{ color: "var(--accent-gold)" }}
                    aria-label="Search"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => closeSearch()}
                    className="shrink-0 transition-colors p-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Desktop search dropdown */}
                {showDropdown && (
                  <SearchDropdown
                    results={liveResults}
                    hasResults={hasLiveResults}
                    query={searchQuery}
                    onClose={() => closeSearch()}
                    className="hidden sm:block absolute top-full right-0 mt-2 w-[380px]"
                  />
                )}
                {/* Mobile full-width search bar — positioned below navbar */}
                <div
                  className={`sm:hidden fixed left-0 right-0 top-16 z-50 px-4 py-3 ${searchClosing ? 'animate-search-slide-up' : 'animate-search-slide-down'}`}
                  style={{
                    background: "linear-gradient(180deg, rgba(12, 14, 18, 0.98), rgba(12, 14, 18, 0.95))",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(212, 160, 74, 0.15)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div
                    className="flex items-center rounded-xl px-4 py-2.5"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid rgba(212, 160, 74, 0.2)",
                    }}
                  >
                    <svg className="w-4 h-4 shrink-0 mr-3" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder={dict.nav.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none"
                      style={{ color: "var(--text-primary)", caretColor: "var(--accent-gold)", fontFamily: "var(--font-body)" }}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="shrink-0 ml-2 p-1.5 rounded-full transition-colors"
                      style={{ color: "var(--accent-gold)" }}
                      aria-label="Search"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => closeSearch()}
                      className="shrink-0 ml-1 p-1 rounded-full transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {/* Mobile search dropdown */}
                  {showDropdown && (
                    <SearchDropdown
                      results={liveResults}
                      hasResults={hasLiveResults}
                      query={searchQuery}
                      onClose={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="mt-3"
                    />
                  )}
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 transition-colors"
                style={{ color: "var(--text-secondary)" }}
                aria-label="Search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </form>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 transition-transform duration-300" style={{ transform: mobileMenuOpen ? "rotate(90deg)" : "rotate(0)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer — animated slide-down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div
          className="relative px-5 py-5 space-y-1"
          style={{
            background: "linear-gradient(180deg, rgba(18, 20, 26, 0.98) 0%, rgba(12, 14, 18, 0.99) 100%)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderBottom: "1px solid rgba(212, 160, 74, 0.15)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
          }}
        >
          {/* Top gold accent line */}
          <div
            className="absolute top-0 left-5 right-5 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(212, 160, 74, 0.3), transparent)" }}
          />
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[80px] rounded-full pointer-events-none"
            style={{ background: "rgba(212, 160, 74, 0.04)", filter: "blur(40px)" }}
          />
          <MobileLink href={l("/")} onClick={() => setMobileMenuOpen(false)}>{dict.nav.home}</MobileLink>
          <MobileLink href={l("/category/documentaries")} onClick={() => setMobileMenuOpen(false)}>{dict.nav.documentaries}</MobileLink>
          <MobileLink href={l("/podcast")} onClick={() => setMobileMenuOpen(false)}>{dict.nav.podcast}</MobileLink>
          <MobileLink href={l("/articles")} onClick={() => setMobileMenuOpen(false)}>{dict.nav.articles}</MobileLink>

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const target = lang === 'en' ? 'bn' : 'en';
                router.push(pathname.replace(/^\/(en|bn)/, `/${target}`));
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 w-full"
              style={{
                background: 'rgba(212, 160, 74, 0.08)',
                border: '1px solid rgba(212, 160, 74, 0.2)',
                color: 'var(--accent-gold)',
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span>{lang === 'en' ? 'বাংলায় দেখুন' : 'Switch to English'}</span>
              <svg className="w-4 h-4 ml-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsDonateOpen(true);
            }}
            className="w-full mt-5 flex group items-center justify-center px-5 py-3 rounded-xl font-bold text-base transition-all duration-300 active:scale-95 hover:brightness-110"
            style={{
              background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
              color: "#0C0E12",
              boxShadow: "0 4px 15px rgba(212, 160, 74, 0.4)",
            }}
          >
            <span className="flex items-center gap-1.5">{dict.nav.donate} <svg className="w-[22px] h-[22px] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></span>
          </button>
        </div>
      </div>

      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors nav-link-hover ${active ? "font-semibold nav-link-active" : ""
        }`}
      style={{ color: active ? "var(--accent-gold)" : "var(--text-secondary)" }}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative flex items-center gap-3 text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-200"
      style={{ color: "var(--text-secondary)" }}
      onTouchStart={(e) => {
        e.currentTarget.style.background = "rgba(212, 160, 74, 0.08)";
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: "var(--accent-gold)", opacity: 0.4 }}
      />
      {children}
    </Link>
  );
}

/* ─── Live Search Dropdown ─── */

interface SearchDropdownProps {
  results: { videos: Video[]; articles: Article[]; podcasts: Podcast[] };
  hasResults: boolean;
  query: string;
  onClose: () => void;
  className?: string;
}

function SearchDropdown({ results, hasResults, query, onClose, className = "" }: SearchDropdownProps) {
  const { lang, dict } = useLang();
  const l = (path: string) => `/${lang}${path}`;
  const typeLabels: Record<string, string> = { documentary: "Documentary", report: "Report", series: "Series", editorial: "Editorial" };

  return (
    <div
      className={`rounded-xl overflow-hidden animate-slide-down ${className}`}
      style={{
        background: "rgba(18, 20, 26, 0.98)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderTop: "2px solid rgba(212, 160, 74, 0.4)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      {hasResults ? (
        <div className="py-2">
          {/* Video results */}
          {results.videos.length > 0 && (
            <div>
              <p className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{dict.search.videos}</p>
              {results.videos.map((v) => (
                <Link
                  key={v.id}
                  href={l(`/watch/${v.id}`)}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2.5 transition-all duration-150"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  <div className="w-12 h-8 rounded overflow-hidden shrink-0 relative" style={{ background: "var(--bg-elevated)" }}>
                    <Image src={v.thumbnail} alt={v.title} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: "inherit" }}>{v.title}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{typeLabels[v.type] || v.type} · {v.duration}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          )}

          {/* Article results */}
          {results.articles.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>{dict.search.articles}</p>
              {results.articles.map((a) => (
                <Link
                  key={a.id}
                  href={l(`/articles/${a.id}`)}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2.5 transition-all duration-150"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(212, 160, 74, 0.1)" }}>
                    <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: "inherit" }}>{a.title}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{a.category} · {a.readTime}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          )}

          {/* Podcast results */}
          {results.podcasts.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>{dict.search.podcasts}</p>
              {results.podcasts.map((p) => (
                <Link
                  key={p.id}
                  href={l(`/podcast?play=${p.id}`)}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2.5 transition-all duration-150"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(212, 160, 74, 0.1)" }}>
                    <svg className="w-4 h-4" style={{ color: "var(--accent-gold)" }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zm7 9v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V23h2v-2.06A9 9 0 0021 12v-2h-2z" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: "inherit" }}>{p.title}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>S{p.season} E{p.episode} · {p.duration}</p>
                  </div>
                  <svg className="w-3.5 h-3.5 shrink-0 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              ))}
            </div>
          )}

          {/* See all results */}
          <Link
            href={`/${lang}/search?q=${encodeURIComponent(query.trim())}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold transition-colors"
            style={{ color: "var(--accent-gold)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            See all results for &quot;{query.trim()}&quot;
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      ) : (
        <div className="px-4 py-6 text-center">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>No results for &quot;{query.trim()}&quot;</p>
        </div>
      )}
    </div>
  );
}
