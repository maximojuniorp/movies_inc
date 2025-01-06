import { Pressable, View, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function RatingInput({ maxRate, value, onChange }) {

    const elements = new Array(maxRate);
    const items = elements.fill(null);

    function onChangeHandle(v) {
        if (onChange) {
            onChange(v)
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.starsContainer}>
                {items.map((e, index) => (
                    <Pressable
                        key={index}
                        onPress={() => { onChangeHandle(index + 1) }}
                        testID={'star-btn-'+index}>
                        <Icon
                            name="star"
                            size={30}
                            color={value >= index + 1 ? '#3F80EA' : 'gray'} 
                            testID={'star-'+index}/>
                    </Pressable>
                ))
                }
            </View>
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
    }

})