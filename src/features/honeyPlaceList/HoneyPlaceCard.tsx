import React from 'react'
import MarkerIcon from '@/assets/icons/marker.svg'

const HoneyPlaceCard = () => {
  return (
    <div className='flex flex-col w-[154px] h-[301px] gap-[10px] rounded-[4px] overflow-hidden'>
      <div className='w-[154px] h-[231px] bg-slate-100'>
        {/* <img className="w-full" src={images[0]} /> */}
        <div />
      </div>
      <div className='px-[2px]'>
        <h3 className='text-[14px] font-semibold leading-[22px] text-left text-[#1c1c1c] whitespace-nowrap overflow-hidden text-ellipsis'>
          Kafe365
        </h3>
        <p className='text-[12px] font-medium leading-[18px] text-left text-[#5f5f5f] whitespace-nowrap overflow-hidden text-ellipsis'>
          이런저러한 분위기를 가진 무슨 가게
        </p>
        <div className='flex items-center gap-[2px]'>
          <MarkerIcon />
          <span className='text-[12px] font-medium leading-[18px] text-left text-[#777777]'>
            서울시 중구
          </span>
        </div>
      </div>
    </div>
  )
}

export default HoneyPlaceCard
