import React from 'react'
import NotificationIcon from '@/assets/icons/notification.svg'
const Header = () => {
  return (
    <header className='flex fixed top-0 w-[360px] h-[48px] items-center justify-between px-[20px] bg-white z-10'>
      <div className='flex items-center'>
        <img src='/honey_spot.PNG' width={30} />
        <p className='font-bold'>맛집</p>
      </div>
      <NotificationIcon />
    </header>
  )
}

export default Header
