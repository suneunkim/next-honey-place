import Header from '../../shared/components/common/Header'
import Footer from '../../shared/components/common/Footer'
import HoneyPlaceListServer from '@/features/honeyPlaceList/HoneyPlaceListServer'

export default function Home() {
  return (
    <main>
      <Header />
      <HoneyPlaceListServer />
      <Footer />
    </main>
  )
}
