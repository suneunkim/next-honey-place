'use client'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@root/firebase'
import { useState } from 'react'
import { IUserProfile } from '@/interfaces/IUserProfile'

interface Props {
  userProfile: IUserProfile | null
  imageSetValue: (updatedImages: string[]) => void
  setFiles: (files: (prevFiles: File[]) => File[]) => void
}

const useImageUpload = ({ userProfile, imageSetValue, setFiles }: Props) => {
  const [imageURLs, setImageURLs] = useState<string[]>([])

  // 사진 등록으로 선택한 파일
  const handleFileSelect = async (files: FileList) => {
    const fileArray = Array.from(files)
    const urlArray = fileArray.map((file) => URL.createObjectURL(file) as string)

    setFiles((prevFiles) => [...prevFiles, ...fileArray])

    setImageURLs((prevImages) => {
      const updatedImages = [...prevImages, ...urlArray]
      imageSetValue(updatedImages)
      localStorage.setItem('images', JSON.stringify(updatedImages))
      return updatedImages
    })
  }

  // 선택한 파일 삭제
  const handleRemoveImage = (index: number) => {
    setImageURLs((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index)
      imageSetValue(updatedImages)
      localStorage.setItem('images', JSON.stringify(updatedImages))
      return updatedImages
    })

    //setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  // 파이어베이스 스토리지 업로드
  const uploadFile = async (file: File) => {
    const uniqueFileName = `${Date.now()}_${file.name}` // 파일 이름 고유화
    const storageRef = ref(storage, `images/${userProfile?.uid}/${uniqueFileName}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  }

  return { imageURLs, setImageURLs, handleFileSelect, handleRemoveImage, uploadFile }
}

export default useImageUpload
