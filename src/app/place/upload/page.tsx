'use client'

import UploadForm from '@/features/placeUpload/UploadForm'
import SearchModal from '@/features/placeUpload/visitedPlace/SearchModal'
import useModalStore from '@/stores/useModalStore'
import Title from '@/shared/components/common/Title'

const LogtitleClass =
  'text-[16px] font-bold leading-[22px] text-center text-[#1c1c1c] py-[13px] mb-[20px]'

const UploadPage = () => {
  const isSearchModal = useModalStore((state) => state.isSearchModal)
  const openSearchModal = useModalStore((state) => state.openSearchModal)
  const closeSearchModal = useModalStore((state) => state.closeSearchModal)

  return (
    <>
      <div className='mt-7 px-5'>
        <Title data-cy='upload-title'>꿀플레이스 로그 등록</Title>
        <UploadForm onModalOpen={openSearchModal} />
      </div>
      {isSearchModal && <SearchModal onModalClose={closeSearchModal} />}
    </>
  )
}

export default UploadPage
