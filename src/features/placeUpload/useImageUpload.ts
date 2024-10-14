'use client'

import { useState } from 'react'

interface Props {
  imageSetValue: (updatedImages: string[]) => void
  setFiles: (files: (prevFiles: File[]) => File[]) => void
}

const useImageUpload = ({ imageSetValue, setFiles }: Props) => {
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
  }

  return { imageURLs, setImageURLs, handleFileSelect, handleRemoveImage }
}

export default useImageUpload
