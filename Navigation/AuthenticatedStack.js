import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from '../screens/choose-workout';
import Create_Workout from '../screens/create-workout';
import Utveckling from '../screens/utveckling';
import WorkoutSession from '../screens/workout-session';
import StartWorkout from '../screens/start_workout_session';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Choose_Workout">
      <Stack.Screen name="U" component={Utveckling} />
      <Stack.Screen name="Create_Workout" component={Create_Workout} />
      <Stack.Screen name="Choose_Workout" component={Workout} />
      <Stack.Screen name="Workout_session" component={WorkoutSession} />
      <Stack.Screen name="start_workout" component={StartWorkout} />
    </Stack.Navigator>
  );
}
