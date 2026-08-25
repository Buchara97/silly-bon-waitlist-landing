import { Link } from 'react-router-dom'

export function LegalFooter() {
  return (
    <nav className="legal-footer" aria-label="Legal">
      <Link to="/terms">Terms of Service</Link>
      <span aria-hidden="true">·</span>
      <Link to="/privacy">Privacy Policy</Link>
    </nav>
  )
}
