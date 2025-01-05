import { createContext, useState, useEffect } from 'react';
import { getFavoriteMovies, getRatedMovies } from '../services/api';

const INITIAL_APP_CONTEXT_STATE = {
    loadingIndicator: {
        visible: false,
        message: null,
        backgroundColor: null
    },
    showGlobalLoading: () => { },
    hideGlobalLoading: () => { },

    favoriteMovies: [],
    ratedMovies: [],
    addRemoveFavoriteMovie: (movie_id) => { },
    rateMovie: () => { }
}

export const AppContext = createContext(INITIAL_APP_CONTEXT_STATE);

export default function AppContextProvider({ children }) {

    const [appState, setAppState] = useState(INITIAL_APP_CONTEXT_STATE)

    useEffect(() => {
        fetchAndSetRatedMovies();
        fetchAndSetFavoriteMovies();
    }, [])


    async function fetchAndSetFavoriteMovies() {
        try {
            const response = await getFavoriteMovies();
            const list = response.results.map(item => item.id)
            setAppState(prevState => {
                return { ...prevState, favoriteMovies: list };
            });

        }
        catch (error) {
            console.log(error);
        }
    }

    async function fetchAndSetRatedMovies() {
        try {
            const response = await getRatedMovies();
            const list = response.results.map(item => ({ id: item.id, rating: item.rating }))
            setAppState(prevState => {
                return { ...prevState, ratedMovies: list };
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    function showGlobalLoadingHandle(message = null, backgroundColor = null) {
        setAppState(prev => {
            return {
                ...prev,
                loadingIndicator: { ...prev.loadingIndicator, visible: true, message, backgroundColor }
            }
        })
    };

    function hideGlobalLoadingHandle() {
        setAppState(prev => {
            return {
                ...prev,
                loadingIndicator: { ...prev.loadingIndicator, visible: false }
            }
        })
    };


    function addRemoveFavoriteMovieHandle(movie_id) {
        setAppState(prevState => {
            let movies = [];
            if (prevState.favoriteMovies.indexOf(movie_id) >= 0) {
                movies = prevState.favoriteMovies.filter(i => i != movie_id)
            } else {
                movies = [...prevState.favoriteMovies, movie_id]
            }

            return { ...prevState, favoriteMovies: movies }
        })
    }

    function addRateMovieHandle(rate) {
        setAppState(prevState => {
            let movies = prevState.ratedMovies.filter(i => i.id != rate.id)
            movies = [...movies, rate]
            return { ...prevState, ratedMovies: movies }
        })
    }

    const initialState = {
        loadingIndicator: appState.loadingIndicator,
        showGlobalLoading: showGlobalLoadingHandle,
        hideGlobalLoading: hideGlobalLoadingHandle,
        favoriteMovies: appState.favoriteMovies,
        ratedMovies: appState.ratedMovies,
        addRemoveFavoriteMovie: addRemoveFavoriteMovieHandle,
        rateMovie: addRateMovieHandle
    }

    return (
        <AppContext.Provider value={initialState}>
            {children}
        </AppContext.Provider>
    )
}