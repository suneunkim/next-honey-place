'use client'

import { useEffect, useState } from 'react'
import { database } from '@root/firebase'
import { ref, onValue, set, push } from 'firebase/database'
import useCurrentAuth from '@/hook/useCurrentAuth'

interface Notification {
  title: string
  body: string
  timestamp: number
  read: boolean
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

const PlaceNotification = () => {
  const [messages, setMessages] = useState<Notification[]>([])
  const userProfile = useCurrentAuth()

  useEffect(() => {
    if (!userProfile) return

    // Firebase Realtime Database에서 데이터 변경 감지
    const notificationsRef = ref(database, `notifications/${userProfile.uid}`)
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messagesArray: Notification[] = Object.entries(data).map(([key, value]: any) => ({
          ...value,
          key,
        }))
        setMessages(messagesArray)
      } else {
        setMessages([])
      }
    })
  }, [userProfile])

  return (
    <div className='text-sm p-4 flex flex-col gap-3'>
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index}>
            <p>{message.title}</p>
            <p>{message.body}</p>
            <p>{formatDate(message.timestamp)}</p>
          </div>
        ))
      ) : (
        <p>No notifications</p>
      )}
    </div>
  )
}

export default PlaceNotification
