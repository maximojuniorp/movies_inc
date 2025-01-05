import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import ErrorScreen from './screens/ErrorScreen';


const Stack = createNativeStackNavigator();

function RootStack(){
  return (
    <Stack.Navigator>
       <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false}}/>
       <Stack.Screen name='MovieDetails' component={MovieDetailsScreen} options={{ headerShown: false, unmountOnBlur: true}} />
       <Stack.Screen name='Error' component={ErrorScreen} options={{ headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default function AppNavigationContainer(){
     return (
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
     )
}