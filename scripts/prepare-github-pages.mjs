/**
 * GitHub Pages serves unknown paths as 404.html with HTTP 404.
 * Google will not index those URLs. Copy the SPA shell into real
 * directories so /privacy, /terms, /support return HTTP 200.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const indexPath = join(dist, 'index.html')
const html = readFileSync(indexPath, 'utf8')

copyFileSync(indexPath, join(dist, '404.html'))

const routes = [
  {
    path: 'privacy',
    title: 'Privacy Policy — Silly Bon',
    description: 'Learn how Silly Bon collects and uses information on sillybon.com and in the Silly Bon app.',
  },
  {
    path: 'terms',
    title: 'Terms of Service — Silly Bon',
    description: 'Read the Terms of Service for sillybon.com and the Silly Bon couples app.',
  },
  {
    path: 'support',
    title: 'Support — Silly Bon',
    description:
      'Need help with Silly Bon? Email support@sillybon.com. We typically respond within 24 hours on business days.',
  },
]

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function patchShell(source, { path, title, description }) {
  const url = `https://sillybon.com/${path}/`
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)

  let out = source
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`)
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${safeDescription}" />`,
  )
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${url}" />`,
  )
  out = out.replace(
    /<link\s+rel="alternate"\s+hreflang="en"\s+href="[^"]*"\s*\/>/,
    `<link rel="alternate" hreflang="en" href="${url}" />`,
  )
  out = out.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/>/,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${safeDescription}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${safeDescription}" />`,
  )
  return out
}

for (const route of routes) {
  const dir = join(dist, route.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), patchShell(html, route), 'utf8')
  console.log(`Wrote ${route.path}/index.html`)
}

console.log('Wrote 404.html')
