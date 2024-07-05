'use client'

import SearchIcon from '@/assets/icons/search.svg'
import styles from './newplace.module.css'
import Link from 'next/link'
import useStore from '@/stores/useStore'
import { useEffect, useState } from 'react'
import Button from '@/shared/components/elements/Button'
import { subTitle } from '@/shared/components/tailwindCss'

const NewPlacePage = () => {
  const searchQuery = useStore((state) => state.name)
  const setQuery = useStore((state) => state.updateName)
  const address = useStore((state) => state.address)
  const [isDisable, setIsDisable] = useState(true)

  const handleSearch = (e: any) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('name')
      if (storedName) {
        setQuery(storedName)
      }
    }
  }, [setQuery])

  useEffect(() => {
    if (searchQuery && address) {
      setIsDisable(false)
    } else {
      setIsDisable(true)
    }
  }, [address, searchQuery])

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.mainTitle}>새로운 꿀플레이스 등록</h2>
      <section className='mt-[20px] mb-[80px] h-[130px] flex flex-col gap-[10px] '>
        <div className=' flex flex-col gap-[6px]'>
          <p className={subTitle}>꿀플레이스 이름</p>
          <input className={styles.placeName} onChange={handleSearch} value={searchQuery} />
        </div>
        <div className={styles.description}>
          <p className={styles.description_blue}>이름 없는 장소라면, 이름을 지어주세요.</p>
          <p>Top - 장소 이름 앞에 해당 지역의 -읍,면,동을 넣어주세요.</p>
          <p>예시{')'} 한남동 천국의 계단</p>
        </div>
      </section>
      <section className='flex flex-col gap-[8px]'>
        <p className={subTitle}>꿀플레이스 주소</p>
        <div className={styles.searchBox}>
          <button>
            <SearchIcon />
          </button>
          <Link href={'/place/map'} className='w-full'>
            <input
              className='text-sm w-full outline-none'
              placeholder='꿀플레이스 주소를 검색해 보세요'
              readOnly
              value={address && address}
            />
          </Link>
        </div>
      </section>
      <div className={styles.submitButtonContainer}>
        <Link href={'/place/upload'}>
          <Button type='submit' label='완료' disabled={isDisable} />
        </Link>
      </div>
    </div>
  )
}

export default NewPlacePage
