import { database } from '@root/firebase'
import { ref, remove } from 'firebase/database'
import { NextResponse } from 'next/server'

export const DELETE = async (request: Request) => {
  try {
    const { uid, notificationId } = await request.json()

    const notificationRef = ref(database, `notifications/${uid}/${notificationId}`)
    await remove(notificationRef)

    return NextResponse.json({ message: 'Notification deleted successfully' })
  } catch (error) {
    console.error('Error deleting notifications:', error)
    return NextResponse.json({ error: 'Error deleting notifications' }, { status: 500 })
  }
}
