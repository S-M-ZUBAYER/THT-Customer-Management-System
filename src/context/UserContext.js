

import React, { createContext, useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../Firebase/firebase.config';
import toast from 'react-hot-toast';
import { sendChatMessage } from '../components/Pages/CustomerServicePage/SendMessageFunction';
import axios from 'axios';

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chattingUser, setChattingUser] = useState(null);
  const [DUser, setDUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comingSMS,setComingSMS]=useState(null)

  // <----------------------------chatting---------------------->
  
  const [connected, setConnected] = useState(false);
  const [newResponseCome, setNewResponseCome] = useState({});
  const [newAllMessage, setNewAllMessage] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newCome, setNewCome] = useState({});
  const [allChat, setAllChat] = useState([]);
  const [localStoreSms, setLocalStoreSms] = useState([]);
  const [customerStatus,setCustomerStatus] = useState("RUNNING");
  const [currentCustomer, setCurrentCustomer] = useState([]);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Add leading zeros to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  
  
//chatting list refresh process
const fetchUserByUserId = async () => {
  console.log("check the list")
  try {
      const response = await axios.get(`https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/chatlist/customer_service/${chattingUser?.userId}`);

      if (response.status === 200) {
          // Request was successful

          const userData = response.data;
          const updateCustomerData = (userData.sort((a, b) => {
              const timestampA = new Date(a.timestamp);
              const timestampB = new Date(b.timestamp);
              return timestampB - timestampA;
          }));
          setCurrentCustomer(getUniqueCustomers(updateCustomerData))
      } else {
          // Handle unexpected status codes
          console.error('Unexpected status code:', response.status);
      }
  } catch (error) {
      // Handle network or other errors
      console.error('Error fetching user data:', error);
  }
};

function getUniqueCustomers(currentCustomer) {
  const uniqueCustomers = currentCustomer.reduce((accumulator, customer) => {
      const userId = customer.userId;
      if (!accumulator.has(userId)) {
          accumulator.set(userId, customer);
      }
      return accumulator;
  }, new Map());

  return (Array.from(uniqueCustomers.values()));
}

  function getCurrentTimestampInSeconds() {
    const currentDate = new Date();
    const timestampInSeconds = Math.floor(currentDate.getTime() / 1000);
    return timestampInSeconds;
  }

  const getAnswer = (sms) => {
  
    if (sms && sms.totalPart === 1) {
      //show your message/video/file/image
  
    }
    else {
      if (sms && sms.partNo === sms.totalPart) {//get partNo

        // setNewAllMessage([]);
        setSelectedFiles([]);
        //show your message/video/file/image

      }
      else {
        //sent next part
        sendChatMessage((newAllMessage)[sms.partNo]);

      }
    }
  };




  const showGreeting = async (sms) => {

    if (sms.msgType === "ans") {
      getAnswer(sms);
      return;

    }
  

    //Add New response
    const textMessage = {
      chatId: sms?.chatId,
      sentBy: sms?.sentTo,
      sentTo: sms?.sentBy,
      sentId: sms?.sentId,
      message: sms?.msgType,
      msgType: "ans",
      totalPart: sms?.totalPart,
      partNo: sms?.partNo,
      timestamp: getCurrentTime(),
    };



    // sendChatMessage(textMessage);
    if (sms && sms.msgType !== "ans") {
      setNewCome(sms);
    }

    if (sms?.totalPart === 1) {
      toast.success(`${sms?.msgType} come from  Id:${sms?.sentBy}`, {
        position: "top-right"
      })
    }
    else if (sms?.totalPart > 1 && sms?.partNo === sms?.totalPart) {
      toast.success(`${sms?.msgType} come from  Id:${sms?.sentBy}`, {
        position: "top-right"
      })
    }
  




    //==============================================

    setAllChat((prevChat) => [...prevChat, sms]);

  };

  const disconnectAndClearCache = () => {
    if (connected) {
        // Disconnect from the WebSocket
        stompClient.deactivate();

        // Clear the cache or reset any relevant state
        // You can add code here to clear specific caches or reset state
        // For example, you can clear the chat history or reset the chatMessage state.

        // Clear the disconnect timer if it's set
        if (disconnectTimer) {
            toast.success("Disconnected successfully")
            clearTimeout(disconnectTimer);
        }
    }
};




  let disconnectTimer;
   const stompClient = new Client({
    brokerURL: 'wss://grozziieget.zjweiting.com:3091/CustomerService-Chat/websocket',
    //  brokerURL: 'ws://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket',
  });

//After solve the chatting backend need to start 

  // useEffect(() => {
  //   const connect = () => {
  //     stompClient.onConnect = (frame) => {
  //       setConnected(true);
  //       console.log('Connected: ' + frame);
  //       console.log(`/topic/${chattingUser?.userId}`)
  //       stompClient.subscribe(`/topic/${chattingUser?.userId}`, (message) => {
  //         console.log(message?.body, "coming sms")
  //         const newSMS = JSON.parse(message.body);
  //         if (newSMS && newSMS.msgType === "ans") {
  //           setNewResponseCome(newSMS);
  //         }
  //         showGreeting(newSMS)

  //       });
  //     };

  //     stompClient.onWebSocketError = (error) => {
  //       console.error('Error with websocket', error);
  //       // Handle error here, you can update state or show an error message to the user.
  //     };
  //     stompClient.activate();
  //   };

  //   // Try to connect
  //   connect();

  //   // Retry every 5 seconds if not connected
  //   const retryInterval = setInterval(() => {
  //     if (!connected) {
  //       console.log('Reconnecting to WebSocket...');
  //       connect();
  //     } else {
  //       clearInterval(retryInterval);
  //     }
  //   }, 5000);

  //   // Cleanup on unmount
  //   return () => {
  //     clearInterval(retryInterval);
  //     stompClient.deactivate();
  //   };
  // }, [connected, newAllMessage]);



  // <----------------------------chatting---------------------->



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
    setChattingUser,
    comingSMS,
    setComingSMS,
    connected,
    setConnected,
    newResponseCome, 
    setNewResponseCome,
    newAllMessage, 
    setNewAllMessage,
    selectedFiles, 
    setSelectedFiles,
    newCome, 
    setNewCome,
    allChat, 
    setAllChat,
    localStoreSms, 
    setLocalStoreSms,
    customerStatus,
    setCustomerStatus,
    currentCustomer, 
    setCurrentCustomer,
    fetchUserByUserId
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
