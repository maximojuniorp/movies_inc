import { View, Text, Button} from "react-native"

export default function ErrorScreen({ navigation, route }) {
    const { error } = route.params;

    const handleRetry = () => {
        const state = navigation.getState();
        const previousScreenName =
        state.routes[state.index - 1]?.name || 'No Previous Screen';
        
        navigation.navigate(previousScreenName, route.params);
    };

    return (
        <View style={{ flex: 1}}>
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                <Text>{error}</Text>
                <Button onPress={handleRetry} color="#841584" title="Reintentar"/> 
            </View>
        </View>)
}