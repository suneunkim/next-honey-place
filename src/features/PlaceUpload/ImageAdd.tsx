interface Props {
  onFileSelect: (files: FileList) => void
}

const ImageAdd = ({ onFileSelect }: Props) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      onFileSelect(files)
    }
  }

  return (
    <article className='flex gap-[10px]'>
      <label
        className='border border-[#e4e4e4] min-w-[102px] h-[102px] flex flex-col items-center justify-center rounded-[6px] gap-[4px] overflow-hidden relative'
        htmlFor='file'
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M0 8H16' stroke='#ABABAB' strokeWidth='1.5' />
          <path d='M8 0V16' stroke='#ABABAB' strokeWidth='1.5' />
        </svg>
        <p className='text-[14px] font-semibold leading-[22px] text-center text-[#777777]'>
          사진 등록
        </p>
        <input
          className='hidden'
          id='file'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
        />
      </label>
    </article>
  )
}

export default ImageAdd
