declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const GA_MEASUREMENT_ID = 'G-K0RRMETSWX'

export function trackPageView(path: string): void {
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: path,
  })
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>): void {
  window.gtag?.('event', name, params)
}
