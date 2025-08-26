# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

# International School Website

A modern, responsive website for International School built with Astro, TypeScript, Tailwind CSS, and Supabase. Features comprehensive school information, news management, event calendar, and admissions portal.

## Features

- 🏫 **School Information**: About us, academic programs, campus facilities
- 📰 **News Management**: Dynamic news articles with categories and tags
- 📅 **Event Calendar**: Comprehensive event management and display
- 🎓 **Admissions Portal**: Application process and requirements
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- 🔍 **SEO Optimized**: Meta tags, structured data, and sitemap generation
- 🗄️ **Database Integration**: Supabase for content management
- ⚡ **Performance**: Static site generation with Astro
- 🎨 **Modern UI**: Clean, professional design with smooth animations

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   ├── images/
│   ├── videos/
│   ├── medias/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── NewsCard.astro
│   │   ├── EventCard.astro
│   │   └── CalendarWidget.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── supabase.ts
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── contact.astro
│       ├── academic-programs.astro
│       ├── academic-year.astro
│       ├── campus-facilities.astro
│       ├── privacy-policy.astro
│       ├── 404.astro
│       ├── news/
│       │   ├── index.astro
│       │   ├── [slug].astro
│       │   ├── archive.astro
│       │   ├── category/[slug].astro
│       │   ├── tag/[slug].astro
│       │   └── [year]/[month].astro
│       └── events/
│           ├── index.astro
│           └── [slug].astro
├── tailwind.config.mjs
├── astro.config.mjs
└── package.json
```

## Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Database**: [Supabase](https://supabase.com/) - Open source Firebase alternative
- **Language**: TypeScript for type safety
- **Icons**: [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- **Testing**: [Jest](https://jestjs.io/) - Comprehensive test suite
- **Deployment**: Static hosting compatible (Netlify, Vercel, etc.)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🧪 Testing Commands

The project includes comprehensive automated testing:

| Command                     | Action                                           |
| :-------------------------- | :----------------------------------------------- |
| `npm test`                  | Run all tests                                    |
| `npm run test:queries`      | Test database query functions                    |
| `npm run test:integration`  | Test build process and page functionality        |
| `npm run test:consistency`  | Test data structure consistency                  |
| `npm run test:build`        | Build site and run integration tests            |
| `npm run test:all`          | Run all tests with verbose output               |
| `npm run test:watch`        | Run tests in watch mode for development         |

## 🔍 Testing Overview

The project includes a comprehensive test suite with three main test files:

### **tests/queries.test.ts**
Tests the centralized database query functions:
- Query function functionality and error handling
- Database connection and data retrieval
- Type safety and return value validation
- Mock testing for development environment

### **tests/integration.test.ts** 
Tests the overall build process and site functionality:
- Build process validation (ensures site builds successfully)
- Critical page generation verification
- Dynamic route creation from database
- Sitemap generation and content validation
- Performance testing (build time limits)
- Error recovery testing

### **tests/data-consistency.test.ts**
Tests data structure consistency and validation:
- Database schema validation
- Data relationships and integrity
- Content quality standards (title length, URL formats, etc.)
- Performance consistency across queries
- Real-time data validation against baseline

### **Test Configuration**
- **Environment**: Node.js with Jest and ts-jest
- **Setup**: `tests/setup.js` handles test environment configuration
- **Config**: `jest.config.js` configures TypeScript and ESM support
- **Timeout**: 30-second timeout for database operations
- **Mode**: Tests run serially to avoid database conflicts

### **Running Tests in Development**

For continuous testing during development:
```bash
# Watch mode - automatically runs tests when files change
npm run test:watch

# Quick query testing
npm run test:queries

# Full integration testing (includes build)
npm run test:build
```

## Database Schema

The project uses Supabase with the following main tables:

- **news**: News articles with categories and tags
- **events**: School events with dates, locations, and categories
- **categories**: Content categories for news and events
- **tags**: Tags for content organization
- **media_files**: File management for images and documents
- **settings**: Site configuration settings

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Content Management

Content is managed through Supabase database tables. The site automatically generates:

- Dynamic news article pages
- Event detail pages
- Category and tag archive pages
- Monthly news archives
- XML sitemap
- SEO meta tags

## Deployment

The site is built as a static site and can be deployed to any static hosting provider:

1. **Build the site**: `npm run build`
2. **Deploy the `dist/` folder** to your hosting provider
3. **Set environment variables** in your hosting platform

Popular hosting options:
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Local Development Setup

To run this project locally on your development computer, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd international-school-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit the .env file with your Supabase credentials
   # You can get these from your Supabase project dashboard
   ```

4. **Configure Supabase (Optional for development)**
   
   If you want to work with live data, you'll need to:
   - Create a [Supabase](https://supabase.com/) account
   - Create a new project
   - Copy your project URL and anon key to the `.env` file
   - Set up the database schema (SQL files available in project)

   For development without a database, the site will still work but won't display dynamic content.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:4321` to see the website running locally.

### Development Workflow

- **Hot Reload**: The development server automatically reloads when you make changes
- **TypeScript**: The project uses TypeScript for better development experience
- **Tailwind CSS**: Styles are built automatically during development
- **Component Development**: Create reusable components in `src/components/`
- **Page Development**: Add new pages in `src/pages/`

### Building for Production

```bash
# Build the static site
npm run build

# Preview the production build locally
npm run preview
```

The built site will be in the `dist/` directory, ready for deployment.

### Troubleshooting

**Common Issues:**

1. **Port already in use**: If port 4321 is busy, Astro will automatically use the next available port
2. **Environment variables**: Make sure your `.env` file is in the root directory and not committed to git
3. **Node version**: Ensure you're using Node.js version 18 or higher
4. **Dependencies**: Try deleting `node_modules` and running `npm install` again if you encounter package issues

**Getting Help:**

- Check the [Astro documentation](https://docs.astro.build/)
- Review the [Supabase documentation](https://supabase.com/docs)
- Open an issue in the project repository

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions about this project, please contact the development team or open an issue in the repository.
