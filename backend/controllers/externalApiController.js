const axios = require('axios');

const getMoviesFromExternalApi = async (req, res) => {
    try {
        const response = await axios.get('URL_DE_LA_API_EXTERNA/peliculas', {
            params: { /* parámetros si son necesarios */ }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response.status).send('Error al obtener películas');
    }
};

module.exports = {
    getMoviesFromExternalApi
};
