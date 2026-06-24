import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { polar } from "./polar";

const http = httpRouter();

// הגדרת נתיבי HTTP עבור אימות (Convex Auth)
// זה מאפשר ביצוע פעולות אימות דרך HTTP Endpoints
auth.addHttpRoutes(http);

// הגדרת נתיבי HTTP עבור Polar webhooks
// Polar ישלח אירועים ל-/polar/events (ברירת מחדל)
polar.registerRoutes(http as any, {
  // אופציונלי: התאמה אישית של נתיב ה-webhook
  // path: "/polar/events",
  // אופציונלי: Callbacks לאירועים ספציפיים
  // אפשר להוסיף לוגיקה מותאמת אישית כאן
  // onSubscriptionUpdated: async (ctx, event) => {
  //   // Handle subscription updates
  // },
});

export default http;
