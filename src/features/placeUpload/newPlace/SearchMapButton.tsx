'use client'
import Button from '@/shared/components/elements/Button'
import styles from './map.module.css'
import useStore from '@/stores/useStore'
import Link from 'next/link'

const SearchMapButton = () => {
  const address = useStore((state) => state.address)

  return (
    <div className={styles.container}>
      <div className={styles.address}>
        <p>{address}</p>
      </div>
      <Link href={'/place/newplace'}>
        <Button data-cy='map-btn' label='이 위치로 등록' />
      </Link>
    </div>
  )
}

export default SearchMapButton
