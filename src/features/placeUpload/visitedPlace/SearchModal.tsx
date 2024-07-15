import CloseIcon from '@/assets/icons/close.svg'
import SearchModalList from './SearchModalList'

const SearchModal = ({ onModalClose }: { onModalClose: () => void }) => {
  return (
    <>
      <div className='fixed inset-0 bg-black bg-opacity-60 z-50' />
      <div
        data-cy='search-modal'
        className='fixed h-[650px] bottom-0 w-full max-w-sm bg-white rounded-t-lg z-50 p-5'
      >
        <div className='px-[20px]'>
          <section className='flex justify-between items-center mt-3 mb-8'>
            <h3 className='font-bold text-lg leading-5'>꿀플레이스 검색</h3>
            <button onClick={onModalClose}>
              <CloseIcon />
            </button>
          </section>
          <SearchModalList />
        </div>
      </div>
    </>
  )
}

export default SearchModal
