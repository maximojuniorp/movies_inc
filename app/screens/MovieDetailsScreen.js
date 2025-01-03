import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Accordeon from '../components/Accordeon'
import Rater from '../components/Rater'
import FeatherIcon from 'react-native-vector-icons/Feather';

import { MOVIE_DETAILS, CREDITS } from '../data'
import { useState } from 'react';

const { title, release_date, vote_average, backdrop_path, poster_path, ...movie } = MOVIE_DETAILS;
const credits = CREDITS;
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailsScreen({ route }) {
    const backdrop_url = IMG_BASE_URL + backdrop_path;
    const poster_url = IMG_BASE_URL + poster_path;

    const [booked, setBooked] = useState(false)

    const navigation = useNavigation();
    const { id } = route.params;

    function navigateBack() {
        navigation.goBack();
    }

    function toggleBookmark(){
      setBooked( value => !value )
    }

    return (
        <View style={styles.container}>

            <View style={styles.card}>

                <View style={styles.cardHeader}>
                    <Image
                        alt={title}
                        resizeMode="cover"
                        source={{ uri: backdrop_url }}
                        style={styles.cardImg} />

                    <Image
                        alt={title}
                        resizeMode="contain"
                        source={{ uri: poster_url }}
                        style={styles.cardPoster} />


                    <View style={styles.icon}>
                        <Pressable onPress={navigateBack}>
                            <FeatherIcon
                                color="#000"
                                name="chevron-left"
                                size={25} />
                        </Pressable>
                    </View>

                    <View style={[styles.icon, styles.iconBookmark, booked? { backgroundColor:'#3F80EA' } : null]}>
                        <Pressable 
                            onPress={toggleBookmark}>
                            <FeatherIcon
                                color={ booked? '#fff' : "#000"}
                                name="bookmark"
                                size={25} />
                        </Pressable>
                    </View>

                </View>


                <View style={styles.cardBody}>

                    <Text style={styles.cardTitle}>{title}</Text>

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
                                {release_date}
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
                                {vote_average?.toFixed(2)}
                            </Text>
                        </View>
                    </View>

                </View>


                <View style={styles.containerDescription}>

                    <View >
                        <Text style={styles.cardSubtitle}>Calificar pelicula</Text>
                        <Rater maxRate={10} />
                    </View>

                    <ScrollView>

                        <Accordeon 
                             title={'Descripción'} 
                             open={true}
                             >
                            <Text style={{ color:"#495057" }}>{movie.overview}</Text>
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
                            {credits.cast.map(item => (
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


        </View>

    )
}

const styles = StyleSheet.create({
    //
    container: { 
        flex: 1, 
        padding: 20, 
        gap: 0 ,
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
    paragraph:{
       color: '#6C757D'
    }

})

