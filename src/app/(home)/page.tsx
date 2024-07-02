'use client'
import LoginButton from '../../shared/components/common/LoginButton'
import Header from '../../shared/components/common/Header'
import Footer from '../../shared/components/common/Footer'
import useCurrentAuth from '@/hook/useCurrentAuth'

export default function Home() {
  const userProfile = useCurrentAuth()
  console.log(userProfile)

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
