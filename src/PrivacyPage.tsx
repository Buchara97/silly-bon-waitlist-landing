import { Link } from 'react-router-dom'
import { SeoHead } from './components/SeoHead'
import { LegalPage } from './LegalPage'
import { SUPPORT_EMAIL } from './data/assets'

export function PrivacyPage() {
  return (
    <>
      <SeoHead
        title="Privacy Policy — Silly Bon"
        description="Learn how Silly Bon collects and uses information on sillybon.com and in the Silly Bon app."
        path="/privacy/"
      />
      <LegalPage title="Privacy Policy">
        <p>Last updated: October 4, 2026</p>
        <p>
          This Privacy Policy explains how Silly Bon collects and uses information when you visit
          sillybon.com or use the Silly Bon App.
        </p>
        <h2>What we collect</h2>
        <p>
          On the website we may collect basic analytics (for example via Google Analytics). In the App
          we collect account and pair data needed to run Silly Bon, as described in-app and in store
          listings.
        </p>
        <h2>How we use it</h2>
        <p>
          To operate and improve Silly Bon, respond to support requests, and understand how the site
          is used. We do not sell your personal information.
        </p>
        <h2>Contact</h2>
        <p>
          Privacy questions: email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or visit{' '}
          <Link to="/support">Support</Link>.
        </p>
        <p>
          We may update this page; the “Last updated” date will change when we do.
        </p>
      </LegalPage>
    </>
  )
}
