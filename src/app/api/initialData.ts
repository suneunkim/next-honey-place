import { db } from '@root/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

type Places = {
  name: string
  address: string
}

const initialPlace = [
  {
    name: '개인카페',
    address: '서울시 강서구 등촌동',
  },
  {
    name: '스타벅스',
    address: '서울시 강남구 삼성동',
  },
  {
    name: '이디야커피',
    address: '서울시 종로구 종로1가',
  },
  {
    name: '빽다방',
    address: '서울시 마포구 서교동',
  },
  {
    name: '할리스커피',
    address: '서울시 성동구 성수동',
  },
  {
    name: '카페베네',
    address: '서울시 영등포구 여의도동',
  },
  {
    name: '더블에스프레소',
    address: '서울시 용산구 한남동',
  },
  {
    name: '브런치카페',
    address: '서울시 서초구 반포동',
  },
  {
    name: '그린티하우스',
    address: '서울시 강북구 미아동',
  },
  {
    name: '샐러드스토리',
    address: '서울시 중구 명동',
  },
  {
    name: '디저트파라다이스',
    address: '서울시 송파구 잠실동',
  },
  {
    name: '스무디킹',
    address: '서울시 관악구 신림동',
  },
  {
    name: '아침햇살카페',
    address: '서울시 노원구 중계동',
  },
  {
    name: '야채마켓',
    address: '서울시 은평구 불광동',
  },
  {
    name: '헬로브런치',
    address: '서울시 구로구 구로동',
  },
  {
    name: '테라스카페',
    address: '서울시 금천구 가산동',
  },
  {
    name: '오가닉바이트',
    address: '서울시 동작구 사당동',
  },
  {
    name: '커피타임',
    address: '서울시 강동구 천호동',
  },
  {
    name: '글루텐프리베이커리',
    address: '서울시 서대문구 신촌동',
  },
  {
    name: '비건디저트샵',
    address: '서울시 성북구 정릉동',
  },
  {
    name: '서울숯불갈비',
    address: '서울시 중구 을지로동',
  },
  {
    name: '김치찜 전문점',
    address: '서울시 동대문구 청량리동',
  },
  {
    name: '마라탕의 왕',
    address: '서울시 성동구 왕십리동',
  },
  {
    name: '수제버거 맛집',
    address: '서울시 마포구 연남동',
  },
  {
    name: '피자매니아',
    address: '서울시 용산구 이태원동',
  },
  {
    name: '떡볶이 천국',
    address: '서울시 강남구 역삼동',
  },
  {
    name: '한우정육식당',
    address: '서울시 송파구 방이동',
  },
  {
    name: '오므라이스의 집',
    address: '서울시 영등포구 당산동',
  },
  {
    name: '초밥천하',
    address: '서울시 서초구 서초동',
  },
  {
    name: '바비큐 레스토랑',
    address: '서울시 강동구 둔촌동',
  },
  {
    name: '이탈리아노',
    address: '서울시 종로구 삼청동',
  },
  {
    name: '베트남 쌀국수',
    address: '서울시 은평구 진관동',
  },
  {
    name: '탕수육의 달인',
    address: '서울시 동작구 노량진동',
  },
  {
    name: '제주흑돼지',
    address: '서울시 광진구 건대입구',
  },
  {
    name: '비빔밥 하우스',
    address: '서울시 서대문구 홍은동',
  },
  {
    name: '부대찌개 전문점',
    address: '서울시 관악구 봉천동',
  },
  {
    name: '전주비빔밥',
    address: '서울시 노원구 상계동',
  },
  {
    name: '순대국밥집',
    address: '서울시 구로구 신도림동',
  },
  {
    name: '닭갈비 맛집',
    address: '서울시 강북구 수유동',
  },
  {
    name: '바다회집',
    address: '서울시 금천구 시흥동',
  },
]

const initialDataUpload = async (places: Places[]) => {
  const batch = writeBatch(db)
  const placesRef = collection(db, 'search_place')
  try {
    places.forEach((product: Places) => {
      const docRef = doc(placesRef, product.name)
      batch.set(docRef, product)
    })
    await batch.commit()
  } catch (error) {
    console.error('업로드 오류 발생', error)
  }
}

// 렌더링 최적화 테스트용 목업 게시물 생성
const placesUpload = async (places: any[]) => {
  const batch = writeBatch(db)
  const placesRef = collection(db, 'honey_place')
  try {
    places.forEach((place) => {
      const docRef = doc(placesRef) // 자동 생성 ID를 위한 docRef
      batch.set(docRef, place) // batch에 추가
    })
    await batch.commit()
    console.log('일괄 업로드 성공')
  } catch (error) {
    console.error('업로드 오류 발생', error)
  }
}

const initialData = () => {
  const initialPlaces2 = []

  for (let i = 0; i < 50; i++) {
    initialPlaces2.push({
      name: `최적화 테스트용 Place ${i}`,
      description: `Description for Place ${i}`,
      address: `서울시 영등포구 여의도동`,
      images: [
        'https://firebasestorage.googleapis.com/v0/b/honey-place.appspot.com/o/images%2FKtnP4nHvoghaz9CvFqcUbOLkGrl1%2F%ED%94%84%EB%A1%9C%EA%B7%B8%EB%B9%88.PNG?alt=media&token=c3527f2f-e82c-4c59-afd3-4cfb6efbb355',
      ],
      createdAt: new Date(),
    })
  }

  placesUpload(initialPlaces2)
}

export default initialData
