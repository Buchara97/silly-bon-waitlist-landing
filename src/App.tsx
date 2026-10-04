import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AnalyticsListener } from './components/AnalyticsListener'
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
        <Route path="/support" element={<SupportPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
