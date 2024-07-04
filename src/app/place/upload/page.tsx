'use client'

import SearchModal from '@/features/PlaceUpload/VitiedPlace/SearchModal'
import UploadForm from '@/features/PlaceUpload/UploadForm'
import useModalStore from '@/stores/useModalStore'

const UploadPage = () => {
  const isSearchModal = useModalStore((state) => state.isSearchModal)
  const openSearchModal = useModalStore((state) => state.openSearchModal)
  const closeSearchModal = useModalStore((state) => state.closeSearchModal)

  const titleClass =
    'text-[16px] font-bold leading-[22px] text-center text-[#1c1c1c] py-[13px] mb-[20px]'
  return (
    <>
      <div className='mt-7 px-5'>
        <h2 className={titleClass}>꿀플레이스 로그 등록</h2>
        <UploadForm onModalOpen={openSearchModal} />
      </div>
      {isSearchModal && <SearchModal onModalClose={closeSearchModal} />}
    </>
  )
}

export default UploadPage
