'use client'

import { useState } from 'react'
import { HoneyPlace } from '@/interfaces/IPlace'
import Script from 'next/script'
import MapMarkers from './MapMarkers'
import SelectedPlace from './SelectedPlace'

const HoneyPlaceMap = ({ data }: { data: HoneyPlace[] }) => {
  const [map, setMap] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState<HoneyPlace | null>(null)

  const handleClosePlace = () => {
    setSelectedPlace(null)
  }

  const loadKaKaoMap = () => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map')

        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5667, 126.9782),
          level: 4,
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOption)

        setMap(map)
      })
    }
  }

  return (
    <>
      <Script
        strategy='afterInteractive'
        type='text/javascript'
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&&libraries=services&autoload=false`}
        onReady={loadKaKaoMap}
      />
      <div id='map' className='w-full h-[calc(100vh-57px)]' />
      {map && <MapMarkers map={map} data={data} setSelectedPlace={setSelectedPlace} />}
      {selectedPlace && <SelectedPlace data={selectedPlace} onClose={handleClosePlace} />}
    </>
  )
}

export default HoneyPlaceMap
