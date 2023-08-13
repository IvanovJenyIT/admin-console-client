import { FC } from 'react'
import styles from './Reviews.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { ReviewService } from '@/services/review/review.service'

import AddReviewForm from './add-review-form/AddReviewForm'
import { IReviews } from './reviews.interface'
import ReviewItem from './ReviewItem'

const Reviews: FC<IReviews> = ({ movieID, reviews, isLoading }) => {
	const { user } = useAuth()

	return (
		<div className="mt-10">
			<div>{user && <AddReviewForm movieId={movieID} />}</div>
			{isLoading ? (
				// <Loader count={4} />
				<p>Loading...</p>
			) : reviews?.length ? (
				<>
					<div className={styles.grid}>
						{reviews.map(review => (
							<ReviewItem review={review} key={review.id} />
						))}
					</div>
				</>
			) : (
				<p>Reviews not Found</p>
			)}
		</div>
	)
}

export default Reviews
