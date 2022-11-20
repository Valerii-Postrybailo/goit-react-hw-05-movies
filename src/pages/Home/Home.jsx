import { useState, useEffect } from 'react';
import MoviesList from 'components/MoviesList/MoviesList';
import apiResources from 'services/themoviedb.org_API.js';

export default function Home() {
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    apiResources.getTodayTrendingMovies().then(data => {
      data.results.map(({ id, title }) =>
        setMovies(m => [...m, { id, title }])
      );
    });
  }, []);



  return (
    <main>
      <h1>Trending today</h1>
        <ul>
          {movies.length !== 0 && <MoviesList movies={movies} />}
        </ul>
    </main>
    
  );

}