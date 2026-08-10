"use client";

import { useState, useEffect } from "react";

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonateModal({ isOpen, onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(500);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      setTimeout(() => setIsSuccess(false), 300);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const amounts = [100, 500, 1000, 5000];

  const handleDonate = () => {
    setIsSubmitting(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 transition-opacity duration-300" 
        style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(10px)" }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
        style={{
          background: "var(--bg-primary)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Beautiful Header Image Area */}
        <div className="relative h-32 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(212, 160, 74, 0.4), rgba(12, 14, 18, 0.9))",
            }}
          />
          {/* Noise overlay */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
          />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md bg-black/20 transition-all hover:bg-white/20 border border-white/10"
            style={{ color: "white" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative px-6 pb-8 pt-2">
          <div 
            className="absolute -top-10 left-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/10 transition-colors duration-500"
            style={{ 
              background: "linear-gradient(135deg, var(--accent-gold), #A4691B)", 
              color: "#0C0E12" 
            }}
          >
            {isSuccess ? (
              <svg className="w-8 h-8 animate-scale-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
          </div>

          {isSuccess ? (
            <div className="mt-8 mb-4 text-center animate-fade-in-up">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6" style={{ background: "rgba(212, 160, 74, 0.1)" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(212, 160, 74, 0.2)" }}>
                  <svg className="w-8 h-8" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-display font-bold mb-3" style={{ color: "var(--text-primary)" }}>Thank You!</h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                Your generous contribution of <strong>৳{selectedAmount === 'custom' ? customAmount : selectedAmount}</strong> has been received. You are making a real difference in the fight for human rights.
              </p>
              
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,160,74,0.3)] hover:shadow-[0_0_30px_rgba(212,160,74,0.5)] hover:-translate-y-0.5 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
                  color: "#0C0E12",
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-500 group-hover:translate-x-[100%]" />
                <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                  Return to Site
                </span>
              </button>
            </div>
          ) : (
            <>
              <div className="mt-8 mb-6">
                <h2 className="text-2xl font-display font-bold mb-1" style={{ color: "var(--text-primary)" }}>Empower Truth</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Your contribution fuels independent journalism. Stand with Article 19 to protect human rights and media freedom.
                </p>
              </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {amounts.slice(0,3).map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className="py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: selectedAmount === amount ? "rgba(212, 160, 74, 0.15)" : "rgba(255, 255, 255, 0.03)",
                    border: `1px solid ${selectedAmount === amount ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.05)"}`,
                    color: selectedAmount === amount ? "var(--accent-gold)" : "var(--text-primary)",
                  }}
                >
                  {selectedAmount === amount && (
                    <div className="absolute inset-0 bg-[var(--accent-gold)] opacity-10 animate-pulse" />
                  )}
                  ৳{amount}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedAmount(5000)}
                className="py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden"
                style={{
                  background: selectedAmount === 5000 ? "rgba(212, 160, 74, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${selectedAmount === 5000 ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.05)"}`,
                  color: selectedAmount === 5000 ? "var(--accent-gold)" : "var(--text-primary)",
                }}
              >
                {selectedAmount === 5000 && (
                  <div className="absolute inset-0 bg-[var(--accent-gold)] opacity-10 animate-pulse" />
                )}
                ৳5000
              </button>
              <button
                onClick={() => setSelectedAmount("custom")}
                className="py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden"
                style={{
                  background: selectedAmount === "custom" ? "rgba(212, 160, 74, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${selectedAmount === "custom" ? "var(--accent-gold)" : "rgba(255, 255, 255, 0.05)"}`,
                  color: selectedAmount === "custom" ? "var(--accent-gold)" : "var(--text-primary)",
                }}
              >
                {selectedAmount === "custom" && (
                  <div className="absolute inset-0 bg-[var(--accent-gold)] opacity-10 animate-pulse" />
                )}
                Custom
              </button>
            </div>
          </div>

          {selectedAmount === "custom" && (
            <div className="mt-4 animate-fade-in-up">
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg transition-colors" 
                      style={{ color: customAmount ? "var(--accent-gold)" : "var(--text-muted)" }}>৳</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-black/20 pl-10 pr-4 py-4 rounded-xl outline-none transition-all duration-300 focus:bg-black/40 font-bold text-lg"
                  style={{
                    border: `1px solid ${customAmount ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: "var(--text-primary)",
                    boxShadow: customAmount ? "0 0 15px rgba(212, 160, 74, 0.15)" : "none",
                  }}
                />
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleDonate}
              disabled={isSubmitting || (selectedAmount === "custom" && !customAmount)}
              className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,160,74,0.3)] hover:shadow-[0_0_30px_rgba(212,160,74,0.5)] hover:-translate-y-0.5 relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, var(--accent-gold), #C07D20)",
                color: "#0C0E12",
                opacity: (selectedAmount === "custom" && !customAmount) ? 0.5 : 1,
                cursor: (selectedAmount === "custom" && !customAmount) ? "not-allowed" : "pointer"
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-500 group-hover:translate-x-[100%]" />
              <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Proceed with {selectedAmount === 'custom' ? (customAmount ? `৳${customAmount}` : '') : `৳${selectedAmount}`}</>
                )}
              </span>
            </button>
          </div>

          {/* Premium Payment Methods footer */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>Secured by SSLCommerz</div>
            <div className="flex gap-2">
              <div className="w-10 h-6 rounded bg-[#e2136e] flex items-center justify-center shadow-md">
                <span className="text-[8px] font-black text-white tracking-tighter">bKash</span>
              </div>
              <div className="w-10 h-6 rounded bg-[#F7941D] flex items-center justify-center shadow-md">
                <span className="text-[8px] font-black text-white tracking-tighter">NAGAD</span>
              </div>
              <div className="w-10 h-6 rounded bg-gradient-to-br from-[#1A1F71] to-[#00579F] flex items-center justify-center shadow-md relative overflow-hidden">
                <span className="text-[8px] font-black italic text-white z-10">VISA</span>
              </div>
              <div className="w-10 h-6 rounded bg-[#222] flex items-center justify-center shadow-md relative overflow-hidden">
                <div className="absolute w-3 h-3 rounded-full bg-[#EB001B] left-1 opacity-90"></div>
                <div className="absolute w-3 h-3 rounded-full bg-[#F79E1B] right-1 opacity-90"></div>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
