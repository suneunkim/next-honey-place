'use client'

import ImageAdd from '@/features/placeUpload/ImageAdd'
import { HoneyPlace } from '@/interfaces/IPlace'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import ImageRemoveIcon from '@/assets/icons/imageRemove.svg'
import Button from '@/shared/components/elements/Button'
import useCurrentAuth from '@/hook/useCurrentAuth'
import Title from '@/shared/components/common/Title'
import { useState } from 'react'
import useEditImageUpload from '@/features/editPlaceLog/useEditImageUpload'
import {
  deleteImageFromStorage,
  uploadMultipleFilesToStorage,
  updateHoneyPlace,
} from '@/utils/firebaseUtils'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  initialPlace: HoneyPlace | null
}

interface FormValues {
  name: string
  address: string
  description: string
  formImages: string[]
}

const EditClientPage = ({ id, initialPlace }: Props) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      description: initialPlace?.description || '',
      formImages: initialPlace?.images,
    },
  })

  const userProfile = useCurrentAuth()
  const [description, setDescription] = useState(initialPlace?.description || '')
  const [stateImages, setImages] = useState<string[]>(initialPlace?.images || [])
  const [files, setFiles] = useState<File[]>([])
  const [deletedImages, setDeletedImages] = useState<string[]>([]) // 삭제된 기존 이미지 추적
  const router = useRouter()

  const { handleEditFileSelect, handleRemoveImage } = useEditImageUpload({
    setImages,
    setDeletedImages,
    setValue,
    setFiles,
    stateImages,
  })

  const onSubmit: SubmitHandler<FieldValues> = async ({ description }) => {
    try {
      // 1. 새로 추가된 이미지 파일 Firebase Storage에 업로드하고 url 받음
      const uploadedImageFiles = await uploadMultipleFilesToStorage(files, userProfile?.uid!)

      // 2. 기존 이미지를 삭제하지 않았다면 해당 이미지와 추가한 이미지 함께 관리
      const finalImages = [
        ...stateImages.filter((url) => !url.startsWith('blob')),
        ...uploadedImageFiles,
      ]

      // 3. 기존에 DB에 등록된 이미지를 삭제했다면 Firebase에서도 삭제
      await Promise.all(
        deletedImages.map(async (url) => {
          await deleteImageFromStorage(url)
        })
      )

      await updateHoneyPlace(description, initialPlace?.id!, finalImages)

      router.push(`/place/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  // tailwind css
  const title = 'text-[14px] font-semibold leading-[22px] text-left text-[#5f5f5f]'
  const textArea =
    'w-full h-[144px] px-[16px] py-[16px] gap-[8px] rounded-[4px] border border-[#c7c7c7] text-[14px] font-medium leading-[22px] text-left focus:border-[#3a5cf3] focus:outline-none'
  const imagePreviewContainer =
    'border border-[#e4e4e4] max-w-[102px] h-[102px] flex flex-col items-center justify-center rounded-[6px] gap-[4px] overflow-hidden relative'
  const 대표이미지 =
    'absolute top-[4px] left-[4px] w-[36px] h-[20px] bg-white border border-[#e4e4e4] text-center text-[10px] font-semibold leading-[18px] text-[#1c1c1c] rounded-[4px] px-[6px] box-border'

  return (
    <div>
      <Title>{initialPlace?.name} 수정</Title>
      <div className='relative'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='h-[542px] flex flex-col gap-[32px]'>
            <section className='h-[130px] flex flex-col gap-[6px]'>
              <h3 className={title}>플레이스 사진 {initialPlace?.images.length}/5</h3>
              <article className='flex flex-nowrap gap-[10px] overflow-x-scroll overflow-y-hidden'>
                {initialPlace && stateImages.length < 5 && (
                  <ImageAdd onFileSelect={handleEditFileSelect} />
                )}
                {/* 미리보기 */}
                {stateImages.map((image, i) => (
                  <div key={i} className={imagePreviewContainer}>
                    {i === 0 && <div className={대표이미지}>대표</div>}
                    <button
                      type='button'
                      className='absolute top-[4px] right-[4px]'
                      onClick={() => handleRemoveImage(i)}
                    >
                      <ImageRemoveIcon />
                    </button>
                    <img src={image} alt='image' className='w-full h-full object-cover' />
                  </div>
                ))}
              </article>
            </section>
            {/* SearchModal 컴포넌트로 다녀온 장소 검색 */}
            <section className='flex flex-col gap-[8px]'>
              <h3 className={title}>다녀온 꿀플레이스</h3>
              <div className='relative flex items-center'>
                <div className='w-full h-[44px] px-[16px] py-[8px] gap-[8px] rounded-[4px] border border-[#c7c7c7] flex items-center'>
                  <input
                    className='flex-grow focus:outline-none text-sm'
                    disabled
                    value={initialPlace?.name}
                  />
                </div>
              </div>
            </section>
            <section className='flex flex-col gap-[8px]'>
              <h3 className={title}>꿀플 노트</h3>
              <textarea
                placeholder='취향에 맞는 장소였나요? 공간의 분위기, 꿀팁 등 방문하기 좋은 이유를 기록해 보세요.'
                className={textArea}
                {...register('description', {
                  required: true,
                  onChange: (e) => setDescription(e.target.value),
                })}
              />
              <p className='text-[12px] font-semibold leading-[18px] text-left text-[#ababab]'>
                * 부적절하거나 불쾌감을 줄 수 있는 내용이 포함될 경우 로그가 숨김 처리될 수
                있습니다.
              </p>
            </section>
          </div>
          <div className='mt-[35px] mb-[40px]'>
            <Button
              type='submit'
              label='꿀플레이스 로그 수정'
              //disabled={!isValid}
            />
            {/* setValue로 관리하는 값을 isValid 하기 위한 input들 */}
            <input type='hidden' {...register('description', { required: true })} />
            <input type='hidden' {...register('formImages', { required: false })} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditClientPage
