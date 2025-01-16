import * as config from './config';

export const fetchPopularMovies = async () => {
  const url = new URL(`${config.BASE_URL}/discover/movie`);
  const params = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc'
  }

  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${config.API_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status_message}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching popular movies', error);
    return [];
  }
}