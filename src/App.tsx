import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnalyticsListener } from './components/AnalyticsListener'
import { DeleteAccountPage } from './DeleteAccountPage'
import { HomePage } from './HomePage'
import { PrivacyPage } from './PrivacyPage'
import { SupportPage } from './SupportPage'
import { TermsPage } from './TermsPage'

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsListener />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Trailing-slash variants: GitHub Pages directory indexes redirect to /path/ */}
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/" element={<SupportPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/terms/" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy/" element={<PrivacyPage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
        <Route path="/delete-account/" element={<DeleteAccountPage />} />
      </Routes>
    </BrowserRouter>
  )
}
