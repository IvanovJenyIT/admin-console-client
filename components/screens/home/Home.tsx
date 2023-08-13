import { FC } from 'react'
import { IHOme } from './home.interface'
import MovieItem from '@/components/ui/MovieItem/MovieItem'
import styles from './Home.module.scss'

const Home: FC<IHOme> = async ({ newMovies }) => {
	return (
		<>
			<h1 className={styles.heading}>New movies</h1>
			<div className={styles.catalog}>
				{newMovies.length ? (
					newMovies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
				) : (
					<div>Movies not found</div>
				)}
			</div>
		</>
	)
}

export default Home
