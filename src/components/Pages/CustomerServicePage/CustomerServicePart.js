import React, { useContext, useState } from 'react';
import { AllProductContext } from '../../../context/ProductContext';
import { AuthContext } from '../../../context/UserContext';

const CustomerServicePart = () => {

    const [language, setLanguage] = useState("")
    const [name, setName] = useState("")
    const [engText, setEngText] = useState("")
    const [text, setText] = useState("")

    const [customerTranslation, setCustomerTranslation] = useState("");
    const inputField1 = document.getElementById("input1");
    const inputField2 = document.getElementById("input2");
    const inputField3 = document.getElementById("input3");

    const {user}=useContext(AuthContext)
    
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();
        setText(e.target.inputField.value);
        setLanguage(localStorage.getItem('language'));
        setName(localStorage.getItem('name'));
        inputField2.value = "Typing..."
        inputField3.value = "Typing..."

        const engInput = {
            target: "English",
            text: text
        }
        let apiUrl = `https://zuss-chat-translator-server-site.vercel.app/translate`;
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(engInput)
        })
            .then((res) => res.json())
            .then((data) => {
                setEngText(data?.data)
                e.target.outputField2.value = data?.data;
            });


        const customerInput = {
            target: language,
            text: text
        }
        console.log(engInput)
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(customerInput)
        })
            .then((res) => res.json())
            .then((data) => {
                setCustomerTranslation(data?.data);
                inputField2.value = data?.data;
            });

    };



    return (
        <div>
            <div className=" my-6 flex justify-start">

                <form onSubmit={handleSubmit} className="rounded w-2/3 pb-8 mb-4 ">
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-700 mb-2 pl-2" htmlFor="input1">
                            Question from app
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="input1"
                            name='inputField'
                            type="text"
                            placeholder="Enter Question from app"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
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
                            name='outputField1'
                            placeholder="Show in Customer Service"
                        // value={input2}
                        // onChange={(e) => setInput2(e.target.value)}
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
                            name='outputField2'

                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-[#004368] hover:bg-blue-700   px-10 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
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
    );
};

export default CustomerServicePart;