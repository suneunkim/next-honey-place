import { Timestamp } from 'firebase/firestore'

export interface ISearchResult {
  name: string
  address: string
}

export interface HoneyPlace {
  name: string
  images: string[]
  createdAt: Timestamp
  description: string
  address: string
  id: string
}
