import React, { useContext, useEffect, useRef, useState } from 'react';


//<-----web socket

// import { connectWebSocket, disconnectWebSocket, subscribeToChat } from '../Chat/WebSocketService';

// ------>web socket

import CustomerServicePart from './CustomerServicePart';
import { AuthContext } from '../../../context/UserContext';
import axios from 'axios';
import MessageInput from '../Chat/MessegeInput';
import Message from './Message';

const CustomerService_1 = () => {

    const { user, chattingUser } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null)
    const [selectedCustomerChat, setSelectedCustomerChat] = useState(null)
    const [currentCustomer, setCurrentCustomer] = useState([]);
    const [allChat, setAllChat] = useState([])
    const [showHistory,SetShowHistory]=useState(false);
    const scrollableDivRef = useRef(null);

    // //<-------web socket


    // const [receivedMessage, setReceivedMessage] = useState('');
    // const [sendMessage, setSendMessage] = useState('');

    // useEffect(() => {
    //     // Establish a WebSocket connection when the component mounts
    //     connectWebSocket();

    //     // Subscribe to a topic (replace 'userId' with your actual user ID)
    //     subscribeToChat(selectedCustomerChat?.userId, (newMessage) => {
    //         setAllChat((prevMessages) => [...prevMessages, newMessage]);
    //     });

    //     // Clean up the WebSocket connection when the component unmounts
    //     return () => {
    //       disconnectWebSocket();
    //     };
    //   }, []);


    //------->web socket


 
  


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


console.log(chattingUser,"chatting user")


    const fetchUserByChatId = async () => {
        try {
            const response = await axios.get(`http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/messages/${selectedCustomerChat?.chatId}`);
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
            const response = await axios.get(`http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/api/dev/chatlist/customer_service/${chattingUser?.userId}`);

            if (response.status === 200) {
                // Request was successful

                const userData = response.data;
                console.log(userData)
               const  updateCustomerData=(userData.sort((a, b) => {
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
    }

    
      
      
 ;



    //<---------web socket


    // const serverUrl = 'http://web-api-tht-env.eba-kcaa52ff.us-east-1.elasticbeanstalk.com/websocket';
    // const ws = new SockJS(serverUrl);
    // const stompClient = Stomp.over(ws);

    // function connect() {
    //     stompClient.connect({}, () => {
    //         console.log('WebSocket connected');
    //     });
    // }

    // function disconnect() {
    //     if (stompClient.connected) {
    //         stompClient.disconnect(() => {
    //             console.log('WebSocket disconnected');
    //         });
    //     }
    // }


    // useEffect(() => {
    //     // Connect to WebSocket when the component mounts
    //     connect();

    //     // Subscribe to the topic where you expect to receive messages
    //     stompClient.subscribe('/topic/{UserId}', (message) => {
    //         setReceivedMessage(message.body);
    //     });

    //     return () => {
    //         // Disconnect from WebSocket when the component unmounts
    //         disconnect();
    //     };
    // }, []);

    // const handleSendMessage = () => {
    //     // Send a message to the specified destination
    //     stompClient.send('/app/messages', {}, JSON.stringify({ message: sendMessage }));
    // };


    //-------->web socket




    return (
        <div>

            <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-8 mx-3 md:mx-12 my-12 text-gray-600 bg-white" >



                {/* chatting list of all customers ************************************       */}



                <div className=" h-[80vh] shadow-lg rounded-lg py-5 md:px-10">

                    <div className="flex items-center justify-start">
                        <img className="h-8 w-8 ml-3 rounded-full  shadow-slate-900" src={user?.image} alt="" />
                        <h1 className=" font-semibold ml-3">
                            {user?.name}
                        </h1>
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