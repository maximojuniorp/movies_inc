import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext'
import { getPlayingMovies } from '../services/api';

import MovieCard from '../components/MovieCard';

import { IMG_BASE_URL } from '../config/appConfig';


export default function HomeScreen() {

    const navigator = useNavigation();

    const { showGlobalLoading, hideGlobalLoading } = useContext(AppContext)
    const [playingMoviesList, setPlayingMoviesList] = useState([])

    // Sort
    const sortedMovies = playingMoviesList.sort((a, b) => a.title.localeCompare(b.title));

    useEffect(() => {
        fetchAndSetPlayingMoviesList();
    }, [])

    async function fetchAndSetPlayingMoviesList() {
        try {
            showGlobalLoading('Cargando ...');
            const response = await getPlayingMovies();
            const list = response.results;
            setPlayingMoviesList(() => list);
        }
        catch (error) {
            console.error(error);
            navigator.navigate('Error', { error: "Ha ocurrido un error cargando la lista." });
        }
        finally {
            hideGlobalLoading();
        }
    }

    async function selectedItemHandle(movie_id) {
        navigator.navigate('MovieDetails', { movie_id })
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Movies Inc</Text>
            </View>

            <FlatList
                contentContainerStyle={styles.listContainer}
                data={sortedMovies}
                renderItem={({ item }) => (
                    <MovieCard
                        id={item.id}
                        release_date={item.release_date}
                        title={item.title}
                        backdrop_url={IMG_BASE_URL + item.backdrop_path}
                        poster_url={IMG_BASE_URL + item.poster_path}
                        vote_average={item.vote_average}
                        onPress={selectedItemHandle}
                    />
                )}
                keyExtractor={(itemData) => itemData.id}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#F7F9FC'
    },

    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        elevation: 10,
        paddingVertical: 20,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        backgroundColor: '#366DC7',
    },

    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontStyle: 'italic',
        letterSpacing: 0.5,
        fontWeight: 'bold'
    },

    listContainer: {
        padding: 24,
        paddingTop: 90,
        height: 'auto'
    }
});