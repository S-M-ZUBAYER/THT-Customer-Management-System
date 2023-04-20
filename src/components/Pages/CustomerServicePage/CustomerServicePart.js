import React, { useContext, useState } from 'react';
import { AllProductContext } from '../../../context/ProductContext';
import { AuthContext } from '../../../context/UserContext';

const CustomerServicePart = () => {

    const formData = new FormData();




    const [language, setLanguage] = useState("")
    const [name, setName] = useState("")
    const [engText, setEngText] = useState("")
    const [text, setText] = useState("")
    formData.append('message', text);
    const [answer, setAnswer] = useState([])
    const [customerTranslation, setCustomerTranslation] = useState("");
    const inputField1 = document.getElementById("input1");
    const inputField2 = document.getElementById("input2");
    const inputField3 = document.getElementById("input3");

    const { user } = useContext(AuthContext)

console.log(answer)

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
            target: "Bengali",
            text: text
        }

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


        // fetch('http://43.154.22.219/get_response', {
        fetch('https://support-csey.onrender.com/get_response', {
            method: 'POST',
            body: formData,
            // headers: {
            //   'Content-Type': 'application/json',

            // },
        })
            .then(response => response.json())
            .then(data => {
                // Handle the data returned by the Python backend
                console.log(data);
                setAnswer(data?.answers);


                // console.log(text,answer)
            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('There was an error!', error);
            });


    };



    const handleToCopy = (e, element) => {

        setTimeout(() => {

            e.target.classList.remove("bg-orange-200")
            e.target.classList.add("bg-yellow-200")

        }, 20);


        e.target.classList.remove("bg-orange-200")
        // let copyValue=v.split("：")[1]
        navigator.clipboard.writeText(element)
    }
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
                    {
                        answer?.map((element) => <div className="common my-2 ml-10 bg-orange-200 p-3 rounded-tl-xl rounded-br-xl">

                            <p onClick={(e) => handleToCopy(e, element)} className="bg-slate-300 common rounded-md pl-1 pr-2 " id="text-to-copy">
                                {element ? `Customer":- ${element}` : "Customer:- Probable Ans 1"}
                            </p>

                            <p className="common">
                                Customer Service:- probable Ans 1
                            </p>
                            <p className="common">
                                English:- probable Ans 1
                            </p>
                        </div>)
                    }
                </div>
            </div>
            {/* <div className=" flex items-center justify-end">
                <div className="text-base font-semibold text-black ">
                    <div className="my-2 bg-orange-200 p-3 rounded-tl-xl rounded-br-xl">
                        <p className="bg-slate-300 rounded-md pl-1 pr-2">
                            {answer? `English":- ${answer}`: "English:- Probable Ans 1" } 
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

            </div> */}
        </div>
    );
};

export default CustomerServicePart;