import { database } from '@root/firebase'
import { ref, set } from 'firebase/database'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { NextResponse } from 'next/server'

const firestore = getFirestore()

export const POST = async (request: Request) => {
  try {
    const { title, body } = await request.json()

    // 유효성 검사
    if (!title || !body || typeof title !== 'string' || typeof body !== 'string') {
      const error = new Error('Invalid data: title and body are required and must be strings')
      throw error // 유효성 검사 실패 에러 (1)
    }

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
          throw error // 에러 (2)
        })
      })

      await Promise.allSettled(notificationPromises)

      return NextResponse.json({ message: 'Notifications created successfully' })
    } else {
      return NextResponse.json({ error: 'No users found' }, { status: 404 })
    }
  } catch (error: unknown) {
    // 타입 가드 사용과 throw error 처리
    if (error instanceof Error) {
      // 에러 시 로그 남기기
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      await fetch(`${apiUrl}/api/log`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
        }),
      }).catch((logError) => {
        console.error('Error logging notification error:', logError)
      })

      console.error('Error creating notifications:', error)
      return NextResponse.json({ error: 'Error creating notifications' }, { status: 500 })
    } else {
      // Error 객체가 아닌 경우
      console.error('Unknown error', error)
      return NextResponse.json({ error: 'Unknown error' }, { status: 500 })
    }
  }
}
