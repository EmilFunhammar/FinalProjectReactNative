import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from '../screens/choose-workout';
import Create_Workout from '../screens/create-workout';
import Utveckling from '../screens/utveckling';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="U">
      <Stack.Screen name="U" component={Utveckling} />
      <Stack.Screen name="Choose_Workout" component={Workout} />
      <Stack.Screen name="Create_Workout" component={Create_Workout} />
    </Stack.Navigator>
  );
}
