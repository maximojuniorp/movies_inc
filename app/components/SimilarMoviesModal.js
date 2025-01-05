import { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, FlatList, Text, Pressable } from 'react-native'
import { getSimilar } from '../services/api';
import { IMG_BASE_URL } from '../config/appConfig';
import MovieCard from './MovieCard';
import FeatherIcon from 'react-native-vector-icons/Feather';


export default function SimilarMoviesModal({ movie_id, visible, onSelected, onClose }) {

    const [moviesList, setMoviesList] = useState([])

    useEffect(() => {
        fetchAndSetMoviesList()
    }, [visible])


    async function fetchAndSetMoviesList() {
        try {
            const response = await getSimilar(movie_id);
            const list = response.results;
            setMoviesList(() => list);
        }
        catch (error) {
            console.error(error);
        }
    }

    function selectedItemHandle(id) {
        if (onSelected) {
            onSelected(id)
        }
    }


    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.backDrop}>

                <View style={styles.backDropContentContainer}>

                    <View style={styles.container}>

                        <Pressable onPress={onClose}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>
                                    Películas similares </Text>
                                <FeatherIcon
                                    color='#fff'
                                    name="chevron-down"
                                    size={30} />

                            </View>

                        </Pressable>

                        <View style={{ flex: 1 }}>
                            <FlatList
                                contentContainerStyle={styles.listContainer}
                                data={moviesList}
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
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backDrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },

    backDropContentContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    container: {
        backgroundColor: '#F7F9FC',
        height: '80%',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        overflow: 'hidden'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        backgroundColor: '#366DC7',
        padding: 20
    },
    headerTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600
    },
    listContainer: {
        padding: 24,
        height: 'auto'
    },
});