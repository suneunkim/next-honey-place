import Header from '../../shared/components/common/Header'
import Footer from '../../shared/components/common/Footer'
import { getHoneyPlaces } from '../api/getHoneyPlace'
import HoneyPlaceListClinet from '@/features/honeyPlaceList/HoneyPlaceListClient'

export default function Home() {
  return (
    <main>
      <Header />
      <HoneyPlaceListServer />
      <Footer />
    </main>
  )
}

const HoneyPlaceListServer = async () => {
  const places = await getHoneyPlaces()
  return <HoneyPlaceListClinet initialPlaces={places} />
}
