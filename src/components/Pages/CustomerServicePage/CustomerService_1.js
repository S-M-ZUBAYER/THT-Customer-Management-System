import React, { useContext, useEffect, useRef, useState } from 'react';

import CustomerServicePart from './CustomerServicePart';
import { AuthContext } from '../../../context/UserContext';
import axios from 'axios';
import { Client } from '@stomp/stompjs';

import Message from './Message';
import MessageInput from './MessegeInput';
import toast from 'react-hot-toast';
import { SiSocketdotio } from 'react-icons/si';
import BtnSpinner from '../../Shared/Loading/BtnSpinner';





const CustomerService_1 = () => {

    const { user, chattingUser } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null)
    const [selectedCustomerChat, setSelectedCustomerChat] = useState()
    const [currentCustomer, setCurrentCustomer] = useState([]);
    const [allChat, setAllChat] = useState([])
    const [showHistory, SetShowHistory] = useState(false);
    const scrollableDivRef = useRef(null);


    // <---------------------------Final Web Socket------------------------------------>

    const [connected, setConnected] = useState(false);

    const stompClient = new Client({
        brokerURL: 'wss://grozziie.zjweiting.com:3091/CustomerService-Chat/websocket',
    });

    useEffect(() => {
        
        const connect = () => {
            stompClient.onConnect = (frame) => {
                setConnected(true);
                console.log('Connected: ' + frame);
                stompClient.subscribe(`/topic/${chattingUser?.userId}`, (message) => {
                    const newSMS=JSON.parse(message.body);
                    showGreeting(message.body,newSMS);
            
                });
            };

            stompClient.onWebSocketError = (error) => {
                console.error('Error with websocket', error);
                // Handle error here, you can update state or show an error message to the user.
            };

            stompClient.activate();
        };

        // Try to connect
        connect();

        // Retry every 5 seconds if not connected
        const retryInterval = setInterval(() => {
            if (!connected) {
                console.log('Reconnecting to WebSocket...');
                connect();
            } else {
                clearInterval(retryInterval);
            }
        }, 5000);

        // Cleanup on unmount
        return () => {
            clearInterval(retryInterval);
            stompClient.deactivate();
        };
    }, [connected]);

    const showGreeting = (message,sms) => {
        // Handle received messages here
        console.log('Received message:', message);
        console.log(allChat,"1",sms,"2")
        setAllChat((prevChat) => [...prevChat, sms]);

    };

    // const sendMessage = async (message) => {
    //     console.log(message,"from sms")
    //     if (connected) {
    //         const response = await new Promise((resolve) => {
    //             stompClient.publish({
    //                 destination: '/app/messages',
    //                 body: JSON.stringify(message),
    //             }, {}, (response) => {
    //                 resolve(response); // Resolve the Promise with the response
    //                 console.log(response)
    //             });
    //         });

    //         console.log('Message sent. Server response:', response);
    //         // Handle the response here
    //     } else {
    //         console.error('STOMP client is not connected.');
    //         // You can show an error message to the user here.
    //     }
    // };

//for try..........
    
    if (stompClient.connected) {
        toast.success("stomp Connected")
    }
    if (!stompClient.connected) {
        toast.error("try to connect again")
        stompClient.onConnect = (frame) => {
            // Connection established
            setConnected(true);
            console.log('Connected: ' + frame);
            toast.success("connected again")
          };
    }

