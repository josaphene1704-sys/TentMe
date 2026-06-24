import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // קונפיגורציית Turbopack:
  // בפרויקטים שיש בהם כמה lockfiles במחשב (למשל monorepo/תבניות),
  // Next עלול להסיק root לא נכון. כאן אנחנו מכריחים את ה-root להיות תיקיית התבנית.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
