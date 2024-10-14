export interface DetailsConfig {
  img: string
  description: string
  subtitle?: string
  rate: number
  details: string
  isVertical: boolean
  detailsCards: DetailCard[]
}

export interface DetailCard {
  title: string
  description: string
}
