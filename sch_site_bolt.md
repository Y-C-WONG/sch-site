# International School Website Project Documentation

This document provides a comprehensive, file-by-file breakdown of the International School Website project. It details the purpose, key contents, and technologies used within each file, offering a complete overview for developers, contributors, and anyone interested in understanding the project's architecture.

---

## Project Overview

The International School Website is a static site generated using **Astro**, styled with **Tailwind CSS**, and powered by **Supabase** for content management. It's designed to be responsive, SEO-friendly, and highly performant.

**Key Technologies:**
*   **Framework**: Astro (Static Site Generator)
*   **Styling**: Tailwind CSS
*   **Database**: Supabase (PostgreSQL, Authentication, Storage)
*   **Language**: TypeScript
*   **Icons**: Lucide
*   **Deployment**: Static hosting compatible

---

## File-by-File Breakdown

### `README.md`

This file serves as the main documentation for the project, providing a comprehensive overview for developers and contributors.

*   **Purpose**: Introduces the project, its features, technical stack, and instructions for local development and deployment.
*   **Key Contents**:
    *   **Project Description**: A brief summary of the website's purpose and target audience.
    *   **Features**: A bulleted list highlighting core functionalities like school information, news management, event calendar, admissions, responsive design, SEO, Supabase integration, performance, and modern UI.
    *   **Project Structure**: A tree-like representation of the main directories and files, giving a quick overview of the codebase organization.
    *   **Tech Stack**: Lists the primary technologies used (Astro, Tailwind CSS, Supabase, TypeScript, Lucide).
    *   **Commands**: Common `npm` scripts for development, building, and previewing.
    *   **Database Schema**: Describes the main Supabase tables (`news`, `events`, `categories`, `tags`, `media_files`, `settings`).
    *   **Environment Variables**: Instructions for setting up `.env` with Supabase credentials.
    *   **Content Management**: Explains how content is driven by Supabase.
    *   **Deployment**: General steps for deploying the static site.
    *   **Contributing**: Basic guidelines for contributing to the project.
    *   **Local Development Setup**: Detailed, step-by-step instructions for cloning, installing dependencies, setting up environment variables, configuring Supabase, and starting the development server. Includes troubleshooting tips.
    *   **License & Support**: Information about the project's license and where to get support.

---

### `package.json`

This file defines the project's metadata and manages its dependencies and scripts.

*   **Purpose**: Declares project name, version, type, and defines scripts for common tasks, along with listing all required npm packages.
*   **Key Contents**:
    *   `name`, `type`, `version`, `private`: Basic project identifiers and settings.
    *   `scripts`:
        *   `dev`: Starts the Astro development server.
        *   `build`: Builds the production-ready static site.
        *   `preview`: Previews the built site locally.
        *   `astro`: A utility script to run Astro CLI commands.
    *   `dependencies`:
        *   `@astrojs/tailwind`: Astro integration for Tailwind CSS.
        *   `@supabase/supabase-js`: Official Supabase client library for JavaScript.
        *   `@tailwindcss/typography`: A Tailwind CSS plugin for styling prose.
        *   `astro`: The Astro framework itself.
        *   `lucide-astro`: Lucide icons as Astro components.
        *   `marked`: A Markdown parser for converting Markdown content to HTML.
        *   `tailwindcss`: The utility-first CSS framework.

---

### `src/env.d.ts`

This TypeScript declaration file provides type definitions for environment variables.

*   **Purpose**: Ensures type safety when accessing environment variables (`import.meta.env`) in TypeScript files, preventing runtime errors due to missing or incorrectly typed variables.
*   **Key Contents**:
    *   Declares the `ImportMetaEnv` interface, specifying `SUPABASE_URL` and `SUPABASE_ANON_KEY` as `string` types.
    *   Extends the `ImportMeta` interface to include the `env` property with the defined types.

---

### `tsconfig.json`

This file configures the TypeScript compiler for the project.

*   **Purpose**: Specifies compiler options, root files, and files to be included or excluded from compilation, ensuring consistent TypeScript behavior.
*   **Key Contents**:
    *   `extends`: Inherits configurations from `astro/tsconfigs/strict`, providing a baseline for strict type checking.
    *   `include`: Specifies which files TypeScript should process, including Astro's generated types and all files within the current directory.
    *   `exclude`: Specifies files or directories to be excluded from compilation, such as the `dist` (build output) folder.

---

### `astro.config.mjs`

This is the main configuration file for the Astro project.

*   **Purpose**: Configures Astro's behavior, integrates other tools like Tailwind CSS, and defines build and server settings.
*   **Key Contents**:
    *   `integrations`: Includes `tailwind()` to enable Tailwind CSS support.
    *   `site`: Sets the base URL for the deployed site, used for generating absolute URLs (e.g., in sitemaps).
    *   `output`: Set to `'static'`, indicating that Astro should generate a static website (HTML, CSS, JS files).
    *   `build`:
        *   `inlineStylesheets: 'auto'`: Controls how CSS is inlined in the build output.
    *   `vite`: Configures Vite, which Astro uses under the hood for development and building.
        *   `build.rollupOptions.output.assetFileNames`: Customizes the naming convention for asset files in the build output, adding a hash for cache busting.
        *   `server.hmr.timeout`: Increases the Hot Module Replacement timeout, useful for larger projects or slower development environments.

