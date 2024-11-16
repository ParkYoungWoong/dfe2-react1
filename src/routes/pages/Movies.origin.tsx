import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'

export default function Movies() {
  // const [searchText, setSearchText] = useState('')
  // const [movies, setMovies] = useState<IMovie[]>([])
  const searchText = useMovieStore(state => state.searchText)
  const movies = useMovieStore(state => state.movies)
  const searchMovies = useMovieStore(state => state.searchMovies)
  const setSearchText = useMovieStore(state => state.setSearchText)

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
