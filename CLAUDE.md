# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Vivek Keshava built with Next.js 14, deployed as a static site to GitHub Pages.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production (outputs to ./out)
npm run lint     # Run ESLint
npm run start    # Start production server (local testing)
```

## Architecture

### Static Export Configuration

This site uses Next.js static export (`output: 'export'` in `next.config.js`). All pages are pre-rendered to static HTML at build time and deployed to GitHub Pages. Images are unoptimized for static hosting compatibility.

### Structure

- **app/page.tsx**: Single-page portfolio with all sections (About, Experience, Skills, Education, Projects, Publications, Resources, Contact)
- **app/layout.tsx**: Root layout with metadata, SEO configuration, and Open Graph tags
- **components/ui/**: shadcn/ui component library (Radix UI primitives + Tailwind styling)
- **lib/utils.ts**: `cn()` utility for merging Tailwind classes

### Styling

- Tailwind CSS v3 with CSS variables for theming (defined in `app/globals.css`)
- shadcn/ui components configured via `components.json`
- Custom animations: `animate-fade-in-up`, `animate-slide-in-left`, `animate-slide-in-right`
- Dark mode support configured but not actively used

### Deployment

GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys to GitHub Pages on push to `main` branch.
