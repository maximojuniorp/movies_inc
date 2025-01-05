import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Accordeon from '../components/Accordeon'
import Rater from '../components/Rater'
import FeatherIcon from 'react-native-vector-icons/Feather';

import { useContext, useEffect, useState } from 'react';
import { addFavorite, removeFavorite, addRating, getMovieCredits, getMovieDetails } from '../services/api';
import { AppContext } from '../contexts/AppContext';

import { IMG_BASE_URL } from '../config/appConfig'

export default function MovieDetailsScreen({ route }) {

    const {
        showGlobalLoading,
        hideGlobalLoading,
        rateMovie,
        addRemoveFavoriteMovie,
        ratedMovies,
        favoriteMovies
    } = useContext(AppContext)

    const navigation = useNavigation();
    const { movie_id } = route.params;

    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);

    const [rate, setRate] = useState(0);
    const [pendingRate, setPendingRate] = useState(false);

    const isFavorite = favoriteMovies.indexOf(movie_id) >= 0;

    useEffect(() => {
        fetchMovieDetails();
        fetchMovieCredits();
    }, [])

    useEffect(() => {
        const movieRated = ratedMovies.find(item => item.id == movie_id);
        if (movieRated) {
            setRate(() => movieRated.rating)
        }
    }, [ratedMovies])

    function navigateBack() {
        navigation.goBack();
    }

    async function fetchMovieDetails() {
        try {
            showGlobalLoading();
            const response = await getMovieDetails(movie_id)
            setMovie(response);
            hideGlobalLoading();
        }
        catch (error) {
            console.log(error)
            hideGlobalLoading();
            //Go to error screen
            navigation.navigate('Error', { ...route.params, error: "Ha ocurrido un error cargando el detalle." })
        }
    }

    async function fetchMovieCredits() {
        try {
            const response = await getMovieCredits(movie_id);
            setCredits(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function onChangeRateHandle(rate) {
        setRate(() => rate)
        setPendingRate(() => true)
    }

    async function addRateHandle() {
        try {
            showGlobalLoading();
            await addRating(movie_id, rate);
            rateMovie({ id: movie_id, rating: rate });
            hideGlobalLoading();
        }
        catch (error) {
            console.log(error)
            Alert.alert("Error", 'Ha ocurrido un error');
            hideGlobalLoading()
        }
        finally {
            setPendingRate(() => false)
        }
    }

    async function toggleFavoriteHandle() {
        try {
            showGlobalLoading();
            if (isFavorite) {
                await removeFavorite(movie_id);
            } else {
                await addFavorite(movie_id);
            }
            addRemoveFavoriteMovie(movie_id);
            hideGlobalLoading();
        }
        catch (error) {
            console.log(error)
            Alert.alert("Error", 'Ha ocurrido un error');
            hideGlobalLoading()
        }
    }

    function cancelSendRateHandle(){
        setPendingRate( () => false);
        const prevRate = ratedMovies.find( i => i.id == movie_id);
        if(prevRate){
            setRate( () => prevRate.rating);
            return;
        }

        setRate( () => 0)
    }

   
    return (
        <View style={styles.container}>

            {movie &&

                <View style={styles.card}>

                    <View style={styles.cardHeader}>
                        <Image
                            alt={movie.title}
                            resizeMode="cover"
                            source={{ uri: IMG_BASE_URL + movie.backdrop_path }}
                            style={styles.cardImg} />

                        <Image
                            alt={movie.title}
                            resizeMode="contain"
                            source={{ uri: IMG_BASE_URL + movie.poster_path }}
                            style={styles.cardPoster} />


                        <View style={styles.icon}>
                            <Pressable onPress={navigateBack}>
                                <FeatherIcon
                                    color="#000"
                                    name="chevron-left"
                                    size={25} />
                            </Pressable>
                        </View>

                        <View style={[styles.icon, styles.iconBookmark, isFavorite ? { backgroundColor: '#3F80EA' } : null]}>
                            <Pressable
                                onPress={toggleFavoriteHandle}>
                                <FeatherIcon
                                    color={isFavorite ? '#fff' : "#000"}
                                    name="heart"
                                    size={24} />
                            </Pressable>
                        </View>

                    </View>


                    <View style={styles.cardBody}>

                        <Text style={styles.cardTitle}>{movie.title}</Text>

                        <View style={styles.cardContent}>
                            <View>
                                <Text
                                    style={styles.cardSubtitle}
                                >
                                    Fecha de estreno
                                </Text>

                                <Text
                                    style={styles.cardDescription}
                                >
                                    {movie.release_date}
                                </Text>
                            </View>
                            <View>
                                <Text
                                    style={styles.cardSubtitle}
                                >
                                    Calificación promedio
                                </Text>
                                <Text
                                    style={styles.cardDescription}
                                >
                                    {movie.vote_average?.toFixed(2)}
                                </Text>
                            </View>
                        </View>

                        <View >
                            <Text style={styles.cardSubtitle}>{ rate <= 0? 'Calificar pelicula' : 'Mi calificación' } </Text>
                            <Rater maxRate={10} value={rate} onChange={onChangeRateHandle} />

                            {pendingRate &&
                                <View style={styles.buttonsContainer}>
                                    <Pressable
                                        onPress={cancelSendRateHandle}>
                                        <View style={[styles.button, styles.buttonCancel]}>
                                            <Text style={styles.buttonText}>Cancelar</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable
                                        onPress={addRateHandle}>
                                        <View style={[styles.button, styles.buttonSend]}>
                                            <Text style={styles.buttonText}>Enviar</Text>
                                        </View>
                                    </Pressable>
                                </View>}

                        </View>


                    </View>


                    <View style={styles.containerDescription}>
                        <ScrollView>

                            <Accordeon
                                title={'Descripción'}
                                open={true}
                            >
                                <Text style={{ color: "#495057" }}>{movie.overview}</Text>
                            </Accordeon>

                            <Accordeon
                                title={'Generos'}
                            >
                                {movie.genres.map(item => (
                                    <Text key={item.id} style={styles.paragraph}>{item.name}</Text>
                                ))}
                            </Accordeon>


                            <Accordeon
                                title={'Autores (Personajes)'} >
                                {credits && credits.cast.map(item => (
                                    <Text
                                        key={item.cast_id}
                                        style={styles.paragraph}
                                    >
                                        {item.name}{' (' + item.character + ')'}
                                    </Text>
                                ))}
                            </Accordeon>


                        </ScrollView>

                    </View>



                </View>
            }


        </View>
    )

}

const styles = StyleSheet.create({
    //
    container: {
        flex: 1,
        padding: 20,
        gap: 0,
        backgroundColor: '#F7F9FC'
    },

    //Card
    card: {
        flex: 1,
        padding: 12,
        borderRadius: 24,
        backgroundColor: '#fff',
        overflow: 'hidden',
        elevation: 3,
        zIndex: 4
    },

    cardHeader: {
        position: 'relative',
        borderRadius: 24
    },

    cardImg: {
        width: '100%',
        height: 280,
        borderRadius: 24,
    },

    cardPoster: {
        position: 'absolute',
        width: '80%',
        height: '80%',
        bottom: 20,
        left: '50%',
        transform: [
            { translateX: '-50%' }
        ]
    },
    icon: {
        position: 'absolute',
        width: 32,
        height: 32,
        top: 12,
        left: 10,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '50%',
        backgroundColor: '#fff',
        elevation: 15
    },
    iconBookmark: {
        top: 12,
        left: 'unset',
        right: 10,
        elevation: 15
    },
    // Body
    cardBody: {
        gap: 5,
        paddingVertical: 16,
        paddingHorizontal: 12,
        paddingBottom: 0
    },
    cardTitle: {
        marginBottom: 4,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '700',
        color: '#495057',
        letterSpacing: 0.4
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'base-line',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 10
    },
    cardSubtitle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6C757D',
    },
    cardDescription: {
        fontSize: 12,
        fontWeight: '400',
        color: '#6C757D'
    },

    // Description
    containerDescription: {
        flex: 1,
        backgroundColor: '#F7F9FC',
        padding: 8,
        borderRadius: 16
    },
    paragraph: {
        color: '#6C757D'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,

    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 0.6
    },
    buttonCancel: {
        backgroundColor: '#D9534F'
    },
    buttonSend: {
        backgroundColor: '#3F80EA'
    }


})

