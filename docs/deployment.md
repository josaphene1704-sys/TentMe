# מדריך העלאה לאוויר (Deployment) - Web Template

המדריך מתמקד בהעלאת האפליקציה ל-Vercel, הפלטפורמה המומלצת ל-Next.js.

## תוכן עניינים

1. [שלב 1: הכנת הקוד ב-GitHub](#שלב-1-הכנת-הקוד-ב-github)
2. [שלב 2: העלאת ה-Backend (Convex)](#שלב-2-העלאת-ה-backend-convex)
3. [שלב 3: חיבור ל-Vercel](#שלב-3-חיבור-ל-vercel)
4. [שלב 4: הגדרת משתני סביבה](#שלב-4-הגדרת-משתני-סביבה-environment-variables)
5. [שלב 5: Deploy](#שלב-5-deploy)
6. [עדכונים שוטפים](#עדכונים-שוטפים)
7. [בדיקות לפני פריסה לייצור](#בדיקות-לפני-פריסה-לייצור)
8. [פתרון בעיות נפוצות](#פתרון-בעיות-נפוצות)

---

## שלב 1: הכנת הקוד ב-GitHub

1. ודאו שכל השינויים שמורים (`git commit`).
2. העלו את הקוד ל-GitHub (`git push`).

## שלב 2: העלאת ה-Backend (Convex)

לפני שמעלים את האתר, יש לוודא שסביבת ה-Production של Convex מעודכנת:

```bash
bunx convex deploy
```
פקודה זו מעלה את הסכמה והפונקציות לסביבת ה-Production ב-Convex.

## שלב 3: חיבור ל-Vercel

1. היכנסו ל-[Vercel Dashboard](https://vercel.com).
2. לחצו על **Add New** -> **Project**.
3. בחרו את ה-Repository שלכם מ-GitHub ולחצו **Import**.

## שלב 4: הגדרת משתני סביבה (Environment Variables)

במסך ההגדרות ב-Vercel (לפני לחיצה על Deploy), פתחו את הקטע **Environment Variables**.
עליכם להעתיק את המשתנים מקובץ `.env.local` (או מהדשבורד של Convex):

### משתנים בסיסיים (חובה):
1. `CONVEX_DEPLOYMENT`: (למשל `npm-package-12345`)
2. `NEXT_PUBLIC_CONVEX_URL`: כתובת ה-Production שלכם (מתחילה ב-`https://...`)

**טיפ:** ניתן למצוא את הערכים הללו ב-Convex Dashboard תחת Settings -> URL & Deploy Key, או בקובץ `.env` שנוצר לכם מקומית (שימו לב להשתמש בערכי ה-Production ולא ה-Dev אם יש הבדל).

### משתנים למערכת תשלומים (Polar) - אופציונלי:
אם אתם משתמשים במערכת התשלומים, הוסיפו גם:

3. `POLAR_ACCESS_TOKEN`: מפתח גישה ל-Polar API (מתחיל ב-`polar_...`)
4. `POLAR_SUCCESS_URL`: כתובת URL להפניה לאחר תשלום מוצלח (למשל `https://yourdomain.com/success?checkout_id={CHECKOUT_ID}`)
5. `NEXT_PUBLIC_POLAR_MONTHLY_PRODUCT_ID`: מזהה מוצר חודשי מ-Polar
6. `NEXT_PUBLIC_POLAR_YEARLY_PRODUCT_ID`: מזהה מוצר שנתי מ-Polar

📖 **מדריך הגדרה מפורט:** ראה `docs/POLAR_PAYMENTS_SETUP.md` להגדרה מלאה של מערכת התשלומים.

### משתנים נוספים (אופציונלי):
7. `NEXT_PUBLIC_TERMS_URL`: כתובת URL לדף תנאי שימוש (ברירת מחדל: `/terms`)
8. `NEXT_PUBLIC_PRIVACY_URL`: כתובת URL לדף מדיניות פרטיות (ברירת מחדל: `/privacy`)

**הערה:** ודאו שכל המשתנים מוגדרים גם לסביבת **Production** ב-Vercel (ולא רק Preview).

## שלב 5: Deploy

לחצו על **Deploy**.
Vercel יבנה את הפרויקט ויעלה אותו לאוויר. בסיום תקבלו כתובת URL לאתר החי שלכם.

---

## עדכונים שוטפים

בכל פעם שתעשו `git push` ל-GitHub:
1. Vercel יזהה את השינוי ויבנה מחדש את האתר.
2. אם שיניתם משהו ב-Convex (סכמה/פונקציות), אל תשכחו להריץ `bunx convex deploy` מהמחשב שלכם או להגדיר זאת כחלק מתהליך הבנייה (לא חובה להתחלה).

---

## בדיקות לפני פריסה לייצור

לפני פריסה לייצור, ודאו:

### ✅ קונפיגורציה (`config/appConfig.ts`):
- [ ] `FORCE_PROD_MODE` מוגדר ל-`false` (או `true` אם אתם רוצים לכפות ייצור)
- [ ] `PAYWALL_ENABLED` מוגדר לפי הצורך (לרוב `true` בייצור)
- [ ] `MOCK_PAYMENTS` מוגדר ל-`false` בייצור (אלא אם כן אתם רוצים תשלומים מדומים)
- [ ] `PAYMENT_SYSTEM_ENABLED` מוגדר ל-`true` אם אתם משתמשים בתשלומים אמיתיים

### ✅ משתני סביבה:
- [ ] כל משתני הסביבה הנדרשים מוגדרים ב-Vercel
- [ ] משתני Polar מוגדרים אם אתם משתמשים במערכת התשלומים
- [ ] כתובות URL (Terms, Privacy) מעודכנות

### ✅ בדיקות פונקציונליות:
- [ ] אימות משתמשים עובד
- [ ] Paywall מוצג למשתמשים חינמיים (אם מופעל)
- [ ] תשלומים עובדים (אם מופעלים)
- [ ] מחיקת חשבון עובדת

---

## פתרון בעיות נפוצות

### Paywall לא מוצג
- ודאו ש-`PAYWALL_ENABLED = true` ב-`config/appConfig.ts`
- בדקו שהמשתמש לא מסומן כ-"paid" ב-Database

### תשלומים לא עובדים
- ודאו שכל משתני Polar מוגדרים ב-Vercel
- בדקו ש-`PAYMENT_SYSTEM_ENABLED = true` ו-`MOCK_PAYMENTS = false`
- ודאו שה-Product IDs נכונים ב-`config/polarConfig.ts`

### שגיאות Convex
- ודאו ש-`CONVEX_DEPLOYMENT` ו-`NEXT_PUBLIC_CONVEX_URL` מוגדרים נכון
- הרצו `bunx convex deploy` כדי לעדכן את ה-Backend
