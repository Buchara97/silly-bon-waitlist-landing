import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnalyticsListener } from './components/AnalyticsListener'
import { BetaApplyPage } from './BetaApplyPage'
import { PrivacyPage } from './PrivacyPage'
import { TermsPage } from './TermsPage'
import { WaitlistPage } from './WaitlistPage'

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsListener />
      <Routes>
        <Route path="/" element={<WaitlistPage />} />
        <Route path="/beta" element={<BetaApplyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
