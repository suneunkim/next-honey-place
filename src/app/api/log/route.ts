import { NextResponse } from 'next/server'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@root/firebase'

export const POST = async (request: Request) => {
  try {
    const { uid, error } = await request.json()
    const errorRef = collection(db, 'error_logs')
    await addDoc(errorRef, {
      uid,
      error,
      timestamp: new Date(),
    })
    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error creating notifications:', error)
    return NextResponse.json({ error: 'Error creating notifications' }, { status: 500 })
  }
}
