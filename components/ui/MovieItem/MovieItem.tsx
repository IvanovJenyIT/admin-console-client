import { IMovie } from '@/shared/interfaces/movie.interface'
import Link from 'next/link'
import { FC } from 'react'
import styles from './MovieItem.module.scss'
import Image from 'next/image'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<Link className={styles.item} href={`/movie/${movie.id}`}>
			{movie.rating && <div className={styles.rating}>{movie.rating}</div>}
			<div className={styles.poster}>
				<Image src={movie.poster} alt={movie.name} width={220} height={330} />
			</div>
			<div className={styles.heading}>{movie.name}</div>
		</Link>
	)
}

export default MovieItem
