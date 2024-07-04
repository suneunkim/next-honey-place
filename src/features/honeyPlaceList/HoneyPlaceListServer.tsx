import { getHoneyPlaces } from '@/app/api/getHoneyPlace'
import HoneyPlaceListClinet from './HoneyPlaceListClient'

const HoneyPlaceListServer = async () => {
  const places = await getHoneyPlaces()

  return <HoneyPlaceListClinet places={places} />
}

export default HoneyPlaceListServer
