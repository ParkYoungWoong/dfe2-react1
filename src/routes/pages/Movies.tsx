import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const inputText = useMovieStore(state => state.inputText)
  const setInputText = useMovieStore(state => state.setInputText)
  const searchText = useMovieStore(state => state.searchText)
  const setSearchText = useMovieStore(state => state.setSearchText)

  const queryClient = useQueryClient()
  const { data: movies } = useQuery<Movie[]>({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      return Search
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!searchText
  })

  function fetchMovies() {
    setSearchText(inputText) // 비동기
    // 캐시된 것이 있으면, 캐시 데이터를 써!
    // 아니면, 새로 가져와!
    queueMicrotask(() => {
      queryClient.fetchQuery({
        queryKey: ['movies', searchText],
        staleTime: 1000 * 60 * 60 * 24
      })
    })
  }

  return (
    <>
      <h1>Movies</h1>
      <input
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={() => fetchMovies()}>검색</button>
      <ul>
        {movies?.map(movie => (
          <li key={`/movies/${movie.imdbID}`}>
            <Link to={movie.imdbID}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
