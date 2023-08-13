import Movie from '@/components/screens/movie/Movie'
import { Metadata } from 'next'
import React from 'react'

type Props = {
	params: {
		id: string
	}
}

export function generateMetadata({ params: { id } }: Props) {
	return {
		title: id
	}
}

const MoviePage = () => {
	return <Movie />
}

export default MoviePage
