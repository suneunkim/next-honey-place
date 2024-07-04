import HoneyPlaceCard from './HoneyPlaceCard'
import PlaceFloatingButton from './PlaceFloatingButton'
import { HoneyPlace } from '@/interfaces/IPlace'

const HoneyPlaceListClinet = ({ places }: { places: HoneyPlace[] }) => {
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

export default HoneyPlaceListClinet