//...............


    const sendMessage = async (message) => {
        if (stompClient.connected) {
          const response = await new Promise((resolve) => {
            stompClient.publish({
              destination: '/app/messages',
              body: JSON.stringify(message),
            }, {}, (response) => {
              resolve(response); // Resolve the Promise with the response
              console.log(response);
            });
          });
      
          console.log('Message sent. Server response:', response);
          // Handle the response here
        } else {
          console.error('STOMP client is not connected.');
          // You can show an error message to the user here.
        }
      };
      
  

    // <---------------------------Final Web Socket------------------------------------>









    const fetchUserByEmail = async () => {
        try {
            const response = await axios.get('https://grozziie.zjweiting.com:8033/tht/users', {
                params: {
                    email: user?.email,
                },
            });
            // setCurrentUser(response.data[0]);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchUserByEmail();
        }
    }, [user?.email]);




    const fetchUserByChatId = async () => {
        try {
            const response = await axios.get(`https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/messages/${selectedCustomerChat?.chatId}`);
            if (response.status === 200) {
                const userData = response.data;
                setAllChat(userData);
            } else {
                // Handle unexpected status codes
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error fetching user data:', error);
        }
    };


    const fetchUserByUserId = async () => {
        try {
            const response = await axios.get(`https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/chatlist/customer_service/${chattingUser?.userId}`);

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


    useEffect(() => {
        fetchUserByChatId();
        fetchUserByUserId();
    }, [selectedCustomerChat?.chatId]);





    useEffect(() => {
        // Scroll to the bottom when component mounts or when content changes
        scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    }, [allChat, selectedCustomerChat]);




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






    const handleToSelectCustomer = (customer) => {
        setCurrentUser(customer);
        SetShowHistory(false)
        // connectWebSocket();
        // setSelectedCustomerChat((chatSms.filter(eachChat => eachChat.myId === customer?.id))[0])
        setSelectedCustomerChat(customer)
    };






    return (
        <div>

            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-8 mx-3 md:mx-12 my-12 text-gray-600 bg-white" >



                {/* chatting list of all customers ************************************       */}



                <div className=" h-[80vh] shadow-lg rounded-lg py-5 md:px-10">

                    <div className="flex items-center justify-between">
                        <div className="flex justify-start">
                            <img className="h-8 w-8 ml-3 rounded-full  shadow-slate-900" src={user?.image ? user?.image : "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"} alt="" />
                            <h1 className=" font-semibold ml-3">
                                {user?.name}
                            </h1>
                        </div>
                        <div className=" bg-red-900 rounded-full">
                            { connected ?
                               <SiSocketdotio className="bg-green-400 text-lg rounded-full"></SiSocketdotio> :<BtnSpinner></BtnSpinner>
                            }
                            </div>

                    </div>

                    <div className="mt-6 mx-2 ">
                        <h2 className="bg-[#004368] text-gray-300 py-1 mx-1 rounded-md font-semibold">
                            Customer Name List
                        </h2>
                    </div>

                    <div className=" overflow-y-scroll h-[60vh]">


                        {
                            currentCustomer.map((element, index) => {
                                return <div key={index} className="text-sm  ml-2 px-3 cursor-pointer">
                                    <div onClick={() => handleToSelectCustomer(element)} className="flex justify-between items-center mx-1 my-1">
                                        <div className="text-start">
                                            {/* <p>ID: {element?.chatId}</p> */}

                                            <p cl>User Id: {element?.userId}</p>
                                            <p>Chat Id: {element?.chatId}</p>


                                        </div>
                                        <div className="">
                                            {element.status === "running" ?
                                                <p className=" flex ml-auto bg-green-400 w-2 h-2 mb-1 rounded-full"></p>
                                                :
                                                // <p className=" flex ml-auto bg-slate-400 w-2 h-2 mb-1 rounded-full"></p> 
                                                ""

                                            }
                                            <p>{(element?.timestamp).split(" ")[1].split(".")[0]}</p>
                                        </div>

                                    </div>
                                    <hr></hr>
                                </div>
                            })
                        }

                    </div>

                </div>


                {/* chatting customer field for customer and customer service ************************************       */}


                <div className=" h-[80vh] shadow-lg rounded-lg relative  mt-10 md:mt-0 md:px-10">


                    <div className="flex justify-around ">
                        <p className="font-semibold">{selectedCustomerChat?.userId}</p>
                        <p className="bg-[#004368] text-gray-200 px-2 rounded-b-lg py-1">Text from app</p>
                        <p className="font-semibold">{user?.name}</p>
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-400 text-start pl-1 mt-2">
                            {currentUser?.name}
                        </h1>
                        <hr className="text-black font-bold my-1 mx-1"></hr>
                    </div>

                    <div className=" overflow-y-scroll h-[60vh] mb-10 text-start" ref={scrollableDivRef}>
                        <Message
                            allChat={allChat}
                            setAllChat={setAllChat}
                            selectedCustomerChat={selectedCustomerChat}
                            showHistory={showHistory}
                            SetShowHistory={SetShowHistory}
                        ></Message>

                    </div>


                    <MessageInput
                        selectedCustomerChat={selectedCustomerChat}
                        setSelectedCustomerChat={setSelectedCustomerChat}
                        allChat={allChat}
                        setAllChat={setAllChat}
                        sendMessage={sendMessage}
                    ></MessageInput>

                </div>


                {/* Manually chatting for online shopping application for customer service ************************************       */}

            </div>


            <div className="shadow-lg rounded-lg  mt-10 mb-20 md:mt-20 md:mx-10 px-3 md:px-10 md:py-10">

                <div className="flex justify-around ">
                    <p>Text from app</p>
                    <p className="bg-[#004368] text-gray-200 px-2 rounded-b-lg py-1">Customer Service</p>
                </div>

                <div>
                    <h1 className="text-xl  font-semibold text-gray-400 text-start pl-1 mt-2">
                        {currentUser?.name}
                    </h1>
                    <hr className="text-black font-bold my-1 mx-1"></hr>
                </div>


                <div className="mb-5 mx-1">
                    <CustomerServicePart></CustomerServicePart>
                </div>


            </div>
        </div>
    );
};

export default CustomerService_1;