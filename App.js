import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Src/Screens/HomeScreen';
import LoginScreen from './Src/Screens/LoginScreen';
import RegisterScreen from './Src/Screens/RegisterScreen';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
       <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </ApplicationProvider>
  );
}
