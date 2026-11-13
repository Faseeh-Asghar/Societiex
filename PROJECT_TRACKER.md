# 🏛️ SOCIETIX — MASTER PROJECT TRACKER & LIVING MEMORY

> **Status:** Active Reference & Permanent Memory Core  
> **Repository Root:** `F:\Society managment`  
> **Last Updated:** 2026-11-13  
> **Project Goal:** Build an industry-standard, visually captivating, full-stack university society management platform (FAST-NUCES case study) adhering strictly to bespoke, human-crafted design standards.

---

## 📌 1. Immutable Rules & Working Philosophy

Every interaction, update, and code change must strictly adhere to the following principles:

1. **Session Memory & Living Document:**
   - This file (`PROJECT_TRACKER.md`) is the single source of truth.
   - It will be maintained, updated, and **appended** in **every single session** without needing explicit reminders.
   - **Never delete past historical context**: Always append new sessions, decisions, corrections, and evolution milestones so we have a permanent trace from start to finish.

2. **Chunk-by-Chunk Modular Development:**
   - We **never** write everything all at once. Work is broken into laser-focused, digestible chunks (e.g., a single component, a single page, a single endpoint, or a specific workflow).
   - Even when designing a single page or component, the code must be architected for modularity, clean scalability, and easy routing integration.

3. **Anti-"Default AI" UI/UX Mandate:**
   - **NO** generic AI design tropes: no neon gradients, no space/cyberpunk glow, no jarring purple/cyan wash, no generic template cards.
   - **YES** to authentic, human-centric, high-end aesthetics:
     - Thoughtful typography, balanced whitespace, and purposeful micro-interactions.
     - Rich motion: smooth cubic-bezier transitions, staggered list entrance animations, tactile card hover effects, lateral drawer slide-overs.
     - Modern navigation: sleek responsive hamburger / drawer sidebars instead of rigid, archaic full-width sidebars.
     - Earthy, cinematic tones matching real-world media and university prestige.

4. **Strict Separation of Public Website vs. Management Console:**
   - **NO "President Portal" or "Admin Console" buttons on the public website.** Professional platforms (Notion, Linear, Apple) never expose internal role dashboards on public marketing sites.
   - **NO Role-Explainer marketing sections** (Guest vs Member vs President vs Super Admin) on public pages.
   - The public website functions as an editorial magazine celebrating university societies, student achievements, and upcoming events.

5. **Beginner-Friendly Mentorship & Guidance:**
   - Explain *why* something is built the way it is, in clear, jargon-free steps.
   - Proactively suggest industry-standard design patterns, file layouts, and security practices.
   - When reaching a critical architectural or design fork, present clear options with trade-offs.

6. **Exhaustive Code Documentation:**
   - Every file must include clear explanatory comments detailing purpose, data flow, props/parameters, and historical changes.

---

## 🎯 2. Core Problem & Product Vision

### The Problem
* University societies depend on a disjointed collage of informal tools: WhatsApp groups, Google Sheets, Instagram pages, paper RSVP sheets.
* Freshmen face immense discovery friction and chat noise.
* Society handovers result in massive institutional data loss (past members, event histories, awards, assets disappear with graduating leadership).
* The university administration (e.g., Office of Student Affairs / OSA) has zero centralized oversight or compliance record.

### The Solution: Societix
A unified web platform bridging students, society executives, university admins, and public visitors:
* **Public Site (Editorial & Discovery):** Explore campus societies, view upcoming fixtures, RSVP to events, and discover campus life with authentic photography and zero friction.
* **Student Members:** Join societies through structured recruitment cycles, participate in events, and build a verified co-curricular record.
* **Society Executives (Separate Portal):** Manage club rosters, create events, publish media recaps, and review applications.
* **University Super Admins (OSA):** Review and charter new societies, enforce campus compliance, and oversee co-curricular affairs.

---

