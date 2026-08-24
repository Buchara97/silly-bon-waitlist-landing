import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BetaApplyPage } from './BetaApplyPage'
import { WaitlistPage } from './WaitlistPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WaitlistPage />} />
        <Route path="/beta" element={<BetaApplyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
