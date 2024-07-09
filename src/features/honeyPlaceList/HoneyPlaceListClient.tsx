'use client'
import { forwardRef, useEffect, useState } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'
import HoneyPlaceCard from './HoneyPlaceCard'
import PlaceFloatingButton from './PlaceFloatingButton'
import { HoneyPlace } from '@/interfaces/IPlace'
import { getHoneyPlaces } from '@/app/api/getHoneyPlace'
import { useRouter } from 'next/navigation'

const gridComponents: any = {
  List: forwardRef(({ style, children, ...props }: any, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '0.25rem',
        justifyItems: 'center', // 수평 정렬
        alignItems: 'center', // 수직 정렬
        ...style,
      }}
      className='mt-16'
    >
      {children}
    </div>
  )),

  Item: ({ children, ...props }: any) => (
    <div className='p-3' {...props}>
      {children}
    </div>
  ),
}

const HoneyPlaceListClinet = ({ initialPlaces }: { initialPlaces: HoneyPlace[] }) => {
  const [places, setPlaces] = useState(initialPlaces)
  const router = useRouter()

  useEffect(() => {
    const fetchPlaces = async () => {
      const updatedPlaces = await getHoneyPlaces()
      setPlaces(updatedPlaces)
    }

    fetchPlaces()
  }, [router])

  return (
    <div className='flex justify-center mb-20'>
      <section className='w-full' style={{ paddingBottom: '20px' }}>
        <VirtuosoGrid
          useWindowScroll
          components={gridComponents}
          itemContent={(index) => <HoneyPlaceCard key={places[index].id} place={places[index]} />}
          data={places}
        />
        <PlaceFloatingButton />
      </section>
    </div>
  )
}

export default HoneyPlaceListClinet
