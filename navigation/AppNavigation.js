import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from "../screens/HomeScreen.js";
import MovieScreen from "../screens/MovieScreen.js";
import PersonScreen from "../screens/PersonScreen.js";
import SearchScreen from "../screens/SearchScreen.js";


const Stack = createStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
        <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
