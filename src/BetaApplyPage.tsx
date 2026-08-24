import { type FormEvent, useEffect, useState } from 'react'
import { waitlistAssets } from './data/assets'
import {
  type BetaApplication,
  type BetaStatus,
  type DeviceType,
  getBetaStatus,
  isBetaConfigured,
  submitBetaApplication,
} from './services/betaService'
import { isValidEmail } from './services/waitlistService'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY_FORM: BetaApplication = {
  person1Email: '',
  person1Device: 'iphone',
  person2Email: '',
  person2Device: 'iphone',
}

function DeviceField({
  id,
  label,
  value,
  onChange,
  disabled,
}: {
  id: string
  label: string
  value: DeviceType
  onChange: (value: DeviceType) => void
  disabled: boolean
}) {
  const options: { value: DeviceType; label: string }[] = [
    { value: 'android', label: 'Android' },
    { value: 'iphone', label: 'iPhone' },
    { value: 'both', label: 'Both' },
  ]

  return (
    <fieldset className="beta-page__device-group" disabled={disabled}>
      <legend className="beta-page__label">{label}</legend>
      <div className="beta-page__device-options">
        {options.map((option) => (
          <label key={option.value} className="beta-page__device-option" htmlFor={`${id}-${option.value}`}>
            <input
              id={`${id}-${option.value}`}
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function BetaApplyPage() {
  const [form, setForm] = useState<BetaApplication>(EMPTY_FORM)
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [betaStatus, setBetaStatus] = useState<BetaStatus | null>(null)
  const [statusLoading, setStatusLoading] = useState(true)

  const configured = isBetaConfigured()

  useEffect(() => {
    if (!configured) {
      setStatusLoading(false)
      return
    }

    void getBetaStatus()
      .then(setBetaStatus)
      .finally(() => setStatusLoading(false))
  }, [configured])

  const betaClosed =
    !configured ||
    !betaStatus ||
    !betaStatus.open ||
    betaStatus.spotsLeft <= 0

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)

    if (!configured) {
      setFormState('error')
      setErrorMessage('Beta signup is not configured yet.')
      return
    }

    if (betaClosed) {
      setFormState('error')
      setErrorMessage('Beta signup is currently closed.')
      return
    }

    if (!isValidEmail(form.person1Email) || !isValidEmail(form.person2Email)) {
      setFormState('error')
      setErrorMessage('Please enter valid email addresses.')
      return
    }

    if (form.person1Email.trim().toLowerCase() === form.person2Email.trim().toLowerCase()) {
      setFormState('error')
      setErrorMessage('Partner email must be different from yours.')
      return
    }

    setFormState('submitting')

    try {
      await submitBetaApplication(form)
      setFormState('success')
      setForm({ ...EMPTY_FORM })
      const updated = await getBetaStatus()
      setBetaStatus(updated)
    } catch (err) {
      setFormState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  return (
    <div className="beta-page">
      <header className="beta-page__header">
        <img
          className="beta-page__header-icon"
          src={waitlistAssets.icon}
          alt=""
          width={51}
          height={51}
          decoding="async"
        />
        <span className="beta-page__brand">Silly Bon</span>
      </header>

      <p className="beta-page__badge">Closed beta</p>

      <h1 className="beta-page__title">Apply as a couple</h1>

      <p className="beta-page__subtitle">
        We&apos;re looking for up to 50 pairs to test Silly Bon before launch. Both of you need an
        email — we&apos;ll reach out if you&apos;re selected.
      </p>

      {statusLoading ? (
        <p className="beta-page__status">Checking availability…</p>
      ) : betaStatus && betaStatus.open && betaStatus.spotsLeft > 0 ? (
        <p className="beta-page__status">
          {betaStatus.spotsLeft} pair spot{betaStatus.spotsLeft === 1 ? '' : 's'} left
        </p>
      ) : (
        <p className="beta-page__status beta-page__status--closed">Beta signup is closed</p>
      )}

      {formState === 'success' ? (
        <p className="beta-page__success" role="status">
          Application received! We&apos;ll email you if you&apos;re selected.
        </p>
      ) : (
        <form className="beta-page__form" onSubmit={handleSubmit} noValidate>
          <label className="beta-page__field">
            <span className="beta-page__label">Your email</span>
            <input
              className="beta-page__input"
              type="email"
              value={form.person1Email}
              onChange={(e) => setForm((prev) => ({ ...prev, person1Email: e.target.value }))}
              placeholder="you@example.com"
              autoComplete="email"
              disabled={formState === 'submitting' || betaClosed}
              required
            />
          </label>

          <DeviceField
            id="person1-device"
            label="Your device"
            value={form.person1Device}
            onChange={(person1Device) => setForm((prev) => ({ ...prev, person1Device }))}
            disabled={formState === 'submitting' || betaClosed}
          />

          <label className="beta-page__field">
            <span className="beta-page__label">Partner email</span>
            <input
              className="beta-page__input"
              type="email"
              value={form.person2Email}
              onChange={(e) => setForm((prev) => ({ ...prev, person2Email: e.target.value }))}
              placeholder="partner@example.com"
              autoComplete="email"
              disabled={formState === 'submitting' || betaClosed}
              required
            />
          </label>

          <DeviceField
            id="person2-device"
            label="Partner device"
            value={form.person2Device}
            onChange={(person2Device) => setForm((prev) => ({ ...prev, person2Device }))}
            disabled={formState === 'submitting' || betaClosed}
          />

          {errorMessage ? (
            <p className="beta-page__error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button
            className="beta-page__submit"
            type="submit"
            disabled={formState === 'submitting' || betaClosed || !configured}
          >
            {formState === 'submitting' ? 'Submitting…' : 'Apply for beta'}
          </button>
        </form>
      )}
    </div>
  )
}
