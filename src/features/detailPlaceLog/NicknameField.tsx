import React from 'react'

interface Props {
  nickname?: string
}
const NicknameField = ({ nickname }: Props) => {
  return (
    <div className='flex items-center'>
      <svg
        data-slot='icon'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        className='w-10 text-gray-300'
      >
        <path
          clipRule='evenodd'
          fillRule='evenodd'
          d='M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z'
        ></path>
      </svg>
      <div className='text-[14px] font-semibold leading-[22px] text-left text-gray-800 px-2'>
        {nickname ? nickname : '익명의 글쓴이'}
      </div>
    </div>
  )
}

export default NicknameField
