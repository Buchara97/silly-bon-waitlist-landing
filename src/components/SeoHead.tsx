import { useEffect } from 'react'

const SITE_URL = 'https://sillybon.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-banner.png`

type SeoHeadProps = {
  title: string
  description: string
  path?: string
  noIndex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

export function SeoHead({ title, description, path = '/', noIndex = false }: SeoHeadProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path === '/' ? '/' : path}`

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large')
    upsertLink('canonical', url)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', DEFAULT_IMAGE)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'Silly Bon')
    upsertMeta('property', 'og:locale', 'en_US')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE)
  }, [title, description, path, noIndex])

  return null
}

export { SITE_URL }
