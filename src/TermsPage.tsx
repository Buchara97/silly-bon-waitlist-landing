import { useEffect } from 'react'

/** Full Terms of Service is a static HTML document at /terms/. */
export function TermsPage() {
  useEffect(() => {
    window.location.replace('/terms/')
  }, [])

  return (
    <p style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      Redirecting to <a href="/terms/">Terms of Service</a>…
    </p>
  )
}
