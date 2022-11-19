import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import Cast from './Cast/Cast';
import Review from './Reviews/Reviews';

const HomePage = lazy(() =>
  import('../pages/HomePage/Home')
);

const MoviesPage = lazy(() =>
  import('../pages/MoviesPage/MoviesPage')
);

const MovieDetailsPage = lazy(() =>
  import('../pages/MovieDetailsPage/MovieDetailsPage')
);

export const App = () => {
  return (
    <Suspense fallback="">
      <Routes>
        <Route path="/goit-react-hw-05-movies/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/goit-react-hw-05-movies/movies"
            element={<MoviesPage />}
          />
          <Route
            path="/goit-react-hw-05-movies/movies/:movieId"
            element={<MovieDetailsPage />}
          >
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Review />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};