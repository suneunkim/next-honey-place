import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  imageUrl: string[]
}

const DetatilImage = ({ imageUrl }: Props) => {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      centeredSlides={true}
      loop={false}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className='w-full h-[350px]'
    >
      {imageUrl?.map((image, i) => (
        <SwiperSlide key={i}>
          <img
            key={i}
            src={image}
            alt='image'
            className='h-[350px] object-cover w-full rounded-md overflow-hidden'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default DetatilImage
