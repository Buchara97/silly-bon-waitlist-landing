import { Link, useLocation } from 'react-router-dom'
import { PLAY_STORE_URL, siteAssets } from '../data/assets'
import { trackEvent } from '../utils/analytics'

export function SiteHeader() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const featuresHref = onHome ? '#features' : '/#features'

  return (
    <header className="site-header">
      <div className="site-header__inner site-shell site-shell--wide">
        <Link to="/" className="site-header__brand">
          <img
            className="site-header__icon"
            src={siteAssets.icon}
            alt=""
            width={40}
            height={40}
            decoding="async"
          />
          <span className="site-header__name">Silly Bon</span>
        </Link>

        <nav className="site-header__nav" aria-label="Primary">
          <a href={featuresHref}>Features</a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('play_click', { placement: 'header_download' })}
          >
            Download
          </a>
          <Link to="/support" aria-current={pathname === '/support' ? 'page' : undefined}>
            Support
          </Link>
        </nav>
      </div>
    </header>
  )
}
