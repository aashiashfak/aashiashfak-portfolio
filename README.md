# Aashi Ashfak — Portfolio

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Stack
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- GSAP 3.14 + ScrollTrigger
- Three.js (3D hero particles)
- Lenis (smooth scroll)

## Structure
```
app/
  components/
    sections/    # Hero, About, TechStack, Projects, Experience, Contact, Footer
    ui/          # Cursor, Loader, Navbar
    hooks/       # useLenis
  lib/
    data.ts      # All site content — edit here
  globals.css
  layout.tsx
  page.tsx
```

## Key Features
- 3D Three.js particle field hero with mouse parallax
- GSAP cinematic loader (letter stagger + count bar)
- Sticky stacking project cards with ScrollTrigger scale-down
- Full 4-column tech stack grid (no orphaned columns)
- Gaming aesthetic: clip-path corners, HUD decorations, scanlines
- Animated terminal contact section with typewriter
- Lenis smooth scrolling synced with ScrollTrigger
- Custom lag-ring cursor
- Mobile responsive
