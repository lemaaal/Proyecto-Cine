const API_KEY = '92f42451e0973b64a9685afe86cdcf60'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`)
    const json = await response.json()

    const movies = json.results

    const filteredMovies = movies.filter(movie => movie.vote_count > 0);

    return filteredMovies?.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date,
      image: movie.poster_path,
      type: 'movie',
      vote_count: movie.vote_count,
    }))
  } catch (e) {
    throw new Error('Error searching movies')
  }
}