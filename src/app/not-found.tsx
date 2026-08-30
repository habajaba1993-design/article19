import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{ background: "#0C0E12", color: "#E8E6E3" }}
    >
      {/* Ambient Background Glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212, 160, 74, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(212, 160, 74, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[300px] h-[250px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(220, 38, 38, 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid Lines Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* 404 Number */}
        <div className="relative mb-6">
          <h1
            className="font-display text-[160px] sm:text-[200px] leading-none font-bold tracking-tight select-none"
            style={{
              background: "linear-gradient(180deg, rgba(212, 160, 74, 0.7) 0%, rgba(212, 160, 74, 0.15) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>

        </div>

        {/* Heading */}
        <h2
          className="font-display text-2xl sm:text-3xl mb-4"
          style={{ color: "#E8E6E3" }}
        >
          Page Not Found
        </h2>

        {/* Description */}
        <p
          className="text-sm sm:text-base leading-relaxed mb-10 max-w-sm mx-auto"
          style={{ color: "rgba(168, 162, 158, 0.8)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative overflow-hidden px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #D4A04A, #B8862D)",
              color: "#0C0E12",
              boxShadow: "0 8px 32px rgba(212, 160, 74, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </span>
          </Link>

          <Link
            href="/en/articles"
            className="group px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#A8A29E",
            }}
          >
            <span className="flex items-center gap-2 transition-colors group-hover:text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Browse Articles
            </span>
          </Link>
        </div>

        {/* Decorative divider */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="w-8 h-px" style={{ background: "rgba(212, 160, 74, 0.3)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(212, 160, 74, 0.4)" }} />
          <div className="w-8 h-px" style={{ background: "rgba(212, 160, 74, 0.3)" }} />
        </div>

        <p className="mt-6 text-xs tracking-widest uppercase" style={{ color: "rgba(168, 162, 158, 0.4)" }}>
          Article 19
        </p>
      </div>
    </div>
  );
}
