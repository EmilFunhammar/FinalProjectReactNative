import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen name="LogIn" component={LoginScreen} />
    </Stack.Navigator>
  );
}
