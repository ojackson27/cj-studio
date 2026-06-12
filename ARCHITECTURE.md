# CJ Studio - Global Architecture & Development Rules

## 1. The Core Objective
CJ Studio is a premium web design agency focused on delivering high-end, bespoke digital experiences for local UK businesses. The primary development directive is to maintain a maximum effort-to-profit ratio by leveraging modular, AI-generated components, 3D React integrations, and highly performant architecture.

## 2. The Tech Stack
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion (strictly prioritizing `useScroll` and `useTransform` for micro-interactions)
*   **Components:** `shadcn/ui` and raw integrations from `21st.dev`
*   **3D Assets:** `@splinetool/react-spline` (for browser-rendered webGL assets)
*   **Forms:** Resend API

## 3. Brand Identity & Aesthetics
The aesthetic is "performance-industrial" and "premium-athletic". It must feel like an Apple product landing page. 
*   **Backgrounds:** Strictly pure white (`bg-white` or `bg-zinc-50`). No dark mode defaults.
*   **Typography:** Stark dark slate (`text-slate-900`). Extremely tight tracking (`tracking-tighter`, `tracking-[-0.04em]`) and tight line heights (`leading-none`).
*   **The CJ Studio Aurora:** When gradients are used, they must map to these exact hex codes: 
    *   Pink: `#ec4899`
    *   Violet: `#8b5cf6`
    *   Blue: `#3b82f6`
    *   Emerald: `#10b981`
*   **Borders:** Delicate, subtle, and translucent (e.g., `border border-gray-200` or `bg-white/50 backdrop-blur-md`).

## 4. Sitemap & Page Routing
*   **`/` (Landing Page):** The visual hook. Features the CJ Studio stacked logo, pure white voids, and 3D geometric Spline glass assets tied to scroll physics.
*   **`/work` (Portfolio):** Fast, modal-based layout. Uses UI drawers/dialogs to expand project details over a subtle animated background without forcing a hard page reload.
*   **`/founders` (Who We Are):** Trust-building page highlighting founders Oliver and Josh. Features scroll-triggered typography and a lightweight, abstract 21st.dev WebGL globe highlighting the UK. 
*   **`/legal` (Privacy & Policy):** Minimalist text documents layered over a heavily slowed, monochromatic shimmer background.
*   **`/contact` (Lead Generation):** High-conversion layout featuring direct contact info and a pristine 3-field (Name, Email, Project Details) form wired to Resend.

## 5. The Golden Rules for AI Assistance
1.  **Strict Component Isolation:** Only edit or generate the specific component requested in the prompt. Do not attempt to refactor the entire sitemap or global layout files unless explicitly instructed.
2.  **Routing Preservation:** Never use standard `<a>` tags for internal links. Always import `Link` from `next/link`. If an animated button requires routing, use `const MotionLink = motion.create(Link)` to prevent hard browser refreshes.
3.  **No Hallucinated Assets:** Do not write code assuming random images or APIs exist. Use placeholder `div` blocks with background colors if an image or 3D asset is not explicitly provided.
