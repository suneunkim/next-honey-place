// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'next-place-aa5ab.firebaseapp.com',
  databaseURL: 'https://next-place-aa5ab-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'next-place-aa5ab',
  storageBucket: 'next-place-aa5ab.appspot.com',
  messagingSenderId: '511880166660',
  appId: '1:511880166660:web:0adb4fc56b17218f632451',
}

// Initialize Firebase
// const app = initializeApp(firebaseConfig)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const fireauth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const database = getDatabase(app)
