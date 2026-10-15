import { useEffect } from 'react'

/** Account deletion instructions are a static HTML document at /delete-account/. */
export function DeleteAccountPage() {
  useEffect(() => {
    window.location.replace('/delete-account/')
  }, [])

  return (
    <p style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      Redirecting to <a href="/delete-account/">Delete account</a>…
    </p>
  )
}
