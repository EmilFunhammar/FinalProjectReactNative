import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticatedStack from './AuthenticatedStack';
import UnAuthenticatedStack from './UnAuthenticatedStack';
import { useContext } from 'react/cjs/react.development';
import { AuthContext } from '../Context/AuthContext';
import SplashScreen from '../screens/splash';

export default function AuthNavigation() {
  const { isLoggedIn, user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <UnAuthenticatedStack />}
    </NavigationContainer>
  );
}
