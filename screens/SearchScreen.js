import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { Dimensions } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loading from '../components/Loading';


const { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3])
  const [loading, setLoading] = useState(false);


  return (
    <SafeAreaView className="bg-neutral-800 flex-1">

      {/* search input */}
      <View
        className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full" >
        <TextInput
          // onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />

        </TouchableOpacity>
      </View>

      {/* search results */}
      {
        loading ? (
          <Loading />
        ) :
          results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3"
            >
              <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
              <View className="flex-row justify-between flex-wrap">
                {
                  results.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => navigation.push('Movie', item)}>
                        <View className="space-y-2 mb-4">
                          <Image
                            source={require('../assets/imgs/poster.jpg')}
                            className="rounded-3xl"
                            style={{ width: width * 0.44, height: height * 0.3 }}
                          />
                          <Text className="text-gray-300 ml-1">
                            Breaking Bad
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })
                }
              </View>

            </ScrollView>
          ) : (
            <View className="flex-row justify-center">
              <Image
                source={require('../assets/imgs/poster.jpg')}
                className="h-96 w-96"
              />
            </View>
          )
      }
    </SafeAreaView>
  )
}

export default SearchScreen