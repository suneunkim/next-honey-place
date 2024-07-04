import React from 'react'
import MarkerIcon from '@/assets/icons/marker.svg'
import { HoneyPlace } from '@/interfaces/IPlace'

const cardContainer =
  'flex flex-col w-[154px] h-[301px] gap-[10px] rounded-[4px] overflow-hidden'
const imageContainer = 'w-[150px] h-[200px] bg-slate-100'
const imageClass = 'w-full h-full object-cover'
const textContainer = 'px-[2px]'
const titleClass =
  'text-[14px] font-semibold leading-[22px] text-left text-[#1c1c1c] whitespace-nowrap overflow-hidden text-ellipsis'
const descriptionClass =
  'text-[12px] font-medium leading-[18px] text-left text-[#5f5f5f] whitespace-nowrap overflow-hidden text-ellipsis'
const addressContainer = 'flex items-center gap-[2px]'
const addressText =
  'text-[11px] font-medium leading-[18px] text-left text-[#777777]'

const HoneyPlaceCard = ({ place }: { place: HoneyPlace }) => {
  return (
    <div className={cardContainer}>
      <div className={imageContainer}>
        <img className={imageClass} src={place?.images[0]} alt={place?.name} />
      </div>
      <div className={textContainer}>
        <h3 className={titleClass}>{place?.name}</h3>
        <p className={descriptionClass}>{place?.description}</p>
        <div className={addressContainer}>
          <MarkerIcon />
          <span className={addressText}>{place?.address}</span>
        </div>
      </div>
    </div>
  )
}

export default HoneyPlaceCard
