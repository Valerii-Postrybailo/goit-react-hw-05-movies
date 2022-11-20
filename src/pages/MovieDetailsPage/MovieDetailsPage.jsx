import { useState, useRef } from 'react';
import apiResources from 'services/themoviedb.org_API';
import MovieDetails from 'components/MovieDetails/MovieDetails';
import { Link, useParams, useLocation } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import { useEffect } from 'react';

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { movieId } = useParams();

  const locationRef = useRef(useLocation().state);

  useEffect(() => {
    try {
      const response = apiResources.fetchMoviesById(movieId);
      response.then(data => {
        const {
          title,
          overview,
          poster_path,
          vote_average,
          genres,
          release_date,
        } = data.data;
        setMovieDetails({
          title,
          overview,
          poster_path,
          vote_average,
          genres,
          release_date,
        });
      });
    } catch (error) {}
  }, [movieId]);

  if (movieDetails) {
    const { title, overview, poster_path, vote_average, genres, release_date } =
      movieDetails;

    return (
      <>
        {locationRef.current && (
          <Link
            className={s.link}
            to={locationRef.current.location}
            state={locationRef.current.search}
          >
            &#8592; Go back
          </Link>
        )}
        <div className={s.info}>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            className={s.img}
            alt={title}
          />
          <div className={s.text}>
            <h2>{`${title} (${release_date.slice(0, 4)})`}</h2>
            <p>{`User score: ${((vote_average * 10).toFixed(2))}%`}</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <p>{genres.map(({ name }) => `${name} `)}</p>
          </div>
        </div>
        <p>Additional information</p>
        <MovieDetails />
      </>
    );
  }
}