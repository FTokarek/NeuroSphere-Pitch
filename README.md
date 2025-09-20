# NeuroSphere Pitch - Portfolio Website

A modern, minimalist portfolio website built with Next.js, GSAP animations, and Lenis smooth scrolling. Features an elegant design with dynamic view switching between list and grid layouts, animated logo reveals, and smooth image hover effects.

## Features

- **Next.js 14** - React framework for production
- **GSAP Animations** - Professional animations with Flip, ScrollTrigger, and CustomEase
- **Lenis Smooth Scrolling** - Buttery smooth scroll experience
- **Responsive Design** - Mobile-first approach with breakpoints
- **Dynamic View Switching** - Smooth transitions between list and grid layouts
- **Interactive Hover Effects** - Image previews and exclusion blend modes
- **Typography** - PP Neue Montreal font for modern aesthetics
- **Noise Effects** - Animated background textures for visual interest

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Animations**: GSAP (Flip, ScrollTrigger, CustomEase)
- **Scrolling**: Lenis smooth scroll
- **Styling**: CSS3 with CSS Grid and Flexbox
- **Font**: PP Neue Montreal

## Project Structure

```
├── components/          # React components
│   ├── Logo.tsx        # Main logo component
│   └── FooterLogo.tsx  # Footer logo component
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # Document head
│   └── index.tsx      # Main page
├── styles/             # Global styles
│   └── globals.css    # Main stylesheet
└── public/            # Static assets
```

## Features Implementation

### GSAP Animations
- Logo reveal animations with clip-path
- Smooth view transitions using Flip plugin
- ScrollTrigger for footer animations
- Custom easing functions

### Interactive Elements
- Dynamic hover effects with image previews
- Exclusion blend mode for text overlays
- Responsive image containers with aspect ratios
- Smooth popup transitions

### Performance Optimizations
- Image preloading for smooth interactions
- Debounced scroll and mouse events
- Efficient event listener management
- Will-change properties for smooth animations

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Browser Support

Modern browsers with support for:
- CSS Grid and Flexbox
- CSS clip-path
- Mix-blend-mode
- ES6+ JavaScript features
