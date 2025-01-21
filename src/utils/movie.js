import * as config from './config';

const fetchMovies = async (endpoint, params = {}, totalPages = 1) => {
  const allMovies = [];
  const url = new URL(`${config.BASE_URL}/${endpoint}`);

  const queryParams = { ...params };

  try {
    const moviePromises = Array.from({ length: totalPages }, (_, page) => {
      queryParams.page = page + 1;
      url.search = new URLSearchParams(queryParams).toString();

      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${config.API_KEY}`,
          'Accept': 'application/json'
        }
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status_message}`);
        }
        return response.json();
      }).then(({ results }) => results);
    });

    const pageResults = await Promise.all(moviePromises);
    pageResults.forEach((items) => (allMovies.push(...items)));
    return allMovies;
  } catch (err) {
    console.error('Error fetching movies:', err);
    return [];
  }
}

/**
 * Fetches popular movies from the TMDB API.
 * @param {number} totalPages - The number of pages to fetch. // TODO : Pagination
 * @returns {Promise<Array>} - A promise that resolves to an array of popular movies.
 */
export const fetchPopularMovies = async (totalPages = 4) => {
  const params = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    sort_by: 'popularity.desc'
  };

  return fetchMovies('discover/movie', params, totalPages);
};
