import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoding] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('user :', user.uid);
      setUser(user);
      setIsLoding(false);
    });
    //clean up
    return unsubscribe;
  });

  const logIn = async (email, password) => {
    console.log('calling log in');
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('login');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, isLoading, logIn }}>
      {children}
    </AuthContext.Provider>
  );
}
