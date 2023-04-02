import React from 'react';
import { useState } from "react"

const CustomerService_2 = () => {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Level Name: ${input1} - Input Field 1: ${input2} - Input Field 2: ${input3}`);
        // You can replace the console.log statement with your own function to handle the form submission
    };

    return (
        <div className="text-left mx-32">
            <h1 className="text-2xl font-bold mt-5">
                Customer Name
            </h1>
            <hr className="text-black font-bold border-2 my-2"></hr>



            {/* input field */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="max-w-md mx-auto my-6">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <h2 className="text-2xl font-bold text-center mb-4">Input Question</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="input1">
                                Question from app
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input1"
                                type="text"
                                placeholder="Enter Question from app"
                                value={input1}
                                onChange={(e) => setInput1(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="input2">
                                Customer Service Formate
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input2"
                                type="text"
                                placeholder="Show in Customer Service"
                                value={input2}
                                onChange={(e) => setInput2(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="input3">
                                English Formate
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input3"
                                type="text"
                                placeholder="Show in English"
                                value={input3}
                                onChange={(e) => setInput3(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className=" hover:bg-lime-700 bg-lime-300 rounded-tl-xl rounded-br-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>

                <div className=" flex items-center justify-center">
                    <div className="text-base font-semibold ">
                        <div className="my-2 bg-orange-200 p-3 rounded-tl-xl rounded-br-xl">
                            <p>
                                English:- probable Ans 1
                            </p>
                            <p>
                                Customer Service:- probable Ans 1
                            </p>
                            <p>
                                Customer:- probable Ans 1
                            </p>
                        </div>
                        <div className="my-2 bg-orange-200 p-3 rounded-tl-xl rounded-br-xl">
                            <p>
                                English:- probable Ans 2
                            </p>
                            <p>
                                Customer Service:- probable Ans 2
                            </p>
                            <p>
                                Customer:- probable Ans 2
                            </p>
                        </div>
                        <div className="my-2 bg-orange-200 p-3 rounded-tl-xl rounded-br-xl">
                            <p>
                                English:- probable Ans 3
                            </p>
                            <p>
                                Customer Service:- probable Ans 3
                            </p>
                            <p>
                                Customer:- probable Ans 3
                            </p>
                        </div>
                        <div className="my-2 bg-orange-200 p-3 rounded-tl-xl rounded-br-xl">
                            <p>
                                English:- probable Ans 4
                            </p>
                            <p>
                                Customer Service:- probable Ans 4
                            </p>
                            <p>
                                Customer:- probable Ans 4
                            </p>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    );
};

export default CustomerService_2;