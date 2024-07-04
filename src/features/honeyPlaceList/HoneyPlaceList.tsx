import React from 'react'
import HoneyPlaceCard from './HoneyPlaceCard'
import PlaceFloatingButton from './PlaceFloatingButton'
import { getHoneyPlaces } from '@/app/api/getHoneyPlace'

const HoneyPlaceList = async () => {
  const places = await getHoneyPlaces()

  return (
    <div className='flex justify-center mb-14'>
      <section className='mt-16 grid grid-cols-2 gap-3 items-center'>
        {places.map((place) => (
          <HoneyPlaceCard key={place.id} place={place} />
        ))}
        <PlaceFloatingButton />
      </section>
    </div>
  )
}

export default HoneyPlaceList
