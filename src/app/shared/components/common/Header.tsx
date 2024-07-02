import React from 'react'
import NotificationIcon from '@/app/assets/icons/notification.svg'
const Header = () => {
  return (
    <header className='flex h-[48px] items-center justify-between px-[20px]'>
      <div className='flex items-center'>
        <img src='/honey_spot.PNG' width={30} />
        <p>맛집</p>
      </div>
      <NotificationIcon />
    </header>
  )
}

export default Header
