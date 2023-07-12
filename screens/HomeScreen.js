import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../theme';
import { TrendingMovies } from '../components/TrendingMovies';
import MovieList from '../components/MovieList';

export const HomeScreen = () => {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);

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

          <TouchableOpacity>
            <MagnifyingGlassIcon size={40} strokeWidth={2} color="white" />
          </TouchableOpacity>

        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending Movies Carousel */}
        <TrendingMovies data={trending} />

        {/* List of Movies */}
        <MovieList title="Upcoming Movies" data={upcoming} />

        {/* List of Top Rated */}
        <MovieList title="Top Rated" data={topRated} />
      </ScrollView>
    </View>
  )
}