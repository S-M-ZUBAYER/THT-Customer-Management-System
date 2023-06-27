import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { handleToCopy } from './FunctionsForCustomerService/FunctionsForCustomerService';
import BtnSpinner from '../../Shared/Loading/BtnSpinner';
import DisplaySpinner from '../../Shared/Loading/DisplaySpinner';

const CustomerServicePart = () => {

    //create this part to send data to the backend to got data
    const formData = new FormData();


    const [language, setLanguage] = useState("")
    const [name, setName] = useState("")
    const [engText, setEngText] = useState("")
    const [text, setText] = useState("")
    formData.append('message', text);
    const [chineseAnswer, setChineseAnswer] = useState([]);
    const [bengaliAnswer, setBengaliAnswer] = useState([]);
    const [englishAnswer, setEnglishAnswer] = useState([]);
    const [customerTranslation, setCustomerTranslation] = useState("");
    const inputField1 = document.getElementById("input1");
    const inputField2 = document.getElementById("input2");
    const inputField3 = document.getElementById("input3");
    const [filterAns, setFilterAns] = useState([]);

    const [sendLoading, setSendLoading] = useState(false);
    const [storeLoading, setStoreLoading] = useState(false);
    const [translateLoading, setTranslateLoading] = useState(false);
    const [RadioLoading, setRadioLoading] = useState(false);


    //use useContext to got data from any component
    const { user, loading, setLoading, totalQuestions, setTotalQuestions, setTotalQuestionLan, unknownQuestions, totalQuestionsLan, unknownQuestionsLan, setUnknownQuestions, setUnknownQuestionsLan, translationQuestions, setTranslationQuestions, setTranslationQuestionsLan, handleToStoreAllData, handleToDeleteAllData, setTranslationPercent, translationPercent, translateCalculatePercentage, unknownCalculatePercentage, setUnknownPercent, unknownPercent } = useContext(AuthContext)


    // create this function to send the data to the backend for translation and get the possible answers according to the customer questions.
    const handleSubmit = (e) => {
        e.preventDefault();
        setSendLoading(true);
        setSelectedPrinter()

        //create this part so that any one cannot send the data without input anythings
        if (!text) {
            toast.error("please input correct value");
            return;
        }

        // start the part for translations
        setChineseAnswer([]);
        setEnglishAnswer([]);
        setBengaliAnswer([]);
        setText(e.target.inputField.value);
        setLanguage(localStorage.getItem('language'));
        setName(localStorage.getItem('name'));
        inputField2.value = "Typing..."
        inputField3.value = "Typing..."



        //This part for got the date and time according to the any event 
        // create a new Date object
        const now = new Date();

        // extract the current date and time components
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        //create an object to send backend for English translations
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


        //create an object to send backend and start the process for Bengali translations

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

        fetch('https://grozziie.zjweiting.com:8032/get_response', {
            method: 'POST',
            body: formData,

        })
            .then(response => response.json())
            .then(data => {
                // Handle the data returned by the Python backend


                setChineseAnswer(data?.answers_CN);
                setEnglishAnswer(data?.answers_EN);
                setBengaliAnswer(data?.answers_BN);






                //store all the questions in Sql database
                if (user) {

                    //load current user data from database
                    fetch('https://grozziie.zjweiting.com:8033/tht/questions/add', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({ email: user?.email, question: text, date, time })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                toast.success('stored Successfully');
                                setTotalQuestions([...totalQuestions, { email: user?.email, question: text, date, time }]);
                                setUnknownPercent(unknownCalculatePercentage(totalQuestions, unknownQuestions))
                                setTranslationPercent(translateCalculatePercentage(totalQuestions, translationQuestions))


                            }
                            else {
                                toast.error(data.message);
                                // console.log(data.message)
                            }

                        })

                }


                setSendLoading(false);

            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('There was an error!', error);
            });


    };




    //create 3 function to divided the answer in 3 categories

    const handleToDotPrinterAns = () => {

        setRadioLoading(true);
        fetch('https://grozziie.zjweiting.com:8032/get_response', {
            method: 'POST',
            body: formData,

        })
            .then(response => response.json())
            .then(data => {
                // Handle the data returned by the Python backend


                setChineseAnswer(data?.answers_CN.filter((product) => product[2].includes("Dot")));
                setEnglishAnswer(data?.answers_EN.filter((product) => product[2].includes("Dot")));
                setBengaliAnswer(data?.answers_BN.filter((product) => product[2].includes("Dot")));

            })


        setRadioLoading(false);

    }


    const handleToThermalPrinterAns = () => {
        setRadioLoading(true);
        // setChineseAnswer(chineseAnswer.filter((product) => product[2].includes("Thermal")));
        // setEnglishAnswer(englishAnswer.filter((product) => product[2].includes("Thermal")));
        // setBengaliAnswer(bengaliAnswer.filter((product) => product[2].includes("Thermal")));
        // console.log(chineseAnswer)

        fetch('https://grozziie.zjweiting.com:8032/get_response', {
            method: 'POST',
            body: formData,

        })
            .then(response => response.json())
            .then(data => {
                // Handle the data returned by the Python backend


                setChineseAnswer(data?.answers_CN.filter((product) => product[2].includes("Thermal")));
                setEnglishAnswer(data?.answers_EN.filter((product) => product[2].includes("Thermal")));
                setBengaliAnswer(data?.answers_BN.filter((product) => product[2].includes("Thermal")));

            })


        setRadioLoading(false);
    }

    const handleToAttendanceMachineAns = () => {
        setRadioLoading(true);
        // setChineseAnswer(chineseAnswer.filter((product) => product[2].includes("Attendance")));
        // setEnglishAnswer(englishAnswer.filter((product) => product[2].includes("Attendance")));
        // setBengaliAnswer(bengaliAnswer.filter((product) => product[2].includes("Attendance")));
        // console.log(chineseAnswer)

        fetch('https://grozziie.zjweiting.com:8032/get_response', {
            method: 'POST',
            body: formData,

        })
            .then(response => response.json())
            .then(data => {
                // Handle the data returned by the Python backend


                setChineseAnswer(data?.answers_CN.filter((product) => product[2].includes("Attendance")));
                setEnglishAnswer(data?.answers_EN.filter((product) => product[2].includes("Attendance")));
                setBengaliAnswer(data?.answers_BN.filter((product) => product[2].includes("Attendance")));

            })

        setRadioLoading(false);
    }





    //create a function to store the unknown questions

    async function handleToUnknownStore() {
        //create this part so that any one cannot send the data without input anythings
        if (!text) {
            toast.error("please input correct value");
            return;
        }
        setStoreLoading(true);
        // create a new Date object
        const now = new Date();

        // extract the current date and time components
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();



        //store all the questions in Sql database
        if (user) {
            //create the functionalities to check so that same thing no need to store again
            let isDuplicate = false;

            unknownQuestions.forEach(question => {
                if (question.question === text) {
                    
                    toast.error("This question has already been stored as an unknown question");
                    isDuplicate = true;
                }
            });

            if (isDuplicate) {
            setStoreLoading(false);
            setText("");
            inputField2.value = ""
            inputField3.value = ""
                return;
            }

            //load current user data from database
            fetch('https://grozziie.zjweiting.com:8033/tht/unknownQuestions/add', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: user?.email, question: text, date, time })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.insertId) {
                        toast.success('stored Successfully');
                        setUnknownQuestions([...unknownQuestions, { email: user?.email, question: text, date, time }]);
                        setUnknownPercent(unknownCalculatePercentage(totalQuestions, unknownQuestions))
                        setTranslationPercent(translateCalculatePercentage(totalQuestions, translationQuestions))


                    }
                    else {
                        toast.error(data.message);
                    }

                })
            setStoreLoading(false);
        }


        try {
            const response = await fetch('https://grozziie.zjweiting.com:8032/p_question_add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: text,
                    time,
                    date
                })
            });
            const data = await response.json();
            if (data?.status === "success") {
                setText("");
                inputField2.value = ""
                inputField3.value = ""
                // toast.success("Question added successfully");


                // //start the part to store data in localStorage

                //     // Retrieve the array from local storage
                //     const storedArrayUnknownQuestions = localStorage.getItem('unknownQuestions');
                //     let storedArray = [];

                //     // Check if the stored array exists
                //     if (storedArrayUnknownQuestions) {
                //         storedArray = JSON.parse(storedArrayUnknownQuestions);
                //     }

                //     // Add a new element to the array
                //     const newElement = { text, date, time };
                //     storedArray.push(newElement);

                //     setUnknownQuestions(storedArray)

                //     // Convert the modified array back to a string
                //     const updatedArrayString = JSON.stringify(storedArray);

                //     // Store the updated array in local storage
                //     localStorage.setItem('unknownQuestions', updatedArrayString);


                return;
            }


            if (data?.status === "error") {
                setText("");
                inputField2.value = ""
                inputField3.value = ""
                toast.error(data?.message)
                return;
            }

        } catch (error) {
            toast.error(error)
            console.error(error);
        }


    }

    //create a function to store the translation sentences part

    async function handleToStoreTranslate() {
        if (!text) {
            toast.error("please input correct value");
            return;
        }
        setTranslateLoading(true)

        // create a new Date object
        const now = new Date();

        // extract the current date and time components
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();


        //store data in sql database

        if (user) {

            let isDuplicate = false;

            translationQuestions.forEach(question => {
                if (question.question === text) {
                    
                    toast.error("This question has already been stored as an translation question problem");
                    isDuplicate = true;
                }
            });

            if (isDuplicate) {
            setTranslateLoading(false);
            setText("");
            inputField2.value = ""
            inputField3.value = ""
                return;
            }

            //create the functionalities to check so that same thing no need to store again
            translationQuestions.map((question) => {
                if (question.question === text) {
                    toast.error("This question has already store as an translations problem question")
                    return;
                }
            })

            //load current user data from database
            fetch('https://grozziie.zjweiting.com:8033/tht/translationsQuestions/add', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: user?.email, question: text, english: engText, bangla: inputField2?.value, date, time })
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        toast.success('translation questions stored Successfully');
                        setTranslationQuestions([...translationQuestions, { question: text, english: engText, bangla: inputField2?.value, date, time }]);
                        setUnknownPercent(unknownCalculatePercentage(totalQuestions, unknownQuestions))
                        setTranslationPercent(translateCalculatePercentage(totalQuestions, translationQuestions))

                    }
                    else {
                        toast.error(data.message);
                    }

                })
            setTranslateLoading(false);

        }




        const response = await fetch('https://grozziie.zjweiting.com:8032/t_question_add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: text,
                englishLan: engText,
                bengaliLan: inputField2.value,
                time,
                date
            })
        });
        const data = await response.json();
        if (data?.status === "success") {

            //start the part to store data in localStorage

            // Retrieve the array from local storage
            // const storedArrayTranslationQuestions = localStorage.getItem('translationQuestions');
            // let storedArray = [];

            // // Check if the stored array exists
            // if (storedArrayTranslationQuestions) {
            //     storedArray = JSON.parse(storedArrayTranslationQuestions);
            // }

            // // Add a new element to the array
            // const newElement = { question: text, english: engText, bangla: inputField2?.value, date, time };
            // storedArray.push(newElement);
            // console.log(newElement)

            // setTranslationQuestions(storedArray)

            // // Convert the modified array back to a string
            // const updatedArrayString = JSON.stringify(storedArray);

            // // Store the updated array in local storage
            // localStorage.setItem('translationQuestions', updatedArrayString);




            setText("");
            inputField2.value = ""
            inputField3.value = ""
            // toast.success("Question added successfully");

            return;
        }

        if (data?.status === "error") {
            setText("");
            inputField2.value = ""
            inputField3.value = ""
            toast.error(data?.message)
            return;
        }



    }

    // ***** select printer section ************************

    const [selectedPrinter, setSelectedPrinter] = useState('');

    const handlePrinterChange = (e) => {
        setSelectedPrinter(e.target.value);
    };


    return (
            <div>
                <div className=" my-6 flex justify-start bg-white">

                    {/* create a from to send the question to the backend to translation and get all the possible ans */}
                    <form onSubmit={handleSubmit} className="rounded w-2/3 pb-8 mb-4 ">
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700 mb-2 pl-2" htmlFor="input1">
                                Question from app
                            </label>
                            <textarea
                                className="shadow overflow-y-scroll resize-none appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            <textarea
                                className="shadow overflow-y-scroll resize-none appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input2"
                                type="text"
                                name='outputField1'
                                placeholder="Show in Customer Service"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold text-gray-700 mb-2  pl-2" htmlFor="input3">
                                English Formate
                            </label>
                            <textarea
                                className="shadow overflow-y-scroll resize-none appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                                {
                                    sendLoading ?
                                        <BtnSpinner></BtnSpinner>
                                        : "Send"
                                }

                            </button>

                        </div>

                    </form>

                </div>


                {/* create store button to call the function store the unknown questions to the database */}
                <div className="w-7/12 md:w-5/12 flex ml-auto">
                    <div className="w-full flex justify-end">
                        <button onClick={handleToUnknownStore}
                            className=" bg-yellow-400 hover:bg-blue-200  px-1 md:px-10 text-black font-semibold md:font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                        >
                            {
                                storeLoading ?
                                    <BtnSpinner></BtnSpinner>
                                    : 'Store'
                            }

                        </button>
                    </div>


                    {/* create store Translate button to call the function store miss translation part to the database */}
                    <div className="w-full flex justify-end">
                        <button onClick={handleToStoreTranslate}
                            className=" bg-green-400 hover:bg-blue-200   px-1 md:px-10 text-black font-semibold md:font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                        >
                            {
                                translateLoading ?
                                    <BtnSpinner></BtnSpinner>
                                    : 'Store Translate'
                            }

                        </button>
                    </div>
                </div>


                {/* section to select the specific printer to get the proper ans for this particular printer */}


                <div className="flex justify-around w-8/12 text-gray-700">
                    <div>
                        <label>
                            <input
                                type="radio"
                                className="bg-white"
                                value="Dot Printer"
                                checked={selectedPrinter === 'Dot Printer'}
                                onChange={handlePrinterChange}
                                onClick={handleToDotPrinterAns}
                            />
                            Dot Printer
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="radio"
                                className="bg-white"
                                value="Thermal Printer"
                                checked={selectedPrinter === 'Thermal Printer'}
                                onChange={handlePrinterChange}
                                onClick={handleToThermalPrinterAns}
                            />
                            Thermal Printer
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="radio"
                                className="bg-white"
                                value="Attendance"
                                checked={selectedPrinter === 'Attendance'}
                                onChange={handlePrinterChange}
                                onClick={handleToAttendanceMachineAns}
                            />
                            Attendance
                        </label>
                    </div>


                </div>







                {/* create this part to show all the possible answers */}

                {
                    sendLoading || RadioLoading ?
                        <DisplaySpinner></DisplaySpinner>
                        :
                        <div className=" flex items-center justify-end">
                            <div className="text-base font-semibold text-black " id="answerPart">

                                {chineseAnswer?.length ?
                                    chineseAnswer.map((element, index) => <div key={index} className="common border-2 bg-lime-200 my-5 ml-10  p-3 rounded-tl-xl rounded-br-xl">

                                        <p onClick={(e) => handleToCopy(e, element[1])} className=" shadow-2xl common text-base rounded-md px-2 mb-2 py-2" id="text-to-copy">
                                            <span className="text-lg font-bold text-indigo-700">Customer</span>:- {element[1]}
                                        </p>

                                        <p onClick={(e) => handleToCopy(e, element[1])} id="text-to-copy" className="common text-base  shadow-2xl rounded-md mb-2 p-2">
                                            <span className="text-lg font-bold text-amber-800">Customer Service</span>:- {bengaliAnswer[index][1]}
                                        </p>
                                        <p onClick={(e) => handleToCopy(e, element[1])} id="text-to-copy" className="common text-base  shadow-2xl  rounded-md p-2">
                                            <span className="text-lg font-bold text-fuchsia-700">Customer Service</span>:- {englishAnswer[index][1]}
                                        </p>
                                    </div>)
                                    :
                                    <p className="text-2xl mr-32 mt-20 font-bold text-amber-500">No Answer Available For This Question !!!</p>
                                }
                            </div>


                        </div>
                }

            </div>


        
    );
};

export default CustomerServicePart;