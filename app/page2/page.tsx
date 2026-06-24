"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Palette } from "lucide-react";
import HairDetailsStep, { type HairAnswers } from "@/components/hairDetailsStep";

type Lang = "he" | "ar";

const T = {
  he: {
    switchLabel: "العربية",
    font: "var(--font-rubik), Arial, sans-serif",
  },
  ar: {
    switchLabel: "עברית",
    font: "var(--font-cairo), Arial, sans-serif",
  },
} as const;

export default function QuestionnairePage() {
  const router          = useRouter();
  const [lang, setLang] = useState<Lang>("he");
  const t               = T[lang];

  function handleComplete(data: HairAnswers) {
    // TODO: pass answers to formula page via query params or state manager
    const params = new URLSearchParams(data as unknown as Record<string, string>);
    router.push(`/page3?${params.toString()}`);
  }

  return (
    <div
      dir="rtl"
      className="relative min-h-screen overflow-hidden"
      style={{ fontFamily: t.font }}
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-[#2d0645] via-[#4a0650] to-[#1a0535]" />
      <div className="pointer-events-none fixed -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-fuchsia-700/25 blur-3xl" />
      <div className="pointer-events-none fixed -left-40 top-[30%] h-[420px] w-[420px] rounded-full bg-violet-800/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-1/3 h-80 w-80 rounded-full bg-rose-600/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-12 pt-4 sm:px-6">

        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-900/40">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-white">TintMe</span>
          </div>
          <button
            type="button"
            onClick={() => setLang((l) => (l === "he" ? "ar" : "he"))}
            className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/85 backdrop-blur-md transition-all hover:bg-white/18 active:scale-95"
          >
            {t.switchLabel}
          </button>
        </div>

        {/* Questionnaire component */}
        <HairDetailsStep
          language={lang}
          onComplete={handleComplete}
        />

      </div>
    </div>
  );
}
