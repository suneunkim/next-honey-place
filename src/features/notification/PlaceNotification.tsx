'use client'

import { useEffect, useState } from 'react'
import { database, fireauth } from '@root/firebase'
import { ref, onValue, set, push } from 'firebase/database'
import { signOut } from 'firebase/auth'
import useCurrentAuth from '@/hook/useCurrentAuth'
import Link from 'next/link'

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

  const logOut = async (e: any) => {
    e.preventDefault()
    await signOut(fireauth)
    alert('로그아웃 하셨습니다.')
  }

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

  const userCheck = () => {
    if (!userProfile) {
      return <p>로그인이 필요합니다</p>
    } else if (messages.length === 0) {
      return <p>알림이 없습니다.</p>
    }
    return null
  }

  return (
    <>
      <div className='text-sm p-4 flex flex-col gap-3'>
        {userCheck()}
        {messages.length > 0 &&
          messages.map((message, index) => (
            <div key={index}>
              <p>{message.title}</p>
              <p>{message.body}</p>
              <p>{formatDate(message.timestamp)}</p>
            </div>
          ))}
      </div>
      <div className='w-full flex justify-end pr-5 pb-3'>
        {userProfile ? (
          <button className='text-sm p-2 bg-sky-500 text-white rounded-sm' onClick={logOut}>
            로그아웃
          </button>
        ) : (
          <Link href='/auth/login'>
            <button className='text-sm p-2 bg-sky-500 text-white rounded-sm'>로그인</button>
          </Link>
        )}
      </div>
    </>
  )
}

export default PlaceNotification