---

### `public/robots.txt`

This file provides instructions to web crawlers (like Googlebot) about which parts of the site they can or cannot access.

*   **Purpose**: Manages search engine crawling behavior to optimize indexing and prevent sensitive areas from being indexed.
*   **Key Contents**:
    *   `User-agent: *`: Applies the rules to all web crawlers.
    *   `Allow: /`: Allows crawling of the entire site by default.
    *   `Sitemap`: Points to the location of the XML sitemap, helping crawlers discover all pages.
    *   `Disallow`: Specifies paths that should not be crawled (e.g., `/admin/`, `/api/`, internal Astro build directories, temporary files).
    *   `Allow` (specific): Explicitly allows crawling of common resource directories like images, CSS, JS, and fonts.

---

### `seo_guidelines.md`

This Markdown file contains a detailed strategy for Search Engine Optimization (SEO) specific to the International School Website.

*   **Purpose**: Provides actionable recommendations and best practices to improve the website's visibility in search engine results, attract more organic traffic, and enhance its online presence.
*   **Key Contents**:
    *   **Table of Contents**: For easy navigation within the document.
    *   **Current SEO Implementation**: Summarizes what's already done and areas for improvement.
    *   **Technical SEO Optimizations**:
        *   **Enhanced Schema Markup**: Detailed JSON-LD examples for `School` and `Event` types, including properties like `address`, `contactPoint`, `accreditedBy`, `offers` (courses), etc.
        *   **Image Optimization**: Guidelines for `alt` attributes, lazy loading, WebP format, and responsive images.
        *   **Core Web Vitals Optimization**: Recommendations for LCP, FID, CLS, and resource preloading.
    *   **Content SEO Strategy**:
        *   **Target Keywords Research**: Examples of primary, long-tail, and content gap keywords.
        *   **Content Expansion Recommendations**: Ideas for new pages (Student Life, Parent Resources, Alumni, Faculty, Curriculum Comparison) and blog content.
        *   **Content Optimization Guidelines**: Best practices for title tags and meta descriptions with examples.
    *   **Local SEO for Schools**:
        *   **Google Business Profile Optimization**: Setup requirements and profile information.
        *   **Education Directory Submissions**: List of relevant directories.
        *   **Local Citation Building**: Ideas for location-based content.
    *   **Page-Specific SEO Recommendations**: Tailored advice for Homepage, About, Academic Programs, Admissions, News & Events pages.
    *   **Performance Optimizations**: Code examples for preloading, lazy loading, and CLS fixes.
    *   **Link Building Strategy**: Educational link opportunities, internal linking examples, and partnership strategies.
    *   **Monitoring and Analytics**: Setup for Google Search Console and Google Analytics 4, key metrics, and recommended tools.
    *   **Implementation Checklist**: A phased plan for executing SEO tasks.
    *   **Expected Results Timeline**: Forecasted improvements in traffic and rankings.
    *   **Success Metrics**: Primary and secondary KPIs for measuring SEO performance.

---

### `.vscode/launch.json`

This file configures debugging settings for Visual Studio Code.

*   **Purpose**: Allows developers to easily launch and debug the Astro development server directly from VS Code.
*   **Key Contents**:
    *   Defines a launch configuration named "Development server".
    *   `command`: Specifies the shell command to execute (`./node_modules/.bin/astro dev`), which starts the Astro dev server.
    *   `type: "node-terminal"`: Indicates that the command should be run in a Node.js terminal.

---

### `src/lib/supabase.ts`

This TypeScript file initializes the Supabase client and defines interfaces for database tables.

*   **Purpose**: Provides a centralized place to configure and export the Supabase client, and defines TypeScript types for the data structures fetched from the Supabase database.
*   **Key Contents**:
    *   `createClient`: Imports the Supabase client creation function.
    *   `supabaseUrl`, `supabaseAnonKey`: Retrieves Supabase credentials from environment variables, ensuring they are not hardcoded.
    *   `supabase`: Exports the initialized Supabase client instance.
    *   **Interfaces**: Defines TypeScript interfaces (`Category`, `Tag`, `NewsArticle`, `Event`, `MediaFile`) that mirror the structure of the corresponding Supabase tables. This enables type-safe data handling throughout the application.

---

### `src/pages/404.astro`

This Astro page serves as the custom 404 "Page Not Found" error page.

