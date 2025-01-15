import axios from "axios";

// Base URL: https://api.themoviedb.org/3
//URL DA API: /movie/now_playing?api_key=90d028b9efded32546cdb0cdbbb18195&language=pt-BR


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;