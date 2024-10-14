import { UseFormSetValue } from 'react-hook-form'

interface FormValues {
  name: string
  address: string
  description: string
  formImages: string[]
}

interface Props {
  setImages: (value: React.SetStateAction<string[]>) => void
  setDeletedImages: (value: React.SetStateAction<string[]>) => void
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  setValue: UseFormSetValue<FormValues>
  stateImages: string[]
}

const useEditImageUpload = ({
  setImages,
  setDeletedImages,
  setValue,
  setFiles,
  stateImages,
}: Props) => {
  // 1. 선택된 이미지 파일 상태 업데이트 함수
  const handleEditFileSelect = async (files: FileList) => {
    const fileArray = Array.from(files)
    const urlArray = fileArray.map((file) => URL.createObjectURL(file) as string)

    setFiles((prevFiles) => [...prevFiles, ...fileArray])

    // 미리보기 이미지 업데이트
    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...urlArray]
      setValue('formImages', updatedImages) // RHF의 register form 제출 시 검증 용도로 업데이트
      return updatedImages
    })
  }

  // 2. 삭제한 파일 상태 업데이트 함수
  const handleRemoveImage = async (index: number) => {
    const imageUrl = stateImages[index]

    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index)
      setValue('formImages', updatedImages)
      return updatedImages
    })

    if (imageUrl.startsWith('https://firebasestorage.googleapis.com/')) {
      setDeletedImages((prevDeleted) => [...prevDeleted, imageUrl])
    }

    setFiles((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index)
      return updatedImages
    })
  }

  return {
    handleEditFileSelect,
    handleRemoveImage,
  }
}

export default useEditImageUpload
