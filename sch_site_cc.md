# International School Website - Complete Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [File Structure](#file-structure)
4. [Configuration Files](#configuration-files)
5. [Source Code Documentation](#source-code-documentation)
6. [Components](#components)
7. [Pages](#pages)
8. [Database Integration](#database-integration)
9. [Assets & Media](#assets--media)
10. [SEO & Performance](#seo--performance)
11. [Development & Deployment](#development--deployment)
12. [Key Features](#key-features)

---

## Project Overview

**International School Website** is a modern, comprehensive educational institution website built with cutting-edge web technologies. This project represents a complete digital presence for an international school, featuring dynamic content management, student information, news and events, and admissions processing.

### Key Statistics
- **Framework**: Astro 5.2.5 (Static Site Generation)
- **UI Framework**: Tailwind CSS 3.4.1
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Icons**: Lucide-Astro
- **Deployment**: Netlify ready with configuration
- **Performance**: Optimized for Core Web Vitals
- **SEO**: Fully optimized with structured data

### School Information Modeled
- **Student Population**: 500+ students from 25+ countries
- **Educational Levels**: Primary (K-5), Middle (6-8), Senior (9-11), Sixth Form (12-13)
- **Accreditations**: IB World School, Cambridge International, WASC, CIS Member
- **Established**: 1999 (25+ years of educational excellence)

---

## Technical Architecture

### Frontend Stack
- **Astro 5.2.5**: Modern static site generator with partial hydration
- **TypeScript**: Type-safe development with full IntelliSense
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Tailwind Typography Plugin**: Enhanced text styling
- **Lucide-Astro**: Beautiful, customizable SVG icons

### Backend & Data
- **Supabase**: Open-source Firebase alternative
- **PostgreSQL**: Relational database with real-time capabilities
- **TypeScript Types**: Full type safety for database entities

### Build & Deployment
- **Vite**: Lightning-fast build tool and dev server
- **Netlify**: Static hosting with CDN and edge functions
- **Hot Module Replacement**: Instant development updates

---

## File Structure

```
shgh-int-school/
├── README.md                     # Project documentation
├── astro.config.mjs             # Astro configuration
├── netlify.toml                 # Netlify deployment config
├── package.json                 # Dependencies & scripts
├── package-lock.json            # Dependency lock file
├── seo_guidelines.md           # Comprehensive SEO guide
├── tailwind.config.mjs         # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── 
├── dist/                       # Built site (generated)
├── node_modules/              # Dependencies (generated)
├── 
├── public/                    # Static assets
│   ├── favicon.svg           # Site favicon
│   ├── robots.txt           # Search engine crawler rules
│   ├── images/             # Image assets (37 files)
│   ├── medias/            # Documents (PDF prospectus)
│   └── videos/           # Video content
├── 
└── src/                      # Source code
    ├── components/          # Reusable UI components
    │   ├── CalendarWidget.astro
    │   ├── EventCard.astro
    │   ├── Footer.astro
    │   ├── Header.astro
    │   ├── Hero.astro
    │   └── NewsCard.astro
    ├── 
    ├── layouts/            # Page layouts
    │   └── Layout.astro   # Main layout template
    ├── 
    ├── lib/              # Utility libraries
    │   └── supabase.ts   # Database client & types
    ├── 
    ├── pages/           # Route-based pages
    │   ├── index.astro         # Homepage
    │   ├── about.astro         # About page
    │   ├── academic-programs.astro
    │   ├── academic-year.astro
    │   ├── campus-facilities.astro
    │   ├── contact.astro
    │   ├── privacy-policy.astro
    │   ├── 404.astro           # Error page
    │   ├── sitemap.xml.ts      # Dynamic sitemap
    │   ├── 
    │   ├── events/            # Events section
    │   │   ├── index.astro    # Events listing
    │   │   └── [slug].astro   # Individual event
    │   └── 
    │   └── news/             # News section
    │       ├── index.astro   # News listing
    │       ├── [slug].astro  # Individual article
    │       ├── archive.astro # News archive
    │       ├── archive/
    │       │   └── [page].astro
    │       ├── category/
    │       │   └── [slug].astro
    │       ├── tag/
    │       │   └── [slug].astro
    │       └── [year]/
    │           └── [month].astro
    └── 
    └── env.d.ts            # Environment type definitions
```

---

## Configuration Files

### package.json
**Location**: `/package.json`

```json
{
  "name": "@example/basics",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build", 
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/tailwind": "^5.1.2",
    "@supabase/supabase-js": "^2.52.1",
    "@tailwindcss/typography": "^0.5.10",
    "astro": "^5.2.5",
    "lucide-astro": "^0.460.0",
    "marked": "^16.1.1",
    "tailwindcss": "^3.4.1"
  }
}
```

**Purpose**: Defines project dependencies, build scripts, and metadata. Uses module type for ES6 imports.

### astro.config.mjs
**Location**: `/astro.config.mjs`

**Purpose**: Configures Astro build behavior
- **Integrations**: Tailwind CSS
- **Output**: Static site generation
- **Site URL**: Placeholder for production domain
- **Build Optimization**: Automatic CSS inlining
- **Vite Config**: Custom asset naming and HMR timeout

### tailwind.config.mjs
**Location**: `/tailwind.config.mjs`

**Purpose**: Tailwind CSS customization
- **Custom Colors**: Primary green palette (50-900), Custom gray scale
- **Typography**: Inter font family integration
- **Spacing**: Additional spacing utilities (18, 88)
- **Plugins**: Typography plugin for rich text content

### tsconfig.json
**Location**: `/tsconfig.json`

**Purpose**: TypeScript configuration extending Astro's strict preset

### netlify.toml
**Location**: `/netlify.toml`

**Purpose**: Netlify deployment configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Redirects**: SPA-style routing
- **Security Headers**: XSS protection, content type sniffing prevention

---

## Source Code Documentation

### Environment Types (`src/env.d.ts`)
**Location**: `/src/env.d.ts`

```typescript
interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
}
```

**Purpose**: TypeScript definitions for environment variables required for Supabase integration.

### Database Client (`src/lib/supabase.ts`)
**Location**: `/src/lib/supabase.ts`

**Key Features**:
- **Supabase Client**: Configured with environment variables
- **TypeScript Interfaces**: Complete type definitions for all database entities
- **Tables Covered**: Categories, Tags, News Articles, Events, Media Files

**Database Schema Types**:
- `Category`: Content categorization system
- `Tag`: Content tagging system  
- `NewsArticle`: News/blog content management
- `Event`: School events and calendar
- `MediaFile`: Asset management system

### Main Layout (`src/layouts/Layout.astro`)
**Location**: `/src/layouts/Layout.astro`

**Features**:
- **SEO Optimization**: Meta tags, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD organization schema
- **Performance**: Preload critical resources, critical CSS inlined
- **Props Interface**: Flexible meta tag configuration

**SEO Properties**:
- Title, description, canonical URLs
- og:title, og:description, og:image
- Twitter card optimization
- NoIndex support for draft content

---

## Components

### Header Component (`src/components/Header.astro`)
**Location**: `/src/components/Header.astro`

**Features**:
- **Responsive Navigation**: Desktop and mobile layouts
- **Active State**: Dynamic highlighting of current page
- **Contact Information**: Phone and email display
- **Social Media**: Links to Facebook, Instagram, LinkedIn
- **Accessibility**: ARIA labels, keyboard navigation
- **Mobile Menu**: Hamburger menu with JavaScript toggle

**Navigation Links**:
- Home, About Us, Academic Programs
- Academic Year, Campus & Facilities  
- News & Events, Contact Us

### Footer Component (`src/components/Footer.astro`)
**Location**: `/src/components/Footer.astro`

**Content Sections**:
- **School Information**: Logo, description, contact details
- **Quick Links**: Primary navigation menu
- **Programs**: Educational program links
- **Accreditation**: IB and Cambridge logos
- **Copyright**: Current year with rights reserved

### Hero Component (`src/components/Hero.astro`)
**Location**: `/src/components/Hero.astro`

**Features**:
- **Flexible Props**: Title, subtitle, description customization
- **Background Image**: Full-width background with overlay
- **Call-to-Action**: Primary and secondary buttons
- **Statistics Display**: Optional stats cards with icons
- **Decorative Elements**: SVG wave separator
- **Responsive Design**: Mobile-first layout

**Statistics Shown**:
- 500+ Students
- 50+ Awards
- 25+ Countries

### NewsCard Component (`src/components/NewsCard.astro`)
**Location**: `/src/components/NewsCard.astro`

**Features**:
- **Featured Layout**: Large format for highlighted articles
- **Image Handling**: Fallback images for missing content
- **Meta Information**: Publication date, category display
- **Tag System**: Displays up to 3 tags per article
- **Read More**: Link to full article
- **Hover Effects**: Smooth animations and transforms

**Badge System**:
- Category badges with custom colors
- Featured article highlighting
- Published date formatting

### EventCard Component (`src/components/EventCard.astro`)
**Location**: `/src/components/EventCard.astro`

**Features**:
- **Dual Layout**: Full and compact display modes
- **Date Display**: Prominent date badge design
- **Time Handling**: All-day vs timed events
- **Location Information**: Venue display with icon
- **Category Color**: Dynamic badge coloring
- **Responsive**: Adapts to mobile and desktop

**Event Information**:
- Start/end dates and times
- Location and venue details
- Category and tag organization
- Description with line clamping

### CalendarWidget Component (`src/components/CalendarWidget.astro`)
**Location**: `/src/components/CalendarWidget.astro`

**Features**:
- **Interactive Calendar**: Desktop month view with navigation
- **Mobile Event List**: Responsive mobile-first design
- **Event Integration**: Real-time event data display
- **Tooltip System**: Rich event information on hover
- **Visual Indicators**: Color-coded event dots
- **Navigation**: Previous/next month controls

**Calendar Functionality**:
- Month-by-month navigation
- Event density visualization
- Detailed event tooltips
- Today highlighting
- Past/future event differentiation

---

## Pages

### Homepage (`src/pages/index.astro`)
**Location**: `/src/pages/index.astro`

**Sections**:
1. **Hero Section**: Main call-to-action with school statistics
2. **Welcome Section**: School introduction with image and stats
3. **Core Principles**: Four-pillar educational approach
4. **Digital Skills & Character**: Feature cards with images
5. **Educational Journey**: K-13 program overview
6. **Accreditation**: International recognition display
7. **News & Events**: Dynamic content from database
8. **Call to Action**: Application process promotion

**Data Integration**:
- Featured news articles (Supabase query)
- Upcoming events (filtered by date)
- Error handling for database failures
- Responsive grid layouts

### About Page (`src/pages/about.astro`)
**Location**: `/src/pages/about.astro`

**Content Sections**:
1. **Mission & Vision**: Dual-card layout with organizational goals
2. **School History**: Timeline from 1999 to 2025
3. **Core Values**: Excellence, Respect, Innovation, Community
4. **Leadership Team**: Key staff profiles with photos
5. **Accreditation**: International recognition and partnerships

**Leadership Team**:
- **Dr. Sarah Johnson**: Principal (20+ years experience)
- **Mr. James Chen**: Academic Director (IB specialist)
- **Ms. Maria Rodriguez**: Student Services Director

### News & Events Page (`src/pages/news/index.astro`)
**Location**: `/src/pages/news/index.astro`

**Features**:
- **Latest News**: Featured article plus grid layout
- **Upcoming Events**: Event cards with details
- **Calendar Widget**: Interactive month view
- **Category Filter**: News categorization
- **Tag System**: Popular tags display
- **Quick Links**: Related pages and actions

**Sidebar Components**:
- Interactive calendar
- Category filtering
- Popular tags
- Quick action links

---

## Database Integration

### Supabase Configuration
The project uses Supabase as its backend database, providing:

**Environment Variables Required**:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Public API key for client access

**Database Tables**:
1. **news**: Article content management
2. **events**: School calendar and events
3. **categories**: Content organization
4. **tags**: Content tagging system
5. **news_tags**: Many-to-many relationship
6. **event_tags**: Many-to-many relationship

**Query Patterns**:
- Published content filtering
- Date-based sorting
- Relationship loading (categories, tags)
- Error handling and fallbacks

### Data Types
Comprehensive TypeScript interfaces ensure type safety:
- Status enums: `'draft' | 'published' | 'archived'`
- Content relationships: Categories and tags
- Temporal data: Published dates, event times
- Media references: Image associations

---

## Assets & Media

### Image Assets (`public/images/`)
**Total Files**: 37 image files

**Categories**:
- **Leadership**: Principal, directors, staff photos
- **Facilities**: Campus buildings, classrooms, labs
- **Academic**: Subject-specific images
- **University Logos**: Harvard, MIT, Oxford, Cambridge
- **Accreditation**: IB, Cambridge, WASC, CIS logos
- **News**: Article thumbnails and featured images
- **School Branding**: Logo variations and favicon

**Optimization Features**:
- WebP format support with fallbacks
- Responsive image sizing
- Lazy loading implementation
- Alt text for accessibility

### Documents (`public/medias/`)
- **School_Prospectus-2025.pdf**: Comprehensive school information

### Videos (`public/videos/`)
- **school-virtual-tour.mp4**: Campus tour content

### SEO Files
- **robots.txt**: Search engine crawler directives
- **favicon.svg**: Vector favicon for all devices

---

## SEO & Performance

### SEO Strategy
**Comprehensive SEO implementation** including:
- Meta titles and descriptions
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- XML sitemap generation
- Canonical URL handling

### Structured Data
**Organization Schema** with:
- Educational institution type
- Contact information
- Address and location
- Social media profiles
- Accreditation details

### Performance Optimizations
- **Static Site Generation**: Pre-built HTML for speed
- **Image Optimization**: Lazy loading, proper sizing
- **CSS Inlining**: Critical styles inlined
- **Resource Preloading**: Fonts and key assets
- **CDN Ready**: Netlify edge distribution

### XML Sitemap (`src/pages/sitemap.xml.ts`)
**Dynamic Sitemap Generation**:
- Static pages (homepage, about, contact)
- Dynamic content (news articles, events)
- Archive pages (categories, tags, date-based)
- Proper changefreq and priority values
- Database-driven URL collection

---

## Development & Deployment

### Development Commands
```bash
npm install          # Install dependencies
npm run dev         # Start development server (localhost:4321)
npm run build       # Build for production
npm run preview     # Preview production build locally
```

### Environment Setup
1. **Clone Repository**: Download project files
2. **Install Dependencies**: Run `npm install`
3. **Environment Variables**: Create `.env` with Supabase credentials
4. **Database Setup**: Configure Supabase project and schema
5. **Development Server**: Run `npm run dev`

### Production Deployment
**Netlify Configuration**:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18
- **Environment Variables**: Set in Netlify dashboard
- **Security Headers**: XSS protection, CSRF prevention
- **Redirects**: SPA routing for dynamic pages

### Database Schema Setup
The project requires several PostgreSQL tables in Supabase:
- Categories table with type field ('news'|'event'|'both')
- News table with status, publishing, and SEO fields
- Events table with date/time and location fields
- Tags system with many-to-many relationships
- Media files table for asset management

---

## Key Features

### 1. Multi-Language Ready Architecture
- Structured for internationalization
- Locale-aware date formatting
- Cultural considerations in design

### 2. Responsive Design System
- Mobile-first approach
- Tailwind CSS utility classes
- Flexible grid layouts
- Touch-friendly interactions

### 3. Content Management System
- Dynamic news and events
- Category and tag organization
- Featured content system
- SEO-optimized URLs

### 4. Interactive Calendar
- Monthly event display
- Hover tooltips with event details
- Mobile-optimized event list
- Color-coded categories

### 5. Educational Focus
- Academic program showcase
- Student progression paths (K-13)
- International accreditation display
- University partnership highlights

### 6. Performance & SEO
- Static site generation
- Core Web Vitals optimization
- Structured data implementation
- XML sitemap automation

### 7. Professional Design
- Clean, modern aesthetic
- School branding integration
- Accessibility compliance
- Professional photography integration

### 8. Admin-Ready Backend
- Supabase integration
- Type-safe database queries
- Error handling and fallbacks
- Real-time capability foundation

---

## Technical Highlights

### Modern Web Standards
- **ES6+ JavaScript**: Modern syntax and features
- **TypeScript**: Full type safety throughout
- **CSS Grid & Flexbox**: Advanced layout techniques
- **Progressive Enhancement**: Works without JavaScript
- **Web Accessibility**: ARIA labels and semantic HTML

### Build Process
- **Tree Shaking**: Unused code elimination
- **Code Splitting**: Optimal bundle sizes
- **Asset Optimization**: Images, CSS, and JavaScript
- **Static Generation**: Pre-built pages for speed
- **Hot Module Replacement**: Fast development

### Security Measures
- **Environment Variables**: Secure credential management
- **Content Security Policy**: XSS protection headers
- **Input Sanitization**: Safe content rendering
- **HTTPS Enforcement**: Secure connections only

---

This documentation provides a complete overview of the International School website project, covering every aspect from technical architecture to content strategy. The site represents a modern, professional educational institution web presence with robust content management, excellent performance, and comprehensive SEO optimization.

**Last Updated**: January 2025  
**Project Version**: 0.0.1  
**Framework**: Astro 5.2.5  
**Database**: Supabase (PostgreSQL)