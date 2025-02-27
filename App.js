import React from 'react';
//import Workout from './screens/choose-workout';
import CreateWorkout from './screens/create-workout';
//import { StyleSheet, Text, View } from 'react-native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './Navigation/AuthNavigation';
import AuthContextProvider from './Context/AuthContext';

//const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <AuthNavigation />
    </AuthContextProvider>

    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Create_Workout">
    //     <Stack.Screen name="Create_Workout" component={CreateWorkout} />
    //     <Stack.Screen name="Choose_Workout" component={Workout} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
