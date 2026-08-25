import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { LegalFooter } from './components/LegalFooter'
import { SocialIcons } from './components/SocialIcons'
import { socialLinks, waitlistAssets } from './data/assets'
import {
  isValidEmail,
  isWaitlistConfigured,
  submitToWaitlist,
} from './services/waitlistService'
import { trackEvent } from './utils/analytics'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const formConfigured = isWaitlistConfigured()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    if (!formConfigured) {
      setFormState('error')
      setErrorMessage('Waitlist is not configured yet. Check back soon!')
      return
    }

    if (!isValidEmail(email)) {
      setFormState('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setFormState('submitting')

    try {
      await submitToWaitlist(email)
      trackEvent('waitlist_submit', { method: 'email' })
      setFormState('success')
      setEmail('')
    } catch (err) {
      setFormState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  return (
    <div className="waitlist-page">
      <header className="waitlist-page__header">
        <img
          className="waitlist-page__header-icon"
          src={waitlistAssets.icon}
          alt=""
          width={51}
          height={51}
          decoding="async"
        />
        <span className="waitlist-page__brand">Silly Bon</span>
      </header>

      <p className="waitlist-page__badge">Coming soon</p>

      <h1 className="waitlist-page__title">
        Something <span className="waitlist-page__title-accent">fun</span> is on its way
      </h1>

      <p className="waitlist-page__subtitle">
        A tiny playground for couples who are a little weird, a little silly, and somehow still in
        love.
      </p>

      <div className="waitlist-page__stage">
        <img
          className="waitlist-page__mascot waitlist-page__mascot--left"
          src={waitlistAssets.mascotLeft}
          alt=""
          width={312}
          height={265}
          decoding="async"
        />

        <div className="waitlist-page__form-block">
          {formState === 'success' ? (
            <p className="waitlist-page__success" role="status">
              You&apos;re on the list! We&apos;ll be in touch soon.
            </p>
          ) : (
            <form className="waitlist-page__form" onSubmit={handleSubmit} noValidate>
              <input
                className="waitlist-page__input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (formState === 'error') {
                    setFormState('idle')
                    setErrorMessage(null)
                  }
                }}
                placeholder="you@example.com"
                autoComplete="email"
                aria-label="Email address"
                disabled={formState === 'submitting'}
                required
              />
              <button
                className="waitlist-page__submit"
                type="submit"
                disabled={formState === 'submitting' || !formConfigured}
              >
                {formState === 'submitting' ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          )}

          {errorMessage ? (
            <p className="waitlist-page__error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <p className="waitlist-page__social-proof">Join 200+ people already waiting</p>

          {formState !== 'success' ? (
            <p className="waitlist-page__consent">
              By submitting, you agree we may email you about Silly Bon updates from{' '}
              <span className="waitlist-page__consent-domain">sillybon.com</span>. See our{' '}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          ) : null}
        </div>

        <img
          className="waitlist-page__mascot waitlist-page__mascot--right"
          src={waitlistAssets.mascotRight}
          alt=""
          width={266}
          height={227}
          decoding="async"
        />
      </div>

      <SocialIcons
        instagramUrl={socialLinks.instagram}
        tiktokUrl={socialLinks.tiktok}
        youtubeUrl={socialLinks.youtube}
      />

      <LegalFooter />
    </div>
  )
}