## 🧱 3. Master Planned Architecture & Directory Structure

```text
f:/Society managment/
│
├── PROJECT_TRACKER.md              # 📄 Living Master Record & Session History
│
├── client/                         # 💻 Frontend Web Application (React 19 + Vite 6 + Tailwind + Framer Motion)
│   ├── public/
│   │   ├── favicon.svg
│   │   └── societies/              # 🖼️ 29 authentic campus photos & logos from FAST CFD
│   │       ├── campus-01.webp - campus-29.jpeg
│   │       └── logos/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/             # Hero slider photos (1.1.jpeg - 1.5.jpeg)
│   │   │   └── societies/          # Society assets & logo media
│   │   ├── components/
│   │   │   ├── common/             # HandSketchedBackground, BrandLogo, FullscreenPhotoSlider, ScrollReveal, ScrollToTop
│   │   │   ├── layout/             # Navbar (frosted glass), MobileDrawer (lateral slide-out), Footer (editorial)
│   │   │   └── landing/            # HeroOverlay, SocietyStrip (horizontal rail), EventsPreview, PhotoMosaic
│   │   ├── data/
│   │   │   ├── societies.js        # 18 chartered FAST-NUCES CFD societies dataset
│   │   │   └── events.js           # Campus fixtures & RSVP dataset
│   │   ├── pages/
│   │   │   ├── Landing/            # Editorial landing page with hero slider & content stream
│   │   │   ├── Societies/          # Complete directory (SocietiesPage) & profile (SocietyProfilePage)
│   │   │   ├── Events/             # Calendar, status filters & RSVP modals (EventsPage)
│   │   │   ├── About/              # FAST-NUCES CFD chapter narrative & pillars (AboutPage)
│   │   │   └── Auth/               # Clean student sign-in (LoginPage) & registration (SignupPage)
│   │   ├── utils/
│   │   │   └── cn.js               # clsx + tailwind-merge helper
│   │   ├── App.jsx                 # Master orchestrator & React Router 7 setup
│   │   └── main.jsx                # BrowserRouter root entry
│   ├── package.json
│   └── vite.config.js
│
└── server/                         # ⚙️ Backend API & Business Logic (Scheduled for later phase)
```

---

## 🎨 4. Visual Identity & Design System Guidelines

* **Typography Hierarchy:**
  * **Brand Display / Monolith:** `Cinzel` (Roman lapidary serif, letter-spaced) paired with `Cormorant Garamond` for academic prestige and timeless gravitas.
  * **Body / Interface:** `Inter` for crisp, readable UI text and metrics.
  * **Telemetry / Badges:** `JetBrains Mono` for dates, counters, short names `[SES]`, and status tags.
* **Color Philosophy:**
  * **Dark Stone Obsidian Canvas:** `#14110f` &rarr; `#171412` &rarr; `#1b1714` (warm mountain dusk, zero generic AI purple/neon).
  * **Accents:** Warm amber / champagne gold (`text-amber-200`, `bg-amber-400/20`), emerald green for active status, pure white `#ffffff` for primary text.
  * **Borders:** Ultra-fine hairline borders (`border-white/10` or `border-white/15`).
  * **Landed Brandmark:** **100% Solid Pure Crisp White (`#ffffff`)** floating over dark imagery with high-contrast editorial clarity (`drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]`).

---

## ⚠️ 5. Mistakes, User Critiques & Design Pivots (The What-We-Learned Register)

1. **Initial Boxing & Progress Bars (Mistake in Session 3):**
   * *What Happened:* Built a card box around the logo with a telemetry progress bar and percentage text.
   * *User Critique:* "Don't box it up, don't show anything else, like any other writing or bars just the logo."
   * *Correction:* Removed all bounding boxes, borders, and progress text. Kept only the naked brandmark with internal liquid fill.

