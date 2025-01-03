import { useState } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function Rater({ maxRate, value, onChange, onSubmit }) {

    const [rate, setRate] = useState(value)
    const [sent, setSent] = useState(true)

    const elements = new Array(maxRate);
    const items = elements.fill(null);


    function setCountHandle(count) {
        setRate(() => count);
        setSent(() => false)
        if (onChange) {
            onChange(rate)
        }
    }

    function onSubmitHandle() {
        setSent(() => true)
        if (onSubmit) {
            onSubmit(rate)
        }
    }

    function onCancelHandle() {
        setRate(() => 0);
    }

    return (
        <View style={styles.container}>
            <View style={styles.starsContainer}>
                {items.map((e, index) => (
                    <Pressable
                        key={index}
                        onPress={() => { setCountHandle(index + 1) }}>
                        <Icon
                            name="star"
                            size={30}
                            color={rate >= index + 1 ? '#3F80EA' : 'gray'} />
                    </Pressable>
                ))
                }
            </View>
            {rate > 0 && !sent &&
                <View style={styles.buttonsContainer}>
                    <Pressable
                        onPress={onCancelHandle}>
                        <View style={[styles.button, styles.buttonCancel]}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={onSubmitHandle}>
                        <View style={[styles.button, styles.buttonSend]}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </View>
                    </Pressable>
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        paddingVertical: 3
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5
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