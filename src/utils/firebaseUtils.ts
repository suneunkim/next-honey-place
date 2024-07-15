import { addDoc, collection } from 'firebase/firestore'
import { db } from '@root/firebase'
import { uploadNewPlace } from '@/interfaces/IPlace'

const isTestEnv = process.env.NODE_ENV === 'test'

export const addHoneyPlace = async (newPlace: uploadNewPlace) => {
  if (isTestEnv) {
    return // 테스트 환경에서는 실제로 Firebase 호출을 하지 않음
  }

  const placeDocRef = collection(db, 'honey_place')
  return await addDoc(placeDocRef, newPlace)
}