2. **Submerged & Invisible Hand Sketches (Mistake in Session 4):**
   * *What Happened:* Architectural sketches in the background were too faint and dark, blending into the dark void.
   * *User Critique:* "Sketches are not visible in the background they are so submerged... balance theme and make it more classic."
   * *Correction:* Elevated sketch stroke contrast, moved to warm chalk tones with variable opacity, and expanded icon vocabulary.

3. **Multi-color "LGBTQ" Gradient Fill (Mistake in Session 4):**
   * *What Happened:* Used vibrant saturated multi-color gradient inside the logo fill.
   * *User Critique:* "The colors you are filling it up are giving me LGBTQ vibe, also use sketchy colors and themes... and make logo bigger."
   * *Correction:* Eliminated rainbow colors immediately. Shifted to natural water and crystal gradients; enlarged logo viewBox to 800px.

4. **CSS `transition-all` Conflict with Framer Motion (Glitch in Session 5):**
   * *What Happened:* When the logo transitioned to the upper-left corner, it snapped larger for a split second before moving.
   * *Root Cause:* Tailwind's `transition-all` on the CSS container clashed with Framer Motion's mathematical coordinate interpolation.
   * *Correction:* Stripped out conflicting CSS transition classes. Let Framer Motion solely control `top`, `left`, `x`, `y`, and `width` using a bespoke `[0.16, 1, 0.3, 1]` cubic-bezier curve.

5. **Random Clutter & Footer Text (Mistake in Session 6):**
   * *What Happened:* Added "FAST NUCES", "V1.0", telemetry badges, and a "Replay Intro" button.
   * *User Critique:* "Don't add any random text like you did with fast nuces and version 1 and remove replay button."
   * *Correction:* Stripped all extraneous text, badges, and controls. The landing page remains 100% focused on photography and brandmark.

6. **Circling Rings & Blueprint Grid Lines (Mistake in Session 6 & 7):**
   * *What Happened:* Added decorative orbital rings around the logo and a technical grid mesh in the background.
   * *User Critique:* "Remove the circles that are circling the logo... clean up square boxes in the background."
   * *Correction:* Deleted orbital SVG circles and CSS grid background, restoring organic openness.

7. **Synthetic Blue Bottom Water vs. Mountain Landscape (Mistake in Session 7-9):**
   * *What Happened:* Built a bright artificial blue wave at the bottom of the screen.
   * *User Critique:* "Can you see the imgs we added their color scheming and vibe, make it more relative to them... especially the first photo."
   * *Correction:* Discarded synthetic blue water entirely. Recalibrated background and lighting to the warm cinematic mountain dusk and sandstone earth of `1.1.jpeg`.

8. **Landed Logo Styling (Correction in Session 11):**
   * *User Instruction:* "When we fully land to our first, the societix logo should be fully white."
   * *Correction:* State-driven conditional rendering: during intro it has the crystal dusk fill; once `isLanded` is true, it renders as a crisp **100% solid pure white (`#ffffff`)** vector.

9. **Old `f:\Societiex` Attempt Clutter & Role Exposure (Critical Lesson in Session 13):**
   * *What Happened in Old Project:* Put a "President Portal" button directly in the Hero banner, added a "Role Explainer" card section teaching visitors about database roles (Guest/Member/President/Admin), used generic AI copy ("Platform Now Live", "reimagined"), and washed out the color theme into beige paper.
   * *User Directive:* "Don't add president portal button or things like that in the main website as no professional website do that, they have separate things, have proper working and organizing... don't do this thing again... build professionally not an AI project."
   * *Correction:* Completely isolated the public website as an editorial discovery experience. No admin/president buttons on the public navbar or hero. Extracted 18 real societies from the university screenshots and integrated 29 authentic student photos.

---

## 🗓️ 6. Master Session History & Evolution Log