*   **Purpose**: Provides a user-friendly experience when a visitor tries to access a non-existent page, offering navigation options and contact information.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, and `Footer.astro` for consistent styling.
    *   **Meta Tags**: Sets a specific title and description, and includes `noindex={true}` to prevent search engines from indexing the 404 page.
    *   **Hero Section**: A prominent "404 Page Not Found" message with a descriptive subtitle.
    *   **Quick Actions**: Buttons to "Go to Homepage" and "Go Back" (using `history.back()`).
    *   **Search Section**: (Currently hidden with `display: none`) A search input field and button to help users find content. Includes JavaScript for search functionality.
    *   **Popular Sections**: (Currently hidden with `display: none`) A grid of links to key areas of the website (Academic Programs, News & Events, Admissions, About Us, Campus & Facilities, Contact Us).
    *   **Help Section**: Provides contact information (phone, email) for direct assistance.
    *   **Sitemap Links**: (Currently hidden with `display: none`) A detailed list of site navigation links.
    *   **Lucide Icons**: Uses various icons (Home, Search, ArrowLeft, BookOpen, Calendar, Phone, Mail) for visual appeal.
    *   **JavaScript**: Includes a `performSearch` function and event listener for the search input, and an optional Google Analytics tracking snippet for 404 errors.

---

### `tailwind.config.mjs`

This file configures Tailwind CSS for the project.

*   **Purpose**: Extends Tailwind's default theme with custom colors, fonts, and spacing, and includes Tailwind plugins.
*   **Key Contents**:
    *   `content`: Specifies all files that Tailwind should scan for utility classes to generate the final CSS bundle.
    *   `theme.extend`:
        *   `colors`: Defines a custom color palette, including `primary` (various shades of green) and `gray` (various shades of gray), overriding or extending Tailwind's defaults.
        *   `fontFamily.sans`: Sets 'Inter' as the primary sans-serif font.
        *   `spacing`: Adds custom spacing values.
    *   `plugins`: Includes `@tailwindcss/typography`, which provides a set of `prose` classes for styling rich text content (like blog posts or privacy policies).

---

### `src/pages/about.astro`

This Astro page displays information about the school, its mission, vision, history, values, and leadership team.

*   **Purpose**: To inform visitors about the school's identity, philosophy, and the people behind it.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro` for consistent page structure.
    *   **Hero Section**: A dedicated hero component with a title, subtitle, description, CTA, and background image.
    *   **Mission & Vision**: Two distinct sections outlining the school's core mission and future vision.
    *   **Our Story**: A narrative section detailing the school's founding and growth, including a timeline of key milestones.
    *   **Core Values**: A grid displaying the school's fundamental values (Excellence, Respect, Innovation, Community) with icons and descriptions.
    *   **Leadership Team**: Profiles of key leadership members (Principal, Academic Director, Student Services Director) with images, titles, and brief descriptions.
    *   **Accreditation & Partnerships**: Showcases the school's international recognition and affiliations (IB, Cambridge, WASC, CIS) with logos and a list of educational philosophy points.
    *   **Lucide Icons**: Uses various icons (Users, Award, Globe, BookOpen, Heart, Target, Eye, Lightbulb) to visually enhance content.

---

### `src/pages/index.astro`

This Astro page serves as the main homepage for the website.

*   **Purpose**: Provides an inviting entry point to the website, highlighting key aspects of the school, latest news, and upcoming events.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro`.
    *   **Hero Section**: A prominent hero component with a title, subtitle, description, CTA, background image, and optional statistics (students, awards, countries).
    *   **Welcome Section**: A textual introduction to the school community, emphasizing its educational approach and history, with an accompanying image and a floating stat card.
    *   **Core Principles**: A section outlining the school's foundational pillars (Academic Excellence, Global Citizenship, Character Development, Community Engagement) with icons and descriptions. Includes an embedded YouTube video.
    *   **Digital Skills & Character Development Cards**: Two feature cards highlighting specialized programs with images, descriptions, and bullet points.
    *   **Educational Stages**: A grid showcasing the different educational levels (Primary, Middle, Senior, Sixth Form) with age ranges and brief descriptions.
    *   **Accreditation Section**: Displays logos of international accreditation bodies, reinforcing the school's quality.
    *   **News & Events Section**:
        *   **Latest News**: Displays recent news articles using the `NewsCard` component, fetching mock data (to be replaced by Supabase queries).
        *   **Upcoming Events**: Displays upcoming events using the `EventCard` component, fetching mock data (to be replaced by Supabase queries).
        *   **Calendar Widget**: Integrates the `CalendarWidget` component in the sidebar.
        *   **Call to Action**: A prominent CTA for admissions.
    *   **Lucide Icons**: Uses various icons (BookOpen, Users, Award, Globe, ChevronRight, Play) for visual elements.

---

### `src/pages/contact.astro`

This Astro page provides various ways for visitors to get in touch with the school.

*   **Purpose**: Facilitates communication by providing contact details, office hours, a map, and a contact form.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro`.
    *   **Hero Section**: A dedicated hero component with a title, subtitle, description, CTA, and background image.
    *   **Contact Information**: A grid displaying phone numbers, email addresses, and physical address with relevant icons.
    *   **Office Hours & Map**:
        *   **Office Hours**: Details for Main Office and Admissions Office, including an emergency contact.
        *   **Our Location**: An embedded Google Map showing the school's location, along with address details and directions.
    *   **Contact Form**: (Currently hidden with `display: none`) A detailed form for inquiries, including fields for personal info, inquiry type, student info, message, and preferred contact method.
    *   **Quick Links**: A grid of links to other important sections of the website.
    *   **Lucide Icons**: Uses various icons (MapPin, Phone, Mail, Clock, Send, User, MessageCircle) for visual appeal.

