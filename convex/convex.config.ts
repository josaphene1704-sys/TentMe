// ============================================================================
// Convex App Configuration
// ============================================================================
// קובץ קונפיגורציה עבור Convex Components
// מאפשר להתקין רכיבים מוכנים שמרחיבים את יכולות האפליקציה

import polar from "@convex-dev/polar/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();

// התקנת רכיב Polar לניהול תשלומים ומנויים
app.use(polar);

export default app;