| Session & Date | User Directives & Requests | Architectural Changes & Implemented Solutions | Status |
| :--- | :--- | :--- | :--- |
| **Session 0**<br>2026-10-11 | • Analyze proposal document `24F-0646_24F-0776_24F-0794_P1.pdf`.<br>• Focus purely on full-stack web architecture (disregard mobile prototype constraints). | • Extracted core problems (fragmentation, lost history, zero OSA oversight).<br>• Defined four user roles: Super Admin, Society Admin, Member, Guest.<br>• Outlined full-stack scope and created `PROJECT_TRACKER.md`. | ✅ Completed |
| **Session 1**<br>2026-10-11 | • Study Pamidor Design, DAQ Consulting, NexDash.<br>• Adopt high industry standards, kinetic animations, anti-AI themes. | • Deconstructed reference sites for stage curtains, lateral slide drawers, and typography.<br>• Formulated visual identity matrix and motion guidelines. | ✅ Completed |
| **Session 2**<br>2026-10-11 | • Setup full-stack directory structure in `F:\Society managment`. | • Scaffolding created: `client/`, `server/`, `uploads/`.<br>• Set up component subdirectories (`common/`, `layout/`, `feed/`, `events/`). | ✅ Completed |
| **Session 3**<br>2026-10-11 | • Start Chunk 1: Very first page & brand intro. | • Bootstrapped React 19, Vite 6, Tailwind CSS 3.4, Framer Motion 12.<br>• Built initial stage preloader with telemetry and curtain lift. | ✅ Completed |
| **Session 4**<br>2026-10-11 | • User requested unboxing: no boxes, no bars, only logo.<br>• Add hand-sketched drawings in background.<br>• Glide logo to upper-left navbar corner on landing. | • Removed all progress bars and boxes.<br>• Hand-sketched 12 university/society SVG drawings.<br>• Built initial corner glide transition with Framer Motion. | ✅ Completed |
| **Session 5**<br>2026-10-11 | • Sketches too submerged/invisible; balance contrast.<br>• Logo too plain; make classic/glassmorphic.<br>• Remove "LGBTQ" multi-color fill; make logo bigger. | • Switched logo font to classical Roman lapidary `Cinzel` serif.<br>• Boosted sketch stroke visibility.<br>• Replaced rainbow fill with natural monochrome and subtle amber reflections.<br>• Enlarged SVG viewBox to 800x150. | ✅ Completed |
| **Session 6**<br>2026-10-11 | • Fix logo scale glitch when transitioning.<br>• Add more relevant sketches (university/student/sports/music).<br>• Lighten background; remove circling rings and gold color; make logo B&W. | • Diagnosed and fixed CSS `transition-all` vs. Framer Motion layout conflict.<br>• Expanded sketches to 16 campus icons (DJ decks, bats, football, mic, books).<br>• Stripped orbital circles and converted logo to monochrome glass outline. | ✅ Completed |
| **Session 7**<br>2026-10-11 | • Remove random text ("FAST NUCES", "V1.0") and replay button.<br>• Remove grid boxes from background.<br>• Make bottom water cover 100% full width and look natural. | • Removed all footer text, telemetry readouts, and replay buttons.<br>• Removed blueprint background grid.<br>• Engineered full-width SVG water wave across viewport width. | ✅ Completed |
| **Session 8**<br>2026-10-11 | • Keep all 15+ sketches.<br>• Change background color to lighter/whiter tone inspired by Jam3 FWA100 (`fwa100.jam3.com`). | • Refactored canvas to soft Jam3 alabaster tones (`#f8f7f4`).<br>• Rendered all 16 sketches with warm bone chalk and graphite ink.<br>• Cleaned container margins to eliminate all framing boxes. | ✅ Completed |
| **Session 9**<br>2026-10-11 | • User provided 5 photos in `client/src/assets/images/` (`1.1.jpeg` to `1.5.jpeg`).<br>• Landing page must feature full-page horizontal photo slider.<br>• 1 photo at a time, 6s auto-rotation, horizontal mouse drag / touchpad swipe only. | • Built `FullscreenPhotoSlider.jsx` with Framer Motion `AnimatePresence`.<br>• Implemented gesture filter: strictly horizontal `drag="x"` and `wheel deltaX`, ignoring vertical scroll.<br>• Added subtle luxury pagination counter (`01 / 05`). | ✅ Completed |
| **Session 10**<br>2026-10-11 | • Verified horizontal photo slider, auto-rotation, and production build. | • Production build compiled cleanly in 5.61s with zero errors.<br>• Dev server running on `http://localhost:5173/`. | ✅ Completed |
| **Session 11**<br>2026-10-11 | • Harmonize intro color scheme with user's Photo 1 (`1.1.jpeg`).<br>• Remove synthetic blue water.<br>• When fully landed, `SOCIETIX` logo must be **100% solid pure white**. | • Recalibrated canvas to warm cinematic mountain dusk (`#1c1815` → `#241e1a` → `#14110f`).<br>• Removed synthetic blue water for atmospheric cohesion with real mountain photography.<br>• Updated `BrandLogo.jsx` so landed state renders in **100% pure solid white (`#ffffff`)** in top-left navbar.<br>• Verified clean build and live HMR. | ✅ Completed |
| **Session 12**<br>2026-10-11 | • Session Wrap-up & Memory Consolidation:<br>User instructed to update memory file, remember every detail concisely (chat, decisions, mistakes, corrections), and maintain an appended record without deletions. | • Comprehensive consolidation of all 12 sessions, technical bugs, critiques, and solutions in `PROJECT_TRACKER.md`.<br>• Dev server closed cleanly; codebase primed for next session. | ✅ Completed |
| **Session 13**<br>2026-11-13 | • Resumed after 1 month gap.<br>• User provided `f:\society part 1` with Word doc containing screenshots of 18 FAST-NUCES CFD societies, and 29 real campus photos.<br>• User referenced old `f:\Societiex` attempt with instructions: "don't do this thing again... no president portal button on public website... professional build, not an AI project".<br>• Approved `frontend-build-plan.md` artifact. | • Installed `react-router-dom@7.18.5` and `react-intersection-observer@11.0.1`.<br>• Formatted and organized 29 campus photos into `public/societies/campus-01` to `campus-29`.<br>• Extracted all 18 real societies into `src/data/societies.js`.<br>• Extracted mock campus events into `src/data/events.js`.<br>• Created `ScrollReveal.jsx` and `ScrollToTop.jsx`.<br>• Created `Navbar.jsx` (frosted glass on scroll) and `MobileDrawer.jsx` (DAQ Consulting slide-out drawer).<br>• Built landing content stream: `HeroOverlay.jsx`, `SocietyStrip.jsx`, `EventsPreview.jsx`, `PhotoMosaic.jsx`, and `Footer.jsx`.<br>• Built complete `SocietiesPage.jsx` directory with live search and category filter pills.<br>• Built `SocietyProfilePage.jsx` with dynamic routing, gallery, events list, and clean Join Application modal.<br>• Built `EventsPage.jsx` with calendar status filters and interactive RSVP modal.<br>• Built `AboutPage.jsx` with FAST-NUCES CFD narrative and core pillars.<br>• Built split-screen `LoginPage.jsx` and `SignupPage.jsx` with zero role clutter.<br>• Wired all routes in `App.jsx` + `main.jsx` with React Router 7.<br>• Production build verified (`✓ built in 26.16s` with zero errors).<br>• Dev server active on `http://localhost:5173/`. | ✅ Completed |

