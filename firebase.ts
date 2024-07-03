// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'honey-place.firebaseapp.com',
  projectId: 'honey-place',
  storageBucket: 'honey-place.appspot.com',
  messagingSenderId: '484564288617',
  appId: '1:484564288617:web:899a6e9d325f14109f0ef8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const fireauth = getAuth(app)
export const db = getFirestore(app)
