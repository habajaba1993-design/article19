"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function IntroVideo() {
  const [show, setShow] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Only show once per session
    const hasSeenIntro = sessionStorage.getItem("koro-intro-seen");
    if (!hasSeenIntro) {
      setShow(true);
      // Prevent body scroll while intro is visible
      document.body.style.overflow = "hidden";
    }
  }, []);

  // Try to unmute automatically after user interaction with the page
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !show) return;

    // Attempt to play unmuted — if browser allows it
    const tryUnmute = () => {
      video.muted = false;
      setIsMuted(false);
    };

    // Listen for any user interaction to auto-unmute
    const handleInteraction = () => {
      tryUnmute();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [show]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const dismiss = useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    sessionStorage.setItem("koro-intro-seen", "true");

    // Re-enable scroll
    document.body.style.overflow = "";

    // Wait for fade-out animation before unmounting
    setTimeout(() => {
      setShow(false);
    }, 800);
  }, [isFadingOut]);

  // Track video progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !show) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [show, isLoaded]);

  // When video ends naturally
  const handleVideoEnd = () => {
    dismiss();
  };

  if (!show) return null;

  // SVG circle props for progress ring
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`intro-video-overlay ${isFadingOut ? "intro-video-fade-out" : "intro-video-fade-in"}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Video — starts muted for autoplay, user can unmute */}
      <video
        ref={videoRef}
        src="/opening-video/1.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onLoadedData={() => setIsLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Subtle vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Bottom gradient for button area */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Skip Button — bottom right */}
      <div
        className="intro-skip-area"
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Progress bar (thin horizontal) */}
        <div
          className="intro-progress-bar-track"
          style={{
            width: "120px",
            height: "3px",
            borderRadius: "2px",
            background: "rgba(255,255,255,0.15)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--accent-gold), #E8C373)",
              borderRadius: "2px",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Skip button */}
        <button
          onClick={dismiss}
          className="intro-skip-btn"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 24px 12px 18px",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "#F0EDE8",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            transition: "all 0.3s ease",
          }}
        >
          {/* Progress ring */}
          <svg
            width="50"
            height="50"
            style={{
              position: "absolute",
              inset: "-1px",
              width: "calc(100% + 2px)",
              height: "calc(100% + 2px)",
              pointerEvents: "none",
            }}
          >
            <rect
              x="0.5"
              y="0.5"
              width="calc(100% - 1px)"
              height="calc(100% - 1px)"
              rx="25"
              ry="25"
              fill="none"
              stroke="rgba(212,160,74,0.4)"
              strokeWidth="2"
              strokeDasharray={`${(progress / 100) * 300} 300`}
              style={{ transition: "stroke-dasharray 0.1s linear" }}
            />
          </svg>

          {/* Skip icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
          Skip
        </button>
      </div>

      {/* Unmute/Mute button — bottom left */}
      <div
        className="intro-watch-hint"
        style={{
          position: "absolute",
          bottom: "48px",
          left: "40px",
          zIndex: 10,
        }}
      >
        <button
          onClick={toggleMute}
          className="intro-skip-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "#F0EDE8",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.03em",
            transition: "all 0.3s ease",
          }}
        >
          {isMuted ? (
            /* Muted icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* Unmuted icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
          {isMuted ? "Tap to unmute" : "Sound on"}
        </button>
      </div>

      {/* Brand watermark — top left */}
      <div
        className="intro-brand"
        style={{
          position: "absolute",
          top: "32px",
          left: "40px",
          zIndex: 10,
          opacity: 0,
          animation: "introFadeInUp 0.8s ease-out 0.5s forwards",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            color: "var(--accent-gold)",
            letterSpacing: "0.08em",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          Article 19
        </span>
      </div>
    </div>
  );
}
