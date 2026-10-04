import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LegalFooter } from './components/LegalFooter'
import { siteAssets } from './data/assets'

type LegalPageProps = {
  title: string
  children: ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="legal-page">
      <header className="legal-page__header">
        <Link to="/" className="legal-page__brand-link">
          <img
            className="legal-page__icon"
            src={siteAssets.icon}
            alt=""
            width={51}
            height={51}
            decoding="async"
          />
          <span>Silly Bon</span>
        </Link>
      </header>
      <h1 className="legal-page__title">{title}</h1>
      <div className="legal-page__body">{children}</div>
      <LegalFooter />
    </div>
  )
}
