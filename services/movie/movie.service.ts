import { IMovie, IMovieDto } from '@/shared/interfaces/movie.interface'
import interceptor, { axiosClassic } from 'api/interceptor'

export const MovieService = {
	async getMovieById(id: number) {
		return axiosClassic.get<IMovie>(`/movie/${id}`)
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>('/movie', {
			params: searchTerm ? { searchTerm } : {}
		})
	},

	async createMovie() {
		return interceptor.post<string>('/movie')
	},

	async updateMovie(id: string, body: IMovieDto) {
		return interceptor.put<IMovie>(`/movie/${id}`, body)
	},

	async deleteMovie(id: string) {
		return interceptor.delete(`/movie/${id}`)
	}
}
