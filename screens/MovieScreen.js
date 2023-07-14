import { View, Text, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';


const { width, height } = Dimensions.get('window');
const topMargin = ' mt-3';

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5, 6]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // call the movie
  }, [item])


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}

      <View className="w-full">
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>

          <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={20} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon size="35" color={isFavourite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={require('../assets/imgs/poster.jpg')}
              style={{ width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
              style={{ width, height: height * 0.40 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
          Breaking Bad
        </Text>

        {/* status, release year, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {"Released"} • {"2020" || 'N/A'} • {"160"} min
        </Text>



        {/* genres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Drama
          </Text>

        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          It is Breaking Bad man !
        </Text>

      </View>


      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies section */}
      <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />

    </ScrollView>
  )
}

export default MovieScreen