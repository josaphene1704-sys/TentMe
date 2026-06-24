"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const REMEMBERED_EMAIL_KEY = "remembered_email";

type SignInModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignUp?: () => void;
};

// קומפוננטת מודל התחברות
export default function SignInModal({ open, onOpenChange, onSwitchToSignUp }: SignInModalProps) {
  const { signIn } = useAuthActions(); // פעולת התחברות
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // זכור אותי
  const [showPassword, setShowPassword] = useState(false); // הצגת סיסמה

  // טעינת אימייל שמור בעת טעינת הקומפוננטה
  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      // ביצוע התחברות
      await signIn("password", { email, password, flow: "signIn" });
      sessionStorage.setItem("tintme_just_logged_in", "1");

      // שמירה או מחיקה של האימייל מה-LocalStorage
      if (rememberMe) {
        localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
      } else {
        localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      onOpenChange(false); // סגירת המודל
    } catch (err: unknown) {
      const caughtError = err as { message?: string };
      const errorMessage = caughtError.message || "";

      // מיפוי שגיאות Convex Auth להודעות בעברית
      if (errorMessage.includes("InvalidSecret")) {
        setError("הסיסמה שהוזנה שגויה");
      } else if (
        errorMessage.includes("InvalidAccountId") ||
        errorMessage.includes("Could not find")
      ) {
        setError("לא נמצא חשבון עם כתובת הדואר האלקטרוני הזו");
      } else if (errorMessage.includes("TooManyRequests")) {
        setError("יותר מדי ניסיונות התחברות. אנא נסו שוב מאוחר יותר");
      } else {
        setError("התחברות נכשלה. אנא בדקו את הפרטים ונסו שוב");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="border-gray-700 bg-linear-to-br from-gray-900 via-gray-800 to-black p-0 sm:max-w-md">
        <div className="rounded-2xl bg-gray-800/50 p-8 backdrop-blur-sm" dir="rtl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-center font-bold text-3xl text-white">התחברות</DialogTitle>
            <p className="mt-2 text-center text-gray-400">ברוכים השבים! אנא התחברו לחשבונכם</p>
          </DialogHeader>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block font-medium text-gray-300 text-sm" htmlFor="modal-email">
                דואר אלקטרוני
              </label>
              <input
                className="w-full rounded-lg border border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
                id="modal-email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required={true}
                type="email"
                value={email}
              />
            </div>

            <div>
              <label
                className="mb-2 block font-medium text-gray-300 text-sm"
                htmlFor="modal-password"
              >
                סיסמה
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-gray-600 bg-gray-900/50 px-4 py-3 pl-12 text-white placeholder-gray-500 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={isLoading}
                  id="modal-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required={true}
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  className="-translate-y-1/2 absolute top-1/2 left-3 text-gray-400 transition hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  type="button"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* תיבת סימון זכור אותי */}
            <div className="flex items-center gap-3">
              <input
                checked={rememberMe}
                className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-900/50 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-800"
                disabled={isLoading}
                id="remember-me"
                onChange={(e) => setRememberMe(e.target.checked)}
                type="checkbox"
              />
              <label className="cursor-pointer text-gray-300 text-sm" htmlFor="remember-me">
                זכור אותי
              </label>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              className="w-full rounded-lg bg-linear-to-r from-orange-500 to-red-600 px-4 py-3 font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>מתחבר...</span>
                </div>
              ) : (
                "התחבר"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            עדיין אין לכם חשבון?{" "}
            <button
              className="font-semibold text-orange-500 transition hover:text-orange-400"
              onClick={() => {
                onOpenChange(false);
                onSwitchToSignUp?.();
              }}
              type="button"
            >
              הירשמו כאן
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
