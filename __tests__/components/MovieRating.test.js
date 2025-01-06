import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MovieRating from '../../app/components/MovieRating';
import { AppContext } from '../../app/contexts/AppContext';

describe('MovieRating Component', () => {
    const mockShowGlobalLoading = jest.fn();
    const mockHideGlobalLoading = jest.fn();
    const mockRateMovie = jest.fn();
    
    const ratedMovies = [{ id: 1, rating: 7 }]

    const contextValue = {
        showGlobalLoading: mockShowGlobalLoading,
        hideGlobalLoading: mockHideGlobalLoading,
        rateMovie: mockRateMovie,
        ratedMovies: ratedMovies,
    };

    it('renders correctly with initial state', () => {
        const { getByText } = render(
            <AppContext.Provider value={contextValue}>
                <MovieRating movie_id={1} />
            </AppContext.Provider>
        );

        expect(getByText('Mi calificación')).toBeTruthy();
    });

    it('allows changing the rate', () => {
        const { getByText, getByTestId } = render(
            <AppContext.Provider value={contextValue}>
                <MovieRating movie_id={1} />
            </AppContext.Provider>
        );
        fireEvent.press(getByTestId('star-btn-6'));
        fireEvent.press(getByText('Enviar'));
        expect(mockShowGlobalLoading).toHaveBeenCalledWith('Enviando...', 'rgba(0, 0, 0, 0.4)');
    });

});
