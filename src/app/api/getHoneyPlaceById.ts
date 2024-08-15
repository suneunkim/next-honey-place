import { db } from '@root/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { HoneyPlace } from '@/interfaces/IPlace'

const getHoneyPlaceById = async (id: string): Promise<HoneyPlace | null> => {
  const docRef = doc(db, 'honey_place', id)

  const docSnapshot = await getDoc(docRef)

  if (docSnapshot.exists()) {
    const data = docSnapshot.data()
    return {
      ...data,
      createdAt: data?.createdAt.toDate().toISOString(), // Timestamp를 ISO 문자열로 변환
      id: docSnapshot.id,
    } as HoneyPlace
  } else {
    return null
  }
}

export default getHoneyPlaceById
