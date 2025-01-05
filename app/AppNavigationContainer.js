import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import ErrorScreen from './screens/ErrorScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteMoviesScreen from './screens/FavoriteMoviesScreen';

import FeatherIcon from 'react-native-vector-icons/Feather';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PlayingMovie' component={HomeScreen} options={{ headerShown: false, title: 'Title' }} />
      <Stack.Screen name='MovieDetails' component={MovieDetailsScreen} options={{ headerShown: false, unmountOnBlur: true }} />
      <Stack.Screen name='Error' component={ErrorScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='FavoriteMovies' component={FavoriteMoviesScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FavoriteDetails' component={MovieDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Error' component={ErrorScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}


function RootStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'film';
          } else if (route.name === 'Favorite') {
            iconName = 'heart';
          }

          return <FeatherIcon
            color={color}
            name={iconName}
            size={size} />
        },
        tabBarActiveTintColor: '#366DC7', 
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={HomeStack} options={{ headerShown: false, title: 'Películas' }} />
      <Tab.Screen name='Favorite' component={FavoriteStack} options={{ headerShown: false, title: 'Favoritas' }} />
    </Tab.Navigator>
  )
}

export default function AppNavigationContainer() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}