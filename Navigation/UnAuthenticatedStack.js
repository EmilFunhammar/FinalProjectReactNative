import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="LogIn" component={LoginScreen} />
    </Tab.Navigator>
  );

  // <Stack.Navigator initialRouteName="LogIn">
  //     <Stack.Screen name="LogIn" component={LoginScreen} />
  //   </Stack.Navigator>
}
