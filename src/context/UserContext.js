// import React, { createContext, useEffect, useState } from 'react';
// import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
// import app from '../Firebase/firebase.config';


// export const AuthContext = createContext()


// // Get auth and different kinds of provider from firebase for authentications
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();

// const UserContext = ({ children }) => {


   
//     const [user, setUser] = useState(JSON?.parse(localStorage.getItem('user')));
//     const [loading, setLoading] = useState(true);





//     //state declaration to show and calculation the questions, answers and translation mistake data and percentage

//     const [totalQuestions, setTotalQuestions] = useState([]);
//     const [unknownQuestions, setUnknownQuestions] = useState([]);
//     const [translationQuestions, setTranslationQuestions] = useState([]);
//     const [unknownPercent, setUnknownPercent] = useState(Number);
//     const [translationPercent, setTranslationPercent] = useState(Number);
//     const [totalQuestionsLan,setTotalQuestionsLan]=useState(Number);
//     const [unknownQuestionsLan,setUnknownQuestionsLan]=useState(Number);
//     const [translationQuestionsLan,setTranslationQuestionsLan]=useState(Number);
//     const [category, setCategory] = useState('');
//     const [categories, setCategories] = useState([]);







//     //create a function to calculate the percentage
//     function unknownCalculatePercentage(totalQuestions, currentQuestions) {
//         let currentQuestionsLan;
//         const totalQuestionsLan = totalQuestions?.length;
//         if (currentQuestions.length === 0) {
//             return 0;
//         }
//         if (totalQuestionsLan === 0) {
//             return 0;
//         }
       
//         currentQuestionsLan = currentQuestions?.length; 
//         const percentage = (currentQuestionsLan/totalQuestionsLan) * 100;
//         return Math.round(percentage);
//     }
//     //create a function to calculate the percentage
//     function translateCalculatePercentage(totalQuestions, currentQuestions) {
//         let currentQuestionsLan;
//         const totalQuestionsLan = totalQuestions?.length;
//         if (currentQuestions.length === 0) {
//             return 0;
//         }
//         if (totalQuestionsLan === 0) {
//             return 0;
//         }
       
//         currentQuestionsLan = currentQuestions?.length; 
//         const percentage = (currentQuestionsLan/totalQuestionsLan) * 100;
//         return Math.round(percentage);
//     }

  
// //create a function for registration part

//     const createUser = (email, password) => {
//         return createUserWithEmailAndPassword(auth, email, password);
//     }


//     //create a function for log in part with email and password
//     const signIn = (email, password) => {
//         return signInWithEmailAndPassword(auth, email, password)
//     }


//     //create a function for log in part with google
//     const signInWithGoogle = () => {
//         return signInWithPopup(auth, googleProvider)
//     }


//     //create a function for log in part with facebook
//     const signInWithFacebook = () => {
//         return signInWithPopup(auth, facebookProvider);
//     }

   
//     // create a function to reset password for Forget Password
//     const resetPassword = email => {
//         // setLoading(true)
//         return sendPasswordResetEmail(auth, email)
//     }

// //create a function for log out from this site
//     const logOut = () => {
//         return signOut(auth)
//     }


  

//     //store data in authInfo to send the data in useContext so that we can got this data from any component
//     const authInfo = { user, setUser, loading,setLoading, createUser, signIn, logOut, signInWithGoogle, signInWithFacebook, resetPassword,translationQuestions,setTranslationQuestions, totalQuestions, setTotalQuestions,setTotalQuestionsLan,setUnknownQuestionsLan, translationQuestions, setTranslationQuestions, unknownQuestions, setUnknownQuestions,unknownCalculatePercentage,translateCalculatePercentage,unknownPercent, setUnknownPercent,translationPercent, setTranslationPercent,totalQuestionsLan,unknownQuestionsLan,translationQuestionsLan,setTranslationQuestionsLan,category, setCategory,categories, setCategories };


//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default UserContext;


import React, { createContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
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
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
