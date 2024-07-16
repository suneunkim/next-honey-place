import { NextResponse } from 'next/server'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@root/firebase'

export const POST = async (request: Request) => {
  try {
    const { error, stack } = await request.json()
    console.log('Request received:', { error, stack }) // 디버깅 로그

    const errorRef = collection(db, 'error_logs')
    await addDoc(errorRef, {
      error,
      stack,
      timestamp: new Date(),
    })
    console.log('Error logged to Firestore') // 디버깅 로그

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error logging to Firestore:', error) // 디버깅 로그
    return NextResponse.json({ error: 'Error logging to Firestore' }, { status: 500 })
  }
}
