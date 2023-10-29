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
    const [Loading, setLoading] = useState(false);
    const [newMessagesList,setNewMessagesList] = useState([]);




    // <---------------------------Final Web Socket------------------------------------>

    const [connected, setConnected] = useState(false);
    let disconnectTimer;
    const stompClient = new Client({
        brokerURL: 'wss://grozziie.zjweiting.com:3091/CustomerService-Chat/websocket',
        // brokerURL: 'ws://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket',
    });

    useEffect(() => {

        const connect = () => {
            stompClient.onConnect = (frame) => {
                setConnected(true);
                console.log('Connected: ' + frame);
                stompClient.subscribe(`/topic/${chattingUser?.userId}`, (message) => {
                    // console.log(message,"send")
                    // const newSMS = JSON.parse(message.body);
                    // showGreeting(message.body, newSMS);

                    // Reset the disconnect timer whenever a new message is received
                    clearTimeout(disconnectTimer);

                    // Set a new timer to disconnect if no new messages in 5 minutes (300,000 milliseconds)
                    disconnectTimer = setTimeout(() => {
                        disconnectAndClearCache();
                    }, 300000);

                });
            };

            stompClient.onWebSocketError = (error) => {
                console.error('Error with websocket', error);
                // Handle error here, you can update state or show an error message to the user.
            };

            stompClient.activate();
            if (stompClient.connected) {
                toast.success("stomp Connected")
            }

            if (!stompClient.connected) {
                toast.error("try to connect again")
                console.log("try to connect again")
                stompClient.onConnect = (frame) => {
                    // Connection established
                    setConnected(true);
                    console.log('Connected: ' + frame);
                    toast.success("connected again")
                };
            }
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




    const showGreeting = (message, sms) => {
        console.log("S M SSS")
        
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
        setLoading(true);
        try {
            const response = await axios.get(`https://grozziie.zjweiting.com:3091/CustomerService-Chat/api/dev/messages/${selectedCustomerChat?.chatId}`);
            if (response.status === 200) {
                const userData = response.data;
                setAllChat(userData);
                setLoading(false);
            } else {
                // Handle unexpected status codes
                console.error('Unexpected status code:', response.status);
                setLoading(false);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error fetching user data:', error);
            setLoading(false);
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
        SetShowHistory(false)
        setCurrentUser(customer);
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
                            {connected ?
                                <SiSocketdotio className="bg-green-400 text-lg rounded-full"></SiSocketdotio> : <BtnSpinner></BtnSpinner>
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
                                        <div>
                                            {(newMessagesList?.filter(sms=>sms?.sentBy===element?.userId))?.length>0 && <div  className="bg-yellow-400 px-2 rounded-full border-2 text-black font-semibold"> {(newMessagesList?.filter(sms=>sms?.sentBy===element?.userId))?.length}</div> }
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
                            Loading={Loading}
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
                        newMessagesList={newMessagesList}
                        setNewMessagesList={setNewMessagesList}
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