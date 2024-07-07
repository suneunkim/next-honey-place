'use client'
import { useEffect, useState } from 'react'
import { database } from '@root/firebase'
import { ref, onValue, set, push } from 'firebase/database'
import useCurrentAuth from '@/hook/useCurrentAuth'
import NotificationIcon from '@/assets/icons/notification.svg'
import PlaceNotification from '@/features/notification/PlaceNotification'

interface Notification {
  title: string
  body: string
  timestamp: number
  read: boolean
  key?: string
}

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const userProfile = useCurrentAuth()

  useEffect(() => {
    if (!userProfile) return

    // Firebase Realtime Database에서 알림 수 가져오기
    const notificationsRef = ref(database, `notifications/${userProfile.uid}`)
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const messagesArray: Notification[] = Object.entries(data).map(([key, value]) => ({
          ...(value as Notification),
          key,
        }))
        setNotificationCount(messagesArray.length)
      } else {
        setNotificationCount(0)
      }
    })
  }, [userProfile])

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <header className='flex fixed top-0 w-[360px] h-[48px] items-center justify-between px-[20px] bg-white z-10'>
      <div className='flex items-center'>
        <img src='/honey_spot.PNG' width={30} />
        <p className='font-bold'>맛집</p>
      </div>
      <div className='relative'>
        <button onClick={toggleNotifications} className='relative'>
          <NotificationIcon />
          {notificationCount > 0 && (
            <span className='absolute top-0 right-0 rounded-full bg-sky-500 text-white text-xs w-4 h-4 flex items-center justify-center'>
              {notificationCount}
            </span>
          )}
        </button>
      </div>
      {showNotifications && (
        <div className='absolute right-0 top-[48px] w-[300px] bg-white shadow-lg'>
          <PlaceNotification />
        </div>
      )}
    </header>
  )
}

export default Header
