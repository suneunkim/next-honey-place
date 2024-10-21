import Footer from '@/shared/components/common/Footer'
import React from 'react'
import { getHoneyPlaces } from '../api/getHoneyPlace'
import HoneyPlaceMap from '@/features/honey-place/HoneyPlaceMap'

const page = async () => {
  const places = await getHoneyPlaces()

  return (
    <div>
      <HoneyPlaceMap data={places} />
      <Footer />
    </div>
  )
}

export default page
