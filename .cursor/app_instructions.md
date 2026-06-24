# TintMe - Project Overview & Guidelines

You are an expert AI developer and UI/UX designer assisting in building **TintMe**, a smart, high-end hair coloring assistant and diagnostic web application. 

Always refer to this document to maintain consistency in design, tech stack, and user flow.

---

## 🚀 Tech Stack & Localization
- **Framework:** React
- **Styling:** Tailwind CSS (Mobile-first, responsive design).
- **Languages & RTL:** The application supports **Hebrew** (default) and **Arabic**. 
  - **Important:** Since both languages are Right-to-Left, the layout structure remains strictly `dir="rtl"` for both. No layout inversion is needed.
  - **Dynamic Fonts:** Change fonts dynamically based on the active language to ensure a premium look (e.g., *Assistant* or *Rubik* for Hebrew, and *Cairo* for Arabic).
  - **State-Based Translation:** Provide a clean localization setup (like a simple translation context, hook, or dictionary) to easily manage and toggle Hebrew/Arabic UI text.

---

## 🎨 Design & Branding Guidelines
- **Vibe:** High-end, premium, vibrant, and modern. It must capture the "hair coloring craze" and feel like a professional luxury salon experience.
- **Color Palette:** Focus on dynamic, fluid gradients that mimic professional hair dyes mixing together.
  - *Primary Colors:* Deep Violet, Vibrant Magenta, and Soft Rose.
  - *Backgrounds:* Avoid static/flat dark or white backgrounds where possible; use smooth, rich transitions.
- **UI Elements:** Minimalist cards, generous spacing, and smooth micro-interactions/animations (especially on CTA buttons).
- **Tone of Voice:** Professional, encouraging, and tailored elegantly to a female clientele (עבור לקוחות נשים), using appropriate gender terminology in Hebrew and Arabic.

---

## 🗺️ App Flow & Architecture

### 1. Welcome / Landing Screen (Current Step)
- **Language Switcher:** A clean, accessible language switch button (עברית / العربية) placed at the top corner of the screen for instant language switching.
- High-impact visual intro with the dynamic gradient.
- App logo (**TintMe**) with an elegant font and a catchy tagline.
- 3 clear value props with icons.
- Animated "Get Started" Call-to-Action button.

### 2. Hair Photo Upload & Catalog Selection
- **The Concept:** A highly precise diagnostic flow based on both visual reference and data mapping.
- **Current Hair Step:** User uploads a photo of their *current* hair color **AND** selects the closest matching tone from a professional color catalog.
- **Desired Hair Step:** User uploads an inspirational photo of their *desired* target hair color **AND** selects the target tone from the professional color catalog.
- *Note for Logic:* The photos serve as visual references, while the core diagnostic formula logic will combine the catalog selections with the questionnaire responses.

### 3. Interactive Diagnostics Questionnaire
- Step-by-step wizard (one question per screen/page with a smooth progress bar).
- Selection from predefined lists (styled interactive cards or custom radio lists).
- **Core Questions Include:**
  - Hair type and texture.
  - Percentage of gray/white hair (אחוז שיבה).
  - Chemical history (e.g., bleaching/lightening history - האם עבר הבהרה).
  - Current hair condition and damage level.

### 4. Formula Generation & Smart Shopping List
- **The Formula:** Generates a precise, customized, step-by-step professional coloring process based on hair color chemistry rules, catalog selections, and diagnostics.
- **Smart Shopping List:** Automatically lists all required products (specific dye tubes, correct developer volumes, mixing ratios, and post-color treatments).
- **Interactivity:** User can check/uncheck items they already own at home.
- **Conversion/Action:** A direct link/button to order the missing products or consult further via the business's WhatsApp.

---

## 🛠️ General Coding Instructions
- Write clean, componentized, and maintainable React code.
- Ensure strict responsiveness (looks amazing on mobile, scales beautifully on desktop).
- Use descriptive Tailwind classes. Do not hardcode style blocks.
- Manage language state globally or in the root component so that switching the language instantly updates the entire app text and corresponding font family.