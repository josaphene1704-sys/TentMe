import Google from "@auth/core/providers/google";

const GoogleWithPrompt = Google({
  authorization: { params: { prompt: "select_account" } },
});
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password, GoogleWithPrompt],
  session: {
    totalDurationMs: 30 * 24 * 60 * 60 * 1000, // משך זמן ה-Session (30 ימים)
  },
  callbacks: {
    // פונקציה שנקראת בעת יצירה או עדכון של משתמש
    async createOrUpdateUser(ctx, args) {
      const now = Date.now();

      // אם המשתמש כבר קיים (למשל, התחברות נוספת), נעדכן את הפרטים שלו
      if (args.existingUserId) {
        const existing = await ctx.db.get(args.existingUserId);
        if (existing) {
          await ctx.db.patch(args.existingUserId, {
            email: args.profile.email,
            emailVerified: args.profile.emailVerified ?? false,
            fullName: args.profile.name || "User",
            updatedAt: now,
          });
          return args.existingUserId;
        }
      }

      // יצירת משתמש חדש עם כל השדות הנדרשים לפי ה-Schema
      return await ctx.db.insert("users", {
        email: args.profile.email ?? "",
        emailVerified: args.profile.emailVerified ?? false,
        fullName: args.profile.name || "User",
        role: "user", // תפקיד ברירת מחדל
        isActive: true, // משתמש פעיל כברירת מחדל
        createdAt: now,
        updatedAt: now,
      });
    },
  },
});
