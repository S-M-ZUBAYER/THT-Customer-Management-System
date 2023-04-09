import React, { createContext, useEffect, useState } from 'react';
import {FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import app from '../Firebase/firebase.config';


export  const AuthContext = createContext()

const auth=getAuth(app);
const googleProvider=new GoogleAuthProvider();
const facebookProvider= new FacebookAuthProvider();

const UserContext = ({ children }) => {

const [user,setUser]=useState({});
const [loading,setLoading]=useState(true);


const createUser=(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password);
}

const signIn=(email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}

const signInWithGoogle=()=>{
    return signInWithPopup(auth,googleProvider)
}

const signInWithFacebook=()=>{
 return signInWithPopup(auth, facebookProvider);
}

const logOut=()=>{
    return signOut(auth)
}

useEffect(()=>{
 const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);
    setLoading(false)
    console.log(currentUser)
})
return ()=>{
    unsubscribe();
}

},[])

    const authInfo = {user,loading, createUser,signIn,logOut,signInWithGoogle,signInWithFacebook}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;