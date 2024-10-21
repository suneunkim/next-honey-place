import React from 'react'
import EditClientPage from './EditClientPage'
import getHoneyPlaceById from '@/app/api/getHoneyPlaceById'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className='mt-7 px-5'>
      <EditServerPage id={params.id} />
    </div>
  )
}

export default page

const EditServerPage = async ({ id }: { id: string }) => {
  const place = await getHoneyPlaceById(id)

  return <EditClientPage id={id} initialPlace={place} />
}
