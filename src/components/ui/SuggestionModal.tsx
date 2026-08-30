"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuggestionModal({ isOpen, onClose }: SuggestionModalProps) {
  const { dict } = useLang();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      setTimeout(() => setStatus("idle"), 300);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onClose();
        setTimeout(() => setStatus("idle"), 300);
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "rgba(0, 0, 0, 0.75)", backdropFilter: "blur(16px)" }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-[480px] overflow-hidden animate-scale-in"
        style={{
          borderRadius: "24px",
          background: "linear-gradient(180deg, #16181F 0%, #0E1016 100%)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: `
            0 0 0 1px rgba(212, 160, 74, 0.08),
            0 25px 80px -12px rgba(0, 0, 0, 0.9),
            0 0 60px -20px rgba(212, 160, 74, 0.15)
          `,
        }}
      >
        {/* Ambient Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[160px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(212, 160, 74, 0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-90"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "var(--text-muted)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative px-8 pt-10 pb-10">
          {status === "success" ? (
            <div className="text-center animate-fade-in-up py-6">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(212, 160, 74, 0.1)", animationDuration: "2s" }} />
                <div className="absolute inset-0 rounded-full" style={{ background: "rgba(212, 160, 74, 0.06)", border: "1px solid rgba(212, 160, 74, 0.15)" }} />
                <div className="absolute inset-3 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(212, 160, 74, 0.15), rgba(212, 160, 74, 0.05))" }}>
                  <svg className="w-10 h-10 animate-scale-in" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-display mb-3" style={{ color: "var(--text-primary)" }}>Thank You!</h2>
              <p className="text-sm leading-relaxed mb-0" style={{ color: "var(--text-secondary)" }}>
                We've received your suggestion and our team will look into it.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(212, 160, 74, 0.12), rgba(212, 160, 74, 0.04))",
                    border: "1px solid rgba(212, 160, 74, 0.15)",
                    boxShadow: "0 8px 24px rgba(212, 160, 74, 0.08)",
                  }}
                >
                  <svg className="w-6 h-6" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-[22px] font-display mb-2" style={{ color: "var(--text-primary)" }}>
                  Suggest a Topic
                </h2>
                <p className="text-[13px] leading-relaxed max-w-[300px] mx-auto" style={{ color: "var(--text-secondary)" }}>
                  Have a great idea? Tell us what videos or articles we should make next.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all border border-white/5 bg-white/5 text-white focus:bg-[rgba(212,160,74,0.08)] focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]"
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all border border-white/5 bg-white/5 text-white focus:bg-[rgba(212,160,74,0.08)] focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]"
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  required
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all border border-white/5 bg-white/5 text-white focus:bg-[rgba(212,160,74,0.08)] focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]"
                />
                <textarea 
                  name="message"
                  placeholder="What should we cover next?" 
                  required
                  rows={3}
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all border border-white/5 bg-white/5 text-white resize-none focus:bg-[rgba(212,160,74,0.08)] focus:border-[var(--accent-gold)] focus:ring-1 focus:ring-[var(--accent-gold)]"
                />
                
                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full mt-2 py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-gold), #B8862D)",
                    color: "#0C0E12",
                    boxShadow: "0 8px 32px rgba(212, 160, 74, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)"
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Submit Suggestion"
                    )}
                  </span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
