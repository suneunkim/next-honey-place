import LoginButton from '../../shared/components/common/LoginButton'
import Header from '../../shared/components/common/Header'
import Footer from '../../shared/components/common/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <div className='flex h-[calc(100vh-56px)] justify-center'>
        <LoginButton />
      </div>
      <Footer />
    </main>
  )
}
