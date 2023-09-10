import './Translator.css';
import { AiOutlineCopy, AiOutlineSound } from 'react-icons/ai';
import { CiMicrophoneOn } from 'react-icons/ci';
import { useRef, useState } from 'react';
import countries from './Countries';
import BtnSpinner from './BtnSpinner';


import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Translator() {

    const [isLoading, SetIsLoading] = useState(false)
    const [isLoading2, SetIsLoading2] = useState(false)
    const [targetLan, setTargetLan] = useState("")
    const [text, setText] = useState('');
    // const [engText,setEngText]=useState('')
    const [midTranslate, setMidTranslate] = useState('');
    const [targetTranslate, setTargetTranslate] = useState('');

    const textareaRef = useRef(null);
    const divRef = useRef(null);
    const divRef2 = useRef(null);


    // create the function to collect the target language to translate
    const handleTargetLan = (event) => {
        event.preventDefault();
        setTargetLan(event.target.value)

    }
    // Create the function which show the toast if user didn't select the target language!
    const notify = () => {
        toast("Please select the target language!");
        return;
    };


    // create the function to collect the input text from the textarea to translate
    const handleToCollectText = (event) => {
        event.preventDefault();
        setText(event.target.value)



    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {

            handleToTranslate();
        }
    };

    const handleToCopy = (e) => {

        setTimeout(() => {
            // e.target.classList.add("text-red-200")

        }, 20);

        const range = document.createRange();
        range.selectNodeContents(divRef.current);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        // e.target.classList.remove("text-red-300")
    }


    const handleToCopy2 = (e) => {

        setTimeout(() => {
            // e.target.classList.add("text-red-200")

        }, 20);

        const range = document.createRange();
        range.selectNodeContents(divRef2.current);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        // e.target.classList.remove("text-red-300")
    }

    const handleToCopyText = (e) => {

        setTimeout(() => {
            // e.target.classList.add("text-red-300")

        }, 20);

        textareaRef.current.select();
        document.execCommand('copy');
        // e.target.classList.remove("text-red-300")
    }




    const handleToTranslate = () => {
        const inputElement = document.getElementById("inputField");
        setMidTranslate('')
        setTargetTranslate('')
        SetIsLoading(true)
        SetIsLoading2(true)


        setText(text?.trim());



        const midInput = {
            target: "English",
            text
        }
        const targetInput = {
            target: targetLan,
            text
        }


        // fetch the api to use post method the get the response from OpenAI
        // Here we can get the value from detect language to English language

        // let apiUrlEng = `http://localhost:5000/tht/translate`;
        let apiUrlEng = `https://grozziie.zjweiting.com:8033/tht/translate`;

        fetch(apiUrlEng, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(midInput)
        })
            .then((res) => res.json())
            .then((data) => {
                setText(data?.data)
                setMidTranslate(data?.data);
                // setEngText(data.data)
                SetIsLoading(false)

            });



        // fetch the api to use post method the get the response from OpenAI
        // Here we can get the value from English language to selected language

        // https://simple-node-server-s-m-zubayer.vercel.app


        // let apiUrl = `http://localhost:5000/tht/translate`;
        let apiUrl = `https://grozziie.zjweiting.com:8033/tht/translate`;
        if (!targetLan) {
            notify();
        }
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(targetInput)
        })
            .then((res) => res.json())
            .then((data) => {
                setTargetTranslate(data?.data);
                SetIsLoading2(false)
                inputElement.value = "";
            });




    }





    return (


        <div className="App md:my-44 flex justify-center items-center bg-lime-300">
            <ToastContainer />
            <div className=" ">
                {/* <h1 className="text-3xl font-bold mb-10 mt-10 md:mt-0">ZUSS Translator</h1> */}
                <div className=' bg-lime-300 md:flex rounded-lg p-5'>
                    <div>
                        <textarea id='inputField' ref={textareaRef} placeholder="please type here" onChange={handleToCollectText} onDoubleClick={handleToTranslate} onKeyPress={handleKeyPress} className="border-2 bg-white text-black border-slate-600 rounded-t-lg md:rounded-t-none md:rounded-tl-lg p-2  mt-2 md:ml-2 h-44  w-72 md:w-64 lg:w-72  block"></textarea>
                        <div className="border-2 border-slate-600 md:ml-2 sm:rounded-b-lg md:rounded-b-none md:rounded-bl-lg mb-2 mr-2 md:mr-0">
                            <div className="flex justify-between items-center ml-2">
                                <AiOutlineCopy className="copyClass text-black" onClick={(e) => handleToCopyText(e)}></AiOutlineCopy>
                                <CiMicrophoneOn className='text-black'></CiMicrophoneOn>
                                <AiOutlineSound className='text-black'></AiOutlineSound>
                                <div>

                                    <select name='language' type="boolean" placeholder='Sold Status' className="select select-bordered w-full px-2 py-2 bg-lime-300 font-semibold rounded-lg  focus:outline-green-500  text-gray-900">
                      <option disabled selected> Detect language</option>
                    </select>
                                </div>

                            </div>
                        </div>
                    </div>



                    <div>
                        <div ref={divRef} placeholder="Translation" id="mid-text" className="border-2 text-start text-black rounded-t-lg overflow-scroll bg-white  md:rounded-t-none border-slate-600 p-2  mt-2 h-44 w-72 md:w-64 lg:w-72 block">
                            {
                                isLoading ? <BtnSpinner></BtnSpinner> : midTranslate
                            }
                        </div>
                        <div className="border-2 border-slate-600  mb-2 mr-2 md:mr-0 ">
                            <div className="flex justify-between items-center ml-2 ">
                                <AiOutlineCopy className="copyClass text-black" onClick={(e) => handleToCopy(e)}></AiOutlineCopy>
                                <CiMicrophoneOn className='text-black'></CiMicrophoneOn>
                                <AiOutlineSound className='text-black'></AiOutlineSound>
                                <div className="form-control">
                                    <div className="input-group" id='lan'>
                                        <select name='language' type="boolean" placeholder='Sold Status' className="select select-bordered w-full bg-lime-300 font-semibold px-3 py-2 rounded-md  focus:outline-green-500  text-gray-900">
                                            <option disabled selected>English</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div>
                        <div ref={divRef2} placeholder="Translation" id="to-text" className="border-2 overflow-scroll text-start text-black bg-white border-slate-600 rounded-t-lg md:rounded-none md:rounded-tr-lg p-2 mt-2 mr-2 h-44  w-72 md:w-64 lg:w-72 block">
                            {
                                isLoading2 ? <BtnSpinner></BtnSpinner> : targetTranslate
                            }
                        </div>
                        <div className="border-2 border-slate-600 md:rounded-br-lg mr-2  mb-2">
                            <div className="flex justify-between items-center ml-2 ">
                                <AiOutlineCopy className="copyClass text-black" onClick={(e) => handleToCopy2(e)}></AiOutlineCopy>
                                <CiMicrophoneOn className='text-black'></CiMicrophoneOn>
                                <AiOutlineSound className='text-black'></AiOutlineSound>

                                {/* To create the functionalities the select language */}

                                <div className="form-control" onChange={handleTargetLan}>
                                    <div className="input-group" id='lan'>
                                        <select name='language' type="boolean" placeholder='Sold Status' className="select select-bordered w-full px-3 py-2 rounded-md focus:outline-green-500 bg-lime-300 font-semibold text-gray-900">
                                            <option disabled selected> Select language</option>
                                            {
                                                countries?.map((element, index) => <option key={index}>{element}</option>

                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>


                {/* Create the button to generate the Translation */}

                {/* <div className="flex justify-around items-center ">
          <button className="my-5 bg-white w-full py-1 rounded-lg font-semibold" onClick={handleToTranslate} >Text Translate</button>
        </div> */}

            </div>
        </div>
    );
}

export default Translator;
