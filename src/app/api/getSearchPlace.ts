import { db } from '@root/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'

export const getSearchPlaces = async (searchTerm: string) => {
  const placesCol = collection(db, 'search_place')

  const q = query(
    placesCol,
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff'),
    orderBy('name')
  )

  const querySnapshot = await getDocs(q)
  const places = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }))
  return places
}
