// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'next-place-aa5ab.firebaseapp.com',
  projectId: 'next-place-aa5ab',
  storageBucket: 'next-place-aa5ab.appspot.com',
  messagingSenderId: '511880166660',
  appId: '1:511880166660:web:0adb4fc56b17218f632451',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const fireauth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
