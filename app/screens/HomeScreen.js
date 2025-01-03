import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native';
import MovieCard from '../components/MovieCard';

import { MOVIES_LIST } from '../data'
import { useNavigation } from '@react-navigation/native';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function HomeScreen() {

   const  navigator = useNavigation();

    // Sort
    const sortedMovies = MOVIES_LIST.sort( (a, b) => a.title.localeCompare(b.title));

    


   function selectedItemHandle(id){
         navigator.navigate('MovieDetails', { id })
    }

    return (
        <SafeAreaView style={styles.container}>
         
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Movie Inc</Text>
            </View>

            <FlatList 
               contentContainerStyle={styles.listContainer}
               data={sortedMovies}
               renderItem={ ({item}) =>(
                  <MovieCard 
                      id={item.id}
                      release_date={item.release_date}
                      title={item.title}
                      backdrop_url={IMG_BASE_URL + item.backdrop_path}
                      poster_url={IMG_BASE_URL + item.poster_path}
                      vote_average={item.vote_average}
                      onPress={selectedItemHandle}
                  />
               )}
               keyExtractor={ ( itemData) => itemData.id }
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: '#F7F9FC'
    },

    header:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      elevation: 10,
      paddingVertical: 20,
      borderBottomEndRadius: 40,
      borderBottomStartRadius: 40,
      backgroundColor: '#366DC7',
    },

    headerTitle:{
       color: 'white',
       fontSize: 20,
       fontStyle: 'italic',
       letterSpacing: 0.5,
       fontWeight: 'bold'
    },

    listContainer: {
        padding: 24,
        paddingTop: 90,
        height: 'auto'
    }
});