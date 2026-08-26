import { type FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LegalFooter } from './components/LegalFooter'
import { SocialIcons } from './components/SocialIcons'
import { socialLinks, waitlistAssets } from './data/assets'
import {
  type BetaSignupMode,
  type DeviceType,
  isBetaSignupConfigured,
  isBetaSignupOpen,
  submitBetaSignup,
} from './services/betaSignupService'
import { isValidEmail } from './services/waitlistService'
import { trackEvent } from './utils/analytics'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

type PersonFields = {
  email: string
  device: DeviceType
}

const EMPTY_PERSON: PersonFields = { email: '', device: 'android' }

function ModeToggle({
  value,
  onChange,
  disabled,
}: {
  value: BetaSignupMode | null
  onChange: (value: BetaSignupMode) => void
  disabled: boolean
}) {
  const options: { value: BetaSignupMode; label: string }[] = [
    { value: 'couple', label: 'Couple' },
    { value: 'solo', label: 'Solo' },
  ]

  return (
    <div className="waitlist-page__mode" role="group" aria-label="Apply as">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={
            value === option.value
              ? 'waitlist-page__mode-option waitlist-page__mode-option--active'
              : 'waitlist-page__mode-option'
          }
          aria-pressed={value === option.value}
          disabled={disabled}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function DeviceToggle({
  name,
  value,
  onChange,
  disabled,
  label,
}: {
  name: string
  value: DeviceType
  onChange: (value: DeviceType) => void
  disabled: boolean
  label: string
}) {
  return (
    <div className="waitlist-page__device" role="group" aria-label={label}>
      {(
        [
          { value: 'android', label: 'Android' },
          { value: 'ios', label: 'iOS' },
        ] as const
      ).map((option) => (
        <label
          key={option.value}
          className={
            value === option.value
              ? 'waitlist-page__device-option waitlist-page__device-option--active'
              : 'waitlist-page__device-option'
          }
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            disabled={disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  )
}

export function WaitlistPage() {
  const [mode, setMode] = useState<BetaSignupMode | null>(null)
  const [you, setYou] = useState<PersonFields>(EMPTY_PERSON)
  const [partner, setPartner] = useState<PersonFields>(EMPTY_PERSON)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [betaOpen, setBetaOpen] = useState<boolean | null>(null)

  const formConfigured = isBetaSignupConfigured()
  const submitting = formState === 'submitting'
  const signupClosed = formConfigured && betaOpen === false

  useEffect(() => {
    if (!formConfigured) {
      setBetaOpen(false)
      return
    }

    void isBetaSignupOpen()
      .then(setBetaOpen)
      .catch(() => setBetaOpen(false))
  }, [formConfigured])

  const clearError = () => {
    if (formState === 'error') {
      setFormState('idle')
      setErrorMessage(null)
    }
  }

  const handleModeChange = (next: BetaSignupMode) => {
    setMode(next)
    clearError()
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    if (!mode) {
      setFormState('error')
      setErrorMessage('Choose Couple or Solo to continue.')
      return
    }

    if (!formConfigured) {
      setFormState('error')
      setErrorMessage('Closed beta signup is not configured yet.')
      return
    }

    const open = betaOpen === true ? true : await isBetaSignupOpen().catch(() => false)
    setBetaOpen(open)

    if (!open) {
      setFormState('error')
      setErrorMessage('Closed beta signup is not open right now.')
      return
    }

    if (!isValidEmail(you.email)) {
      setFormState('error')
      setErrorMessage(
        mode === 'couple'
          ? 'Please enter a valid email for both of you.'
          : 'Please enter a valid email address.',
      )
      return
    }

    if (mode === 'couple') {
      if (!isValidEmail(partner.email)) {
        setFormState('error')
        setErrorMessage('Please enter a valid email for both of you.')
        return
      }

      if (you.email.trim().toLowerCase() === partner.email.trim().toLowerCase()) {
        setFormState('error')
        setErrorMessage('Partner email must be different from yours.')
        return
      }
    }

    setFormState('submitting')

    try {
      if (mode === 'solo') {
        await submitBetaSignup({
          mode: 'solo',
          person1Email: you.email,
          person1Device: you.device,
        })
        trackEvent('beta_signup', { mode: 'solo', device: you.device })
      } else {
        await submitBetaSignup({
          mode: 'couple',
          person1Email: you.email,
          person1Device: you.device,
          person2Email: partner.email,
          person2Device: partner.device,
        })
        trackEvent('beta_signup', {
          mode: 'couple',
          person1_device: you.device,
          person2_device: partner.device,
        })
      }

      setFormState('success')
      setYou(EMPTY_PERSON)
      setPartner(EMPTY_PERSON)
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

      <p className="waitlist-page__badge">Closed beta applications are open</p>

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
              {mode === 'couple'
                ? "You're on the list! We'll email both of you when invites go out."
                : "You're on the list! We'll email you when invites go out."}
            </p>
          ) : (
            <form className="waitlist-page__form waitlist-page__form--beta" onSubmit={handleSubmit} noValidate>
              <div className="waitlist-page__apply">
                <p className="waitlist-page__apply-label">Apply as…</p>
                <ModeToggle value={mode} onChange={handleModeChange} disabled={submitting} />
              </div>

              {mode ? (
                <div className="waitlist-page__details">
                  <div className="waitlist-page__person">
                    <p className="waitlist-page__person-label">You</p>
                    <DeviceToggle
                      name="you-device"
                      label="Your device"
                      value={you.device}
                      onChange={(device) => {
                        setYou((prev) => ({ ...prev, device }))
                        clearError()
                      }}
                      disabled={submitting}
                    />
                    <input
                      className="waitlist-page__input"
                      type="email"
                      name="you-email"
                      value={you.email}
                      onChange={(e) => {
                        setYou((prev) => ({ ...prev, email: e.target.value }))
                        clearError()
                      }}
                      placeholder="your@email.com"
                      autoComplete="email"
                      aria-label="Your email"
                      disabled={submitting}
                      required
                    />
                  </div>

                  {mode === 'couple' ? (
                    <div className="waitlist-page__person">
                      <p className="waitlist-page__person-label">Your partner</p>
                      <DeviceToggle
                        name="partner-device"
                        label="Partner device"
                        value={partner.device}
                        onChange={(device) => {
                          setPartner((prev) => ({ ...prev, device }))
                          clearError()
                        }}
                        disabled={submitting}
                      />
                      <input
                        className="waitlist-page__input"
                        type="email"
                        name="partner-email"
                        value={partner.email}
                        onChange={(e) => {
                          setPartner((prev) => ({ ...prev, email: e.target.value }))
                          clearError()
                        }}
                        placeholder="partner@email.com"
                        autoComplete="off"
                        aria-label="Partner email"
                        disabled={submitting}
                        required
                      />
                    </div>
                  ) : null}

                  <button
                    className="waitlist-page__submit waitlist-page__submit--full"
                    type="submit"
                    disabled={submitting || signupClosed}
                  >
                    {formState === 'submitting'
                      ? 'Joining…'
                      : mode === 'couple'
                        ? 'Join as a couple'
                        : 'Join beta'}
                  </button>
                </div>
              ) : null}
            </form>
          )}

          {signupClosed ? (
            <p className="waitlist-page__error" role="status">
              Signup is temporarily closed. Check back soon.
            </p>
          ) : null}

          {errorMessage ? (
            <p className="waitlist-page__error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <p className="waitlist-page__social-proof">Spots are limited for this round</p>

          {formState !== 'success' ? (
            <p className="waitlist-page__consent">
              By joining, you agree we may email{' '}
              {mode === 'couple' ? 'both of you' : 'you'} a beta invite from{' '}
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
