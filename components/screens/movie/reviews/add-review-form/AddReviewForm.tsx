import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MdSend } from 'react-icons/md'
import { useMutation } from '@tanstack/react-query'

import styles from './AddReviewForm.module.scss'

import { ReviewService } from '@/services/review/review.service'
import { IReviewDto } from '@/shared/interfaces/review.interface'
import FIeld from '@/components/ui/Field/FIeld'
import { queryClient } from 'providers/query-provider/QueryProvider'

const AddReviewForm: FC<{ movieId: number }> = ({ movieId }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset
	} = useForm<IReviewDto>({
		mode: 'onChange'
	})

	const { mutateAsync } = useMutation(
		['add review'],
		(data: IReviewDto) => ReviewService.createReview({ ...data, movieId }),
		{
			async onSuccess() {
				reset()
				await queryClient.invalidateQueries({
					queryKey: ['get movie', movieId]
				})
			}
		}
	)

	const onSubmit: SubmitHandler<IReviewDto> = async data => {
		await mutateAsync(data)
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.description}>
				<FIeld
					{...register('description', {
						required: 'Description is required'
					})}
					placeholder="Add a public review"
					error={errors.description}
				/>

				<button className={styles.button}>
					<MdSend />
				</button>
			</div>
		</form>
	)
}

export default AddReviewForm
