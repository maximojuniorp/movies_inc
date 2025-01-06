import { render, fireEvent } from '@testing-library/react-native';
import MovieCard from '../../app/components/MovieCard';

describe('MovieCard Component', () => {
    const mockOnPress = jest.fn();
    const props = {
        id: 1,
        poster_url: 'https://example.com/poster.jpg',
        backdrop_url: 'https://example.com/backdrop.jpg',
        title: 'Test Movie',
        release_date: '2025-01-01',
        vote_average: 8.503,
        onPress: mockOnPress,
    };

    it('Renders correctly with given props', () => {
        const { getByText,getByTestId  } = render(<MovieCard {...props} />);
        
        expect(getByTestId('movie-card-backdrop').props.source.uri).toEqual(props.backdrop_url)
        expect(getByTestId('movie-card-poster').props.source.uri).toEqual(props.poster_url)
        expect(getByText(props.title)).toBeTruthy();
        expect(getByText(props.release_date)).toBeTruthy();
        expect(getByText(props.vote_average.toFixed(2))).toBeTruthy();
    });

    it('Calls onPress when pressed', () => {
        const { getByTestId} = render(<MovieCard {...props} />);
        
        fireEvent.press(getByTestId('movie-card'));
        expect(mockOnPress).toHaveBeenCalledWith(1);
    });
});

describe('MovieCard Snapshot', () => {
    it('matches the snapshot', () => {
        const tree = render(
                <MovieCard
                    id={1}
                    poster_url="https://example.com/poster.jpg"
                    backdrop_url="https://example.com/backdrop.jpg"
                    title="Test Movie"
                    release_date="2025-01-01"
                    vote_average={8.5}
                    onPress={() => {}}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
