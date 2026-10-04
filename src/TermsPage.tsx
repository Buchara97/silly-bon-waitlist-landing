import { Link } from 'react-router-dom'
import { SeoHead } from './components/SeoHead'
import { LegalPage } from './LegalPage'
import { SUPPORT_EMAIL } from './data/assets'

export function TermsPage() {
  return (
    <>
      <SeoHead
        title="Terms of Service — Silly Bon"
        description="Read the Terms of Service for sillybon.com and the Silly Bon couples app."
        path="/terms"
      />
      <LegalPage title="Terms of Service">
      <p>Last updated: October 4, 2026</p>
      <p>
        These Terms of Service (“Terms”) govern your access to sillybon.com and the Silly Bon App
        (together, the “Services”). By using the Services, you agree to these Terms.
      </p>
      <h2>The Services</h2>
      <p>
        Silly Bon is a couples playground app available on Google Play. Features may change as we
        improve the product.
      </p>
      <h2>Eligibility</h2>
      <p>
        You must be at least 18 years old (or the age of majority in your country) to use the App.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Do not misuse the Services, attempt to break them, submit false data, or harass others.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these Terms: email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or visit{' '}
        <Link to="/support">Support</Link>.
      </p>
      <p>
        We may update this page; continued use after an update means you accept the new Terms.
      </p>
      </LegalPage>
    </>
  )
}
