"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Check, Eye, EyeOff, Sparkles } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PRIVACY_URL, TERMS_URL } from "@/config/appConfig";

const REMEMBERED_EMAIL_KEY = "remembered_email";

type SignUpModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignIn?: () => void;
};

export default function SignUpModal({ open, onOpenChange, onSwitchToSignIn }: SignUpModalProps) {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentAccepted) {
      setError("אנא קראו ואשרו קודם את תנאי השימוש ומדיניות הפרטיות");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await signIn("password", { email, password, flow: "signUp" });
      sessionStorage.setItem("tintme_just_logged_in", "1");

      if (rememberMe) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      onOpenChange(false);
    } catch (err: unknown) {
      const caughtError = err as { message?: string };
      const errorMessage = caughtError.message || "";

      if (
        errorMessage.includes("already exists") ||
        errorMessage.includes("AccountAlreadyExists")
      ) {
        setError("כתובת הדואר האלקטרוני כבר רשומה במערכת");
      } else if (errorMessage.includes("password") && errorMessage.includes("weak")) {
        setError("הסיסמה חלשה מדי. אנא בחרו סיסמה חזקה יותר");
      } else if (errorMessage.includes("TooManyRequests")) {
        setError("יותר מדי ניסיונות. אנא נסו שוב מאוחר יותר");
      } else if (errorMessage.includes("invalid") && errorMessage.includes("email")) {
        setError("כתובת הדואר האלקטרוני אינה תקינה");
      } else {
        setError("הרשמה נכשלה. אנא בדקו את הפרטים ונסו שוב");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignIn = () => {
    onOpenChange(false);
    onSwitchToSignIn?.();
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border-0 p-0 sm:max-w-md overflow-hidden shadow-2xl shadow-purple-900/50 rounded-3xl">
        {/* Fluid gradient background — deep violet → magenta → soft rose */}
        <div
          className="relative rounded-3xl p-[1px]"
          style={{
            background: "linear-gradient(135deg, #4c1d95, #7c3aed, #c026d3, #e879a0, #fda4af)",
          }}
        >
          {/* Glassmorphism card */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(76,29,149,0.72) 0%, rgba(124,58,237,0.60) 40%, rgba(192,38,211,0.55) 70%, rgba(253,164,175,0.45) 100%)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
          >
            {/* Ambient glow orbs */}
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-pink-400/25 blur-3xl" />

            <div className="relative z-10 p-8" dir="rtl">
              {/* Header */}
              <DialogHeader className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Sparkles className="h-5 w-5 text-pink-300" />
                  <DialogTitle className="text-center font-bold text-3xl text-white tracking-wide drop-shadow-sm">
                    הרשמה
                  </DialogTitle>
                  <Sparkles className="h-5 w-5 text-pink-300" />
                </div>
                <p className="mt-1 text-center text-white/70 text-sm">
                  צרו חשבון חדש והצטרפו אלינו
                </p>
              </DialogHeader>

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email */}
                <div>
                  <label
                    className="mb-2 block font-medium text-white/85 text-sm"
                    htmlFor="signup-modal-email"
                  >
                    דואר אלקטרוני
                  </label>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-400/80 focus:bg-white/15 hover:bg-white/12"
                    disabled={isLoading}
                    id="signup-modal-email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required={true}
                    type="email"
                    value={email}
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    className="mb-2 block font-medium text-white/85 text-sm"
                    htmlFor="signup-modal-password"
                  >
                    סיסמה
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 pl-12 text-white placeholder-white/40 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-violet-400/80 focus:bg-white/15 hover:bg-white/12"
                      disabled={isLoading}
                      id="signup-modal-password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required={true}
                      type={showPassword ? "text" : "password"}
                      value={password}
                    />
                    <button
                      className="-translate-y-1/2 absolute top-1/2 left-3 text-white/50 transition hover:text-white/90"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      type="button"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-3">
                  <input
                    checked={rememberMe}
                    className="h-4 w-4 cursor-pointer rounded border-white/30 bg-white/10 text-violet-500 focus:ring-violet-400 focus:ring-offset-transparent accent-violet-500"
                    disabled={isLoading}
                    id="signup-remember-me"
                    onChange={(e) => setRememberMe(e.target.checked)}
                    type="checkbox"
                  />
                  <label
                    className="cursor-pointer text-white/80 text-sm"
                    htmlFor="signup-remember-me"
                  >
                    זכור אותי
                  </label>
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-sm">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      checked={consentAccepted}
                      className="sr-only"
                      disabled={isLoading}
                      id="signup-consent"
                      onChange={(e) => setConsentAccepted(e.target.checked)}
                      type="checkbox"
                    />
                    <button
                      className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                        consentAccepted
                          ? "border-pink-400 bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg shadow-pink-500/40"
                          : "border-white/30 bg-white/10 hover:border-white/50"
                      } ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      disabled={isLoading}
                      onClick={() => setConsentAccepted(!consentAccepted)}
                      type="button"
                    >
                      {consentAccepted && <Check className="h-3 w-3 text-white" />}
                    </button>
                  </div>
                  <label
                    className="flex-1 cursor-pointer text-white/80 text-sm leading-relaxed"
                    htmlFor="signup-consent"
                  >
                    אני מסכימה ל
                    <Link
                      className="mx-1 font-semibold text-pink-300 underline decoration-pink-300/40 underline-offset-2 hover:text-white transition-colors"
                      href={TERMS_URL}
                      onClick={(e) => e.stopPropagation()}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      תנאי השימוש
                    </Link>
                    ול
                    <Link
                      className="mr-1 font-semibold text-pink-300 underline decoration-pink-300/40 underline-offset-2 hover:text-white transition-colors"
                      href={PRIVACY_URL}
                      onClick={(e) => e.stopPropagation()}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      מדיניות הפרטיות
                    </Link>
                  </label>
                </div>

                {/* Error message */}
                {error && (
                  <div className="rounded-xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-red-200 text-sm backdrop-blur-sm">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  className="relative w-full overflow-hidden rounded-xl px-4 py-3.5 font-semibold text-white text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400/60 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 group"
                  disabled={isLoading || !consentAccepted}
                  style={{
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #e879a0 100%)",
                    boxShadow: consentAccepted
                      ? "0 8px 32px rgba(192,38,211,0.45), 0 2px 8px rgba(124,58,237,0.3)"
                      : "none",
                  }}
                  type="submit"
                >
                  {/* Shimmer overlay on hover */}
                  <span className="pointer-events-none absolute inset-0 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>יוצרת חשבון...</span>
                    </div>
                  ) : (
                    "צרי חשבון"
                  )}
                </button>
              </form>

              {/* Switch to sign-in */}
              <p className="mt-6 text-center text-white/60 text-sm">
                כבר יש לכם חשבון?{" "}
                <button
                  className="font-semibold text-pink-300 transition hover:text-white underline decoration-pink-300/40 underline-offset-2"
                  onClick={handleSwitchToSignIn}
                  type="button"
                >
                  התחברו כאן
                </button>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
