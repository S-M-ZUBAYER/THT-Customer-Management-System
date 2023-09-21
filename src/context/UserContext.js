

import React, { createContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chattingUser, setChattingUser] = useState(null);
  const [DUser, setDUser] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from local storage:', error);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('DUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setDUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from local storage:', error);
      }
    }
    setLoading(false);
  }, []);



  const [unknownPercent, setUnknownPercent] = useState(0);
  const [translationPercent, setTranslationPercent] = useState(0);
  const [totalQuestionsLan, setTotalQuestionsLan] = useState(0);
  const [unknownQuestionsLan, setUnknownQuestionsLan] = useState(0);
  const [translationQuestionsLan, setTranslationQuestionsLan] = useState(0);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [translationQuestions, setTranslationQuestions] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState([]);
  const [unknownQuestions, setUnknownQuestions] = useState([]);

  


  function unknownCalculatePercentage(totalQuestions, currentQuestions) {
    let currentQuestionsLan;
    const totalQuestionsLan = totalQuestions.length;
    if (currentQuestions.length === 0 || totalQuestionsLan === 0) {
      return 0;
    }
    currentQuestionsLan = currentQuestions.length;
    const percentage = (currentQuestionsLan / totalQuestionsLan) * 100;
    return Math.round(percentage);
  }

  function translateCalculatePercentage(totalQuestions, currentQuestions) {
    let currentQuestionsLan;
    const totalQuestionsLan = totalQuestions.length;
    if (currentQuestions.length === 0 || totalQuestionsLan === 0) {
      return 0;
    }
    currentQuestionsLan = currentQuestions.length;
    const percentage = (currentQuestionsLan / totalQuestionsLan) * 100;
    return Math.round(percentage);
  }

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  }

  const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  }

  const resetPassword = email => {
    return sendPasswordResetEmail(auth, email);
  }

  const logOut = () => {
    return signOut(auth);
  }

  const authInfo = {
    user,
    DUser,
    setDUser,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    signInWithGoogle,
    signInWithFacebook,
    resetPassword,
    translationQuestions,
    setTranslationQuestions,
    totalQuestions,
    setTotalQuestions,
    setTotalQuestionsLan,
    setUnknownQuestionsLan,
    translationQuestions,
    setTranslationQuestions,
    unknownQuestions,
    setUnknownQuestions,
    unknownCalculatePercentage,
    translateCalculatePercentage,
    unknownPercent,
    setUnknownPercent,
    translationPercent,
    setTranslationPercent,
    totalQuestionsLan,
    unknownQuestionsLan,
    translationQuestionsLan,
    setTranslationQuestionsLan,
    category,
    setCategory,
    categories,
    setCategories,
    chattingUser, 
    setChattingUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
