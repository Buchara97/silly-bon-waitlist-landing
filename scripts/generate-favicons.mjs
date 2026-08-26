/**
 * Bake favicons with soft rounded corners (same ratio as site header icon:
 * 12px radius on 51px → ~23.5%).
 */
import { createRequire } from 'node:module'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { writeFileSync } from 'node:fs'

const require = createRequire(import.meta.url)
const sharp = require('sharp')
const pngToIco = require('png-to-ico').default ?? require('png-to-ico')

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const source = join(root, 'public', 'assets', 'app_icon.png')
const outDir = join(root, 'public')

/** Matches .waitlist-page__header-icon { border-radius: 12px } on 51px */
const RADIUS_RATIO = 12 / 51

async function roundedPng(size) {
  const radius = Math.round(size * RADIUS_RATIO * 100) / 100
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#fff"/>
    </svg>`,
  )

  return sharp(source)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

async function writePng(name, size) {
  const buf = await roundedPng(size)
  writeFileSync(join(outDir, name), buf)
  console.log(`Wrote ${name} (${size}×${size}, r≈${(size * RADIUS_RATIO).toFixed(1)})`)
  return buf
}

const fav32 = await writePng('favicon-32.png', 32)
await writePng('favicon.png', 32)
const fav48 = await writePng('favicon-48.png', 48)
await writePng('favicon-180.png', 180)
await writePng('apple-touch-icon.png', 180)

const ico = await pngToIco([fav32, fav48])
writeFileSync(join(outDir, 'favicon.ico'), ico)
console.log('Wrote favicon.ico')
