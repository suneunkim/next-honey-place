'use client'

import { useEffect, useState } from 'react'
import { database, fireauth } from '@root/firebase'
import { ref, onValue, set, push } from 'firebase/database'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { IUserProfile } from '@/interfaces/IUserProfile'

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

const PlaceNotification = ({ userProfile }: { userProfile: IUserProfile }) => {
  const [messages, setMessages] = useState<Notification[]>([])

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

  const handleDelete = async (notificationId: number) => {
    try {
      const response = await fetch('/api/delete-notification', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid: userProfile?.uid, notificationId }),
      })
      if (response.ok) {
        // 성공적으로 삭제된 경우, 별도로 상태를 업데이트할 필요가 없음
        // onValue 리스너가 자동으로 상태를 업데이트할 것임
        console.log('Notification deleted successfully')
      } else {
        console.error('Failed to delete notification')
      }
    } catch (error) {
      console.error('Error deleting notification:', error)
    }
  }

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
            <div className='flex justify-between' key={index}>
              <div>
                <p className='font-semibold'>{message.title}</p>
                <p className='text-gray-700'>{message.body}</p>
                <p className='text-gray-600 text-xs'>{formatDate(message.timestamp)}</p>
              </div>
              <div className='flex items-end'>
                <span
                  onClick={() => handleDelete(message.timestamp)}
                  className='shadow-sm border rounded-md text-xs text-gray-600 p-2 hover:scale-105 cursor-pointer'
                >
                  삭제
                </span>
              </div>
            </div>
          ))}
      </div>
      <div className='w-full flex justify-end pr-5 pb-3'>
        {userProfile ? (
          <button
            className='p-2 bg-sky-500 rounded-md text-xs text-white hover:bg-sky-400 cursor-pointer'
            onClick={logOut}
          >
            로그아웃
          </button>
        ) : (
          <Link href='/auth/login'>
            <button className='p-2 bg-sky-500 rounded-md text-xs text-white hover:bg-sky-400 cursor-pointer'>
              로그인
            </button>
          </Link>
        )}
      </div>
    </>
  )
}

export default PlaceNotification
