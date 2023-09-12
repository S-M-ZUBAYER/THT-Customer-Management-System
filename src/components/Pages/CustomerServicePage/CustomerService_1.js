import React, { useContext, useEffect, useState } from 'react';
import img from "../../../Assets/Images/messi.jpg"
import { FaFileImage } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { MdOndemandVideo } from "react-icons/md";

import CustomerServicePart from './CustomerServicePart';
import { AuthContext } from '../../../context/UserContext';
import axios from 'axios';
import MessageInput from '../Chat/MessegeInput';
import Message from './Message';
import ConversationView from '../Chat/ConversationView';

const CustomerService_1 = () => {

    const { user } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null)
    const [selectedCustomerChat, setSelectedCustomerChat] = useState(null)

    //got the current user data from database  
    useEffect(() => {
        if (user?.email) {
            fetchUserByEmail();
        }
    }, [user?.email]);


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

    const customerName = [
        {
            id: 10,
            name: "S M ZUBAYER",
            time: "3:22 pm",
            online: true
        },
        {
            id: 11,
            name: "S M SABIT",
            time: "3:54 pm",
            online: false
        },
        {
            id: 12,
            name: "ABU SAYED",
            time: "4:34 am",
            online: true
        },
        {
            id: 13,
            name: "ABU SAYED",
            time: "3:33 pm",
            online: true
        },
        {
            id: 14,
            name: "S M SABIT",
            time: "3:54 pm",
            online: false
        },
        {
            id: 15,
            name: "ABU SAYED",
            time: "3:33 am",
            online: false
        },
        {
            id: 16,
            name: "ABU SAYED",
            time: "7:83 pm",
            online: true
        },
        {
            id: 17,
            name: "S M SABIT",
            time: "4:53 am",
            online: false
        },
        {
            id: 18,
            name: "ABU SAYED",
            time: "3:40 pm",
            online: true
        }

    ]

    const handleToSelectCustomer = (customer) => {
        setCurrentUser(customer)
        setSelectedCustomerChat((chatSms.filter(eachChat => eachChat.myId === customer?.id))[0])
    }


    const chatSms = [
        {
            name: "S M ZUBAYER",
            myId: 10,
            userId: 78126321,
            sms: [
                { user: "you", msg: "hi.. What up bro...?", time: "8:30 PM" },
                { user: "I", msg: "Hello.. I am File...?", time: "8:33 PM" },
                { user: "I", msg: "Thank you...What about you...?", time: "8:33 PM" },
                { user: "you", msg: "I am good.. What are your doing now...?", time: "8:34 PM" },
                { user: "you", msg: "And.. Why are you now...?", time: "8:34 PM" },
                { user: "I", msg: "Good.. I am in office now...?", time: "8:35 PM" },
                { user: "I", msg: "Good.. I am doing my work in office...?", time: "8:36 PM" },
                { user: "I", msg: "what are your now and where are you...?", time: "8:36 PM" },
            ]

        },
        {
            name: "S M SABIT",
            userId: 98327458,
            myId: 11,
            sms: [
                { user: "you", msg: "How are you my friend?", time: "2:30 PM" },
                { user: "I", msg: "Hello.. I am File?", time: "2:33 PM" },
                { user: "I", msg: "What about your current condition?", time: "2:33 PM" },
                { user: "you", msg: "I am good.. When you will come to dhaka?", time: "2:34 PM" },
                { user: "you", msg: "I am still waiting for you?", time: "2:34 PM" },
                { user: "I", msg: "may be with in 2 days.. i will come?", time: "8:35 PM" },
                { user: "I", msg: "Do't wait for me . you should start your project?", time: "2:36 PM" },
                { user: "I", msg: "I will join after coming", time: "2:36 PM" }
            ]

        },

    ]



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
                            customerName.map((element, index) => {
                                return <div key={index} className="text-sm  ml-2 px-3">
                                    <div onClick={() => handleToSelectCustomer(element)} className="flex justify-between items-center mx-1 my-1">
                                        <div className="text-start">
                                            <p>{element?.name}</p>
                                            <p className="">This is message</p>
                                        </div>
                                        <div className="">
                                            {element.online ?
                                                <p className=" flex ml-auto bg-green-400 w-2 h-2 mb-1 rounded-full"></p>
                                                :
                                                // <p className=" flex ml-auto bg-slate-400 w-2 h-2 mb-1 rounded-full"></p> 
                                                ""

                                            }
                                            <p>{element?.time}</p>
                                        </div>

                                    </div>
                                    <hr></hr>
                                </div>
                            })
                        }

                        {/* <div className="text-sm mx-2">
                        <div className="flex justify-between items-center mx-1 my-1">
                            <p>Customer Name</p>
                            <p>Text time</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="text-sm mx-2">
                        <div className="flex justify-between items-center mx-1 my-1">
                            <p>Customer Name</p>
                            <p>Text time</p>
                        </div>
                        <hr></hr>
                    </div>
                    <div className="text-sm mx-2">
                        <div className="flex justify-between items-center mx-1 my-1">
                            <p>Customer Name</p>
                            <p>Text time</p>
                        </div>
                        <hr></hr>
                    </div> */}
                    </div>

                </div>


                {/* chatting customer field for customer and customer service ************************************       */}


                <div className=" h-[80vh] shadow-lg rounded-lg relative  mt-10 md:mt-0 md:px-10">


                    <div className="flex justify-around ">
                        <p className="bg-[#004368] text-gray-200 px-2 rounded-b-lg py-1">Text from app</p>
                        <p className="font-semibold">{user?.name}</p>
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold text-gray-400 text-start pl-1 mt-2">
                            {currentUser?.name}
                        </h1>
                        <hr className="text-black font-bold my-1 mx-1"></hr>
                    </div>

                    <div className=" overflow-y-scroll h-[60vh] mb-10 text-start">
                        <Message
                            chatSms={chatSms}
                            selectedCustomerChat={selectedCustomerChat}
                        ></Message>

                    </div>

                    {/* <div className=" absolute rounded-b-lg z-40 bg-white pt-1 w-full bottom-0 ">
                        <div className="flex justify-around text-sm">
                            <button className="bg-[#004368] text-white ml-8 hover:bg-blue-700                                                          px-2 py-1 rounded-md mr-3">
                                Auto Reply
                            </button>
                            <button className="">
                                Select & Reply
                            </button>
                            <button className="mr-10">
                                Typically
                            </button>
                        </div>

                        <div className="flex relative w-full items-center px-3 my-2 bg-white z-40">
                            <MdOndemandVideo className="mr-2 text-gray-400 text-xl cursor-pointer"></MdOndemandVideo>
                            <FaFileImage className="mr-2 text-gray-400 cursor-pointer"></FaFileImage>
                            <input className="w-9/12 py-1 px-2 rounded-md  bg-cyan-200"></input>
                            <AiOutlineSend className=" absolute right-[55px] lg:right-[95px] cursor-pointer"></AiOutlineSend>
                        </div>


                    </div> */}
                    <MessageInput
                        selectedCustomerChat={selectedCustomerChat}
                        setSelectedCustomerChat={setSelectedCustomerChat}
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