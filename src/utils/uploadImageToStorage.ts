// /src/utils/uploadImageToStorage.ts

import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { storage } from '@root/firebase'

const uploadImageToStorage = async (
  file: File,
  userId: string
): Promise<string> => {
  const webpImage = await convertToWebP(file)
  const imageRef = ref(storage, `${userId}/${file.name}.webp`)
  await uploadString(imageRef, webpImage, 'data_url')
  return await getDownloadURL(imageRef)
}

const convertToWebP = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/webp', 0.8))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

export { uploadImageToStorage }