---

## 📦 7. Current Live State & Component Inventory

* **Frontend Framework:** React 19 + Vite 6 + Tailwind CSS 3.4 + Framer Motion 12 + React Router 7.
* **Typography:** `Cinzel` (Roman Serif brandmark & headers), `Inter` (UI elements & body), `JetBrains Mono` (dates, tags, counters).
* **Live Routes:**
  * `/` &rarr; Landing Page (Intro preloader, 5-photo slider with horizontal drag, HeroOverlay, SocietyStrip, EventsPreview, PhotoMosaic, Footer).
  * `/societies` &rarr; Complete directory of all 18 FAST CFD societies with search and category pills.
  * `/societies/:id` &rarr; Individual society profile with cover, description, events, photo gallery, and Join Modal.
  * `/events` &rarr; Upcoming campus fixtures, status filters, and attendee RSVP modal.
  * `/about` &rarr; FAST-NUCES CFD story, institutional memory mission, and pillars.
  * `/auth/login` &rarr; Student email/roll-number sign-in with split visual layout.
  * `/auth/signup` &rarr; Student registration with roll number and credentials.
* **Component Inventory:**
  * [`BrandLogo.jsx`](file:///f:/Society%20managment/client/src/components/common/BrandLogo.jsx): Unboxed Roman `SOCIETIX` brandmark. Liquid fill intro &rarr; glides to upper-left corner &rarr; 100% pure white (`#ffffff`).
  * [`HandSketchedBackground.jsx`](file:///f:/Society%20managment/client/src/components/common/HandSketchedBackground.jsx): 16 hand sketches on warm mountain dusk gradient.
  * [`FullscreenPhotoSlider.jsx`](file:///f:/Society%20managment/client/src/components/common/FullscreenPhotoSlider.jsx): Full-screen cover photo carousel with 6s auto-timer and horizontal drag/swipe gestures.
  * [`HeroOverlay.jsx`](file:///f:/Society%20managment/client/src/components/landing/HeroOverlay.jsx): Non-blocking editorial headline and "Scroll to Discover ↓" trigger.
  * [`SocietyStrip.jsx`](file:///f:/Society%20managment/client/src/components/landing/SocietyStrip.jsx): Curated horizontal scroll rail with 10 societies.
  * [`EventsPreview.jsx`](file:///f:/Society%20managment/client/src/components/landing/EventsPreview.jsx): 4 upcoming campus events with `JetBrains Mono` dates.
  * [`PhotoMosaic.jsx`](file:///f:/Society%20managment/client/src/components/landing/PhotoMosaic.jsx): Asymmetrical masonry grid of authentic campus photography.
  * [`Navbar.jsx`](file:///f:/Society%20managment/client/src/components/layout/Navbar.jsx): Frosted glass navigation with links, "Sign In", "Explore Clubs", and mobile trigger.
  * [`MobileDrawer.jsx`](file:///f:/Society%20managment/client/src/components/layout/MobileDrawer.jsx): Lateral slide-out drawer from right with spring physics.
  * [`Footer.jsx`](file:///f:/Society%20managment/client/src/components/layout/Footer.jsx): Monochromatic academic footer with university address and links.
  * [`ScrollReveal.jsx`](file:///f:/Society%20managment/client/src/components/common/ScrollReveal.jsx): Reusable scroll entrance animation.
  * [`ScrollToTop.jsx`](file:///f:/Society%20managment/client/src/components/common/ScrollToTop.jsx): Route change scroll reset.
  * [`societies.js`](file:///f:/Society%20managment/client/src/data/societies.js): 18 real FAST CFD societies.
  * [`events.js`](file:///f:/Society%20managment/client/src/data/events.js): Campus fixtures with RSVP state.

---

## 🚀 8. Roadmap & Next Chunks

1. **User Testing & Review:**
   * Open `http://localhost:5173/` in your browser.
   * Check the initial intro glide, landing scroll flow, `/societies` directory & search, `/societies/:id` profile views & join modal, `/events` RSVP, and mobile drawer.
2. **Next Steps:**
   * Backend API planning (Node.js/Express with database models for societies, memberships, events, and RSVPs).
   * Society Management Portal (dedicated separate application for society presidents and executives, completely segregated from the public site).
