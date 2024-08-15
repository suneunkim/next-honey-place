interface Props {
  onClose: () => void
}

const sharedCss = 'text-white cursor-pointer'

const EditModal = ({ onClose }: Props) => {
  return (
    <div className='w-[100px] h-[140px] text-sm bg-gray-600 absolute top-0 right-0 p-4 flex flex-col gap-5'>
      <div onClick={onClose} className={sharedCss}>
        닫기
      </div>
      <div className={sharedCss}>수정하기</div>
      <div className={sharedCss}>삭제하기</div>
    </div>
  )
}

export default EditModal
