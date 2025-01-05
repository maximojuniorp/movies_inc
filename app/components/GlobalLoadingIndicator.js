import { useContext } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { AppContext } from '../contexts/AppContext'

export default function GlobalLoadingIndicator() {

    const { loadingIndicator } = useContext(AppContext)
    const { visible, backgroundColor, message } = loadingIndicator;
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={[styles.container, backgroundColor ? { backgroundColor:backgroundColor } : null]}>
                <ActivityIndicator size="large" color="#fff" />
                {message && <Text style={styles.message}>{message}</Text>}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F80EA',
    },
    message: {
        color: '#fff'
    }
});