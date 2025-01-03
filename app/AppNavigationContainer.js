import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from './screens/HomeScreen';


const Stack = createNativeStackNavigator();

function RootStack(){
  return (
    <Stack.Navigator>
       <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false}}/>
      
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