---

### `src/layouts/Layout.astro`

This Astro layout component defines the basic HTML structure and common meta tags for all pages.

*   **Purpose**: Provides a consistent base template for all pages, including SEO-related meta tags, structured data, and preloading hints.
*   **Key Contents**:
    *   **Props**: Defines props for `title`, `description`, `ogTitle`, `ogDescription`, `ogImage`, `canonical`, and `noindex`, allowing customization per page.
    *   **HTML Structure**: Standard `<!doctype html>`, `<html>`, `<head>`, and `<body>` tags.
    *   **Meta Tags**:
        *   `charset`, `viewport`, `generator`.
        *   **Primary Meta Tags**: `title`, `description`, `canonical` URL, and `robots` (for `noindex`).
        *   **Open Graph / Facebook**: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name` for social media sharing.
        *   **Twitter Cards**: `twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image` for Twitter sharing.
    *   **Structured Data (JSON-LD)**: Includes a `script` tag with `EducationalOrganization` schema markup, providing structured information about the school to search engines.
    *   **Preload Hints**: `link rel="preload"` for critical resources like fonts and hero images to improve loading performance.
    *   **Critical CSS**: Inlined basic CSS for `html` and `body` to ensure immediate rendering.
    *   **Slot**: `<slot />` where the content of individual Astro pages will be injected.
    *   **Analytics Placeholder**: A comment indicating where Google Analytics code would be added.

---

### `src/pages/sitemap.xml.ts`

This TypeScript file dynamically generates the XML sitemap for the website.

*   **Purpose**: Provides a machine-readable list of all pages on the website to search engines, helping them discover and crawl content more effectively.
*   **Key Contents**:
    *   **`APIRoute`**: Defines an Astro API route that returns XML content.
    *   **Supabase Integration**: Connects to Supabase to fetch dynamic content slugs (news articles, events, categories, tags) and their published dates.
    *   **Static Pages**: Defines an array of manually listed static page paths.
    *   **Dynamic Content Fetching**:
        *   Queries the `news` table for published articles.
        *   Queries the `events` table for published events.
        *   Queries the `categories` and `tags` tables for active slugs to generate archive pages.
        *   Generates date-based archive paths (e.g., `/news/2024/03`) from news article publication dates.
    *   **XML Generation**: Constructs the sitemap XML string, including `<url>`, `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags for each page.
    *   **Change Frequency & Priority Logic**: Assigns different `changefreq` and `priority` values based on the page type (e.g., homepage is `daily` and `1.0`, individual news articles are `weekly` and `0.8`).
    *   **Error Handling**: Includes `try-catch` blocks for Supabase queries to ensure the sitemap can still be generated even if a database fetch fails.

---

### `src/components/Hero.astro`

This Astro component provides a reusable hero section for various pages.

*   **Purpose**: Displays a prominent, visually appealing header with a title, subtitle, description, and call-to-action, often with a background image.
*   **Key Contents**:
    *   **Props**: Accepts `title`, `subtitle`, `description`, `ctaText`, `ctaLink`, `backgroundImage`, and `showStats` for customization.
    *   **Background Image**: Uses an `<img>` tag for the background, with an overlay for better text readability.
    *   **Content Layout**: Arranges text content and CTA buttons in a responsive grid.
    *   **Call to Action (CTA)**: Two buttons, one primary and one secondary, with customizable text and links.
    *   **Optional Stats**: If `showStats` is true, displays a grid of statistics (e.g., Students, Awards, Countries) with icons.
    *   **Lucide Icons**: Uses `ChevronRight`, `Users`, `Award`, `Globe` for visual elements.
    *   **Decorative Elements**: Includes an SVG wave at the bottom for a modern design touch.

---

### `src/pages/news/index.astro`

This Astro page serves as the main listing page for news articles and upcoming events.

