import React, { useContext, useState } from 'react';
import { AllProductContext } from '../../../context/ProductContext';
import { AuthContext } from '../../../context/UserContext';
import { toast } from 'react-hot-toast';

const CustomerServicePart = () => {

    const formData = new FormData();

    const Questions={
        smzubayer9004gmail:[],
        smzubayer18gmail:[]
    }
   
    


    const [questions, setQuestions] = useState(Questions)
    const [newQuestion, setNewQuestion] = useState(Questions)
    // const [allQuestion, setAllQuestion] = useState({})
    const [nickName,setNickName]=useState("")

    const [language, setLanguage] = useState("")
    const [name, setName] = useState("")
    const [engText, setEngText] = useState("")
    const [text, setText] = useState("")
    formData.append('message', text);
    const [chineseAnswer, setChineseAnswer] = useState([]);
    const [bengaliAnswer, setBengaliAnswer] = useState([]);
    const [englishAnswer, setEnglishAnswer] = useState([]);
    const [answer, setAnswer] = useState([])
    const [customerTranslation, setCustomerTranslation] = useState("");
    const inputField1 = document.getElementById("input1");
    const inputField2 = document.getElementById("input2");
    const inputField3 = document.getElementById("input3");



    const { user } = useContext(AuthContext)
    



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text){
            toast.error("please input correct value");
            return;
        }
        setChineseAnswer([]);
        setEnglishAnswer([]);
        setBengaliAnswer([]);
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
        fetch('https://grozziie.zjweiting.com:8032/get_response', {
            method: 'POST',
            body: formData,
            // headers: {
            //   'Content-Type': 'application/json',

            // },
        })
            .then(response => response.json())
            .then(data => {
                // Handle the data returned by the Python backend

                setChineseAnswer(data?.answers_CN);
                setEnglishAnswer(data?.answers_EN);
                setBengaliAnswer(data?.answers_BN);



            })
            .catch(error => {
                // Handle any errors that occurred during the request
                console.error('There was an error!', error);
            });


    };


//create function to copy the answer
    const handleToCopy = (e, element) => {

        setTimeout(() => {

            e.target.classList.remove("bg-orange-100")
            e.target.classList.add("bg-yellow-100")

        }, 20);


        e.target.classList.remove("bg-orange-100")
        // let copyValue=v.split("：")[1]
        navigator.clipboard.writeText(element)
    }

    //     const handleToStore = () => {
    //         console.log("Store");
    //         const newQuestions=[text,...questions];
    // THis is the part for the pending data store partWS

    // set questions first of all to add all parts.
    //         setQuestions(newQuestions);
    //         localStorage.setItem('allQuestions', JSON.stringify(questions));
    //         const myArrayString = localStorage.getItem('allQuestions');
    //   const allQuestion = JSON.parse(myArrayString);
    //   setAllQuestion(allQuestion)
    //     }



//create a function to store the unknown questions

    async function handleToUnknownStore() {
        if(!text){
            toast.error("please input correct value");
            return;
        }
        // create a new Date object
        const now = new Date();

        // extract the current date and time components
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();


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
            if(data?.status==="success"){
                setText("");
                inputField2.value = ""
                inputField3.value = ""
                toast.success("Question added successfully");
                return;
            }
            console.log(data)
           
            if(data?.status==="error"){
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
        if(!text){
            toast.error("please input correct value");
            return;
        }

        // create a new Date object
        const now = new Date();

        // extract the current date and time components
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        console.log({
            question: text,
            englishLan: engText,
            bengaliLan: inputField2.value,
            time,
            date
        })


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
            if(data?.status==="success"){
                setText("");
                inputField2.value = ""
                inputField3.value = ""
                toast.success("Question added successfully");
                return;
            }
           
            if(data?.status==="error"){
                setText("");
                inputField2.value = ""
                inputField3.value = ""
                toast.error(data?.message)
                return;
            }

    }

const handleToStoreAllQuestions=(questions, nickName, newQuestion)=>{
    setNickName(user?.email.split(".")[0]);
    setNewQuestion(text);
    // console.log(nickName)

    // console.log(questions?.(user?.email.split(".")[0]))
    
    // console.log(questions)

    // const allQuestions={...Questions,newQuestion}
    // 
// Find the index of the array element

console.log(questions.arrayProperty)
const index = questions.arrayProperty.findIndex(element => element.id === nickName);

// Clone the object
const clonedObj = { ...questions };

// Create a new array with the modified element
const newArray = [...clonedObj.arrayProperty];
newArray[index] = { ...newArray[index], ...newQuestion };

// Update the cloned object with the new array
clonedObj.arrayProperty = newArray;

// Return the updated object
return clonedObj;

}


    return (

        <div>
            <div>
                <div className=" my-6 flex justify-start">

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
                            // value={input2}
                            // onChange={(e) => setInput2(e.target.value)}
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
                            onClick={()=>handleToStoreAllQuestions(questions, nickName, newQuestion)}
                                className="bg-[#004368] hover:bg-blue-700   px-10 text-white font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Send
                            </button>

                        </div>

                    </form>

                </div>
                <div className="w-5/12 flex ml-auto">
                    <div className="w-full flex justify-end">
                        <button onClick={handleToUnknownStore}
                            className=" bg-yellow-400 hover:bg-blue-200   px-10 text-black font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                        >
                            Store
                        </button>
                    </div>
                    <div className="w-full flex justify-end">
                        <button onClick={handleToStoreTranslate}
                            className=" bg-green-400 hover:bg-blue-200   px-10 text-black font-bold py-1 rounded focus:outline-none focus:shadow-outline"
                        >
                            Store Translate
                        </button>
                    </div>
                </div>


                <div className=" flex items-center justify-end">
                    <div className="text-base font-semibold text-black " id="answerPart">

                        {
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
                        }
                    </div>

                </div>

            </div>


        </div>
    );
};

export default CustomerServicePart;