import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-primary)" }}>
      <div className="text-center animate-fade-in-up">
        <div className="relative inline-block mb-8 animate-float">
          <span className="text-[120px] sm:text-[160px] font-extrabold gradient-text-gold leading-none">
            404
          </span>
          <div className="absolute -inset-4 rounded-full blur-3xl -z-10" style={{ background: "rgba(212, 160, 74, 0.06)" }} />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl mb-4 animate-fade-in-up" style={{ color: "var(--text-primary)", animationDelay: "150ms" }}>
          Page Not Found
        </h1>
        <p className="mb-8 max-w-md mx-auto animate-fade-in-up" style={{ color: "var(--text-secondary)", animationDelay: "250ms" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "350ms" }}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "var(--accent-gold)",
              color: "#0C0E12",
              boxShadow: "0 4px 15px rgba(212, 160, 74, 0.25)",
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
