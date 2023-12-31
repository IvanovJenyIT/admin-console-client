import { IReview, IReviewDto } from '@/shared/interfaces/review.interface'
import interceptor from 'api/interceptor'

export const ReviewService = {
	async createReview(body: IReviewDto) {
		return interceptor.patch<IReview>(`/review`, body)
	}
}
