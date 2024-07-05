import { db } from '@root/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { HoneyPlace } from '@/interfaces/IPlace'

export const getHoneyPlaces = async () => {
  const placesCol = collection(db, 'honey_place')
  const q = query(placesCol, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)

  const places = querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      ...data,
      createdAt: data.createdAt.toDate().toISOString(), // Timestamp를 ISO 문자열로 변환
      id: doc.id,
    }
  }) as HoneyPlace[]

  return places
}
