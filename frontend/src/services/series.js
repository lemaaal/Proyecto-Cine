const API_KEY = '92f42451e0973b64a9685afe86cdcf60';

export const searchSeries = async (search) => {
  if (search === '') return [];

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${search}`);
    const json = await response.json();

    return json.results.map(tv => ({
      id: tv.id,
      title: tv.name, // Note that for TV series, it's 'name', not 'title'
      year: tv.first_air_date,
      image: tv.poster_path,
      type: 'tv' // Mark the type as 'tv'
    }));
  } catch (e) {
    console.error('Error searching series:', e);
    throw new Error('Error searching series');
  }
};