*   **Purpose**: Provides an overview of the latest news and events, with filtering and categorization options.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro`.
    *   **Supabase Integration**: Fetches `NewsArticle` data (including `category` and `tags`) and `Event` data (including `category` and `tags`) from Supabase.
    *   **Hero Section**: A dedicated hero component for the news and events section.
    *   **Main Content Area (3/4 width)**:
        *   **Latest News**: Displays recent news articles using the `NewsCard` component.
        *   **Upcoming Events**: Displays upcoming events using the `EventCard` component.
    *   **Sidebar (1/4 width)**:
        *   **Calendar Widget**: Integrates the `CalendarWidget` component to show upcoming events on a calendar.
        *   **Categories**: Lists news categories with links, fetching data from Supabase.
        *   **Popular Tags**: Displays a list of popular tags with links.
        *   **Newsletter Signup**: (Currently hidden with `display: none`) A form for newsletter subscription.
        *   **Quick Links**: Links to other important sections of the website.
    *   **Lucide Icons**: Uses `Calendar`, `Search`, `Filter`, `Archive` for visual elements.
    *   **Data Transformation**: Maps raw Supabase data to the defined TypeScript interfaces, including nested relationships for categories and tags.

---

### `src/components/Footer.astro`

This Astro component provides a consistent footer for all pages.

*   **Purpose**: Displays copyright information, quick links, contact details, and social media links at the bottom of every page.
*   **Key Contents**:
    *   **School Info**: Displays the school logo, name, a brief description, and contact details (address, phone, email).
    *   **Social Media Links**: Icons for Facebook, Instagram, and LinkedIn.
    *   **Quick Links**: Navigation links to main pages of the website.
    *   **Programs & Resources**: Links to academic programs and other resources.
    *   **Copyright**: Copyright notice.
    *   **Accreditation Badges**: Displays logos of accreditation bodies (IB, Cambridge) at the bottom.
    *   **Lucide Icons**: Uses `Facebook`, `Instagram`, `Linkedin`, `Mail`, `MapPin`, `Phone` for visual elements.

---

### `src/components/Header.astro`

This Astro component provides a consistent header and navigation bar for all pages.

*   **Purpose**: Displays the school logo, main navigation links, social media links, and contact information, with responsive behavior for mobile devices.
*   **Key Contents**:
    *   **Logo**: Displays the school logo and name, linking to the homepage.
    *   **Desktop Navigation**: A list of main navigation links (Home, About Us, Academic Programs, Academic Year, Campus & Facilities, News & Events, Contact Us) with active state highlighting based on the current path.
    *   **Social Media Links**: Icons for Facebook, Instagram, and LinkedIn.
    *   **Contact Phone (Desktop)**: Displays phone and email contact information.
    *   **Mobile Menu Button**: A button to toggle the mobile navigation menu.
    *   **Mobile Navigation**: A hidden menu that appears on smaller screens, duplicating the desktop navigation links and adding mobile-specific contact info.
    *   **Lucide Icons**: Uses `Facebook`, `Instagram`, `Linkedin`, `Menu`, `X`, `Phone`, `Mail` for visual elements.
    *   **JavaScript**: Handles the toggle functionality for the mobile menu, showing/hiding the menu and switching between menu/close icons.

---

### `src/pages/news/[slug].astro`

This Astro page displays the full content of an individual news article.

*   **Purpose**: To present detailed news articles, including their content, metadata, and related information.
*   **Key Contents**:
    *   **`getStaticPaths`**: Dynamically generates paths for all published news articles by fetching their slugs from Supabase. This enables pre-rendering of individual news pages.
    *   **Supabase Integration**: Fetches a single news article based on the `slug` parameter, including its `category` and `tags`. Also fetches related articles from the same category.
    *   **Markdown Rendering**: Uses the `marked` library to convert the article's Markdown `content` into HTML for display.
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, and `Footer.astro`.
    *   **Article Header**: Includes breadcrumbs, a "Back to News" link, and meta-information (publish date, category, reading time).
    *   **Article Title & Excerpt**: Displays the main title and a brief excerpt.
    *   **Featured Image**: Shows the article's featured image.
    *   **Main Content**: The rendered HTML content of the article.
    *   **Tags**: Displays associated tags with links to tag archive pages.
    *   **Share Buttons**: Links for sharing the article on Twitter, Facebook, and LinkedIn.
    *   **Sidebar**:
        *   **Article Information**: Quick summary of publish date, category, and reading time.
        *   **Quick Links**: Navigation links to other news-related pages.
    *   **Related Articles**: Displays a section of other news articles from the same category using `NewsCard` components.
    *   **Lucide Icons**: Uses `Calendar`, `User`, `Tag`, `ArrowLeft`, `Share2`, `Clock` for visual elements.
    *   **Styling**: Custom CSS for `prose` elements to ensure consistent and readable rich text.

---

### `src/pages/events/index.astro`

This Astro page serves as the main listing page for school events.

*   **Purpose**: To display upcoming and past events in an organized, filterable manner, allowing users to easily find relevant events.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro`.
    *   **Supabase Integration**: Fetches `Event` data (upcoming and recent past events) and `Category` data from Supabase.
    *   **Hero Section**: A dedicated hero component for the events section.
    *   **Events Overview Stats**: A section displaying key statistics about events (total upcoming, categories, featured, active months).
    *   **Main Events Area (3/4 width)**:
        *   **Search and Filter Bar**: Includes an event search input, category filter dropdown, and date filter dropdown.
        *   **Featured Events**: Displays featured events using the `EventCard` component.
        *   **Upcoming Events by Month**: Groups and displays upcoming events by month, using `EventCard` components.
        *   **Past Events**: Displays a selection of recent past events.
        *   **No Results Message**: A hidden section that appears when no events match the filters.
    *   **Sidebar (1/4 width)**:
        *   **Calendar Widget**: Integrates the `CalendarWidget` component.
        *   **Event Categories**: Lists event categories with counts and filter buttons.
        *   **Quick Actions**: Links to admissions, contact, and campus tour.
        *   **Event Submission**: A call-to-action for submitting community events.
    *   **Lucide Icons**: Uses `Calendar`, `Filter`, `Search`, `MapPin`, `Clock` for visual elements.
    *   **JavaScript**: Implements client-side filtering logic for search, category, and date range, dynamically showing/hiding event items and month sections. Also handles "Load More Past Events" (currently just hides the button).

