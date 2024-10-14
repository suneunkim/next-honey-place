import { db } from '@root/firebase'
import { storage } from '@root/firebase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { addDoc, collection } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { uploadNewPlace } from '@/interfaces/IPlace'

const isTestEnv = process.env.NODE_ENV === 'test'

export const addHoneyPlace = async (newPlace: uploadNewPlace) => {
  if (isTestEnv) {
    return // 테스트 환경에서는 실제로 Firebase 호출을 하지 않음
  }

  const placeDocRef = collection(db, 'honey_place')
  return await addDoc(placeDocRef, newPlace)
}

export const updateHoneyPlace = async (description: string, placeId: string, images: string[]) => {
  const placeDocRef = doc(db, 'honey_place', placeId)
  const updatedData = {
    description,
    images,
  }
  await updateDoc(placeDocRef, updatedData)
}

// 이미지 파일 Firebase Storage에 업로드하는 로직
export const uploadSingleFileToStorage = async (file: File, userId: string): Promise<string> => {
  const uniqueFileName = `${Date.now()}_${file.name}` // 파일 이름 고유화
  const storageRef = ref(storage, `images/${userId}/${uniqueFileName}`)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url
}

// 이미지 파일 여러개 등록하기
export const uploadMultipleFilesToStorage = async (
  files: File[],
  userId: string
): Promise<string[]> => {
  const uploadedImageFiles = await Promise.all(
    files.map(async (file) => {
      const url = await uploadSingleFileToStorage(file, userId)
      return url
    })
  )
  return uploadedImageFiles
}

export const deleteHoneyPlace = async (placeId:string | undefined) => {
  const placeDocRef = doc(db, 'honey_place', placeId!)
  await deleteDoc(placeDocRef)
}

// 기존에 파이어베이스 올라갔던 이미지 삭제하기
export const deleteImageFromStorage = async (url: string) => {
  const imageRef = ref(storage, url)
  await deleteObject(imageRef)
}

export const deletePlaceAndImages = async (placeId: string | undefined, imageUrls: string[]) => {
  try {
    // 1. Firestore에서 문서 삭제
    await deleteHoneyPlace(placeId);

    // 2. Storage에서 각 이미지 삭제
    await Promise.all(
      imageUrls.map(async (url) => {
        await deleteImageFromStorage(url);
      })
    );
    console.log('Place and images successfully deleted');
  } catch (error) {
    console.error('Error deleting place and images:', error);
  }
};
