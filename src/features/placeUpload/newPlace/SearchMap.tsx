'use client'

import useStore from '@/stores/useStore'
import Script from 'next/script'
import { useRef } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

const SearchMap = () => {
  const setAddress = useStore((state) => state.updateAddress)
  const latitude = useStore((state) => state.latitude)
  const longitude = useStore((state) => state.longitude)
  const mapRef = useRef<any>(null)

  const loadKaKaoMap = () => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map')

        const mapOption = {
          center: new window.kakao.maps.LatLng(latitude || 37.5667, longitude || 126.9782),
          level: 1,
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOption)
        const marker = new window.kakao.maps.Marker({
          position: map.getCenter(),
          map: map,
        })

        if (window.kakao.maps.services && window.kakao.maps.services.Geocoder) {
          const geocoder = new window.kakao.maps.services.Geocoder()

          const updateAddress = (coords: any) => {
            // 좌표 값에 해당하는 주소 요청
            geocoder.coord2Address(coords.getLng(), coords.getLat(), (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const detailAddr = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name
                setAddress(detailAddr, coords.getLat(), coords.getLng())
              }
            })
          }

          updateAddress(map.getCenter())
          // idle 중심 좌표나 확대 수준이 변경되면 발생
          window.kakao.maps.event.addListener(map, 'idle', function () {
            const center = map.getCenter()
            marker.setPosition(center)
            updateAddress(center)
          })

          mapRef.current = { map, marker, updateAddress }
        }
      })
    }
  }

  // 현재 위치로
  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        const newCenter = new window.kakao.maps.LatLng(lat, lng)
        const { map, marker, updateAddress } = mapRef.current

        map.setCenter(newCenter)
        marker.setPosition(newCenter)
        updateAddress(newCenter)
      })
    } else {
      alert('현재 위치를 사용할 수 없습니다.')
    }
  }

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&&libraries=services&autoload=false`}
        onReady={loadKaKaoMap}
      />
      <div id='map' className='w-full h-[560px]' />
      <div className='pt-5 px-2.5'>
        <button
          className='w-full px-2 h-10 py-3 bg-blue-400 text-white flex justify-center items-center rounded-lg leading-3 mt-2 text-sm hover:bg-blue-500'
          onClick={moveToCurrentLocation}
        >
          현재 위치로 이동하기
        </button>
      </div>
    </>
  )
}

export default SearchMap
