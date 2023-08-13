import Home from '@/components/screens/home/Home'
import { MovieService } from '@/services/movie/movie.service'

const HomePage = async () => {
	const { data: newMovies } = await MovieService.getAll()

	return <Home newMovies={newMovies} />
}

export default HomePage
