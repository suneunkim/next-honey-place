import { database } from '@root/firebase'
import { ref, set } from 'firebase/database'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

const firestore = getFirestore()

export const POST = async (request: Request) => {
  try {
    const { title, body } = await request.json()

    const usersSnapshot = await getDocs(collection(firestore, 'users'))
    if (!usersSnapshot.empty) {
      const timestamp = Date.now()

      const notificationPromises = usersSnapshot.docs.map((doc) => {
        const uid = doc.id
        const newNotificationRef = ref(database, `notifications/${uid}/${timestamp}`)
        return set(newNotificationRef, {
          title,
          body,
          timestamp,
          read: false,
        }).catch(async (error) => {
          try {
            await fetch('/api/log', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid,
                error: error.message,
              }),
            })
          } catch (logError) {
            console.error('Error logging notification error:', logError)
          }
          throw error
        })
      })

      await Promise.allSettled(notificationPromises)

      return NextResponse.json({ message: 'Notifications created successfully' })
    } else {
      return NextResponse.json({ error: 'No users found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error creating notifications:', error)
    return NextResponse.json({ error: 'Error creating notifications' }, { status: 500 })
  }
}
