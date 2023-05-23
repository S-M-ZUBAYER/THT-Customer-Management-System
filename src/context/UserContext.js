import React, { createContext, useEffect, useState } from 'react';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import app from '../Firebase/firebase.config';


export const AuthContext = createContext()


// Get auth and different kinds of provider from firebase for authentications
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const UserContext = ({ children }) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);



    //state declaration to show and calculation the questions, answers and translation mistake data and percentage

    const [totalQuestions, setTotalQuestions] = useState([]);
    const [unknownQuestions, setUnknownQuestions] = useState([]);
    const [translationQuestions, setTranslationQuestions] = useState([]);
    const [unknownPercent, setUnknownPercent] = useState(Number);
    const [translationPercent, setTranslationPercent] = useState(Number);
    const [totalQuestionsLan,setTotalQuestionsLan]=useState(Number);
    const [unknownQuestionsLan,setUnknownQuestionsLan]=useState(Number);
    const [translationQuestionsLan,setTranslationQuestionsLan]=useState(Number);

console.log(translationQuestions);
console.log("userContext")


//############ Get the value from local storage  ###################


//     // use useEffect to got the data from local storage
// useEffect(() => {
//     // Retrieve the array from local storage
//     const storedArrayTotalQuestions = localStorage.getItem('totalQuestions');
//     const storedArrayUnknownQuestions = localStorage.getItem('unknownQuestions');
//     const storedArrayTranslationQuestions = localStorage.getItem('translationQuestions');

//     if (storedArrayTotalQuestions) {
//       // Convert the retrieved string to an array
//       const storedArray = JSON.parse(storedArrayTotalQuestions);
//       // Set the retrieved array as the initial state
//       setTotalQuestions(storedArray);
//     }
//     if (storedArrayUnknownQuestions) {
//       // Convert the retrieved string to an array
//       const storedArray = JSON.parse(storedArrayUnknownQuestions);
//       // Set the retrieved array as the initial state
//       setUnknownQuestions(storedArray);
//     }
//     if (storedArrayTranslationQuestions) {
//       // Convert the retrieved string to an array
//       const storedArray = JSON.parse(storedArrayTranslationQuestions);
//       // Set the retrieved array as the initial state
//       setTranslationQuestions(storedArray);
//     }
//   }, []);



    //create a function to calculate the percentage
    function unknownCalculatePercentage(totalQuestions, currentQuestions) {
        let currentQuestionsLan;
        const totalQuestionsLan = totalQuestions?.length;
        if (currentQuestions.length === 0) {
            return 0;
        }
        if (totalQuestionsLan === 0) {
            return 0;
        }
       
        currentQuestionsLan = currentQuestions?.length; 
        const percentage = (currentQuestionsLan/totalQuestionsLan) * 100;
        return Math.round(percentage);
    }
    //create a function to calculate the percentage
    function translateCalculatePercentage(totalQuestions, currentQuestions) {
        let currentQuestionsLan;
        const totalQuestionsLan = totalQuestions?.length;
        if (currentQuestions.length === 0) {
            return 0;
        }
        if (totalQuestionsLan === 0) {
            return 0;
        }
       
        currentQuestionsLan = currentQuestions?.length; 
        const percentage = (currentQuestionsLan/totalQuestionsLan) * 100;
        return Math.round(percentage);
    }

  
//create a function for registration part

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }


    //create a function for log in part with email and password
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    //create a function for log in part with google
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }


    //create a function for log in part with facebook
    const signInWithFacebook = () => {
        return signInWithPopup(auth, facebookProvider);
    }

   
    // create a function to reset password for Forget Password
    const resetPassword = email => {
        // setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

//create a function for log out from this site
    const logOut = () => {
        return signOut(auth)
    }


    //create a function to get the current user information
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }

    }, [])


    //store data in authInfo to send the data in useContext so that we can got this data from any component
    const authInfo = { user, loading, createUser, signIn, logOut, signInWithGoogle, signInWithFacebook, resetPassword,translationQuestions,setTranslationQuestions, totalQuestions, setTotalQuestions,setTotalQuestionsLan,setUnknownQuestionsLan, translationQuestions, setTranslationQuestions, unknownQuestions, setUnknownQuestions,unknownCalculatePercentage,translateCalculatePercentage,unknownPercent, setUnknownPercent,translationPercent, setTranslationPercent,totalQuestionsLan,unknownQuestionsLan,translationQuestionsLan,setTranslationQuestionsLan };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;