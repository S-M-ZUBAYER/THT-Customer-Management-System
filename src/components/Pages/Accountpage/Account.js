import React, { useContext, useEffect, useState } from 'react';
import img from "../../../Assets/Images/messi.jpg"
import { AuthContext } from '../../../context/UserContext';
import { toast } from 'react-hot-toast';
import { type } from '@testing-library/user-event/dist/type';
const Account = () => {
    const { logOut, user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({});
    const [unknownPercent, setUnknownPercent] = useState(Number)
    const [translationPercent, setTranslationPercent] = useState(Number)


    const totalQuestions = ["Question 1", "Question 2", "Question 3", "Question 4","Question 5"];
    const unknownQuestions = ["Question 2", "Question 4", "Question 6"];
    const translationQuestions = [
        { question: "qustion1", english: "Question 1", bangla: "প্রশ্ন ১" },
        { question: "qustion2", english: "Question 2", bangla: "প্রশ্ন ২" },
        { question: "qustion3", english: "Question 3", bangla: "প্রশ্ন ৩" },
    ];


    useEffect(() => {
        fetch('http://localhost:5000/userInfo')
            .then(response => response.json())
            .then(data => setUserInfo(data));

    }, []);

    const handleToLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logout successfully")
            })
            .catch(err => {
                toast.error(err)
            })
    }

const totalQuestionsLan=totalQuestions.length;
const unknownQuestionsLan=unknownQuestions.length;
const translationQuestionsLan=translationQuestions.length;

    function calculatePercentage(totalQuestions, currentQuestions) {
        if (totalQuestions === 0) {
          return 0;
        }
      
        const percentage = (currentQuestions / totalQuestions) * 100;
        return Math.round(percentage);
      }

      console.log(calculatePercentage(totalQuestionsLan,unknownQuestionsLan),translationQuestionsLan,unknownQuestionsLan)
      console.log(calculatePercentage(totalQuestionsLan,translationQuestionsLan),translationQuestionsLan,translationQuestionsLan)

    return (
        <div className="mt-32 md:mx-36">

            <div className="grid grid-cols-1 md:grid-cols-2 text-center">
                <div className="flex justify-around">
                    <img className="rounded-full h-56 w-56" src={userInfo?.pic}></img>
                </div>
                <div className="text-start mt-10 md:mt-0 ">
                    <div className="ml-20 md:ml-0 mx-auto md:mx-0">

                        <div className="test-center">
                            <h2 className="text-lg font-semibold mb-0 pb-0">
                                {userInfo ? userInfo?.name : "S M Zubayer"}
                            </h2>
                            <p className="mb-4 ml-1">
                                {userInfo ? userInfo?.designation : "Designation"}
                            </p>
                        </div>
                        <div className="grid grid-cols-4 my-3">
                            <p className="font-semibold">
                                Contact Number:
                            </p>
                            <p >{userInfo ? userInfo?.phone : "+8801304979278"}</p>
                        </div>
                        <div className="grid grid-cols-4 my-3">
                            <p className="font-semibold">
                                Email
                            </p>
                            <p>{userInfo?.email}</p>
                        </div>
                        <div className="grid grid-cols-4 my-3">
                            <p className="font-semibold">
                                Country
                            </p>
                            <p>{userInfo ? userInfo?.country : "smzubayer9004@gmail.com"}</p>
                        </div>
                        <div className="grid grid-cols-4 my-3">
                            <p className="font-semibold">
                                Language
                            </p>
                            <p>{userInfo ? userInfo?.language : "Bengali"}</p>
                        </div>
                        <div className="my-20 mb-10">
                            <button onClick={handleToLogOut} className="bg-[#004368]  px-20 rounded-md py-2 ml-2 text-white font-semibold hover:bg-slate-800" >
                                Log out
                            </button>
                        </div>
                    </div>



                </div>

            </div>

            <div className="mb-10 text-base">
                <h2 className="text-3xl bg-red-200 py-1 font-bold mt-5 text-start pl-5">Total Questions</h2>
                {
                    totalQuestions.length !== 0 ? totalQuestions.map((question, index) => (
                        <p className="text-start ml-5" key={`total-question-${index}`}>{index + 1}: {question}</p>
                    )) : <span className="text-xl font-bold text-red-400">NO Question Available</span>
                }

                <div className="flex justify-between text-3xl bg-red-200 py-1 font-bold mt-5 px-4">
                    <h2 className="">Unknown Questions</h2>
                    <p>10% </p>
                </div>
                {
                    unknownQuestions.length !== 0 ? unknownQuestions.map((question, index) => (
                        <p className="text-start ml-5" key={`total-question-${index}`}>{index + 1}: {question}</p>
                    )) : <span className="text-xl font-bold text-red-400">NO Question Available</span>
                }
                <div className="flex justify-between text-3xl bg-red-200 py-1 font-bold mt-5 px-4">
                    <h2 className="">Translation Questions</h2>
                    <p>10% </p>
                </div>


                {
                    translationQuestions.length !== 0 ? translationQuestions.map((question, index) => (
                        <div className="text-start ml-5" key={`translation-question-${index}`}>
                            <p>{index + 1}: {question.question}</p>
                            <p>{index + 1}: {question.english}</p>
                            <p>{index + 1}: {question.bangla}</p>
                        </div>
                    )) : <span className="text-xl font-bold text-red-400">NO Question Available</span>
                }
            </div>



        </div>
    );
};

export default Account;