import { useEffect } from 'react'

/** Full Privacy Policy is a static HTML document at /privacy/. */
export function PrivacyPage() {
  useEffect(() => {
    window.location.replace('/privacy/')
  }, [])

  return (
    <p style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      Redirecting to <a href="/privacy/">Privacy Policy</a>…
    </p>
  )
}
