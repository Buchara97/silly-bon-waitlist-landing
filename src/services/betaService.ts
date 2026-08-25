import {
  collection,
  doc,
  getDoc,
  runTransaction,
} from 'firebase/firestore'
import { getFirebaseDb, isFirebaseConfigured } from '../lib/firebase'
import { isValidEmail } from './waitlistService'

export type DeviceType = 'android' | 'ios'

export type BetaApplication = {
  person1Name: string
  person1Email: string
  person1Device: DeviceType
  person2Name: string
  person2Email: string
  person2Device: DeviceType
}

export type BetaStatus = {
  open: boolean
  maxPairs: number
  enrolledPairs: number
  spotsLeft: number
}

const DEVICE_TYPES: DeviceType[] = ['android', 'ios']

export function isDeviceType(value: string): value is DeviceType {
  return DEVICE_TYPES.includes(value as DeviceType)
}

export function isBetaConfigured(): boolean {
  return isFirebaseConfigured()
}

export async function getBetaStatus(): Promise<BetaStatus | null> {
  if (!isFirebaseConfigured()) {
    return null
  }

  const db = getFirebaseDb()
  const snap = await getDoc(doc(db, 'config', 'beta'))

  if (!snap.exists()) {
    return null
  }

  const data = snap.data()
  const open = data.open === true
  const maxPairs = typeof data.maxPairs === 'number' ? data.maxPairs : 50
  const enrolledPairs = typeof data.enrolledPairs === 'number' ? data.enrolledPairs : 0
  const spotsLeft = Math.max(0, maxPairs - enrolledPairs)

  return { open, maxPairs, enrolledPairs, spotsLeft }
}

export async function submitBetaApplication(application: BetaApplication): Promise<void> {
  if (!isFirebaseConfigured()) {
    throw new Error('Beta signup is not configured yet.')
  }

  const person1Name = application.person1Name.trim()
  const person2Name = application.person2Name.trim()
  const person1Email = application.person1Email.trim().toLowerCase()
  const person2Email = application.person2Email.trim().toLowerCase()

  if (person1Name.length < 1 || person2Name.length < 1) {
    throw new Error('Please enter both names.')
  }

  if (!isValidEmail(person1Email) || !isValidEmail(person2Email)) {
    throw new Error('Please enter valid email addresses.')
  }

  if (person1Email === person2Email) {
    throw new Error('Partner email must be different from yours.')
  }

  if (!isDeviceType(application.person1Device) || !isDeviceType(application.person2Device)) {
    throw new Error('Please select a device for each person.')
  }

  const db = getFirebaseDb()
  const configRef = doc(db, 'config', 'beta')

  await runTransaction(db, async (transaction) => {
    const configSnap = await transaction.get(configRef)

    if (!configSnap.exists()) {
      throw new Error('Beta signup is not open yet.')
    }

    const data = configSnap.data()
    const open = data.open === true
    const maxPairs = typeof data.maxPairs === 'number' ? data.maxPairs : 50
    const enrolledPairs = typeof data.enrolledPairs === 'number' ? data.enrolledPairs : 0

    if (!open) {
      throw new Error('Beta signup is closed.')
    }

    if (enrolledPairs >= maxPairs) {
      throw new Error('Beta is full. Thanks for your interest!')
    }

    const applicationRef = doc(collection(db, 'betaApplications'))
    transaction.set(applicationRef, {
      person1Name,
      person1Email,
      person1Device: application.person1Device,
      person2Name,
      person2Email,
      person2Device: application.person2Device,
      createdAt: Date.now(),
      status: 'pending',
    })

    transaction.update(configRef, {
      enrolledPairs: enrolledPairs + 1,
    })
  })
}
