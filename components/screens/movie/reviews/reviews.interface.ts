import { IReview } from '@/shared/interfaces/review.interface'

export interface IReviews {
	movieID: number
	reviews: IReview[]
	isLoading: boolean
}
