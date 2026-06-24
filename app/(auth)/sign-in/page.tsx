"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Rubik, Cairo } from "next/font/google";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ─── Fonts ────────────────────────────────────────────────────────────────────
const rubik = Rubik({ subsets: ["hebrew", "latin"], weight: ["400", "500", "600", "700"] });
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"] });

// ─── Translation Dictionary ───────────────────────────────────────────────────
type Lang = "he" | "ar";

const t: Record<Lang, Record<string, string>> = {
  he: {
    tagline: "צביעת שיער חכמה ומדויקת",
    welcome: "ברוכה הבאה",
    subtitle: "התחברי לחשבונך כדי להמשיך",
    emailLabel: "אימייל / טלפון",
    emailPlaceholder: "your@email.com",
    passwordLabel: "סיסמה",
    passwordPlaceholder: "••••••••",
    forgotPassword: "שכחת סיסמה?",
    loginButton: "כניסה",
    loggingIn: "מתחברת...",
    orDivider: "או התחברי עם",
    googleButton: "המשיכי עם Google",
    noAccount: "עדיין אין לך חשבון?",
    signUp: "הירשמי כאן",
    errorInvalidSecret: "הסיסמה שהוזנה שגויה",
    errorNotFound: "לא נמצא חשבון עם כתובת הדוא״ל הזו",
    errorTooMany: "יותר מדי ניסיונות. נסי שוב מאוחר יותר",
    errorGeneral: "הכניסה נכשלה. אנא בדקי את הפרטים ונסי שוב",
  },
  ar: {
    tagline: "صبغ شعر ذكي ودقيق",
    welcome: "أهلاً وسهلاً",
    subtitle: "سجّلي دخولك للمتابعة",
    emailLabel: "البريد الإلكتروني / الهاتف",
    emailPlaceholder: "your@email.com",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "••••••••",
    forgotPassword: "نسيت كلمة المرور؟",
    loginButton: "دخول",
    loggingIn: "جارٍ الدخول...",
    orDivider: "أو تابعي مع",
    googleButton: "المتابعة مع Google",
    noAccount: "ليس لديك حساب بعد؟",
    signUp: "سجّلي هنا",
    errorInvalidSecret: "كلمة المرور غير صحيحة",
    errorNotFound: "لم يُعثر على حساب بهذا البريد الإلكتروني",
    errorTooMany: "محاولات كثيرة جداً. يرجى المحاولة لاحقاً",
    errorGeneral: "فشل تسجيل الدخول. يرجى التحقق من البيانات والمحاولة مجدداً",
  },
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function SignInPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();

  const [currentLang, setCurrentLang] = useState<Lang>("he");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Inherit language from welcome screen selection (stored in localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("tintme_lang") as Lang | null;
    if (stored === "he" || stored === "ar") setCurrentLang(stored);
  }, []);

  const tx = t[currentLang];
  const fontClass = currentLang === "ar" ? cairo.className : rubik.className;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signIn("password", { email, password, flow: "signIn" });
      sessionStorage.setItem("tintme_just_logged_in", "1");
      router.push("/page1");
    } catch (err: unknown) {
      const msg = (err as { message?: string }).message ?? "";
      if (msg.includes("InvalidSecret")) setError(tx.errorInvalidSecret);
      else if (msg.includes("InvalidAccountId") || msg.includes("Could not find"))
        setError(tx.errorNotFound);
      else if (msg.includes("TooManyRequests")) setError(tx.errorTooMany);
      else setError(tx.errorGeneral);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      sessionStorage.setItem("tintme_just_logged_in", "1");
      await signIn("google");
    } catch {
      sessionStorage.removeItem("tintme_just_logged_in");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className={`${fontClass} relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12`}
    >
      {/* ── Gradient Background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#7c3aed_0%,_#db2777_40%,_#f43f5e_70%,_#fb7185_100%)]" />

      {/* Soft animated blobs for depth */}
      <div className="absolute top-[-10%] right-[-5%] h-96 w-96 rounded-full bg-violet-600/40 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] h-80 w-80 rounded-full bg-rose-500/30 blur-3xl animate-pulse [animation-delay:1.5s]" />
      <div className="absolute top-1/2 left-1/3 h-64 w-64 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse [animation-delay:3s]" />

      {/* Language toggle (top corner) */}
      <button
        type="button"
        onClick={() => {
          const next: Lang = currentLang === "he" ? "ar" : "he";
          setCurrentLang(next);
          localStorage.setItem("tintme_lang", next);
        }}
        className="absolute top-5 left-5 z-20 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
      >
        {currentLang === "he" ? "العربية" : "עברית"}
      </button>

      {/* ── Glassmorphism Card ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow halo behind card */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-violet-400/50 via-fuchsia-400/30 to-rose-400/50 blur-xl" />

        <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
          {/* Branding */}
          <div className="mb-8 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-fuchsia-300" />
              <span className="bg-gradient-to-l from-fuchsia-200 to-white bg-clip-text font-bold text-4xl text-transparent tracking-wide">
                TintMe
              </span>
              <Sparkles className="h-6 w-6 text-rose-300" />
            </div>
            <p className="text-sm text-white/60 tracking-wider">{tx.tagline}</p>
            <div className="mx-auto mt-5 h-px w-16 bg-gradient-to-l from-transparent via-white/40 to-transparent" />
            <h1 className="mt-5 font-bold text-2xl text-white">{tx.welcome}</h1>
            <p className="mt-1 text-sm text-white/60">{tx.subtitle}</p>
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email / Phone */}
            <div className="group">
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-white/80"
              >
                {tx.emailLabel}
              </label>
              <input
                id="email"
                type="text"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tx.emailPlaceholder}
                disabled={isLoading}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/30 backdrop-blur-sm transition-all duration-200 outline-none focus:border-fuchsia-400/80 focus:bg-white/15 focus:ring-2 focus:ring-fuchsia-400/30 disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-white/80">
                  {tx.passwordLabel}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-fuchsia-300 transition hover:text-white"
                >
                  {tx.forgotPassword}
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tx.passwordPlaceholder}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pl-12 text-white placeholder-white/30 backdrop-blur-sm transition-all duration-200 outline-none focus:border-fuchsia-400/80 focus:bg-white/15 focus:ring-2 focus:ring-fuchsia-400/30 disabled:opacity-50"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 left-3.5 -translate-y-1/2 text-white/40 transition hover:text-white/80"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl px-4 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-fuchsia-500/40 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {/* Button gradient */}
              <div className="absolute inset-0 bg-gradient-to-l from-violet-600 via-fuchsia-600 to-rose-500 transition-all duration-300 group-hover:from-violet-500 group-hover:via-fuchsia-500 group-hover:to-rose-400" />
              {/* Shimmer */}
              <div className="absolute inset-0 translate-x-full bg-gradient-to-l from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[-100%]" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {tx.loggingIn}
                  </>
                ) : (
                  tx.loginButton
                )}
              </span>
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/15" />
            <span className="text-xs text-white/40">{tx.orDivider}</span>
            <div className="h-px flex-1 bg-white/15" />
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isGoogleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGoogleLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              /* Google "G" SVG */
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span>{tx.googleButton}</span>
          </button>

          {/* Sign up link */}
          <p className="mt-7 text-center text-sm text-white/50">
            {tx.noAccount}{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-fuchsia-300 transition hover:text-white"
            >
              {tx.signUp}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
