'use client'

import { MovieService } from '@/services/movie/movie.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import styles from './Movie.module.scss'
import Image from 'next/image'
import Reviews from './reviews/Reviews'

const Movie = () => {
	const { id } = useParams()
	const movieId = Number(id)
	const { data: movie, isLoading } = useQuery(
		['get movie', id],
		() => MovieService.getMovieById(movieId),
		{
			enabled: !!movieId,
			select: ({ data }) => data
		}
	)

	return (
		<div className={styles.wrapper}>
			<div className={styles.poster}>
				{movie?.poster && (
					<Image
						src={movie?.poster}
						alt={movie?.name}
						width={220}
						height={330}
						className={styles.image}
					/>
				)}
			</div>
			<div className={styles.detail}>
				<h1 className={styles.heading}>{movie?.name}</h1>
				<div className={styles.rating}>{movie?.rating?.toFixed(1)}</div>
				<div className={styles.title}>About movie </div>

				<ul>
					<li>
						<span>Box office </span>
						<span>${movie?.fees.toLocaleString()}</span>
					</li>
				</ul>
				<Reviews
					movieID={movieId}
					reviews={movie?.reviews || []}
					isLoading={isLoading}
				/>
			</div>
		</div>
	)
}

export default Movie
