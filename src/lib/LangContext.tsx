"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./i18n";

// Import the type from the English dictionary (both dicts share the same shape)
type Dictionary = typeof import("./dictionaries/en.json");

interface LangContextValue {
  lang: Locale;
  dict: Dictionary;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  lang,
  dict,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <LangContext.Provider value={{ lang, dict }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}
