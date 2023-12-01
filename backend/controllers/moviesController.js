const axios = require('axios');

const API_KEY = "92f42451e0973b64a9685afe86cdcf60";
const BASE_URL = "https://api.themoviedb.org/3";

// Función auxiliar para construir la URL con los parámetros necesarios
const buildUrl = (path, params = {}) => {
    const query = new URLSearchParams({ api_key: API_KEY, ...params }).toString();
    return `${BASE_URL}${path}?${query}`;
};

const getAllMovies = async (req, res) => {
    const language = req.query.language || 'es-ES';
    try {
        const url = buildUrl('/discover/movie', { language });
        const response = await axios.get(url);
        const movies = response.data.results.filter(movie => movie.vote_count > 0);
        res.json(movies);
    } catch (error) {
        res.status(500).send('Error retrieving movies');
    }
};

const getMovieByQuery = async (req, res) => {
    const { query } = req.query;
    const language = req.query.language || 'es-ES';
    try {
        const url = buildUrl('/search/movie', { query, language });
        const response = await axios.get(url);
        const movies = response.data.results.filter(movie => movie.vote_count > 0);
        res.json(movies);
    } catch (error) {
        res.status(500).send('Error retrieving movies');
    }
};

const getMovieById = async (req, res) => {
    const { id } = req.params;
    const language = req.query.language || 'es-ES';
    try {
        const url = buildUrl(`/movie/${id}`, { language });
        const response = await axios.get(url);
        const movie = response.data;
        res.json(movie);
    } catch (error) {
        res.status(500).send('Error retrieving movie');
    }
};

module.exports = { getAllMovies, getMovieByQuery, getMovieById };
