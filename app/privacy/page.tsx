import Link from "next/link";

// דף מדיניות פרטיות: מסמך משפטי המסביר כיצד נאסף ומנוהל המידע באתר
export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-bold text-5xl">מדיניות פרטיות</h1>

        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">1. איסוף מידע</h2>
            <p>
              אנו אוספים מידע אישי שאתם מספקים לנו ביודעין, כגון שם וכתובת דואר אלקטרוני, כאשר אתם
              נרשמים לשירותים שלנו או יוצרים קשר איתנו.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">2. שימוש במידע</h2>
            <p>המידע שאנו אוספים משמש אותנו למטרות הבאות:</p>
            <ul className="mt-2 mr-6 list-inside list-disc space-y-2">
              <li>מתן ושיפור השירותים שלנו</li>
              <li>שליחת עדכונים ומידע רלוונטי</li>
              <li>מענה לפניות שירות לקוחות</li>
              <li>שיפור חווית המשתמש באתר</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">3. אבטחת מידע</h2>
            <p>
              אנו מיישמים אמצעי אבטחה טכניים וארגוניים מתקדמים כדי להגן על המידע האישי שלכם מפני
              גישה, שימוש או גילוי בלתי מורשים.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">4. שיתוף מידע</h2>
            <p>
              אנו לא מוכרים, משכירים או משתפים את המידע האישי שלכם עם צדדים שלישיים למטרות שיווק,
              אלא אם כן קיבלנו הסכמה מפורשת מכם לכך.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">5. קובצי Cookie</h2>
            <p>
              האתר שלנו משתמש בקובצי Cookie כדי לשפר את חווית המשתמש ולנתח את השימוש באתר. אתם
              יכולים לבחור לדחות קובצי Cookie דרך הגדרות הדפדפן שלכם.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">6. זכויותיכם</h2>
            <p>
              יש לכם זכות לגשת למידע האישי שלכם, לבקש תיקון או מחיקה שלו, ולבטל את הסכמתכם לשימוש
              במידע בכל עת.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">7. שינויים במדיניות</h2>
            <p>
              אנו שומרים לעצמנו את הזכות לעדכן את מדיניות הפרטיות מעת לעת. שינויים משמעותיים יפורסמו
              באתר ויכללו תאריך עדכון.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-semibold text-2xl text-foreground">8. יצירת קשר</h2>
            <p>לשאלות או בקשות הנוגעות לפרטיות שלכם, אנא צרו קשר: lamiscosmatics@gmail.com</p>
          </section>
        </div>

        <div className="mt-12">
          <Link className="text-primary hover:underline" href="/">
            ← חזרה לדף הבית
          </Link>
        </div>
      </div>
    </div>
  );
}
