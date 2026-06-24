import Link from "next/link";

// ============================================================================
// רכיב Footer (כותרת תחתונה)
// ============================================================================
// מציג קישורים משפטיים, פרטי קשר וזכויות יוצרים

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-bold text-lg">אודות</h3>
            <p className="text-muted-foreground text-sm">
              TintMe היא האפליקציה החכמה לצביעת שיער בבית. מאבחנת את שיערך, מחשבת נוסחה מקצועית מותאמת אישית ומכינה רשימת קניות מיידית.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-lg">קישורים מהירים</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/terms"
                >
                  תנאי שימוש
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/privacy"
                >
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/contact"
                >
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-bold text-lg">יצירת קשר</h3>
            <p className="text-muted-foreground text-sm">
              lamiscosmatics@gmail.com
              <br />
              0522903783
            </p>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-muted-foreground text-sm">
          <p>© 2025 כל הזכויות שמורות. נבנה עם ❤️.</p>
        </div>
      </div>
    </footer>
  );
}
