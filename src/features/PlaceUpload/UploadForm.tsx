'use client'
import ImageAdd from '@/features/PlaceUpload/ImageAdd'
import ImageRemoveIcon from '@/assets/icons/imageRemove.svg'
import RightArrowIcon from '@/assets/icons/rightarrow.svg'
import Button from '@/shared/components/elements/Button'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useStore from '@/stores/useStore'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@root/firebase'
import useCurrentAuth from '@/hook/useCurrentAuth'
import useImageUpload from './useImageUpload'
import useImageStore from '@/stores/useimageStore'
interface FormValues {
  name: string
  address: string
  description: string
  images: string[]
}

const UploadForm = ({ onModalOpen }: { onModalOpen: () => void }) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      address: '',
      description: '',
      images: [],
    },
  })

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false) // 중복 제출 방지
  const name = useStore((state) => state.name)
  const address = useStore((state) => state.address)
  const clearState = useStore((state) => state.clearState)
  const { files, setFiles } = useImageStore()

  const userProfile = useCurrentAuth()

  const imageSetValue = (value: string[]) => {
    setValue('images', value)
  }

  const { imageURLs, setImageURLs, handleFileSelect, handleRemoveImage, uploadFile } =
    useImageUpload({
      userProfile,
      imageSetValue,
      setFiles,
    })

  // 새로고침에도 이미지 유지를 위해서 watch 대신 useEffect와 setValue 사용
  useEffect(() => {
    setValue('name', name)
    setValue('address', address)
    const storedImages = localStorage.getItem('images')
    if (storedImages) {
      const parsedImages = JSON.parse(storedImages)
      setImageURLs(parsedImages)
      imageSetValue(parsedImages)
    }
  }, [name, address, setValue])

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    if (!userProfile) {
      alert('로그인이 필요합니다')
      return
    }
    setIsLoading(true)
    const { name, address, description } = formData

    if (imageURLs.length === 0) {
      alert('이미지를 등록해주세요.')
      return
    }

    try {
      const uploadedImageFiles = await Promise.all(
        files.map(async (file) => {
          const url = await uploadFile(file)
          return url
        })
      )

      const placeDocRef = collection(db, 'honey_place')

      const newPlace = {
        name,
        description,
        address,
        images: uploadedImageFiles,
        createdAt: new Date(),
      }

      await addDoc(placeDocRef, newPlace)

      // 게시물 등록 후 서버에 알림 생성 요청
      const response = await fetch('/api/create-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Honey Place',
          body: '새 게시물을 등록했습니다.',
        }),
      })

      const result = await response.json()
      console.log('Response from server:', result)

      localStorage.removeItem('name')
      localStorage.removeItem('images')
      clearState()
      router.push('/')
    } catch (error) {
      console.error('Error uploading files: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  // tailwind css
  const title = 'text-[14px] font-semibold leading-[22px] text-left text-[#5f5f5f]'
  const textArea =
    'w-full h-[144px] px-[16px] py-[16px] gap-[8px] rounded-[4px] border border-[#c7c7c7] text-[14px] font-medium leading-[22px] text-left focus:border-[#3a5cf3] focus:outline-none'
  const imagePreviewContainer =
    'border border-[#e4e4e4] min-w-[102px] h-[102px] flex flex-col items-center justify-center rounded-[6px] gap-[4px] overflow-hidden relative'
  const 대표이미지 =
    'absolute top-[4px] left-[4px] w-[36px] h-[20px] bg-white border border-[#e4e4e4] text-center text-[10px] font-semibold leading-[18px] text-[#1c1c1c] rounded-[4px] px-[6px] box-border'

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='h-[542px] flex flex-col gap-[32px]'>
          <section className='h-[130px] flex flex-col gap-[6px]'>
            <h3 className={title}>플레이스 사진 {imageURLs.length}/5</h3>
            <article className='flex flex-nowrap gap-[10px] overflow-x-scroll overflow-y-hidden '>
              {imageURLs.length < 5 && <ImageAdd onFileSelect={handleFileSelect} />}
              {/* 미리보기 */}
              {imageURLs.map((image, i) => (
                <div key={i} className={imagePreviewContainer}>
                  {i === 0 && <div className={대표이미지}>대표</div>}
                  <button
                    type='button'
                    className='absolute top-[4px] right-[4px]'
                    onClick={() => handleRemoveImage(i)}
                  >
                    <ImageRemoveIcon />
                  </button>
                  <img src={image} alt='image' className='max-w-full max-h-full' />
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
                  placeholder='꿀플레이스를 선택해 주세요'
                  className='flex-grow focus:outline-none text-sm'
                  readOnly
                  value={name}
                />
              </div>
              <span onClick={onModalOpen} className='absolute right-[20px]'>
                <RightArrowIcon />
              </span>
            </div>
          </section>
          <section className='flex flex-col gap-[8px]'>
            <h3 className={title}>꿀플 노트</h3>
            <textarea
              placeholder='취향에 맞는 장소였나요? 공간의 분위기, 꿀팁 등 방문하기 좋은 이유를 기록해 보세요.'
              className={textArea}
              {...register('description', { required: true })}
            />
            <p className='text-[12px] font-semibold leading-[18px] text-left text-[#ababab]'>
              * 부적절하거나 불쾌감을 줄 수 있는 내용이 포함될 경우 로그가 숨김 처리될 수 있습니다.
            </p>
          </section>
        </div>
        <div className='mt-[35px] mb-[40px]'>
          <Button type='submit' label='꿀플레이스 로그 등록' disabled={!isValid} />
          {/* setValue로 관리하는 값을 isValid 하기 위한 input들 */}
          <input type='hidden' {...register('name', { required: true })} />
          <input type='hidden' {...register('address', { required: true })} />
          <input type='hidden' {...register('images', { required: true })} />
        </div>
      </form>
    </div>
  )
}

export default UploadForm
