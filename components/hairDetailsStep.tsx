"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface HairAnswers {
  grayPercentage: string;
  bleaching: string;
  condition: string;
  hairLength: string;
}

interface Props {
  onComplete: (data: HairAnswers) => void;
  language?: "he" | "ar";
}

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  he: {
    title: "אבחון שיער מקצועי",
    subtitle: "4 שאלות קצרות להתאמת הפורמולה המושלמת עבורך",
    back: "הקודם",
    finish: "שמרי וחשבי נוסחה",
    font: "var(--font-rubik), Arial, sans-serif",
    questions: [
      {
        id: "grayPercentage" as const,
        emoji: "🩶",
        title: "כמה אחוז שיבה יש בשיערך?",
        options: [
          { label: "ללא שיבה (0%)",      sub: "שיער ללא שיבה כלל",              value: "0"   },
          { label: "עד 30% שיבה",        sub: "מעט שיבה, בעיקר בצדעיים",       value: "30"  },
          { label: "30%–50% שיבה",       sub: "שיבה בולטת במספר אזורים",       value: "50"  },
          { label: "מעל 50% שיבה",       sub: "שיבה נרחבת ברחבי הראש",         value: "100" },
        ],
      },
      {
        id: "bleaching" as const,
        emoji: "⚡",
        title: "מתי השיער שלך עבר הבהרה (בלונדינציה)?",
        options: [
          { label: "מעולם לא עבר הבהרה",       sub: "שיער ורג'ין – ללא כימיקלים",   value: "never"      },
          { label: "בחודשים האחרונים",           sub: "פחות מ-6 חודשים",              value: "recent"     },
          { label: "לפני חצי שנה ומעלה",        sub: "6 חודשים עד שנה ומעלה",       value: "months_ago" },
        ],
      },
      {
        id: "condition" as const,
        emoji: "✨",
        title: "מהו מצב השיער הנוכחי שלך?",
        options: [
          { label: "שיער טבעי ובריא",            sub: "ללא צביעה, חזק ומבריק",              value: "natural" },
          { label: "שיער רגיל / צבוע",           sub: "עבר צביעה, במצב סביר",              value: "normal"  },
          { label: "שיער פגום / יבש",            sub: "יבש, שביר, עבר עיבודים כימיים",     value: "damaged" },
        ],
      },
      {
        id: "hairLength" as const,
        emoji: "📏",
        title: "מהו אורך השיער הנוכחי שלך?",
        options: [
          {
            label: "קצר עד בינוני (רגיל)",
            sub: "עד גובה הכתפיים – כמויות רגילות",
            value: "short_normal",
          },
          {
            label: "ארוך (מעבר לכתפיים)",
            sub: "מתחת לכתפיים – הכמויות יוכפלו אוטומטית",
            value: "long",
          },
        ],
      },
    ],
  },
  ar: {
    title: "تشخيص الشعر المهني",
    subtitle: "4 أسئلة سريعة لتحديد التركيبة المثالية لكِ",
    back: "السابق",
    finish: "احفظي واحسبي التركيبة",
    font: "var(--font-cairo), Arial, sans-serif",
    questions: [
      {
        id: "grayPercentage" as const,
        emoji: "🩶",
        title: "ما هي نسبة الشيب في شعركِ؟",
        options: [
          { label: "لا يوجد شيب (0%)",     sub: "شعر بدون شيب على الإطلاق",         value: "0"   },
          { label: "حتى 30% شيب",          sub: "شيب خفيف، خاصة عند الصدغين",      value: "30"  },
          { label: "30%–50% شيب",          sub: "شيب واضح في مناطق متعددة",         value: "50"  },
          { label: "أكثر من 50% شيب",      sub: "شيب واسع النطاق في الرأس",         value: "100" },
        ],
      },
      {
        id: "bleaching" as const,
        emoji: "⚡",
        title: "متى خضع شعركِ للتفتيح؟",
        options: [
          { label: "لم يخضع للتفتيح أبداً",  sub: "شعر عذري – بدون مواد كيميائية",  value: "never"      },
          { label: "في الأشهر الأخيرة",       sub: "أقل من 6 أشهر",                  value: "recent"     },
          { label: "قبل نصف سنة أو أكثر",     sub: "من 6 أشهر إلى سنة أو أكثر",     value: "months_ago" },
        ],
      },
      {
        id: "condition" as const,
        emoji: "✨",
        title: "ما هي حالة شعركِ الحالية؟",
        options: [
          { label: "شعر طبيعي وصحي",          sub: "بدون صبغ، قوي ولامع",                    value: "natural" },
          { label: "شعر عادي / مصبوغ",         sub: "تم صبغه، في حالة جيدة",                  value: "normal"  },
          { label: "شعر تالف / جاف",           sub: "جاف، هش، خضع لمعالجات كيميائية",         value: "damaged" },
        ],
      },
      {
        id: "hairLength" as const,
        emoji: "📏",
        title: "ما هو طول شعركِ الحالي؟",
        options: [
          {
            label: "قصير إلى متوسط (عادي)",
            sub: "حتى مستوى الكتفين – كميات عادية",
            value: "short_normal",
          },
          {
            label: "طويل (تحت الأكتاف)",
            sub: "أسفل الكتفين – ستُضاعَف الكميات تلقائياً",
            value: "long",
          },
        ],
      },
    ],
  },
} as const;

