# מדריך שימוש ופיתוח - Web Template

## תוכן עניינים

1. [הרצת האפליקציה](#הרצת-האפליקציה)
2. [פקודות שימושיות](#פקודות-שימושיות)
3. [מבנה הפרויקט](#מבנה-הפרויקט)
4. [קונסולת דיבאג (Dev בלבד)](#קונסולת-דיבאג-dev-בלבד)
5. [ניהול קונפיגורציה (appConfig.ts)](#ניהול-קונפיגורציה-appconfigts)
6. [עבודה עם Paywall](#עבודה-עם-paywall)
7. [מחיקת חשבון](#מחיקת-חשבון)
8. [עבודה עם Git](#עבודה-עם-git)

---

## הרצת האפליקציה

כדי לעבוד על הפרויקט, עליכם להריץ שני תהליכים במקביל (מומלץ בשני טרמינלים נפרדים):

### טרמינל 1: שרת הפיתוח (Frontend)
מריץ את אפליקציית Next.js:

```bash
bun dev
```
האתר יהיה זמין בכתובת: [http://localhost:3000](http://localhost:3000)

### טרמינל 2: שרת Convex (Backend)
מסנכרן את הפונקציות והסכמה לענן ומאזין לשינויים:

```bash
bunx convex dev
```

---

## פקודות שימושיות

### בדיקת איכות קוד (Linting)
הפרויקט משתמש ב-Biome לבדיקת שגיאות ועיצוב קוד:

```bash
bun lint
```

לתיקון אוטומטי של בעיות עיצוב:
```bash
bun run check:fix
```

### בדיקת טיפוסים (TypeScript)
לבדיקת תקינות הטיפוסים בפרויקט:

```bash
bun run type-check
```

בדיקה מלאה (גם Lint וגם Types):
```bash
bun run check:full
```

---

## מבנה הפרויקט

- `app/`: עמודי האתר (Next.js App Router).
  - `checkout/`: נתיב API ל-Polar Checkout.
  - `success/`: דף הצלחה לאחר תשלום.
- `components/`: רכיבי UI (כפתורים, טפסים, מודלים).
  - `payments/`: רכיבי תשלום (PaywallModal, PremiumGate).
- `config/`: קבצי קונפיגורציה מרכזיים.
  - `appConfig.ts`: דגלי תכונות וקונפיגורציה כללית.
  - `polarConfig.ts`: הגדרות Polar (תשלומים).
  - `planDisplay.ts`: טקסטים ותמחור לתוכניות.
- `convex/`: הגדרות Backend, סכמה (Schema), ופונקציות שרת.
- `public/`: קבצים סטטיים (תמונות, אייקונים).

---

## קונסולת דיבאג (Dev בלבד)

במצב פיתוח (`IS_DEV_MODE = true`), כפתור באג צהוב מופיע ב-Navbar (פינה שמאלית עליונה).

### שימוש בקונסולה:
1. לחצו על כפתור הבאג הצהוב.
2. קונסולה תיפתח עם מידע על מצב האפליקציה:
   - **Paywall פעיל:** האם ה-Paywall מוצג למשתמשים חינמיים
   - **תשלומים פעילים:** האם מערכת התשלומים האמיתית פעילה
   - **Mock Payments:** האם תשלומים מדומים מופעלים
   - **סטטוס משתמש:** האם המשתמש הנוכחי חינמי או פרימיום

### כפתורי Preview:
- **פתח מודל התחברות (Preview):** מציג את מודל ההתחברות
- **פתח מודל הרשמה (Preview):** מציג את מודל ההרשמה
- **פתח Paywall (Preview):** מציג את מודל ה-Paywall במצב תצוגה מקדימה
- **מצב בדיקה: שדרג אותי לפרימיום:** (רק אם `MOCK_PAYMENTS` דולק) משדרג את המשתמש הנוכחי לפרימיום ללא תשלום

---

## ניהול קונפיגורציה (`appConfig.ts`)

קובץ `config/appConfig.ts` מאפשר לשלוט בהתנהגות האפליקציה דרך דגלים:

### דגלים מרכזיים:

#### `PAYWALL_ENABLED`
- **תפקיד:** קובע האם ה-Paywall מוצג למשתמשים חינמיים
- **ערכים:** `true` / `false`
- **התנהגות:**
  - `true`: עמודים מוגנים (כמו `page2`, `page3`) יוצגו עם Paywall למשתמשים חינמיים
  - `false`: כל העמודים נגישים לכל המשתמשים המחוברים

#### `PAYMENT_SYSTEM_ENABLED`
- **תפקיד:** קובע האם מערכת התשלומים האמיתית (Polar) פעילה
- **ערכים:** `true` / `false`
- **התנהגות:**
  - `true`: לחיצה על "המשך" בתוכנית בתשלום תבצע Redirect ל-Polar Checkout
  - `false`: לחיצה על "המשך" תציג הודעת Preview (או תדמה שדרוג אם `MOCK_PAYMENTS` דולק)

#### `MOCK_PAYMENTS`
- **תפקיד:** מצב בדיקה שמאפשר לבדוק את ה-Paywall בלי תשלום אמיתי
- **ערכים:** `true` / `false`
- **התנהגות:**
  - `true`: לחיצה על "המשך" בתוכנית בתשלום תדמה שדרוג ל"בתשלום" בלי Polar Checkout
  - `false`: התנהגות תיקבע לפי `PAYMENT_SYSTEM_ENABLED`

### דוגמה לשימוש:
```typescript
// כיבוי Paywall לחלוטין (לפיתוח)
export const PAYWALL_ENABLED = false;

// הפעלת Paywall עם תשלומים מדומים (לבדיקה)
export const PAYWALL_ENABLED = true;
export const MOCK_PAYMENTS = true;
export const PAYMENT_SYSTEM_ENABLED = false;

// הפעלת Paywall עם תשלומים אמיתיים (ייצור)
export const PAYWALL_ENABLED = true;
export const MOCK_PAYMENTS = false;
export const PAYMENT_SYSTEM_ENABLED = true;
```

---

## עבודה עם Paywall

### הגנה על עמודים
כדי להגן על עמוד ולהציג Paywall למשתמשים חינמיים, עטוף את התוכן ב-`PremiumGate`:

```tsx
import PremiumGate from "@/components/payments/PremiumGate";

export default function ProtectedPage() {
  return (
    <PremiumGate>
      {/* התוכן המוגן - יוצג רק למשתמשים פרימיום */}
      <div>תוכן בלעדי לפרימיום</div>
    </PremiumGate>
  );
}
```

### עמודים מוגנים כברירת מחדל:
- `app/page2/page.tsx`
- `app/page3/page.tsx`

### עמודים פתוחים:
- `app/page1/page.tsx` - נגיש לכל המשתמשים המחוברים

---

## מחיקת חשבון

משתמשים יכולים למחוק את החשבון שלהם דרך תפריט המשתמש ב-Navbar:

1. לחצו על תפריט המשתמש (פינה ימנית עליונה)
2. בחרו "מחק חשבון"
3. אישור דו-שלבי:
   - שלב 1: בחירה בין התנתקות למחיקה
   - שלב 2: אישור סופי למחיקה

⚠️ **אזהרה:** מחיקת חשבון היא פעולה בלתי הפיכה ותמחק את כל הנתונים המשויכים למשתמש.

---

## עבודה עם Git

1. **בדיקת שינויים:**
   ```bash
   git status
   ```
2. **הוספת שינויים:**
   ```bash
   git add .
   ```
3. **שמירה (Commit):**
   ```bash
   git commit -m "תיאור השינוי"
   ```
4. **העלאה (Push):**
   ```bash
   git push origin main
   ```
