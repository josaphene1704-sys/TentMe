# AGENTS.md - AI Assistant Configuration for Web Template

This file configures AI assistants to help non-developers build high-quality Next.js web applications with Convex Auth and Polar payments safely and effectively.

---

## 🛡️ Safety First Agent

**Purpose**: Protect beginners from destructive operations
**Trigger**: Before executing any potentially dangerous command
**Priority**: CRITICAL

### Behavior:
- **BLOCK IMMEDIATELY**:
  - `git push --force` or `git push -f`
  - `git reset --hard`
  - `git clean -fd`
  - `git rebase`
  - `rm -rf` commands
  - Deletion of `.git` directory
  - Deletion of `.env.local` files

- **WARN AND CONFIRM**:
  - Any command that modifies git history
  - Deletion of multiple files
  - Changes to configuration files (next.config.ts, package.json)
  - npm/yarn commands (should use `bun` instead)
  - Database schema changes in Convex

- **TEACH**:
  - Explain WHY the command is dangerous
  - Show what could go wrong
  - Provide safer alternatives
  - **Reference**: Check `docs/usage.md` for safe workflows.

---

## 🧪 Pre-Commit Guardian Agent

**Purpose**: Ensure code quality before commits
**Trigger**: When user attempts `git commit` or `git add`
**Priority**: HIGH

### Behavior:

#### Step 1: Automatic Checks
Run these checks before allowing commit:
```bash
bun run check:fix  # Run Ultracite + Biome formatting and linting
```

#### Step 2: Security Scan
Check for:
- ❌ Hardcoded API keys (Polar keys, Convex URLs)
- ❌ `.env.local` files in staging area
- ❌ Console.log statements in production code
- ❌ Exposed database queries without authentication
- ❌ Ultracite violations (type safety, accessibility, performance)

#### Step 3: Report & Guide
If issues found, stop the commit and explain how to fix them using `bun run check:fix` or by editing `.env.local`.

---

## 🔐 Convex Auth Agent

**Purpose**: Ensure proper Convex Auth implementation
**Trigger**: When working with authentication code
**Priority**: CRITICAL

### Behavior:

#### Protected Page Pattern
When creating pages that need authentication:
```tsx
// app/dashboard/page.tsx
"use client";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) redirect("/sign-in");
  return <div>Protected content</div>;
}
```

#### Middleware Protection
Remind users that `middleware.ts` handles route protection.
- **Reference**: See `middleware.ts` and `convex/auth.ts`.

---

## 💳 Polar Payments Agent

**Purpose**: Guide proper Polar payment integration
**Trigger**: When working with payment/subscription code
**Priority**: MEDIUM

### Behavior:

#### Paywall Configuration
The paywall is controlled in `config/appConfig.ts`.
- `PAYMENT_SYSTEM_ENABLED`: Enables real Polar checkout.
- `MOCK_PAYMENTS`: Allows testing without real payments.

#### Configuration Steps
1. Set `PAYMENT_SYSTEM_ENABLED = true`
2. Configure Polar Product IDs in `.env.local`.
3. Set server-side token `POLAR_ACCESS_TOKEN`.

- **Reference**: Read `docs/POLAR_PAYMENTS_SETUP.md` for detailed instructions.

---

## 🎨 ShadCN UI Helper Agent

**Purpose**: Guide proper ShadCN component usage
**Trigger**: When creating/using UI components
**Priority**: MEDIUM

### Behavior:

#### Component Usage
To add components: `bunx shadcn@latest add [component-name]`.
Use components from `@/components/ui/`.

#### Theme Customization
Colors are in `app/globals.css`.
- **Reference**: Check `components.json` for configuration.

---

## 🆘 Help & Troubleshooting Agent

**Purpose**: Help users when they're stuck or encountering errors
**Trigger**: Error messages or repeated failures
**Priority**: HIGH

### Behavior:

#### Documentation First Approach
If a task fails more than once, or if the user is confused about an integration (Auth, Payments):
1. **Stop and Suggest Docs**: "It looks like we're hitting some issues. Please review the documentation first."
2. **Point to Specific Files**:
   - Authentication issues: `docs/setup.md` and `convex/auth.ts`
   - Payment issues: `docs/POLAR_PAYMENTS_SETUP.md`
   - General setup: `docs/README.md`
   - Deployment: `docs/deployment.md`

#### Common Fixes
- **Module not found**: Run `bun install`.
- **Convex errors**: Run `bunx convex dev` and check `.env.local`.
- **Payment errors**: Check `POLAR_ACCESS_TOKEN` in `.env.local`.

---

## 🚀 Ultracite Code Quality Agent

**Purpose**: Enforce consistent, type-safe, and accessible Next.js code
**Trigger**: When generating or reviewing code
**Priority**: HIGH

### Behavior:

**Ultracite** is a zero-config Biome preset that enforces strict standards. Learn more at [ultracite.ai](https://www.ultracite.ai/).

#### Code Generation Standards
- Use explicit types for all function parameters and return values
- Leverage TypeScript's type narrowing instead of assertions
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`) instead of divs
- Provide meaningful alt text for all images
- Include ARIA attributes for interactive elements
- Use `const` by default, `let` only when necessary, never `var`
- Prefer arrow functions for callbacks
- Use template literals over string concatenation
- Always `await` promises in async functions

#### Next.js Best Practices
- Use `next/image` instead of `<img>` tags
- Use App Router metadata API instead of `<head>` tags
- Use Server Components for async data fetching
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Avoid `<head>` elements (use metadata API)

#### Accessibility Standards
- Include `alt` text on all images
- Use proper heading hierarchy
- Add labels for form inputs
- Include keyboard event handlers alongside mouse events
- Use semantic HTML instead of roles
- Test with screen readers

#### Performance Standards
- Memoize expensive components
- Use `useCallback` for dependencies
- Avoid inline functions in render
- Use proper image components
- Prevent import cycles
- Use Server Components when possible

#### Type Safety
- Don't use `any` type
- Don't use `@ts-ignore`
- Use `unknown` instead of `any` when type is uncertain
- Extract types into type definitions

#### When in Doubt
Run `bun ultracite fix` to automatically format and fix issues.

---

## 📚 Learning Resources

All agents should reference these project files:
- `docs/POLAR_PAYMENTS_SETUP.md` - Payment integration guide
- `docs/setup.md` - Initial setup and Convex configuration
- `convex/schema.ts` - Database schema definitions
- `convex/auth.ts` - Authentication configuration
- `middleware.ts` - Route protection rules
- `app/globals.css` - Global styles and theme variables

**Remember**: Always encourage checking the `docs/` folder when users are stuck.
