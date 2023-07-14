import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../theme';
import { TrendingMovies } from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

export const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('got trending', data.results.length)
    if (data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('got upcoming', data.results.length)
    if (data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log('got top rated', data.results.length)
    if (data && data.results) setTopRated(data.results);
  }


  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search bar and logo */}
      <SafeAreaView className="-mb-2">
        <StatusBar style='light' />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon color="white" size={40} strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies <Text style={styles.text}>L</Text>and
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={40} strokeWidth={2} color="white" />
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending Movies Carousel */}
          { trending.length > 0 && <TrendingMovies data={trending} /> }

          {/* List of Movies */}
          { upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} /> }

          {/* List of Top Rated */}
          { topRated.length>0 && <MovieList title="Top Rated" data={topRated} /> }
        </ScrollView>
      )}
    </View>
  )
}