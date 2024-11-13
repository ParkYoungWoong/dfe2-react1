import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export interface IMovies {
  Search: IMovie[];
  totalResults: string;
  Response: string;
}

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function Movies() {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState<IMovie[]>([]);

  async function searchMovies() {
    const res = await fetch(
      `https://omdbapi.com?apikey=7035c60c&s=${searchText}`
    );
    const { Search } = await res.json();
    setMovies(Search);
  }

  return (
    <>
      <h1>Movies</h1>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && searchMovies()}
      />
      <button onClick={searchMovies}>검색</button>
      <ul>
        {movies.map(movie => (
          <li key={`/movies/${movie.imdbID}`}>
            <Link to={movie.imdbID}>{movie.Title}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
