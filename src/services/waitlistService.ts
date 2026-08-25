import { addDoc, collection } from 'firebase/firestore'
import { getFirebaseDb, isFirebaseConfigured } from '../lib/firebase'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

export function isWaitlistConfigured(): boolean {
  return isFirebaseConfigured()
}

export async function submitToWaitlist(email: string): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error('Waitlist is not configured yet.')
  }

  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.')
  }

  const db = getFirebaseDb()
  await addDoc(collection(db, 'waitlist'), {
    email: email.trim().toLowerCase(),
    createdAt: Date.now(),
    source: 'landing',
    marketingConsent: true,
  })
}
