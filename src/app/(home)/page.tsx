import Header from '../../shared/components/common/Header'
import Footer from '../../shared/components/common/Footer'
import HoneyPlaceList from '@/features/honeyPlaceList/HoneyPlaceList'

export default function Home() {
  return (
    <main>
      <Header />
      <HoneyPlaceList />
      <Footer />
    </main>
  )
}
