import { HoneyPlace } from '@/interfaces/IPlace'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  data: HoneyPlace
  onClose: () => void
}

const SelectedPlace = ({ data, onClose }: Props) => {
  return (
    <div className='fixed bottom-20 rounded-md shadow-md bg-white transition ease-in-out delay-100 inset-x-0 mx-auto z-10 w-[340px]'>
      <div className='flex px-8 py-4 gap-4'>
        <Image
          className=' object-cover'
          src={data?.images[0]}
          alt={data?.name}
          width={50}
          height={50}
          loading='eager'
        />
        <div className='w-full'>
          <div className='flex justify-between'>
            <div className='text-gray-800 font-semibold'>{data.name}</div>
            <button onClick={onClose}>x</button>
          </div>
          <div className='text-gray-600 text-sm mt-2'>{data.description}</div>
        </div>
      </div>

      <div className='w-full p-2 text-center bg-blue-500 text-white rounded-b-md'>
        <Link href={`/place/${data.id}`}>상세보기</Link>
      </div>
    </div>
  )
}

export default SelectedPlace
