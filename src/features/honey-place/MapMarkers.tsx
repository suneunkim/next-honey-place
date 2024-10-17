import { HoneyPlace } from '@/interfaces/IPlace'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'

interface Props {
  map: any
  data: HoneyPlace[]
  setSelectedPlace: Dispatch<SetStateAction<any>>
}

const MapMarkers = ({ map, data, setSelectedPlace }: Props) => {
  const loadKaKaoMapMarkers = useCallback(() => {
    if (map) {
      data?.map((place: HoneyPlace) => {
        const lat = parseFloat(place.latitude || '0')
        const lng = parseFloat(place.longitude || '0')

        const imageSrc = place?.images[0]
        const imageSize = new window.kakao.maps.Size(40, 40)
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

        // 마커가 표시될 위치
        const markerPosition = new window.kakao.maps.LatLng(lat, lng)

        // 마커를 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
          map: map,
        })

        marker.setMap(map)

        // 마커 커서가 오버됐을 때 표시 할 인포윈도우
        const content = `<div class="infowindow">${place.name}</div>`

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.9,
        })

        window.kakao.maps.event.addListener(marker, 'mouseover', function () {
          // 마커에 마우스오버 이벤트가 발생하면 커스텀 오버레이를 마커위에 표시합니다
          customOverlay.setMap(map)
        })

        window.kakao.maps.event.addListener(marker, 'mouseout', function () {
          customOverlay.setMap(null)
        })

        // 선택한 플레이스 저장
        window.kakao.maps.event.addListener(marker, 'click', function () {
          setSelectedPlace(place)
        })
      })
    }
  }, [map, data, setSelectedPlace])

  useEffect(() => {
    loadKaKaoMapMarkers()
  }, [loadKaKaoMapMarkers, map])

  return <></>
}

export default MapMarkers
