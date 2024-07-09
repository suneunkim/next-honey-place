'use client'

import { ISearchResult } from '@/interfaces/IPlace'
import SearchIcon from '@/assets/icons/search.svg'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import useStore from '@/stores/useStore'
import { getSearchPlaces } from '@/app/api/getSearchPlace'
import useModalStore from '@/stores/useModalStore'
import SearchModalListItem from './SearchModalListItem'

const SearchModalList = () => {
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([])
  const name = useStore((state) => state.name)
  const updateName = useStore((state) => state.updateName)
  const updateAddress = useStore((state) => state.updateAddress)
  const searchQuery = useStore((state) => state.name)
  const setQuery = useStore((state) => state.updateName)
  const closeSearchModal = useModalStore((state) => state.closeSearchModal)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // 디바운스
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) {
        const fetchData = async () => {
          const results = await getSearchPlaces(searchQuery)
          setSearchResults(results as ISearchResult[])
        }

        fetchData()
      } else {
        setSearchResults([])
      }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchQuery])

  // 모달창에서 선택된 가게
  const handleClick = (item: ISearchResult) => {
    updateName(item.name)
    updateAddress(item.address)
    closeSearchModal()
  }

  return (
    <>
      <section className='h-16'>
        <div className='flex items-center h-11 rounded-3xl gap-2 bg-gray-100 px-3'>
          <button>
            <SearchIcon />
          </button>
          <input
            autoFocus
            className='h-11 rounded-3xl bg-gray-100 outline-none flex-1 text-sm'
            placeholder='플레이스명을 검색해 주세요'
            value={name}
            onChange={handleChange}
          />
        </div>
      </section>

      {searchResults?.length > 0 ? (
        searchResults?.map((item: ISearchResult, i: number) => (
          <SearchModalListItem item={item} key={i} onClick={() => handleClick(item)} />
        ))
      ) : (
        <section className='mt-[60px] flex flex-col justify-center w-full'>
          <p className='text-center text-[#777777] text-[14px] font-[500]'>
            내가 찾는 꿀플레이스가 없다면,
          </p>
          <p className='text-center text-[#497CFF] text-[14px] font-[500]'>
            새로운 꿀플레이스를 추가해 보세요!
          </p>
        </section>
      )}

      {searchQuery.length > 0 && (
        <Link href={'/place/newplace'}>
          <button
            onClick={() => closeSearchModal()}
            className='fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white w-48 h-9 rounded-lg z-50 text-sm'
          >
            새로운 꿀플레이스 추가하기
          </button>
        </Link>
      )}
    </>
  )
}

export default SearchModalList
