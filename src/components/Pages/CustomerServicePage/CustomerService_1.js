import React, { useContext, useEffect, useState } from 'react';
import img from "../../../Assets/Images/messi.jpg"
import { FaFileImage } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";

import CustomerServicePart from './CustomerServicePart';
import { AuthContext } from '../../../context/UserContext';
import Messages from './Messages';
import axios from 'axios';

const CustomerService_1 = () => {

    const { user } = useContext(AuthContext);
    const [currentUser,setCurrentUser]=useState(null)
    
     //got the current user data from database  
     useEffect(() => {
        if (user?.email) {
          fetchUserByEmail();
        }
      }, [user?.email]);


    const fetchUserByEmail = async () => {
        try {
          const response = await axios.get('https://customer-server-theta.vercel.app/tht/users', {
            params: {
              email: user?.email,
            },
          });
          setCurrentUser(response.data[0]);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

    const customerName = [
        {
            name: "S M ZUBAYER",
            time: "3:33 pm"
        },
        {
            name: "S M SABIT",
            time: "3:54 pm"
        },
        {
            name: "ABU SAYED",
            time: "3:33 pm"
        },
        {
            name: "ABU SAYED",
            time: "3:33 pm"
        },
        {
            name: "ABU SAYED",
            time: "3:33 pm"
        },

    ]


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 md:gap-8 mx-3 md:mx-12 my-12 text-gray-600" >



                {/* chatting list of all customers ************************************       */}



                <div className="shadow-lg rounded-lg py-5 md:px-10">

                    <div className="flex items-center justify-start">
                        <img className="h-8 w-8 ml-3 rounded-full  shadow-slate-900" src={currentUser?currentUser?.image: user?.photoURL} alt="" />
                        <h1 className=" font-semibold ml-3">
                           {currentUser?currentUser?.name: "User Name"}
                        </h1>
                    </div>

                    <div className="mt-6 mx-2 ">
                        <h2 className="bg-[#004368] text-gray-300 py-1 mx-1 rounded-md font-semibold">
                            Customer Service
                        </h2>
                    </div>

                    <div>
                        {
                            customerName.map((element, index) => {
                                return <div key={index} className="text-sm ml-2">
                                    <div className="flex justify-between  mx-1 my-1">
                                        <div className="text-start">
                                            <p>{element?.name}</p>
                                            <p className="">This is message</p>
                                        </div>

                                        <p>{element?.time}</p>
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


                <div className="shadow-lg rounded-lg relative  mt-10 md:mt-0 md:px-10">


                    <div className="flex justify-around ">
                        <p className="bg-[#004368] text-gray-200 px-2 rounded-b-lg py-1">Text from app</p>
                        <p>Customer Service</p>
                    </div>

                    <div>
                        <h1 className="text-xl font-medium text-gray-400 text-start pl-1 mt-2">
                            Customer Name
                        </h1>
                        <hr className="text-black font-bold my-1 mx-1"></hr>
                    </div>
                    <div className="text-start h-screen">
                        <Messages></Messages>
                    </div>


                    <div className=" absolute rounded-b-lg z-40 bg-white pt-1 w-full bottom-0 ">
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

                        <div className="flex w-full items-center px-3 my-2 bg-white z-40">
                            <FaFileImage className="mr-2 text-gray-400"></FaFileImage>
                            <input className="w-10/12 py-1 rounded-md relative bg-cyan-200"></input>
                            <AiOutlineSend className=" absolute right-[55px] lg:right-[70px]"></AiOutlineSend>
                        </div>


                    </div>

                </div>


                {/* Manually chatting for online shopping application for customer service ************************************       */}




            </div>
            <div className="shadow-lg rounded-lg  mt-10 mb-20 md:mt-20 md:mx-10 px-3 md:px-10 md:py-10">

                <div className="flex justify-around ">
                    <p>Text from app</p>
                    <p className="bg-[#004368] text-gray-200 px-2 rounded-b-lg py-1">Customer Service</p>
                </div>

                <div>
                    <h1 className="text-xl font-medium text-gray-400 text-start pl-1 mt-2">
                        Customer Name
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