---

### `src/components/NewsCard.astro`

This Astro component provides a reusable card display for news articles.

*   **Purpose**: To present a concise summary of a news article, including its image, title, excerpt, and metadata, in a visually appealing card format.
*   **Key Contents**:
    *   **Props**: Accepts an `article` object (of type `NewsArticle`) and an optional `featured` boolean to adjust styling for prominent articles.
    *   **Featured Image**: Displays the article's image, with dynamic sizing based on the `featured` prop. Includes hover effects.
    *   **Category Badge**: Shows the article's category name as a badge.
    *   **Featured Badge**: Displays a "Featured" badge if the article is marked as featured.
    *   **Meta Information**: Shows publication date and category name.
    *   **Title**: Displays the article title, linked to the full article page, with `line-clamp` for truncation and hover effects.
    *   **Excerpt**: Shows a brief excerpt of the article content, also with `line-clamp`.
    *   **Tags**: Displays a few associated tags.
    *   **Read More Link**: A link to the full news article.
    *   **Lucide Icons**: Uses `Calendar`, `User`, `ChevronRight` for visual elements.
    *   **Styling**: Custom CSS for `line-clamp` to truncate text.

---

### `src/pages/academic-year.astro`

This Astro page details the school's academic year, admissions process, and fee structure.

*   **Purpose**: To provide prospective families with essential information about applying to the school, important dates, and financial commitments.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro`.
    *   **Hero Section**: A dedicated hero component for the admissions section.
    *   **Admissions Process**: A step-by-step guide (Initial Inquiry, Application Submission, Assessment & Interview, Enrollment) with numbered circles and descriptions.
    *   **Application Requirements**: A detailed list of required documents (academic records, language proficiency, references, medical info, identity documents) with icons.
    *   **Important Dates**: A sidebar section outlining application deadlines, academic calendar dates, and assessment dates. Includes contact info for admissions.
    *   **Tuition & Fees**:
        *   **Fee Table**: A clear table showing annual tuition fees for different school levels (Primary, Middle, Senior, Sixth Form).
        *   **Additional Fees**: A list of other associated costs (application, registration, technology, activity, lunch, transportation).
    *   **Payment & Financial Aid**:
        *   **Payment Options**: Describes available payment plans (Annual, Semester, Monthly).
        *   **Financial Aid**: Information about need-based aid, scholarships, and discounts.
    *   **Download Prospectus**: A section with a link to download the school prospectus PDF.
    *   **Application Form**: (Currently hidden with `display: none`) A detailed form for student and parent information, including special needs and additional comments.
    *   **Lucide Icons**: Uses `Calendar`, `FileText`, `DollarSign`, `Award`, `Clock`, `CheckCircle`, `Users`, `Phone`, `Mail` for visual elements.

---

### `src/pages/events/[slug].astro`

This Astro page displays the full content and details of an individual event.

*   **Purpose**: To present comprehensive information about a specific school event, including its schedule, location, description, and related events.
*   **Key Contents**:
    *   **`getStaticPaths`**: Dynamically generates paths for all published events by fetching their slugs from Supabase.
    *   **Supabase Integration**: Fetches a single event based on the `slug` parameter, including its `category` and `tags`. Also fetches related events from the same category.
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, and `Footer.astro`.
    *   **Event Header**: Includes breadcrumbs, a "Back to Events" link, and status badges (Upcoming/Past, Featured, Category).
    *   **Event Title & Description**: Displays the main title and a brief description.
    *   **Featured Image**: Shows the event's featured image with a date overlay.
    *   **Event Details**:
        *   **Date & Time**: Formatted display of start/end dates and times, handling all-day events.
        *   **Location & Capacity**: Displays event location and maximum attendees.
    *   **Event Content**: The full content of the event (can be HTML or Markdown).
    *   **Tags**: Displays associated tags with links to tag archive pages.
    *   **Share Buttons**: Links for sharing the event on Twitter, Facebook, and LinkedIn.
    *   **Sidebar**:
        *   **Quick Information**: Summary of event date, time, category, and location.
        *   **Contact Information**: Phone and email for event inquiries.
        *   **Quick Links**: Navigation links to other event-related pages.
    *   **Related Events**: Displays a section of other events from the same category using `EventCard` components.
    *   **Lucide Icons**: Uses `Calendar`, `Clock`, `MapPin`, `Users`, `ArrowLeft`, `Share2`, `Tag`, `Phone`, `Mail` for visual elements.
    *   **Styling**: Custom CSS for `prose` elements to ensure consistent and readable rich text.

---

### `src/components/EventCard.astro`

This Astro component provides a reusable card display for events.

*   **Purpose**: To present a concise summary of an event, including its image, title, date, time, and location, in a visually appealing card format.
*   **Key Contents**:
    *   **Props**: Accepts an `event` object (of type `Event`) and an optional `compact` boolean to adjust styling for smaller displays (e.g., in sidebars).
    *   **Featured Image**: (Not shown in compact mode) Displays the event's image with a date badge and category badge. Includes hover effects.
    *   **Compact Mode**:
        *   Displays a smaller date badge.
        *   Shows title, date, time, and location in a more condensed layout.
    *   **Standard Mode**:
        *   Displays event title, linked to the full event page.
        *   Shows detailed meta information (date, time, location).
        *   Displays a brief description with `line-clamp`.
        *   Shows associated tags.
        *   Includes a "View Details" button.
    *   **Date/Time Formatting**: Helper functions `formatDate` and `formatTime` to display dates and times in a user-friendly format.
    *   **Lucide Icons**: Uses `Calendar`, `Clock`, `MapPin`, `Users` for visual elements.
    *   **Styling**: Custom CSS for `line-clamp` to truncate text.

---

### `src/pages/privacy-policy.astro`

This Astro page contains the school's privacy policy.

*   **Purpose**: To inform users about how their personal data is collected, used, stored, and protected, ensuring transparency and compliance with data protection regulations.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, and `Footer.astro`.
    *   **Hero Section**: A simple hero with a title and description for the privacy policy.
    *   **Privacy Policy Content**: The main body of the policy, structured with headings, paragraphs, bullet points, and a table.
        *   Covers data collection, important information, types of data collected (Identity, Contact, Financial, Transaction, Usage, Communications), data collection methods, and how data is used (lawful basis table).
        *   Explains cookie usage (online payment, analytics, third-party).
        *   Details data sharing, security measures, data retention periods, and user rights (access, correction, erasure, objection, restriction, transfer, withdrawal of consent).
        *   Includes a glossary of terms (Legitimate Interest, Service User, Legal/Regulatory Obligation, Internal/External Third Parties).
    *   **Styling**: Uses Tailwind's `prose` classes for consistent and readable rich text formatting.

---

### `src/pages/news/tag/[slug].astro`

This Astro page displays news articles filtered by a specific tag.

*   **Purpose**: To provide an archive of news content categorized by a particular tag, allowing users to explore articles on specific topics.
*   **Key Contents**:
    *   **`getStaticPaths`**: Dynamically generates paths for all active tags by fetching their slugs from Supabase.
    *   **Supabase Integration**: Fetches a single tag based on the `slug` parameter and then retrieves all news articles associated with that tag.
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, and `Footer.astro`.
    *   **Tag Header**: A prominent header displaying the tag name, description (if available), and the count of articles. Includes breadcrumbs.
    *   **Back Button**: A link to navigate back to the main news page.
    *   **Articles Display**: If articles are found, they are displayed using the `NewsCard` component in a grid layout.
    *   **No Articles Message**: A message displayed if no articles are found for the selected tag, with a link to browse all news.
    *   **Lucide Icons**: Uses `Hash`, `ArrowLeft` for visual elements.

---

### `src/pages/academic-programs.astro`

This Astro page outlines the school's academic programs and educational philosophy.

*   **Purpose**: To inform prospective families about the curriculum, educational stages, specialized programs, and teaching approach.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro`.
    *   **Hero Section**: A dedicated hero component for the academic programs section.
    *   **Curriculum Overview**: Describes the blend of international curricula (IB, Cambridge, Multilingual Education) with icons and key features.
    *   **Educational Journey**: Detailed sections for each school stage (Primary, Middle, Senior, Sixth Form) with age ranges, descriptions, key features, and accompanying images with stats overlays.
    *   **Specialized Programs**: A grid showcasing enhanced learning opportunities (STEM, Creative Arts, Digital Innovation, Music, Athletic Excellence, Global Citizenship) with icons and bullet points.
    *   **Teaching Philosophy**: Highlights core teaching principles (Inquiry-Based Learning, Differentiated Instruction, Global Perspectives) with icons and descriptions.
    *   **Academic Achievement**: Displays key statistics on student success (university acceptance, IB scores, IGCSE grades) and lists recent university destinations with logos.
    *   **Lucide Icons**: Uses `BookOpen`, `Users`, `Globe`, `Award`, `Languages`, `Microscope`, `Palette`, `Code`, `Music`, `Trophy` for visual elements.

