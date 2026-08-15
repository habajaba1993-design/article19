import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntroVideo from "@/components/ui/IntroVideo";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-primary",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Article 19 | Human Rights Media Platform",
  description:
    "Article 19 is a human rights media platform publishing documentaries, investigative reports, and editorial content on freedom of expression, justice, and human dignity worldwide.",
  keywords: [
    "Article 19",
    "human rights",
    "freedom of expression",
    "documentaries",
    "investigative journalism",
    "press freedom",
    "justice",
    "Bangladesh",
  ],
  openGraph: {
    title: "Article 19 | Human Rights Media Platform",
    description:
      "Documentaries, investigations, and stories that defend human rights and amplify voices for justice.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plusJakarta.variable} ${dmSerif.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <IntroVideo />
        <Navbar />
        <main className="flex-1 page-enter relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
