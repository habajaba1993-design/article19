import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer */}
        <ScrollReveal>
          <div className="py-14 flex flex-col lg:flex-row justify-between gap-10 lg:gap-16">
            {/* Brand & Description */}
            <div className="lg:max-w-md">
              <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg shadow-md transition-all duration-300 group-hover:scale-110"
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
              <p className="text-sm leading-relaxed mb-6 lg:mb-0" style={{ color: "var(--text-secondary)" }}>
                Your premium destination for exclusive cinematic experiences, documentaries, and original series. Dive into the world of endless entertainment.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xs font-semibold mb-5 uppercase tracking-[0.15em]" style={{ color: "var(--text-primary)" }}>Information</h3>
              <ul className="space-y-3">
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/advertise">Paid Advertise</FooterLink>
              </ul>
            </div>

            {/* Contact Details & Socials */}
            <div>
              <h3 className="text-xs font-semibold mb-5 uppercase tracking-[0.15em]" style={{ color: "var(--text-primary)" }}>Contact</h3>
              <div className="space-y-3 mb-6">
                <p className="text-sm flex items-center gap-3" style={{ color: "var(--text-secondary)" }}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@article19.com
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <SocialIcon href="#" ariaLabel="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </SocialIcon>
                <SocialIcon href="#" ariaLabel="X (Twitter)">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </SocialIcon>
                <SocialIcon href="#" ariaLabel="Instagram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </SocialIcon>
                <SocialIcon href="#" ariaLabel="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
                </SocialIcon>
                <SocialIcon href="#" ariaLabel="Telegram">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </SocialIcon>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Bar */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Article 19. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="footer-link text-xs" style={{ color: "var(--text-muted)" }}>Privacy Policy</Link>
            <Link href="/terms" className="footer-link text-xs" style={{ color: "var(--text-muted)" }}>Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="footer-link text-sm" style={{ color: "var(--text-secondary)" }}>
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, children, ariaLabel }: { href: string; children: React.ReactNode; ariaLabel: string }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="social-icon-glow w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
      style={{
        background: "var(--bg-primary)",
        border: "1px solid var(--border-subtle)",
        color: "var(--text-secondary)",
      }}
    >
      {children}
    </a>
  );
}