---

### `src/pages/campus-facilities.astro`

This Astro page showcases the school's campus and facilities.

*   **Purpose**: To provide a detailed overview of the school's physical environment, highlighting modern learning spaces, specialized facilities, and infrastructure.
*   **Key Contents**:
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, `Footer.astro`, and `Hero.astro`.
    *   **Hero Section**: A dedicated hero component for the campus and facilities section.
    *   **Campus Overview**: Introduces the campus with a general description and highlights key facility types (Academic Buildings, Science Complex, Library & Media Center) with icons and details.
    *   **Facility Details**:
        *   **Modern Classrooms**: Describes classroom features (interactive boards, flexible furniture, natural lighting, individual technology) with an image and stats.
        *   **Science Laboratories**: Details specialized labs (Biology, Chemistry, Physics, Prep Rooms) with an image and stats.
        *   **Arts & Creative Spaces**: Describes visual arts studios, music rooms, and the drama theater with an image and stats.
    *   **Sports & Recreation**:
        *   Describes athletic facilities (gymnasium, swimming pool, outdoor fields, fitness center) with an image.
        *   Displays sports statistics.
    *   **Technology & Infrastructure**: Highlights digital infrastructure, safety & security measures, and transportation services with icons and bullet points.
    *   **Dining & Wellness**: Describes the dining hall and health & wellness center.
    *   **Campus Map & Tour**: A call-to-action section for scheduling a physical tour and a virtual tour video.
    *   **Lucide Icons**: Uses `Building`, `Microscope`, `BookOpen`, `Users`, `Palette`, `Music`, `Trophy`, `Wifi`, `Shield`, `Car` for visual elements.

