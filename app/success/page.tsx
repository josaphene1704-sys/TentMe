// ============================================================================
// דף הצלחה לאחר Checkout
// ============================================================================
// Polar מפנה לכאן לאחר תשלום מוצלח.
//
// הדף מציג:
// - אישור על הצלחת התשלום
// - כפתור לחזרה לאפליקציה
//
// ⚠️ הערה חשובה:
// העדכון האמיתי של סטטוס המשתמש מתבצע דרך ה-Webhook של Convex Polar Component!
// הדף הזה הוא רק לתצוגה - אל תסתמכו עליו לאימות תשלום.

import Link from "next/link";

type SuccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const checkoutIdRaw = params.checkout_id;
  const checkoutId = Array.isArray(checkoutIdRaw) ? checkoutIdRaw[0] : checkoutIdRaw;

  const hasCheckoutId = Boolean(checkoutId);

  // בדיקה האם אנחנו במצב sandbox
  const isSandbox = process.env.POLAR_SERVER === "sandbox";

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 to-black p-8">
      <main className="container mx-auto max-w-2xl" dir="rtl">
        {/* כותרת */}
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="h-10 w-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>

          <h1 className="mb-4 font-bold text-4xl text-white">התשלום הושלם בהצלחה!</h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            תודה! חשבונך ישודרג אוטומטית תוך מספר שניות.
          </p>
        </div>

        {/* באנר Sandbox */}
        {isSandbox ? (
          <div className="mb-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span className="font-medium text-sm text-yellow-200">
                מצב Sandbox - זהו תשלום בדיקה, לא בוצע חיוב אמיתי
              </span>
            </div>
          </div>
        ) : null}

        {/* פרטי Checkout */}
        {hasCheckoutId ? (
          <div className="mb-6 rounded-xl border border-gray-700 bg-gray-800/50 p-6">
            <h2 className="mb-4 font-semibold text-lg text-white">פרטי העסקה</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">מזהה עסקה</span>
                <span className="max-w-[200px] break-all text-left font-mono text-gray-200 text-sm">
                  {checkoutId}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {/* הודעה על עדכון */}
        <div className="mb-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            <div>
              <p className="text-blue-200 text-sm">
                חשבונך יעודכן אוטומטית תוך מספר שניות. אם הגישה לא התעדכנה, נסה לרענן את הדף או לצאת
                ולהיכנס מחדש.
              </p>
            </div>
          </div>
        </div>

        {/* כפתורי פעולה */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-red-600 px-6 py-3 font-semibold text-white transition-all hover:from-orange-600 hover:to-red-700"
            href="/"
          >
            חזרה לדף הבית
          </Link>

          <Link
            className="inline-flex items-center justify-center rounded-xl border border-gray-600 px-6 py-3 font-medium text-gray-300 transition-all hover:bg-gray-800"
            href="/page2"
          >
            לתוכן פרימיום
          </Link>
        </div>
      </main>
    </div>
  );
}
