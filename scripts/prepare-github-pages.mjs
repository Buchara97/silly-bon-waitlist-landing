/**
 * GitHub Pages serves unknown paths as 404.html with HTTP 404.
 * - Keep static legal pages from public/privacy, public/terms, public/delete-account as-is.
 * - Copy the SPA shell into /support/ so that route returns HTTP 200.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const indexPath = join(dist, 'index.html')
const html = readFileSync(indexPath, 'utf8')

copyFileSync(indexPath, join(dist, '404.html'))
console.log('Wrote 404.html')

for (const path of ['privacy', 'terms', 'delete-account']) {
  const legalIndex = join(dist, path, 'index.html')
  if (!existsSync(legalIndex)) {
    throw new Error(`Missing static legal page at ${legalIndex}. Expected public/${path}/index.html.`)
  }
  console.log(`Kept static ${path}/index.html`)
}

const support = {
  path: 'support',
  title: 'Support — Silly Bon',
  description:
    'Need help with Silly Bon? Email support@sillybon.com. We typically respond within 24 hours on business days.',
}

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

const supportDir = join(dist, support.path)
mkdirSync(supportDir, { recursive: true })
writeFileSync(join(supportDir, 'index.html'), patchShell(html, support), 'utf8')
console.log('Wrote support/index.html')