---

### `src/components/CalendarWidget.astro`

This Astro component provides a reusable calendar display for events.

*   **Purpose**: To show a mini-calendar with highlighted event dates and a list of upcoming events, primarily for use in sidebars.
*   **Key Contents**:
    *   **Props**: Accepts an `events` array (of type `Event`) and an optional `showTitle` boolean.
    *   **Title**: Displays "School Calendar" or "Upcoming Events".
    *   **Desktop Calendar View**: (Hidden on mobile)
        *   **Navigation**: "Prev Month" and "Next Month" buttons.
        *   **Month Display**: Shows the current month and year.
        *   **Calendar Grid**: Displays days of the week and a grid of days.
        *   **Event Highlighting**: Days with events are highlighted.
        *   **Event Legend**: Explains event categories by color.
        *   **JavaScript**: Populates the calendar grid dynamically, handles month navigation, and highlights event dates.
    *   **Mobile Event List View**: (Hidden on desktop)
        *   Displays a compact list of upcoming events, showing date, title, time, location, and category color.
    *   **Lucide Icons**: Uses `ChevronLeft`, `ChevronRight`, `Calendar` for visual elements.
    *   **Styling**: Custom CSS for `line-clamp` in mobile view.

---

### `src/pages/news/[year]/[month].astro`

This Astro page displays news articles archived by a specific year and month.

*   **Purpose**: To provide a chronological archive of news content, allowing users to browse articles from a particular month and year.
*   **Key Contents**:
    *   **`getStaticPaths`**: Dynamically generates paths for all existing year/month combinations based on news article publication dates from Supabase.
    *   **Supabase Integration**: Fetches news articles published within the specified `year` and `month` parameters.
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, and `Footer.astro`.
    *   **Page Header**: A prominent header displaying the month and year, along with the count of articles. Includes breadcrumbs.
    *   **Back Button**: A link to navigate back to the main news archive page.
    *   **Articles Display**: If articles are found, they are displayed using the `NewsCard` component in a grid layout.
    *   **No Articles Message**: A message displayed if no articles are found for the selected month/year, with a link to browse the full news archive.
    *   **Lucide Icons**: Uses `Calendar`, `ArrowLeft` for visual elements.

---

### `src/pages/news/category/[slug].astro`

This Astro page displays news articles filtered by a specific category.

*   **Purpose**: To provide an archive of news content categorized by a particular topic, allowing users to explore articles relevant to their interests.
*   **Key Contents**:
    *   **`getStaticPaths`**: Dynamically generates paths for all active categories by fetching their slugs from Supabase.
    *   **Supabase Integration**: Fetches a single category based on the `slug` parameter and then retrieves all news articles belonging to that category.
    *   **Layout**: Uses `Layout.astro`, `Header.astro`, and `Footer.astro`.
    *   **Category Header**: A prominent header displaying the category name, description (if available), and the count of articles. Includes breadcrumbs.
    *   **Back Button**: A link to navigate back to the main news page.
    *   **Articles Display**: If articles are found, they are displayed using the `NewsCard` component in a grid layout.
    *   **No Articles Message**: A message displayed if no articles are found for the selected category, with a link to browse all news.
    *   **Lucide Icons**: Uses `Tag`, `ArrowLeft` for visual elements.
