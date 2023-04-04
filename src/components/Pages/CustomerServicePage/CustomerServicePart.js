import React, { useState } from 'react';

const CustomerServicePart = () => {

    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Level Name: ${input1} - Input Field 1: ${input2} - Input Field 2: ${input3}`);
        // You can replace the console.log statement with your own function to handle the form submission
    };

    return (
        <div>
            {/* input field */}
            <div className="">
                <div className=" my-6 flex justify-start">

                    <form onSubmit={handleSubmit} className="rounded pb-8 mb-4 ">
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 mb-2 pl-2" htmlFor="input1">
                                    Question from app
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="input1"
                                    type="text"
                                    placeholder="Enter Question from app"
                                    value={input1}
                                    onChange={(e) => setInput1(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block  font-semibold text-gray-700 mb-2  pl-2" htmlFor="input2">
                                    Customer Service Formate
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="input2"
                                    type="text"
                                    placeholder="Show in Customer Service"
                                    value={input2}
                                    onChange={(e) => setInput2(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-semibold text-gray-700 mb-2  pl-2" htmlFor="input3">
                                    English Formate
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="input3"
                                    type="text"
                                    placeholder="Show in English"
                                    value={input3}
                                    onChange={(e) => setInput3(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    className=" te hover:bg-lime-700 bg-lime-300 rounded-tl-xl rounded-br-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Send
                                </button>
                            </div>
                        
                    </form>
                </div>

                <div className=" flex items-center justify-end">
                    <div className="text-base font-semibold text-black ">
                        <div className="my-2 bg-orange-200 p-3 rounded-tl-xl rounded-br-xl">
                            <p className="bg-slate-300 rounded-md pl-1 pr-2">
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
                        <p className="bg-slate-300 rounded-md pl-1 pr-2">
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
                        <p className="bg-slate-300 rounded-md pl-1 pr-2">
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
                        <p className="bg-slate-300 rounded-md pl-1 pr-2">
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

export default CustomerServicePart;