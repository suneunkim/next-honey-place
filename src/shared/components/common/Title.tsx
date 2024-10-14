'use client'

import EditModal from '@/features/detailPlaceLog/EditModal'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  children: React.ReactNode
  option?: boolean
  'data-cy'?: string
  onDelete: () => void
}

const Title = ({ children, option, onDelete, ...rest }: Props) => {
  const [editModal, setEditModal] = useState(false)
  const router = useRouter()
  const { id } = useParams()

  const handleBack = () => {
    router.back()
  }

  const openEditModal = () => {
    setEditModal(true)
  }

  const closeEditModal = () => {
    setEditModal(false)
  }

  return (
    <div
      className={`flex items-center h-[30px] justify-between mb-5 relative w-full
    ${option ? 'justify-between' : ''}
    `}
    >
      <svg
        data-slot='icon'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        className='w-5 text-gray-700 cursor-pointer'
        onClick={handleBack}
      >
        <path
          clipRule='evenodd'
          fillRule='evenodd'
          d='M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z'
        ></path>
      </svg>
      <h2
        {...rest}
        className={`text-[16px] font-bold text-[#1c1c1c]
        ${option ? '' : 'mx-auto'}
        `}
      >
        {children}
      </h2>
      {option && (
        <svg
          data-slot='icon'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          className='w-5 text-gray-700 cursor-pointer'
          onClick={openEditModal}
        >
          <path d='M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z'></path>
        </svg>
      )}

      {editModal && <EditModal id={id} onClose={closeEditModal} onDelete={onDelete} />}
    </div>
  )
}

export default Title
