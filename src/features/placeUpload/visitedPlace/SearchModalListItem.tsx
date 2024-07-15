import { ISearchResult } from '@/interfaces/IPlace'

interface Props {
  item: ISearchResult
  onClick: () => void
}

const SearchModalListItem = ({ item, onClick }: Props) => {
  return (
    <>
      <section
        className='flex flex-col gap-5 mb-5 cursor-pointer'
        onClick={onClick}
      >
        <div data-cy="search-modal-item" className='flex gap-4 items-center h-12'>
          <div className='w-12 h-full rounded bg-gray-300'></div>
          <div>
            <h4 className='text-sm font-semibold leading-5 text-left text-gray-900'>
              {item.name}
            </h4>
            <p className='text-xs font-medium leading-4 text-left text-gray-600'>
              {item.address}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default SearchModalListItem
