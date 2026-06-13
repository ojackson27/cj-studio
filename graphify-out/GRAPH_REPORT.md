# Graph Report - cj-studio  (2026-06-14)

## Corpus Check
- 57 files · ~389,250 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 593 nodes · 612 edges · 77 communities (42 shown, 35 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 34 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8b34b760`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `CJ Studio Production Workflow — Design Spec` - 15 edges
3. `File Map` - 14 edges
4. `Tool Stack by Phase` - 14 edges
5. `CJ Studio Workflow Documents — Implementation Plan` - 13 edges
6. `Dribbble MCP Server — Implementation Plan` - 11 edges
7. `CJ Studio Landing Page Implementation Plan` - 11 edges
8. `CJ Creative Studio — Landing Page Design Spec` - 11 edges
9. `Contact Form Design` - 10 edges
10. `CJ Workflow Documents Implementation Plan` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Founders Page` --rationale_for--> `Multi-Page App Router Architecture`  [EXTRACTED]
  app/founders/page.tsx → docs/superpowers/specs/2026-05-31-multipage-refactor-design.md
- `Process Page` --rationale_for--> `Multi-Page App Router Architecture`  [EXTRACTED]
  app/process/page.tsx → docs/superpowers/specs/2026-05-31-multipage-refactor-design.md
- `Services Page` --rationale_for--> `Multi-Page App Router Architecture`  [EXTRACTED]
  app/services/page.tsx → docs/superpowers/specs/2026-05-31-multipage-refactor-design.md
- `Recommended Approach B: Master Intake + 4 Track Playbooks` --rationale_for--> `CJ Studio Production Workflow Design Spec`  [INFERRED]
  .superpowers/brainstorm/14443-1780760323/content/approaches.html → docs/superpowers/specs/2026-06-06-cj-production-workflow-design.md
- `Impeccable Live Config` --references--> `Root Layout`  [EXTRACTED]
  .impeccable/live/config.json → app/layout.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Home Page Component Composition** — page_home, component_home_client, component_why_it_matters, component_work_teaser, component_cta, component_footer [EXTRACTED 1.00]
- **CJ Studio Founding Team** — person_josh_carter, person_ollie_jackson, brand_cj_studio [EXTRACTED 1.00]
- **Shared Brand Gradient Design Token Usage** — component_nav, component_founders, component_services, design_token_gradient [EXTRACTED 1.00]
- **Global Typography System** — layout_root, font_plus_jakarta_sans, font_space_grotesk, font_jetbrains_mono [EXTRACTED 1.00]
- **Hosting and Upkeep Pricing Tiers** — service_hosting_upkeep, pricing_plan_free, pricing_plan_simple, pricing_plan_adaptive [EXTRACTED 1.00]
- **Logo Asset Variant System** — component_logo, asset_cj_mark_svg, asset_cj_logo_horizontal, asset_cj_logo_stacked, asset_cj_logo_full [EXTRACTED 1.00]
- **CJ Studio 4 Client Site Tracks** — brainstorm_track_hospitality, brainstorm_track_trades, brainstorm_track_professional, brainstorm_track_creative [EXTRACTED 1.00]
- **cj-workflow/ Document Set** — plan_workflow_master_doc, plan_workflow_brief_template, plan_workflow_architecture_template, plan_workflow_hospitality_playbook, plan_workflow_trades_playbook, plan_workflow_professional_playbook, plan_workflow_creative_playbook [EXTRACTED 1.00]
- **Hero Section Implementation Components** — plan_hero_aurora_background, plan_hero_plus_jakarta_sans, plan_hero_motion_link, spec_hero_aurora_keyframe [EXTRACTED 1.00]
- **Dribbble MCP Server Source Files** — plan_dribbble_mcp_types, plan_dribbble_mcp_client, plan_dribbble_mcp_server, plan_dribbble_mcp_tool [EXTRACTED 1.00]
- **Phase 1 Design Direction Tool Stack** — tool_canva_pro, tool_coolors, tool_fontshare, tool_awwwards, tool_mobbin, tool_midjourney, tool_removebg, tool_cloudinary [EXTRACTED 1.00]
- **Build Phase Animation Tool Stack** — tool_gsap, tool_lenis, tool_react_three_fiber, tool_magic_ui [EXTRACTED 1.00]
- **CJ Studio Production Workflow (All Phases)** — brainstorm_phase0, brainstorm_phase1, brainstorm_phase2, brainstorm_phase3, brainstorm_phase4, brainstorm_phase5 [EXTRACTED 1.00]
- **CJ Studio Brand Asset Family** — cj_appicon_180_app_icon, cj_favicon_32_favicon, cj_favicon_64_favicon, cj_lockup_transparent_lockup, cj_studio_logo_logo [EXTRACTED 1.00]
- **CJ Studio Icon Size Variants** — cj_favicon_32_favicon, cj_favicon_64_favicon, cj_appicon_180_app_icon [INFERRED 0.95]
- **CJ Studio Lockup Variants** — cj_lockup_transparent_lockup, cj_studio_logo_logo [INFERRED 0.95]
- **CJ Mark Logo Variant Family** — cjmark_svg, cjmarkink_svg, cjmarkwhite_svg, cjmarkmono_svg, favicon_svg [INFERRED 0.95]
- **Shared Triangle Geometry Across All Marks** — cjmark_svg, cjmarkink_svg, cjmarkwhite_svg, cjmarkmono_svg, favicon_svg, cjmark_triangle_shape, cjmark_internal_lines [EXTRACTED 1.00]

## Communities (77 total, 35 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (39): Recommended Approach B: Master Intake + 4 Track Playbooks, Workflow Architecture Approaches (A/B/C), Complete End-to-End Workflow (6 Phases), Master Intake: 5 Classification Questions, Phase 0: Client Discovery & Classification (Human), Phase 1: Design Direction & Asset Gathering (Human + AI), Phase 2: Architecture & Brand Rules (Claude), Phase 3: Spec + Subagent Execution (Claude) (+31 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (32): About (app/about/page.tsx) [optional], About (app/about/page.tsx) [optional], Blog (app/blog/page.tsx) [only if Sanity CMS requested], CJ Studio Workflow Documents — Implementation Plan, Completion Checklist, Component Inventory, Component Inventory, Component Inventory (+24 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (28): APIs by Track, Architecture: Master + 4 Track Playbooks, CJ Studio Production Workflow — Design Spec, Classification Logic, Claude-assisted tasks (via MCP tools):, 🎨 Creative & Portfolio, 🍽 Hospitality, Human Review Gates Summary (+20 more)

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (9): CJ Studio Agency Brand, Founders Component, Impeccable Live Config, JetBrains Mono Font, Plus Jakarta Sans Font, Space Grotesk Font, Root Layout, Josh Carter (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (24): dependencies, motion, next, @phosphor-icons/react, react, react-dom, resend, devDependencies (+16 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (24): 10. Out of Scope, 1. Tech Stack & Constraints, 2. Architecture, 3. Global Changes (Prerequisites), 3a. Aurora Colors — `app/globals.css`, 3b. Nav Links — `components/nav.tsx`, 3c. Hero Asset, 4. Phase 1 — LaptopZoom (`components/laptop-zoom.tsx`) (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (22): 3D Prism Animation Approach Decision, Browser Mock (Browser-in-Browser Demo), CSS Glass Cards, Glass Prism Animation, JSON Animation Spec, Option A: Augment — Prisms Float Around Browser Mock, Option B: Replace — Full 3D Prism Assembly, Option C: Two-Phase — Prisms Fall Then Reveal Browser Mock (+14 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (20): 1. Multi-Page Architecture, 2. WebsiteAssembly Animation Fix, 3. Hero Centred Layout, 4. Founders Apple Redesign, Avatar, Card styling, CJ Studio — Multi-Page Refactor & UI Overhaul Design, Debug log removal (+12 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (19): Behance MCP Server (Planned), cj-workflow/ Directory (Standalone Repo), dribbble-mcp Standalone Repo (C:/Users/ollie/dribbble-mcp/), CJ Workflow Documents Implementation Plan, Dribbble MCP Server Implementation Plan, dribbble-mcp src/dribbble.ts (searchShots API client), dribbble-mcp src/index.ts (MCP Server Entry Point), search_dribbble MCP Tool (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (15): CJ Studio Multi-Page Refactor & UI Overhaul Implementation Plan, File Map, Task 10: Create /services route, Task 11: Create /process route, Task 12: Create /founders route, Task 13: Final verification, Task 1: Extract shared project data, Task 2: Update Work component to use shared data (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (15): Animation Sequence, Background — Browser Mock, Constraints, Foreground — Glass Prism Objects, Glass Styling, Overview, Rainbow Light, Reduced Motion Fallback (+7 more)

### Community 12 - "Community 12"
Cohesion: 0.17
Nodes (15): CJ Studio Aurora Colour System, CJ Studio Architecture Rules, Golden Rules for AI Assistance, Sitemap & Page Routes, Tech Stack (Next.js, Tailwind, Framer Motion, Shadcn, Spline, Resend), AuroraBackground Component, MotionLink (motion.create(Link)) Pattern, Plus Jakarta Sans Typography (+7 more)

### Community 13 - "Community 13"
Cohesion: 0.24
Nodes (3): quotes, Project, projects

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (11): Completion Checklist, Dribbble MCP Server — Implementation Plan, File Map, Task 1: Initialise repository, Task 2: Write types.ts, Task 3: Write dribbble.ts and tests, Task 4: Write index.ts (MCP server), Task 5: Build and smoke test (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (11): CJ Studio Landing Page Implementation Plan, File Map, Task 1: Copy Hero Asset + Create Assets Directory, Task 2: Update Aurora Colors in globals.css, Task 3: Update Nav Component, Task 4: Update Footer Component, Task 5: Build LaptopZoom Component (Phase 1), Task 6: Build WhyItMatters Component (Phase 2) (+3 more)

### Community 16 - "Community 16"
Cohesion: 0.18
Nodes (10): API Integration, Architecture, Dribbble MCP Server — Design Spec, Error Handling, Overview, Registration in Claude Code, Repository, `search_dribbble` (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.18
Nodes (10): Architecture, Contact Form Design, Dependencies, Email Format, Form Fields, Goal, Out of Scope, Page Layout (+2 more)

### Community 18 - "Community 18"
Cohesion: 0.56
Nodes (10): CJ Mark Color Variant Set, CJ Mark Gradient (Purple to Teal), CJ Mark Internal Division Lines, CJ Mark SVG (Full Color), CJ Mark Triangle Shape, CJ Mark Ink SVG, CJ Mark Mono SVG, CJ Mark White SVG (+2 more)

### Community 19 - "Community 19"
Cohesion: 0.44
Nodes (9): CJ Studio App Icon (180px), CJ Studio Brand Color Palette, CJ Studio Brand Identity System, CJ Studio Triangle Brand Mark, CJ Studio Wordmark Typography, CJ Studio Favicon (32px), CJ Studio Favicon (64px), CJ Studio Horizontal Lockup (Transparent Background) (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.22
Nodes (8): Accessibility & Inclusion, Anti-references, Brand Personality, Design Principles, Product, Product Purpose, Register, Users

### Community 21 - "Community 21"
Cohesion: 0.22
Nodes (8): File Map, Landing Page Polish Implementation Plan, Self-Review, Task 1: Fix Nav Text Consistency, Task 2: Tighten Scroll Animation Timing, Task 3: Add CJ Studio Logo on Laptop Screen, Task 4: Improve Hero Image Rendering Quality, Task 5: Redesign Horizontal Carousel Content

### Community 22 - "Community 22"
Cohesion: 0.22
Nodes (8): 1. Typography — `app/layout.tsx`, 2. Aurora Animation — `app/globals.css`, 3. Aurora Background Component — `components/aurora-background.tsx`, 4. Hero Assembly — `app/page.tsx`, Constraints, Files Changed, Hero Section — Design Spec, Objective

### Community 23 - "Community 23"
Cohesion: 0.15
Nodes (7): FormState, resend, sendEnquiry(), MotionLink, Props, FormState, initialState

### Community 24 - "Community 24"
Cohesion: 0.20
Nodes (4): Props, aspectRatios, LogoProps, srcs

### Community 25 - "Community 25"
Cohesion: 0.43
Nodes (7): CJ Studio Agency Brand (Ollie Jackson + Josh Carter), Flat Fee Pricing Model (50% deposit), Stripe Payment Processing, UK GDPR / Data Protection Act 2018 Compliance, Vercel Hosting Infrastructure, Privacy Policy Page, Terms of Service Page

### Community 26 - "Community 26"
Cohesion: 0.25
Nodes (7): File Map, Hero Section Implementation Plan, Task 1: Add aurora CSS tokens and keyframe to globals.css, Task 2: Replace Geist with Plus Jakarta Sans in layout.tsx, Task 3: Create the AuroraBackground component, Task 4: Rebuild page.tsx as the hero, Task 5: Verify the hero renders correctly

### Community 27 - "Community 27"
Cohesion: 0.29
Nodes (6): 1. The Core Objective, 2. The Tech Stack, 3. Brand Identity & Aesthetics, 4. Sitemap & Page Routing, 5. The Golden Rules for AI Assistance, CJ Studio - Global Architecture & Development Rules

### Community 28 - "Community 28"
Cohesion: 0.29
Nodes (3): plans, webDesignFeatures, metadata

### Community 29 - "Community 29"
Cohesion: 0.29
Nodes (6): File Map, Task 1: Add prism animation transform hooks, Task 2: Update container structure, Task 3: Add foreground glass prism layer, Task 4: Visual verification, WebsiteAssembly 3D Prism Scene Implementation Plan

### Community 32 - "Community 32"
Cohesion: 0.33
Nodes (4): fontMono, fontSans, fontSpaceGrotesk, metadata

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (3): links, contacts, metadata

### Community 37 - "Community 37"
Cohesion: 0.33
Nodes (5): Build Status, Issues Caught & Fixed During Review, Landing Page Implementation Progress, Pending: Visual QA Checks, Status: 8/9 Tasks Complete — Awaiting Visual QA

### Community 38 - "Community 38"
Cohesion: 0.40
Nodes (5): FormState Interface (name/email/message errors), sendEnquiry Server Action, Resend Transactional Email (RESEND_API_KEY), Next.js Server Action Pattern, Resend Email SDK

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (5): Brand Direction Brainstorm (Bold Dark / Editorial / Brutalist / Minimal), Brand Direction Option: Bold & Dark, Brand Direction Option: Brutalist Fresh, Brand Direction Option: Editorial / Craft, Brand Direction Option: Refined Minimal

### Community 40 - "Community 40"
Cohesion: 0.40
Nodes (3): founders, principles, steps

### Community 42 - "Community 42"
Cohesion: 0.53
Nodes (6): Services Component, Adaptive Plan (£45/mo), Free Hosting Plan, Simple Plan (£15/mo), Hosting and Upkeep Service, Web Design Service

### Community 43 - "Community 43"
Cohesion: 0.60
Nodes (5): contact-form.tsx (planned), Contact Form Design Spec, Contact Page Route (/contact), Resend Email Service Integration, send-enquiry Server Action (planned)

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (4): commentSyntax, cspChecked, files, insertBefore

### Community 46 - "Community 46"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 47 - "Community 47"
Cohesion: 0.50
Nodes (4): Multi-Page App Router Architecture, Founders Page, Process Page, Services Page

### Community 76 - "Community 76"
Cohesion: 0.25
Nodes (7): CJ Studio — Progress Summary (2026-06-13), Deployed, Laptop Zoom Hero, Light-theme audit (2 parallel agents), Nav behaviour, Session 1 — Inner pages + polish pass, Session 2 — Laptop zoom animation + light-theme enforcement

## Knowledge Gaps
- **318 isolated node(s):** `Session 1 — Inner pages + polish pass`, `Laptop Zoom Hero`, `Nav behaviour`, `Light-theme audit (2 parallel agents)`, `Deployed` (+313 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CJ Studio Production Workflow Design Spec` connect `Community 0` to `Community 9`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `CJ Workflow Documents Implementation Plan` connect `Community 9` to `Community 0`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `Session 1 — Inner pages + polish pass`, `Laptop Zoom Hero`, `Nav behaviour` to the rest of the system?**
  _365 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.059379217273954114 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._