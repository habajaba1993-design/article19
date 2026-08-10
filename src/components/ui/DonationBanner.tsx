"use client";

import { useState } from "react";
import DonateModal from "./DonateModal";

export default function DonationBanner() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  return (
    <>
      <div 
        className="relative w-full rounded-2xl overflow-hidden mt-12 mb-4 animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, rgba(18, 20, 26, 0.95), rgba(12, 14, 18, 0.98))",
          border: "1px solid rgba(212, 160, 74, 0.2)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)"
        }}
      >
        {/* Glow Effect */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20 mix-blend-screen"
          style={{ 
            background: "radial-gradient(circle at right, var(--accent-gold), transparent 70%)",
            filter: "blur(40px)"
          }}
        />

        <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-display font-bold mb-2" style={{ color: "var(--text-primary)" }}>
              Support Truth & Human Rights
            </h3>
            <p className="text-sm max-w-xl mx-auto sm:mx-0" style={{ color: "var(--text-secondary)" }}>
              Article 19 relies on reader and viewer contributions to maintain independent, fearless journalism. Help us keep our platform accessible to everyone.
            </p>
          </div>
          
          <div className="shrink-0">
            <button
              onClick={() => setIsDonateOpen(true)}
              className="px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,160,74,0.3)] hover:shadow-[0_0_30px_rgba(212,160,74,0.5)] hover:-translate-y-1 relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
                color: "#0C0E12",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-500 group-hover:translate-x-[100%]" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Donate Now
              </span>
            </button>
          </div>
        </div>
      </div>

      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </>
  );
}
