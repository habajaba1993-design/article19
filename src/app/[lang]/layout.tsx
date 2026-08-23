import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IntroVideo from "@/components/ui/IntroVideo";
import { getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { LangProvider } from "@/lib/LangContext";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
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
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale: lang === "bn" ? "bn_BD" : "en_US",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <LangProvider lang={lang as Locale} dict={dict}>
      <IntroVideo />
      <Navbar />
      <main className="flex-1 page-enter relative z-10">{children}</main>
      <Footer />
    </LangProvider>
  );
}
