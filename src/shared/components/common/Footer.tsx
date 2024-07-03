import React from 'react'
import Link from 'next/link'
import MapIcon from '@/assets/icons/map.svg'
import HomeIcon from '@/assets/icons/home.svg'

const Footer = () => {
  return (
    <footer className='fixed bottom-0 grid grid-cols-2 items-center bg-white w-[360px] py-2'>
      <Link className='justify-center' href='/'>
        <div className='flex flex-col items-center justify-center'>
          <HomeIcon width={25} />
          <p className='text-xs'>홈</p>
        </div>
      </Link>
      <Link className='justify-center' href='/honey-place'>
        <div className='flex flex-col items-center justify-center'>
          <MapIcon width={25} />
          <p className='text-xs'>꿀플레이스</p>
        </div>
      </Link>
    </footer>
  )
}

export default Footer
