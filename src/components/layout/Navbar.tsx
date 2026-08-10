"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { categories } from "@/lib/data";
import DonateModal from "@/components/ui/DonateModal";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
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
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "navbar-solid" : "navbar-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
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
              Human Rights Media
            </span>
          </div>
        </Link>

        {/* Clean Center Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/" active={pathname === "/"}>Home</NavLink>
          <NavLink href="/category/documentaries" active={pathname.includes("/category/documentaries")}>Documentaries</NavLink>
          <NavLink href="/articles" active={pathname.includes("/articles")}>Articles</NavLink>

          {/* Topics Dropdown */}
          <div className="relative group">
            <button
              className="text-sm font-medium flex items-center gap-1 py-2 transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
            >
              Topics
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
                      href={`/category/${cat.slug}`}
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
          {/* Donate Button (Desktop) */}
          <button
            onClick={() => setIsDonateOpen(true)}
            className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full font-bold text-xs transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
              color: "#0C0E12",
              boxShadow: "0 4px 15px rgba(212, 160, 74, 0.25)",
            }}
          >
            Support Us
          </button>

          {/* Search Form */}
          <form ref={searchRef} onSubmit={handleSearchSubmit} className="relative flex items-center">
            {searchOpen ? (
              <>
                {/* Desktop inline search */}
                <div
                  className="hidden sm:flex items-center rounded-full px-3 py-1.5 w-60 animate-scale-in"
                  style={{
                    background: "rgba(20, 22, 28, 0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs outline-none pr-2"
                    style={{ color: "var(--text-primary)", caretColor: "var(--accent-gold)" }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="shrink-0 transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {/* Mobile full-width search bar — positioned below navbar */}
                <div
                  className="sm:hidden fixed left-0 right-0 top-16 z-50 px-4 py-3 animate-slide-down"
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
                      placeholder="Search content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-sm outline-none"
                      style={{ color: "var(--text-primary)", caretColor: "var(--accent-gold)" }}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="shrink-0 ml-2 p-1 rounded-full transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
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
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
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
          <MobileLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileLink>
          <MobileLink href="/category/documentaries" onClick={() => setMobileMenuOpen(false)}>Documentaries</MobileLink>
          <MobileLink href="/articles" onClick={() => setMobileMenuOpen(false)}>Articles</MobileLink>
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsDonateOpen(true);
            }}
            className="w-full mt-4 flex items-center justify-center px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md"
            style={{
              background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
              color: "#0C0E12",
              boxShadow: "0 4px 15px rgba(212, 160, 74, 0.25)",
            }}
          >
            Support Us
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
      className={`text-sm font-medium transition-colors nav-link-hover ${
        active ? "font-semibold nav-link-active" : ""
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
