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

  const getDisplayAmount = () => {
    if (selectedAmount === "custom") return customAmount ? `৳${customAmount}` : "";
    return `৳${selectedAmount}`;
  };

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
        className="relative w-full max-w-[440px] overflow-hidden animate-scale-in"
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
        {/* ── Top Ambient Glow ── */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[160px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(212, 160, 74, 0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* ── Close Button ── */}
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

        {/* ── Content ── */}
        <div className="relative px-8 pt-10 pb-8">

          {isSuccess ? (
            /* ═══ SUCCESS STATE ═══ */
            <div className="text-center animate-fade-in-up py-4">
              {/* Success ring animation */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "rgba(212, 160, 74, 0.1)", animationDuration: "2s" }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(212, 160, 74, 0.06)", border: "1px solid rgba(212, 160, 74, 0.15)" }}
                />
                <div
                  className="absolute inset-3 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(212, 160, 74, 0.15), rgba(212, 160, 74, 0.05))" }}
                >
                  <svg className="w-10 h-10 animate-scale-in" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-display mb-3" style={{ color: "var(--text-primary)" }}>Thank You</h2>
              <p className="text-sm leading-relaxed mb-8 max-w-[280px] mx-auto" style={{ color: "var(--text-secondary)" }}>
                Your generous contribution of <strong style={{ color: "var(--accent-gold)" }}>{getDisplayAmount()}</strong> helps protect human rights and media freedom.
              </p>

              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, var(--accent-gold), #B8862D)",
                  color: "#0C0E12",
                  boxShadow: "0 8px 32px rgba(212, 160, 74, 0.25)",
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                <span className="relative z-10">Continue Browsing</span>
              </button>
            </div>
          ) : (
            <>
              {/* ═══ DONATION FORM ═══ */}

              {/* Header */}
              <div className="text-center mb-8">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
                  style={{
                    background: "linear-gradient(135deg, rgba(212, 160, 74, 0.12), rgba(212, 160, 74, 0.04))",
                    border: "1px solid rgba(212, 160, 74, 0.15)",
                    boxShadow: "0 8px 24px rgba(212, 160, 74, 0.08)",
                  }}
                >
                  <svg className="w-6 h-6" style={{ color: "var(--accent-gold)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>

                <h2 className="text-[22px] font-display mb-2" style={{ color: "var(--text-primary)" }}>
                  Empower Truth
                </h2>
                <p className="text-[13px] leading-relaxed max-w-[300px] mx-auto" style={{ color: "var(--text-secondary)" }}>
                  Your contribution fuels independent journalism and protects human rights worldwide.
                </p>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--text-muted)" }}>
                  Select Amount
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className="relative py-3.5 rounded-xl font-semibold text-[14px] transition-all duration-300 overflow-hidden"
                      style={{
                        background: selectedAmount === amount
                          ? "linear-gradient(135deg, rgba(212, 160, 74, 0.18), rgba(212, 160, 74, 0.08))"
                          : "rgba(255, 255, 255, 0.03)",
                        border: `1.5px solid ${selectedAmount === amount ? "rgba(212, 160, 74, 0.5)" : "rgba(255, 255, 255, 0.06)"}`,
                        color: selectedAmount === amount ? "var(--accent-gold)" : "var(--text-primary)",
                        boxShadow: selectedAmount === amount ? "0 4px 20px rgba(212, 160, 74, 0.12), inset 0 1px 0 rgba(212, 160, 74, 0.1)" : "none",
                        transform: selectedAmount === amount ? "translateY(-1px)" : "none",
                      }}
                    >
                      {selectedAmount === amount && (
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)" }}
                        />
                      )}
                      ৳{amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Custom amount button */}
                <button
                  onClick={() => setSelectedAmount("custom")}
                  className="w-full mt-2 py-3.5 rounded-xl font-semibold text-[13px] transition-all duration-300 relative overflow-hidden"
                  style={{
                    background: selectedAmount === "custom"
                      ? "linear-gradient(135deg, rgba(212, 160, 74, 0.18), rgba(212, 160, 74, 0.08))"
                      : "rgba(255, 255, 255, 0.03)",
                    border: `1.5px solid ${selectedAmount === "custom" ? "rgba(212, 160, 74, 0.5)" : "rgba(255, 255, 255, 0.06)"}`,
                    color: selectedAmount === "custom" ? "var(--accent-gold)" : "var(--text-secondary)",
                  }}
                >
                  {selectedAmount === "custom" && (
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: "linear-gradient(90deg, transparent, var(--accent-gold), transparent)" }}
                    />
                  )}
                  Enter Custom Amount
                </button>
              </div>

              {/* Custom Amount Input */}
              {selectedAmount === "custom" && (
                <div className="mb-6 animate-fade-in-up">
                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg transition-colors"
                      style={{ color: customAmount ? "var(--accent-gold)" : "var(--text-muted)" }}
                    >
                      ৳
                    </span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 rounded-xl outline-none transition-all duration-300 font-semibold text-lg"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: `1.5px solid ${customAmount ? "rgba(212, 160, 74, 0.5)" : "rgba(255, 255, 255, 0.08)"}`,
                        color: "var(--text-primary)",
                        boxShadow: customAmount ? "0 0 20px rgba(212, 160, 74, 0.08)" : "none",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Proceed Button */}
              <button
                onClick={handleDonate}
                disabled={isSubmitting || (selectedAmount === "custom" && !customAmount)}
                className="w-full py-4 rounded-2xl font-bold text-[15px] transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: (selectedAmount === "custom" && !customAmount)
                    ? "rgba(255,255,255,0.05)"
                    : "linear-gradient(135deg, var(--accent-gold), #B8862D)",
                  color: (selectedAmount === "custom" && !customAmount) ? "var(--text-muted)" : "#0C0E12",
                  boxShadow: (selectedAmount === "custom" && !customAmount)
                    ? "none"
                    : "0 8px 32px rgba(212, 160, 74, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
                  cursor: (selectedAmount === "custom" && !customAmount) ? "not-allowed" : "pointer",
                }}
              >
                {!(selectedAmount === "custom" && !customAmount) && (
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]" />
                )}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Proceed with {getDisplayAmount()}</>
                  )}
                </span>
              </button>

              {/* ── Divider ── */}
              <div className="mt-7 mb-5 flex items-center gap-4">
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
                  Secured by SSLCommerz
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              </div>

              {/* Payment Methods */}
              <div className="flex items-center justify-center gap-3">
                {/* bKash */}
                <div
                  className="h-7 px-3 rounded-md flex items-center justify-center transition-opacity hover:opacity-100"
                  style={{ background: "rgba(226, 19, 110, 0.12)", border: "1px solid rgba(226, 19, 110, 0.2)", opacity: 0.7 }}
                >
                  <span className="text-[9px] font-extrabold" style={{ color: "#e2136e" }}>bKash</span>
                </div>
                {/* Nagad */}
                <div
                  className="h-7 px-3 rounded-md flex items-center justify-center transition-opacity hover:opacity-100"
                  style={{ background: "rgba(247, 148, 29, 0.1)", border: "1px solid rgba(247, 148, 29, 0.2)", opacity: 0.7 }}
                >
                  <span className="text-[9px] font-extrabold" style={{ color: "#F7941D" }}>Nagad</span>
                </div>
                {/* Visa */}
                <div
                  className="h-7 px-3 rounded-md flex items-center justify-center transition-opacity hover:opacity-100"
                  style={{ background: "rgba(26, 31, 113, 0.15)", border: "1px solid rgba(26, 31, 113, 0.3)", opacity: 0.7 }}
                >
                  <span className="text-[9px] font-black italic" style={{ color: "#7B83C9" }}>VISA</span>
                </div>
                {/* Mastercard */}
                <div
                  className="h-7 px-4 rounded-md flex items-center justify-center gap-1 transition-opacity hover:opacity-100"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", opacity: 0.7 }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ background: "#EB001B", opacity: 0.8 }} />
                  <div className="w-3 h-3 rounded-full -ml-1.5" style={{ background: "#F79E1B", opacity: 0.8 }} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
