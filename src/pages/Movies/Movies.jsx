import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MoviesList from 'components/MoviesList/MoviesList';
import apiResources from 'services/themoviedb.org_API';
import s from './Movies.module.css';

export default function MoviesPage() {
  const [query, setQuery] = useState('');
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('query');

  useEffect(() => {
    search && onClickSearch(search);
  }, [search]);

  function onClickSearch(search) {
    try {
      const response = apiResources.fetchMoviesByQuery(search);
        response.then(data => {
          console.log(data)
          data.data.results.map(() =>
            setMoviesSearch(data.data.results)
          );
        });
      } catch (error) {}
    }
  

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({query:query})
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <main>
      <form className={s.form} onSubmit={handleSubmit}>
        <input onChange={handleChange} value={query} />
        <button onClick={() => onClickSearch(query)}>Search</button>
      </form>
      {moviesSearch.length !== 0 && <MoviesList movies={moviesSearch} />}
    </main>
  );
}