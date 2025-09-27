# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `npm run dev` - Start development server with Turbopack
- **Build**: `npm run build` - Build for production with Turbopack
- **Production**: `npm start` - Start production server
- **Lint**: `npm run lint` - Run ESLint

## Project Architecture

This is a **Next.js 15.5.4** project using the App Router with **React 19**, **JavaScript** (not TypeScript), and **shadcn/ui** components.

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **UI**: shadcn/ui components (New York style, configured for JavaScript)
- **Styling**: Tailwind CSS v4 with custom CSS variables
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Icons**: Lucide React
- **Utils**: clsx and tailwind-merge for conditional styling

### Directory Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.js       # Root layout with Navbar and fonts
│   ├── page.js         # Homepage (currently empty)
│   └── globals.css     # Global styles with Tailwind and theme variables
├── components/         # React components
│   └── Navbar.js       # Main navigation component
└── lib/
    └── utils.js        # Utility functions (cn helper)
```

### Key Configuration
- **Path aliases**: `@/*` maps to `./src/*` (configured in jsconfig.json)
- **shadcn/ui**: Configured with path aliases for `@/components`, `@/lib`, etc.
- **ESLint**: Uses Next.js core web vitals config
- **Styling**: Uses CSS variables for theming with light/dark mode support

### Component Patterns
- All components use JavaScript (not TypeScript)
- Import Next.js optimized components (`Image`, `Link`) when needed
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui conventions for component structure

### Brand
The application appears to be called "WEBridge" based on the Navbar component.