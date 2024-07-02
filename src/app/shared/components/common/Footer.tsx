import React from 'react'
import HomeIcon from '@/app/assets/icons/home.svg'
import MapIcon from '@/app/assets/icons/map.svg'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='fixed bottom-0 grid grid-cols-2 items-center border bg-white px-[20px] w-[360px] '>
      <Link className='justify-center' href='/'>
        <div className='flex flex-col items-center justify-center'>
          <HomeIcon width={30} />
          <p className='text-xs'>홈</p>
        </div>
      </Link>
      <Link className='justify-center' href='/honey-place'>
        <div className='flex flex-col items-center justify-center'>
          <MapIcon width={30} />
          <p className='text-xs'>꿀플레이스</p>
        </div>
      </Link>
    </footer>
  )
}

export default Footer
