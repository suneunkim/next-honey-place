'use client'

import { useEffect, useState } from 'react'
import { HoneyPlace } from '@/interfaces/IPlace'
import Footer from '@/shared/components/common/Footer'
import Title from '@/shared/components/common/Title'
import NicknameField from './../../../features/detailPlaceLog/NicknameField'
import DetatilImage from '@/features/detailPlaceLog/DetatilImage'
import { deletePlaceAndImages } from '@/utils/firebaseUtils'
import { useRouter } from 'next/navigation'

const DetailClientPage = ({ initialPlace }: { initialPlace: HoneyPlace | null }) => {
  const [place, setPlace] = useState<HoneyPlace | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (initialPlace) {
      setPlace(initialPlace)
      setLoading(false)
    }
  }, [initialPlace])

  const handleDelete = async () => {
    try {
      await deletePlaceAndImages(initialPlace?.id, initialPlace?.images!)
      console.log('handleDelete 실행')
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const title = 'text-[14px] font-semibold leading-[22px] text-left text-[#5f5f5f]'

  return (
    <div className='mt-7 px-5'>
      <Title onDelete={handleDelete} option>
        {place?.name}
      </Title>
      <section>
        <NicknameField nickname={place?.nickname} />
        <div className='relative'>
          <div>
            <div className='h-[542px] flex flex-col gap-[32px]'>
              <section className='flex flex-col gap-[6px] pt-5'>
                <h3 className={title}>플레이스 사진 {initialPlace?.images.length}/5</h3>
                {loading ? (
                  <div className='h-[350px] bg-gray-100 rounded-md'></div>
                ) : (
                  <DetatilImage imageUrl={initialPlace?.images!} />
                )}
                <div className='w-full text-[12px] font-medium leading-[22px] text-gray-600'>
                  {initialPlace?.address}
                </div>
              </section>
              <section className='flex flex-col gap-[8px]'>
                <h4 className={title}>이곳은요</h4>
                <div className='w-full text-[12px] font-medium leading-[22px] text-left'>
                  {initialPlace?.description}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DetailClientPage
