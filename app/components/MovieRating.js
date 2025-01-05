import { useContext, useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet } from 'react-native';
import RatingInput from './RatingInput'
import { AppContext } from "../contexts/AppContext";
import { addRating } from '../services/api';

export default function MovieRating({ movie_id }) {

    const {
        showGlobalLoading,
        hideGlobalLoading,
        rateMovie,
        ratedMovies,
    } = useContext(AppContext)

    const [rate, setRate] = useState(0);
    const [pendingRate, setPendingRate] = useState(false);

    useEffect(() => {
        const movieRated = ratedMovies.find(item => item.id == movie_id);
        if (movieRated) {
            setRate(() => movieRated.rating)
        }
    }, [ratedMovies])


    async function onChangeRateHandle(rate) {
        setRate(() => rate)
        setPendingRate(() => true)
    }


    async function addRateHandle() {
        try {
            showGlobalLoading('Enviando...', 'rgba(0, 0, 0, 0.4)');
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

    function cancelSendRateHandle() {
        setPendingRate(() => false);
        const prevRate = ratedMovies.find(i => i.id == movie_id);
        if (prevRate) {
            setRate(() => prevRate.rating);
            return;
        }
        setRate(() => 0)
    }


    return (
        <View>
            <Text style={styles.title}>{rate <= 0 ? 'Calificar' : 'Mi calificación'} </Text>
            <RatingInput maxRate={10} value={rate} onChange={onChangeRateHandle} />

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

        </View>)
}

const styles = StyleSheet.create({
    title:{
        fontSize: 13,
        fontWeight: '500',
        color: '#6C757D',
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