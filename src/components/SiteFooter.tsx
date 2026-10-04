import { Link } from 'react-router-dom'
import { PLAY_STORE_URL, siteAssets, socialLinks } from '../data/assets'
import { trackEvent } from '../utils/analytics'
import { IosComingBadge } from './IosComingBadge'
import { SocialIcons } from './SocialIcons'

type SiteFooterProps = {
  showDownloadCta?: boolean
}

export function SiteFooter({ showDownloadCta = true }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner site-shell">
        {showDownloadCta ? (
          <div className="site-footer__cta" id="download-footer">
            <h2 className="site-footer__cta-title">Ready to get a little sillier?</h2>
            <p className="site-footer__cta-sub">
              Download Silly Bon and start the playground with your person.
            </p>
            <div className="store-row store-row--center">
              <a
                className="play-badge-link"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('play_click', { placement: 'footer' })}
              >
                <img
                  className="play-badge"
                  src={siteAssets.playBadge}
                  alt="Get it on Google Play"
                  width={180}
                  height={54}
                  decoding="async"
                />
              </a>
              <IosComingBadge />
            </div>
          </div>
        ) : null}

        <div className="site-footer__bottom">
          <nav className="site-footer__links" aria-label="Footer">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/support">Support</Link>
          </nav>
          <SocialIcons
            instagramUrl={socialLinks.instagram}
            tiktokUrl={socialLinks.tiktok}
            youtubeUrl={socialLinks.youtube}
          />
          <p className="site-footer__copy">© {new Date().getFullYear()} Silly Bon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
