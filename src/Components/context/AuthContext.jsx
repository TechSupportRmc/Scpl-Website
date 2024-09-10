// src/Components/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            setCurrentUser({ ...user, ...doc.data() });
          } else {
            setCurrentUser(user);
          }
        }).catch(error => {
          console.error('Error getting user data: ', error);
          setCurrentUser(user);
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error during logout: ', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user: currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
