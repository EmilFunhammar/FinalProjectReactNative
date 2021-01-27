import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { db } from '../firebase';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoding] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoding(false);
    });
    //clean up
    return unsubscribe;
  });

  function ReadAuth(auth) {
    return console.log('auth: ', user.uid);
  }

  function writeUserData(userId, name, email, imageUrl) {
    firebase
      .database()
      .ref('users/' + userId)
      .set({
        username: name,
        email: email,
      });
  }

  const createUser = async (email, password) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      console.log('user:', auth);
    } catch (error) {
      console.log('error', error);
    }
  };

  const logIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('user signd in');
    } catch (error) {
      console.log('error', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        isLoading,
        signOut,
        logIn,
        createUser,
        ReadAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
