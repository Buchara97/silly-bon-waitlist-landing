import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { getFirebaseDb, isFirebaseConfigured } from '../lib/firebase'
import { isValidEmail } from './waitlistService'

export type DeviceType = 'android' | 'ios'
export type BetaSignupMode = 'couple' | 'solo'

export type SoloBetaSignup = {
  mode: 'solo'
  person1Email: string
  person1Device: DeviceType
}

export type CoupleBetaSignup = {
  mode: 'couple'
  person1Email: string
  person1Device: DeviceType
  person2Email: string
  person2Device: DeviceType
}

export type BetaSignup = SoloBetaSignup | CoupleBetaSignup

const DEVICE_TYPES: DeviceType[] = ['android', 'ios']

export function isDeviceType(value: string): value is DeviceType {
  return DEVICE_TYPES.includes(value as DeviceType)
}

export function isBetaSignupConfigured(): boolean {
  return isFirebaseConfigured()
}

export async function isBetaSignupOpen(): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    return false
  }

  const snap = await getDoc(doc(getFirebaseDb(), 'config', 'beta'))
  return snap.exists() && snap.data().open === true
}

export async function submitBetaSignup(application: BetaSignup): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error('Beta signup is not configured yet.')
  }

  const person1Email = application.person1Email.trim().toLowerCase()

  if (!isValidEmail(person1Email)) {
    throw new Error(
      application.mode === 'couple'
        ? 'Please enter a valid email for both of you.'
        : 'Please enter a valid email address.',
    )
  }

  if (!isDeviceType(application.person1Device)) {
    throw new Error('Please choose your device.')
  }

  const db = getFirebaseDb()
  const configSnap = await getDoc(doc(db, 'config', 'beta'))

  if (!configSnap.exists() || configSnap.data().open !== true) {
    throw new Error('Beta signup is currently closed.')
  }

  if (application.mode === 'solo') {
    await addDoc(collection(db, 'betaSignups'), {
      mode: 'solo',
      person1Email,
      person1Device: application.person1Device,
      createdAt: Date.now(),
      status: 'pending',
      source: 'landing',
    })
    return
  }

  const person2Email = application.person2Email.trim().toLowerCase()

  if (!isValidEmail(person2Email)) {
    throw new Error('Please enter a valid email for both of you.')
  }

  if (person1Email === person2Email) {
    throw new Error('Partner email must be different from yours.')
  }

  if (!isDeviceType(application.person2Device)) {
    throw new Error('Please choose a device for both of you.')
  }

  await addDoc(collection(db, 'betaSignups'), {
    mode: 'couple',
    person1Email,
    person1Device: application.person1Device,
    person2Email,
    person2Device: application.person2Device,
    createdAt: Date.now(),
    status: 'pending',
    source: 'landing',
  })
}
