import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface Rating {
  Source: string
  Value: string
}

export default function MovieDetails() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    fetchMovieDetails()
  }, [])

  async function fetchMovieDetails() {
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&i=${movieId}`)
    const movie = await res.json()
    setMovie(movie)
  }
  return (
    <>
      <h1>Movie Details</h1>
      <h2>{movie?.Title}</h2>
      <p>{movie?.Plot}</p>
    </>
  )
}

// http://localhost:5174/movies/tt4154796
// http://localhost:5174/movies/tt4520988
