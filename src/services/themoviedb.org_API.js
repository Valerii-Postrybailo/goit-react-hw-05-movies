import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "382444e8c99210370bca744e3a3591e9";

export const getTodayTrendingMovies = async () => {
  const response = await axios.get(
    `/trending/movie/day?api_key=${API_KEY}`
  );
    // console.log(response.data)
    return response.data;
};

function fetchMoviesByQuery(query) {
  const response = axios.get(
    `/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response;
}

function fetchMoviesById(id) {
  const response = axios.get(
    `/movie/${id}?api_key=${API_KEY}`
  );

    return response;
}

function fetchCast(id) {
  const response = axios.get(
    `/movie/${id}/credits?api_key=${API_KEY}`
  );

    return response;
}

function fetchReview(id) {
  const response = axios.get(
    `/movie/${id}/reviews?api_key=${API_KEY}`
  );

    return response;
}

const apiResources = {
  getTodayTrendingMovies,
  fetchMoviesById,
  fetchMoviesByQuery,
  fetchCast,
  fetchReview,
};

export default apiResources;


