import { Link } from 'react-router-dom'

export function LegalFooter() {
  return (
    <nav className="legal-footer" aria-label="Legal">
      <a href="/terms/">Terms of Service</a>
      <span aria-hidden="true">·</span>
      <a href="/privacy/">Privacy Policy</a>
      <span aria-hidden="true">·</span>
      <a href="/delete-account/">Delete account</a>
      <span aria-hidden="true">·</span>
      <Link to="/support">Support</Link>
    </nav>
  )
}
