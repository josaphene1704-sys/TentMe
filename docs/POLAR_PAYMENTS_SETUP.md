# מדריך הגדרת Polar (Web Template)

מדריך זה מסביר כיצד להגדיר את מערכת התשלומים Polar.

אנו משתמשים ברכיב הרשמי [`@convex-dev/polar`](https://www.convex.dev/components/polar) שמנהל באופן אוטומטי את סנכרון המוצרים, המנויים והלקוחות.

---

## דרישות מקדימות

- [ ] חשבון [Polar](https://polar.sh) (חינמי)
- [ ] פרויקט Convex פעיל (`bunx convex dev` רץ)

---

## שלב 1: יצירת Organization ב-Polar

1. היכנסו ל-[Polar Dashboard](https://polar.sh)
2. התחברו עם GitHub או Email
3. צרו **Organization** חדש

---

## שלב 2: יצירת Access Token

1. ב-Polar Dashboard → **Settings** → **Developers** → **Organization Access Tokens**
2. לחצו **Create Token**
3. תנו שם (למשל: "Convex App")
4. סמנו את ההרשאות הבאות:
   - `products:read`, `products:write`
   - `subscriptions:read`, `subscriptions:write`
   - `customers:read`, `customers:write`
   - `checkouts:read`, `checkouts:write`
   - `checkout_links:read`, `checkout_links:write`
   - `customer_portal:read`, `customer_portal:write`
   - `customer_sessions:write`
5. לחצו **Create** והעתיקו את ה-Token

---

## שלב 3: יצירת מוצרים

1. ב-Polar Dashboard → **Products** → **Create Product**
2. צרו מוצר חודשי:
   - **Name**: Premium Monthly
   - **Type**: Subscription
   - **Billing Interval**: Monthly
   - **Price**: לדוגמה $29
3. העתיקו את ה-**Product ID** (מתחיל ב-`prod_...`)
4. חזרו על התהליך למוצר שנתי

---

## שלב 4: הגדרת משתני סביבה

### ב-Convex (חובה)

הריצו בטרמינל:

```bash
bunx convex env set POLAR_ORGANIZATION_TOKEN <your_token>
bunx convex env set POLAR_WEBHOOK_SECRET <your_webhook_secret>  # ייווצר בשלב הבא
bunx convex env set POLAR_SERVER sandbox  # או production
```

### ב-`.env.local` (חובה)

```bash
NEXT_PUBLIC_POLAR_MONTHLY_PRODUCT_ID=prod_xxxxx
NEXT_PUBLIC_POLAR_YEARLY_PRODUCT_ID=prod_xxxxx
```

---

## שלב 5: הגדרת Webhook

### 5.1 השגת כתובת ה-Convex Site

1. הריצו `bunx convex dashboard`
2. ב-**Settings** → **URL & Deploy Key**, העתיקו את ה-**HTTP Actions URL**
   - נראה כמו: `https://happy-otter-123.convex.site`

### 5.2 יצירת Webhook ב-Polar

1. ב-Polar Dashboard → **Settings** → **Webhooks** → **Create Webhook**
2. מלאו:
   - **URL**: `https://<your-url>.convex.site/polar/events`
   - **Events**: סמנו:
     - `product.created`, `product.updated`
     - `subscription.created`, `subscription.updated`
3. לחצו **Create**
4. העתיקו את ה-**Webhook Secret** והגדירו אותו ב-Convex (ראו שלב 4)

---

## שלב 6: הפעלת מערכת התשלומים

ערכו את `config/appConfig.ts`:

```typescript
// הפעלת תשלומים אמיתיים
export const PAYMENT_SYSTEM_ENABLED = true;

// כיבוי מצב בדיקה
export const MOCK_PAYMENTS = false;
```

---

## בדיקה

1. הריצו `bun dev` ו-`bunx convex dev`
2. היכנסו לעמוד נעול (למשל `/page2`)
3. בחרו תוכנית בתשלום ולחצו "המשך"
4. השלימו תשלום ב-Polar (ב-Sandbox: כרטיס בדיקה)
5. ודאו שהגישה נפתחה

---

## פתרון בעיות

| בעיה | פתרון |
|------|--------|
| "Invalid API key" | ודאו ש-`POLAR_ORGANIZATION_TOKEN` מוגדר ב-Convex |
| סטטוס לא מתעדכן | בדקו שה-Webhook URL נכון וש-`POLAR_WEBHOOK_SECRET` תואם |
| מוצרים לא מופיעים | ודאו שה-Product IDs ב-`.env.local` נכונים |

---

## קבצים רלוונטיים

| קובץ | תיאור |
|------|--------|
| `convex/convex.config.ts` | התקנת רכיב Polar |
| `convex/polar.ts` | אתחול הלקוח וייצוא פונקציות |
| `convex/http.ts` | רישום נתיב Webhook |
| `convex/users.ts` | כולל `_getCurrentUserForPolar` עבור הרכיב |
| `config/appConfig.ts` | דגלי הפעלה (`PAYMENT_SYSTEM_ENABLED`, `MOCK_PAYMENTS`) |
| `components/payments/PaywallModal.tsx` | UI לבחירת תוכנית (משתמש ב-`CheckoutLink`) |
| `components/payments/PremiumGate.tsx` | רכיב לנעילת תוכן פרימיום |

---

## ארכיטקטורה

```
┌──────────────┐       ┌─────────────────┐       ┌────────────────┐
│ User Browser │       │ Polar Platform  │       │ Convex Backend │
└──────┬───────┘       └────────┬────────┘       └───────┬────────┘
       │                        │                        │
       │ 1. CheckoutLink ──────►│                        │
       │                        │                        │
       │                        │ 2. Webhook ───────────►│
       │                        │    (subscription.created)
       │                        │                        │
       │                        │                        │ 3. Component
       │                        │                        │    stores data
       │ 4. Query ◄─────────────────────────────────────│
       │    (getSubscriptionStatus)                      │
```

---

## משאבים

- [Convex Polar Component Docs](https://www.convex.dev/components/polar)
- [Polar Documentation](https://polar.sh/docs)
