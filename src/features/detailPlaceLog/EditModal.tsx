import Link from 'next/link'

interface Props {
  onClose: () => void
  id?: string | string[] | undefined
  onDelete: () => void
}

const sharedCss = 'text-white cursor-pointer'

const EditModal = ({ onClose, id, onDelete }: Props) => {
  return (
    <div className='w-[100px] text-sm bg-gray-600 absolute top-0 right-0 p-4 flex flex-col gap-5 z-10'>
      <div onClick={onClose} className={sharedCss}>
        닫기
      </div>
      <Link href={`/place/${id}/edit`}>
        <div className={sharedCss}>수정하기</div>
      </Link>
      <div onClick={onDelete} className={sharedCss}>
        삭제하기
      </div>
    </div>
  )
}

export default EditModal
