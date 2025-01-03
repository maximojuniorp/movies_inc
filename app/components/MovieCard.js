import { Pressable, View, Image, Text, StyleSheet } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function MovieCard({ id, poster_url, backdrop_url, title, release_date, vote_average, onPress }) {

    return (<Pressable
        onPress={() => onPress(id)}>
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
                    <FeatherIcon
                        color="#000"
                        name="chevron-right"
                        size={25} />
                </View>
            </View>
            <View style={styles.cardBody}>
                <Text style={styles.cardTitle}

                    ellipsizeMode={'tail'}>{title}</Text>
                <View style={styles.cardContent}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardSubtitle}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}>Fecha de estreno</Text>

                        <Text style={styles.cardDescription}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}>{release_date}</Text>

                    </View>
                    <View>
                        <Text
                            style={styles.cardSubtitle}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}>Calificación promedio</Text>
                        <Text
                            style={styles.cardDescription}>
                            {vote_average?.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </Pressable>)

}

const styles = StyleSheet.create({
    //
    card: {
        padding: 12,
        borderRadius: 24,
        marginBottom: 24,
        backgroundColor: '#fff',
        elevation: 2
    },

    // Header
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
        width: '50%',
        height: '70%',
        bottom: 20,
        left: 8,
    },
    icon: {
        position: 'absolute',
        width: 32,
        height: 32,
        top: 12,
        right: 10,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '50%',
        backgroundColor: '#fff',
        opacity: 0.6,
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
        fontSize: 19,
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
    }
})