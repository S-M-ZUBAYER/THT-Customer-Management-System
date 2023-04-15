import React, { useContext } from 'react';
import img from "../../../Assets/Images/messi.jpg"
import CustomerServicePart from './CustomerServicePart';
import { AuthContext } from '../../../context/UserContext';

const CustomerService_1 = () => {

const {user}=useContext(AuthContext)

    const customerName=[
        {
            name:"S M ZUBAYER",
            time: "3:33 pm"
        },
        {
            name:"S M SABIT",
            time: "3:54 pm"
        },
        {
            name:"ABU SAYED",
            time: "3:33 pm"
        },
        
    ]


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-3 md:mx-12 my-12 text-gray-600" >



            {/* chatting list of all customers ************************************       */}



            <div className="shadow-lg rounded-lg py-5">

                <div className="flex items-center justify-start">
                    <img className="h-8 w-8 ml-3 rounded-full  shadow-slate-900" src={user?.photoURL} alt="" />
                    <h1 className=" font-semibold ml-3">
                        User Name
                    </h1>
                </div>

                <div className="mt-6 mx-2 ">
                    <h2 className="bg-[#004368] text-gray-300 py-1 mx-1 rounded-md font-semibold">
                        Customer Service
                    </h2>
                </div>

                <div>
                    {
                        customerName.map((element,index)=>{
                            return  <div className="text-sm mx-2">
                        <div className="flex justify-between items-center mx-1 my-1">
                            <p>{element?.name}</p>
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


            <div className="shadow-lg rounded-lg relative  mt-10 md:mt-0  h-screen">


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
                <div>
                    <p className="inline-block px-2 py-1 mr-auto rounded-md bg-stone-300">
                        Question from shopping platform..
                    </p>
                    <p>
                        Auto reply for question
                    </p>
                </div>


                <div className=" absolute bottom-0 my-4">
                    <div className="mx-3 text-sm">
                        <button className="bg-[#004368] text-white hover:bg-blue-700                                                          px-2 py-1 rounded-md mr-3">
                            Auto Reply
                        </button>
                        <button className="mr-3 ">
                            Select & Reply
                        </button>
                        <button>
                            Typically
                        </button>
                    </div>

                    <div className="flex">
                        <p className="mx-2">logo</p>
                        <input className="w-full bg-zinc-300 rounded-md"></input>
                    </div>


                </div>

            </div>


            {/* Manually chatting for online shopping application for customer service ************************************       */}


            <div className="shadow-lg rounded-lg  mt-10 md:mt-0 ">

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