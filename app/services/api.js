import * as CONFIG from '../config/appConfig';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: CONFIG.BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
       config.headers['Authorization'] = `Bearer ${CONFIG.API_KEY}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const getPlayingMovies = async (params = {}) => {
    try {
        const response = await axiosInstance.get('/movie/now_playing', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getMovieDetails = async (movie_id) => {
    try {
        const response = await axiosInstance.get(`/movie/${movie_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getMovieCredits = async (movie_id) => {
    try {
        const response = await axiosInstance.get(`/movie/${movie_id}/credits`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getSimilar = async (movie_id) => {
    try {
        const response = await axiosInstance.get(`/movie/${movie_id}/similar`, { });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getRatedMovies = async () => {
    try {
        const response = await axiosInstance.get(`/account/${CONFIG.ACCOUNT_ID}/rated/movies`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getFavoriteMovies = async (params = {}) => {
    try {
        const response = await axiosInstance.get(`/account/${CONFIG.ACCOUNT_ID}/favorite/movies`,  { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};


export const addRating = async (movie_id, rate) => {
    try {
        const response = await axiosInstance.post(`/movie/${movie_id}/rating`, { value: rate });
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const addFavorite = async (movie_id) => {
    try {
        const response = await axiosInstance.post(`/account/${CONFIG.ACCOUNT_ID}/favorite`, { 
            media_type: "movie",
            media_id: movie_id,
            favorite: true
          });
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const removeFavorite = async (movie_id) => {
    try {
        const response = await axiosInstance.post(`/account/${CONFIG.ACCOUNT_ID}/favorite`, { 
            media_type: "movie",
            media_id: movie_id,
            favorite: false
          });
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