type Lang = keyof typeof T;

// ─── Component ────────────────────────────────────────────────────────────────
export default function HairDetailsStep({ onComplete, language = "he" }: Props) {
  const lang = (language as Lang) in T ? (language as Lang) : "he";
  const t    = T[lang];

  const [step, setStep]               = useState(0);
  const [visible, setVisible]         = useState(true);
  const [answers, setAnswers]         = useState<HairAnswers>({
    grayPercentage: "",
    bleaching: "",
    condition: "",
    hairLength: "",
  });
  const [pendingStep, setPendingStep] = useState<number | null>(null);

  const totalSteps = t.questions.length; // 4
  const q          = t.questions[step];

  // ── Animate step transition ────────────────────────────────────────────────
  useEffect(() => {
    if (pendingStep === null) return;
    const tid = setTimeout(() => {
      setStep(pendingStep);
      setPendingStep(null);
      setTimeout(() => setVisible(true), 20);
    }, 260);
    return () => clearTimeout(tid);
  }, [pendingStep]);

  function goTo(next: number) {
    setVisible(false);
    setPendingStep(next);
  }

  // ── Option selection ───────────────────────────────────────────────────────
  function handleSelect(value: string) {
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);
    if (step < totalSteps - 1) {
      setTimeout(() => goTo(step + 1), 320);
    }
  }

  function handleBack() {
    if (step > 0) goTo(step - 1);
  }

  function handleFinish() {
    if (answers.grayPercentage && answers.bleaching && answers.condition && answers.hairLength) {
      onComplete(answers);
    }
  }

  const allDone = !!(answers.grayPercentage && answers.bleaching && answers.condition && answers.hairLength);

  return (
    <div
      dir="rtl"
      className="w-full max-w-lg mx-auto"
      style={{ fontFamily: t.font }}
    >
      {/* ── Glassmorphism card ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/8 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-8">

        {/* Glow orbs inside the card */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative z-10">

          {/* ── 4-step story progress bar ──────────────────────────────────── */}
          <div className="mb-7 flex gap-1.5">
            {t.questions.map((_, idx) => (
              <div key={idx} className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/12">
                <div
                  className={cn(
                    "absolute inset-y-0 right-0 rounded-full transition-all duration-500",
                    idx < step
                      ? "left-0 bg-gradient-to-l from-fuchsia-400 to-violet-500"
                      : idx === step
                        ? "left-0 bg-gradient-to-l from-fuchsia-400 to-violet-500 animate-pulse"
                        : "left-full bg-white/0",
                  )}
                />
              </div>
            ))}
          </div>

          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="mb-7 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/30 to-violet-600/30 border border-fuchsia-400/25 text-lg shadow-inner">
                {q.emoji}
              </div>
              <Sparkles className="h-4 w-4 text-fuchsia-400/70" />
            </div>
            <h2 className="bg-gradient-to-l from-fuchsia-200 via-white to-violet-200 bg-clip-text text-xl font-black text-transparent">
              {t.title}
            </h2>
            <p className="mt-1 text-xs text-white/45">{t.subtitle}</p>
          </div>

          {/* ── Question + options ────────────────────────────────────────── */}
          <div
            className={cn(
              "transition-all duration-260",
              visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
            )}
          >
            {/* Step counter */}
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-xs font-semibold text-fuchsia-300 border border-fuchsia-400/20">
                {step + 1} / {totalSteps}
              </div>
              {/* Long-hair hint on step 4 */}
              {step === 3 && (
                <span className="text-[10px] text-white/30 text-left">
                  {lang === "he" ? "שיער ארוך = כמויות מוכפלות" : "الشعر الطويل = كميات مضاعفة"}
                </span>
              )}
            </div>

            {/* Question title */}
            <h3 className="mb-5 text-right text-base font-bold leading-snug text-white sm:text-lg">
              {q.title}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.value;
                const isLongOption = opt.value === "long";
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "group w-full rounded-2xl border px-4 py-3.5 text-right transition-all duration-300 focus:outline-none",
                      isSelected
                        ? isLongOption
                          ? "border-amber-400/60 bg-gradient-to-l from-amber-600/20 to-orange-600/20 shadow-[0_0_20px_2px_rgba(251,191,36,0.15)] scale-[1.015]"
                          : "border-fuchsia-400/70 bg-gradient-to-l from-fuchsia-600/25 to-violet-600/25 shadow-[0_0_20px_2px_rgba(232,121,249,0.18)] scale-[1.015]"
                        : "border-white/10 bg-white/5 hover:border-white/22 hover:bg-white/10 hover:scale-[1.01]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            "text-sm font-semibold leading-snug transition-colors",
                            isSelected
                              ? isLongOption ? "text-amber-200" : "text-white"
                              : "text-white/85",
                          )}>
                            {opt.label}
                          </p>
                          {isLongOption && (
                            <span className="shrink-0 rounded-full border border-amber-400/40 bg-amber-500/15 px-2 py-0.5 text-[9px] font-bold text-amber-300 uppercase tracking-wider">
                              ×2
                            </span>
                          )}
                        </div>
                        <p className={cn(
                          "mt-0.5 text-xs leading-snug transition-colors",
                          isSelected
                            ? isLongOption ? "text-amber-300/60" : "text-fuchsia-200/70"
                            : "text-white/38",
                        )}>
                          {opt.sub}
                        </p>
                      </div>

                      {/* Selection indicator */}
                      <div className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                        isSelected
                          ? isLongOption
                            ? "border-amber-400 bg-amber-400 scale-110"
                            : "border-fuchsia-400 bg-fuchsia-400 scale-110"
                          : "border-white/20 bg-transparent group-hover:border-white/40",
                      )}>
                        {isSelected && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Navigation ───────────────────────────────────────────────── */}
          <div className="mt-7 flex items-center justify-between border-t border-white/8 pt-5">
            {/* Back button */}
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className={cn(
                "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                step === 0
                  ? "cursor-not-allowed text-white/20"
                  : "text-white/60 hover:bg-white/8 hover:text-white",
              )}
            >
              <ChevronRight className="h-4 w-4" />
              {t.back}
            </button>

            {/* Finish button — only on last step */}
            {step === totalSteps - 1 && (
              <button
                type="button"
                onClick={handleFinish}
                disabled={!allDone}
                className={cn(
                  "group relative overflow-hidden rounded-2xl px-6 py-2.5 text-sm font-bold text-white transition-all duration-300",
                  allDone
                    ? "bg-gradient-to-l from-[#7b2ff7] via-[#d4148c] to-[#f72585] shadow-xl shadow-fuchsia-900/40 hover:scale-[1.03] hover:shadow-fuchsia-700/50 active:scale-[0.97]"
                    : "cursor-not-allowed bg-white/8 text-white/30",
                )}
              >
                {allDone && (
                  <span className="pointer-events-none absolute inset-0 translate-x-full bg-gradient-to-l from-white/15 via-transparent to-transparent transition-transform duration-500 group-hover:translate-x-0" />
                )}
                <span className="relative flex items-center gap-2">
                  <Sparkles className={cn("h-4 w-4", allDone ? "text-yellow-200" : "text-white/25")} />
                  {t.finish}
                </span>
              </button>
            )}

            {/* Dots indicator on non-last steps */}
            {step < totalSteps - 1 && (
              <div className="flex gap-1.5">
                {t.questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      idx === step
                        ? "h-2 w-4 bg-fuchsia-400"
                        : idx < step
                          ? "h-2 w-2 bg-fuchsia-400/50"
                          : "h-2 w-2 bg-white/15",
                    )}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
