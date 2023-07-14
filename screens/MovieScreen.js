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
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';


const { width, height } = Dimensions.get('window');
const topMargin = ' mt-3';

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetials = async id => {
    const data = await fetchMovieDetails(id);
    console.log('got movie details');
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  }
  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id);
    console.log('got movie credits')
    if (data && data.cast) {
      setCast(data.cast);
    }

  }
  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if (data && data.results) {
      setSimilarMovies(data.results);
    }

  }

  console.log(movie)


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
              source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
              // source={require('../assets/imgs/poster.jpg')}
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
          {movie?.title}
        </Text>

        {/* status, release year, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          {movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
            </Text>
          ) : null}
        </Text>



        {/* genres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {
              movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;
                return (
                  <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                    {genre?.name} {showDot ? "•" : null}
                  </Text>
                )
              })}
          </Text>

        </View>

        {/* description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
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