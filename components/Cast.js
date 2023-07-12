import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'


var { width, height } = Dimensions.get('window');


const Cast = ({ navigation, cast }) => {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          cast && cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Person', person)}
                className="mr-4 items-center">
                <View
                  className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={require('../assets/imgs/poster.jpg')}
                  />
                </View>

                <Text className="text-white text-xs mt-1">
                  Walter White
                </Text>
                <Text className="text-neutral-400 text-xs">
                  Bryian Cranston
                </Text>
              </TouchableOpacity>
            )
          })
        }

      </ScrollView>

    </View>
  )
}

export default Cast