import DetailClientPage from './DetailClientPage'
import getHoneyPlaceById from '@/app/api/getHoneyPlaceById'
import Footer from '@/shared/components/common/Footer'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className='mt-7 px-5'>
      <DetailServerPage id={params.id} />
      <Footer />
    </div>
  )
}

export default page

const DetailServerPage = async ({ id }: { id: string }) => {
  const place = await getHoneyPlaceById(id)

  return <DetailClientPage initialPlace={place} />
}
