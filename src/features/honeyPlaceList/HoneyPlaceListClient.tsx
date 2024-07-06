'use client'
import { useEffect, useState } from 'react'
import HoneyPlaceCard from './HoneyPlaceCard'
import PlaceFloatingButton from './PlaceFloatingButton'
import { HoneyPlace } from '@/interfaces/IPlace'
import { getHoneyPlaces } from '@/app/api/getHoneyPlace'
import { useRouter } from 'next/navigation'
import { Virtuoso } from 'react-virtuoso'

const HoneyPlaceListClinet = ({ initialPlaces }: { initialPlaces: HoneyPlace[] }) => {
  const [places, setPlaces] = useState(initialPlaces)
  // const router = useRouter()

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     const updatedPlaces = await getHoneyPlaces()
  //     setPlaces(updatedPlaces)
  //   }

  //   fetchPlaces()
  // }, [router])

  return (
    <div className='flex justify-center mb-14'>
      <section className='mt-16 grid grid-cols-2 gap-3 items-center'>
        <Virtuoso
          useWindowScroll
          increaseViewportBy={0} // 시작점
          data={places}
          itemContent={(index, place) => {
            return <HoneyPlaceCard key={place.id} place={place} />
          }}
        />
        <PlaceFloatingButton />
      </section>
    </div>
  )
}

export default HoneyPlaceListClinet
