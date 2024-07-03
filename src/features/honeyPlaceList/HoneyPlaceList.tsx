import React from 'react'
import HoneyPlaceCard from './HoneyPlaceCard'
import PlaceFloatingButton from './PlaceFloatingButton'

const HoneyPlaceList = () => {
  return (
    <div className='flex justify-center mb-14'>
      <section className='mt-16 grid grid-cols-2 gap-3 items-center'>
        <HoneyPlaceCard />
        <HoneyPlaceCard />
        <HoneyPlaceCard />
        <HoneyPlaceCard />
        <PlaceFloatingButton />
      </section>
    </div>
  )
}

export default HoneyPlaceList
