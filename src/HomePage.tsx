import { ScreenshotCarousel } from './components/ScreenshotCarousel'
import { SeoHead } from './components/SeoHead'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { IosComingBadge } from './components/IosComingBadge'
import { featureCards, PLAY_STORE_URL, siteAssets } from './data/assets'
import { faqItems } from './data/faq'
import { trackEvent } from './utils/analytics'

export function HomePage() {
  return (
    <div className="home-page">
      <SeoHead
        title="Silly Bon — Couples App for Mood Memes, Widgets & Tiny Taps"
        description="Silly Bon is the silliest relationship app for couples. Share mood memes, partner taps, and home screen widgets. Download free on Google Play. iOS coming soon."
        path="/"
      />
      <SiteHeader />

      <main>
        <section className="hero site-shell" aria-labelledby="hero-title">
          <div className="hero__copy">
            <img
              className="hero__icon"
              src={siteAssets.icon}
              alt="Silly Bon app icon"
              width={86}
              height={86}
              decoding="async"
            />
            <h1 id="hero-title" className="hero__title">
              The <span className="hero__title-accent">silliest</span> relationship app.
            </h1>
            <p className="hero__subtitle">
              A tiny playground for couples who are a little weird, a little silly, and somehow still
              in love.
            </p>
            <div className="hero__actions store-row" id="download">
              <a
                className="play-badge-link"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('play_click', { placement: 'hero' })}
              >
                <img
                  className="play-badge"
                  src={siteAssets.playBadge}
                  alt="Get it on Google Play"
                  width={200}
                  height={60}
                  decoding="async"
                />
              </a>
              <IosComingBadge />
            </div>
          </div>

          <div className="hero__media">
            <ScreenshotCarousel images={siteAssets.screenshots} />
          </div>
        </section>

        <section className="features site-shell" id="features" aria-labelledby="features-title">
          <h2 id="features-title" className="features__title">
            Everything you need to stay connected
          </h2>
          <div className="features__grid">
            {featureCards.map((feature) => (
              <article key={feature.title} className="feature-card">
                <span className="feature-card__emoji" aria-hidden="true">
                  {feature.emoji}
                </span>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__body">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="faq site-shell" id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className="faq__title">
            Frequently asked questions
          </h2>
          <div className="faq__list">
            {faqItems.map((item) => (
              <details key={item.question} className="faq__item">
                <summary className="faq__question">{item.question}</summary>
                <p className="faq__answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
