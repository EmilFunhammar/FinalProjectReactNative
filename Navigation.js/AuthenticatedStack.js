import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from '../screens/choose-workout';
import Create_Workout from '../screens/create-workout';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Choose_Workout">
      <Stack.Screen name="Choose_Workout" component={Workout} />
      <Stack.Screen name="Create_Workout" component={Create_Workout} />
    </Stack.Navigator>
  );
}
