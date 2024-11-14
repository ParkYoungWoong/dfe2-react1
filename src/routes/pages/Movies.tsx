import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'

export interface IMovies {
  Search: IMovie[]
  totalResults: string
  Response: string
}

export interface IMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  // const [searchText, setSearchText] = useState('')
  // const [movies, setMovies] = useState<IMovie[]>([])
  const searchText = useMovieStore(state => state.searchText)
  const movies = useMovieStore(state => state.movies)
  const searchMovies = useMovieStore(state => state.searchMovies)

  return (
    <>
      <h1>Movies</h1>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && searchMovies()}
      />
      <button onClick={() => searchMovies()}>검색</button>
      <ul>
        {movies.map(movie => (
          <li key={`/movies/${movie.imdbID}`}>
            <Link to={movie.imdbID}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
