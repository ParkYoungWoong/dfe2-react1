import { Link, Outlet } from 'react-router-dom'
import { useMovieStore } from '@/stores/movie'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from '@/components/Loader'

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
  const {
    data: movies,
    isFetching,
    isLoading
  } = useQuery<Movie[]>({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      const res = await fetch(
        `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
      )
      const { Search } = await res.json()
      if (!Search) {
        throw new Error('영화를 찾을 수 없습니다!')
      }
      return Search
    },
    staleTime: 1000 * 10,
    // placeholderData: prev => prev,
    // placeholderData: [{ Title: '임시데이터', Year: '9999' } as Movie],
    enabled: !!searchText,
    select: data => {
      return data?.filter(movie => Number.parseInt(movie.Year, 10) > 2000)
    }
  })

  function fetchMovies() {
    setSearchText(inputText) // 비동기
    // 캐시된 것이 있으면, 캐시 데이터를 써!
    // 아니면, 새로 가져와!
    queueMicrotask(() => {
      queryClient.fetchQuery({
        queryKey: ['movies', searchText],
        staleTime: 1000 * 10
      })
    })
  }

  return (
    <>
      <h1>Movies</h1>
      <input
        placeholder="검색할 영화 제목을 작성하세요!"
        type="text"
        value={inputText}
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && fetchMovies()}
      />
      <button onClick={() => fetchMovies()}>검색</button>
      {isFetching && <Loader />}
      <ul>
        {movies?.map(movie => (
          <li key={`/movies/${movie.imdbID}`}>
            <Link to={movie.imdbID}>
              {movie.Title}({movie.Year})
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  )
}
