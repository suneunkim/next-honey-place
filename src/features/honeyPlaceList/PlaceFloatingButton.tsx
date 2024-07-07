import PencilIcon from '@/assets/icons/pencil.svg'
import Link from 'next/link'

const PlaceFloatingButton = () => {
  return (
    <Link href={'/place/upload'}>
      <div className='fixed w-13 h-13 bg-blue-600 shadow-md shadow-[#0b47a133] p-2.5 rounded-full bottom-20 right-5 flex items-center justify-center'>
        <PencilIcon />
      </div>
    </Link>
  )
}

export default PlaceFloatingButton
