import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SeoHead } from './components/SeoHead'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { SUPPORT_EMAIL } from './data/assets'

export function SupportPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="support-page">
      <SeoHead
        title="Support — Silly Bon"
        description="Need help with Silly Bon? Email support@sillybon.com. We typically respond within 24 hours on business days."
        path="/support"
      />
      <SiteHeader />

      <main className="support-page__main">
        <p className="support-page__eyebrow">
          <Link to="/">← Back home</Link>
        </p>
        <h1 className="support-page__title">Support</h1>

        <section className="support-card" aria-labelledby="support-email-heading">
          <h2 id="support-email-heading" className="support-card__label">
            For help, please email:
          </h2>
          <div className="support-card__row">
            <a className="support-card__email" href={`mailto:${SUPPORT_EMAIL}`}>
              {SUPPORT_EMAIL}
            </a>
            <button type="button" className="support-card__copy" onClick={() => void handleCopy()}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="support-card__note">
            We typically respond within 24 hours during business days.
          </p>
        </section>
      </main>

      <SiteFooter showDownloadCta={false} />
    </div>
  )
}
