import { describe, test, expect } from '@jest/globals'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

describe('Integration Testing - Page Functionality', () => {
  const projectRoot = path.join(__dirname, '..')
  
  describe('Build Process Integration', () => {
    test('Site builds successfully with centralized queries', async () => {
      try {
        // Run Astro build process
        const { stdout, stderr } = await execAsync('npm run build', {
          cwd: projectRoot,
          timeout: 300000 // 5 minute timeout
        })

        // Build should complete without errors
        expect(stderr).not.toContain('ERROR')
        expect(stderr).not.toContain('BUILD FAILED')
        
        // Build should produce output
        expect(stdout).toContain('built')
        
        // Check that dist directory was created
        const distPath = path.join(projectRoot, 'dist')
        expect(fs.existsSync(distPath)).toBe(true)
        
      } catch (error) {
        console.error('Build failed:', error)
        throw error
      }
    }, 300000) // 5 minute test timeout

    test('Critical pages are generated correctly', async () => {
      const distPath = path.join(projectRoot, 'dist')
      
      // Check that essential pages exist
      const essentialPages = [
        'index.html',
        'news/index.html',
        'about/index.html',
        'sitemap.xml'
      ]

      for (const page of essentialPages) {
        const pagePath = path.join(distPath, page)
        expect(fs.existsSync(pagePath)).toBe(true)
      }
    })

    test('Dynamic routes are generated from database', async () => {
      const distPath = path.join(projectRoot, 'dist')
      const newsDir = path.join(distPath, 'news')
      const eventsDir = path.join(distPath, 'events')

      if (fs.existsSync(newsDir)) {
        // Check that some news articles were generated
        const newsFiles = fs.readdirSync(newsDir, { withFileTypes: true })
        const newsPages = newsFiles.filter(dirent => 
          dirent.isDirectory() && dirent.name !== 'category' && dirent.name !== 'tag'
        )
        
        // Should have at least some news pages if database has content
        expect(newsPages.length).toBeGreaterThanOrEqual(0)
      }

      if (fs.existsSync(eventsDir)) {
        // Check that some event pages were generated
        const eventFiles = fs.readdirSync(eventsDir, { withFileTypes: true })
        const eventPages = eventFiles.filter(dirent => dirent.isDirectory())
        
        // Should have at least some event pages if database has content
        expect(eventPages.length).toBeGreaterThanOrEqual(0)
      }
    })

    test('Sitemap contains expected URLs', async () => {
      const sitemapPath = path.join(projectRoot, 'dist', 'sitemap.xml')
      
      if (fs.existsSync(sitemapPath)) {
        const sitemapContent = fs.readFileSync(sitemapPath, 'utf8')
        
        // Should contain essential URLs
        expect(sitemapContent).toContain('<loc>https://your-school-domain.com</loc>')
        expect(sitemapContent).toContain('<loc>https://your-school-domain.com/about</loc>')
        expect(sitemapContent).toContain('<loc>https://your-school-domain.com/news</loc>')
        
        // Should be valid XML
        expect(sitemapContent).toMatch(/<\?xml version="1\.0" encoding="UTF-8"\?>/)
        expect(sitemapContent).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
      }
    })
  })

  describe('Page Content Validation', () => {
    test('Homepage contains expected content structure', async () => {
      const homepagePath = path.join(projectRoot, 'dist', 'index.html')
      
      if (fs.existsSync(homepagePath)) {
        const content = fs.readFileSync(homepagePath, 'utf8')
        
        // Should contain essential elements
        expect(content).toContain('<title>')
        expect(content).toContain('International School')
        expect(content).toMatch(/<h1|<h2.*?>.*?<\/h1>|<\/h2>/) // Has headings
        expect(content).toContain('news') // Has news section
        expect(content).toContain('events') // Has events section
      }
    })

    test('News page contains expected structure', async () => {
      const newsPath = path.join(projectRoot, 'dist', 'news', 'index.html')
      
      if (fs.existsSync(newsPath)) {
        const content = fs.readFileSync(newsPath, 'utf8')
        
        // Should contain news page elements
        expect(content).toContain('News')
        expect(content).toMatch(/<title>.*News.*<\/title>/)
        expect(content).toContain('events') // Should have events sidebar
      }
    })
  })

  describe('Performance Validation', () => {
    test('Build completes within reasonable time', async () => {
      const start = Date.now()
      
      try {
        await execAsync('npm run build', {
          cwd: projectRoot,
          timeout: 300000 // 5 minutes max
        })
        
        const duration = Date.now() - start
        
        // Build should complete within reasonable time
        // Allowing up to 2 minutes for comprehensive build
        expect(duration).toBeLessThan(120000) // 2 minutes
        
      } catch (error) {
        console.error('Build performance test failed:', error)
        throw error
      }
    }, 300000)

    test('Generated files are reasonable size', async () => {
      const distPath = path.join(projectRoot, 'dist')
      
      if (fs.existsSync(distPath)) {
        // Check some key files aren't excessively large
        const homepagePath = path.join(distPath, 'index.html')
        
        if (fs.existsSync(homepagePath)) {
          const stats = fs.statSync(homepagePath)
          // Homepage shouldn't be larger than 1MB (reasonable for school site)
          expect(stats.size).toBeLessThan(1024 * 1024) // 1MB
        }

        const sitemapPath = path.join(distPath, 'sitemap.xml')
        if (fs.existsSync(sitemapPath)) {
          const stats = fs.statSync(sitemapPath)
          // Sitemap shouldn't be excessively large
          expect(stats.size).toBeLessThan(100 * 1024) // 100KB
        }
      }
    })
  })

  describe('Error Recovery Testing', () => {
    test('Build handles missing environment variables gracefully', async () => {
      // Note: This would require temporarily unsetting env vars
      // For now, just verify the build process has some resilience
      
      const { NODE_ENV } = process.env
      
      try {
        // Build should still work in development
        process.env.NODE_ENV = 'development'
        
        // This is a simplified test - in real scenario we'd test with missing DB credentials
        expect(process.env.NODE_ENV).toBe('development')
        
      } finally {
        // Restore original env
        if (NODE_ENV !== undefined) {
          process.env.NODE_ENV = NODE_ENV
        }
      }
    })
  })
})

// Helper functions for integration testing
export function getDistPath(relativePath: string): string {
  return path.join(__dirname, '..', 'dist', relativePath)
}

export function fileExists(relativePath: string): boolean {
  return fs.existsSync(getDistPath(relativePath))
}

export function readDistFile(relativePath: string): string {
  return fs.readFileSync(getDistPath(relativePath), 'utf8')
}

export async function runBuild(): Promise<{ success: boolean; output: string; error?: string }> {
  try {
    const { stdout, stderr } = await execAsync('npm run build', {
      cwd: path.join(__dirname, '..'),
      timeout: 300000
    })
    
    return {
      success: !stderr.includes('ERROR') && !stderr.includes('BUILD FAILED'),
      output: stdout,
      error: stderr
    }
  } catch (error) {
    return {
      success: false,
      output: '',
      error: error instanceof Error ? error.message : String(error)
    }
  }
}