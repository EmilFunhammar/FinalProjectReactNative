import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Workout from '../screens/choose-workout';
import Create_Workout from '../screens/create-workout';
import Utveckling from '../screens/utveckling';
import WorkoutSession from '../screens/workout-session';
import StartWorkout from '../screens/start_workout_session';
import joinWorkot from '../screens/join_workout';
import SharedScreen from '../screens/shared_screen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Choose_Workout">
      {/* <Stack.Screen name="U" component={Utveckling} /> */}
      <Stack.Screen name="Create_Workout" component={Create_Workout} />
      <Stack.Screen name="Choose_Workout" component={Workout} />
      <Stack.Screen name="Workout_session" component={WorkoutSession} />
      <Stack.Screen name="start_workout" component={StartWorkout} />
      {/* <Stack.Screen name="join_workout" component={joinWorkot} /> */}
    </Stack.Navigator>
  );
}

// <Tab.Navigator initialRouteName="Choose_Workout">
//   {/* <Tab.Screen name="U" component={Utveckling} /> */}
//   <Tab.Screen name="Create_Workout" component={Create_Workout} />
//   {/* <Tab.Screen name="Choose_Workout" component={Workout} /> */}
//   <Stack.Screen name="Choose_Workout" component={Workout} />
//   <Tab.Screen name="Workout_session" component={WorkoutSession} />
//   <Tab.Screen name="start_workout" component={StartWorkout} />
//   <Tab.Screen name="join_workout" component={joinWorkot} />
//   {/* <Tab.Screen name="shared_screen" component={SharedScreen} /> */}
// </Tab.Navigator>
