
import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/UserContext';
//create function to copy the answer

export const handleToCopy = (e, element) => {

    setTimeout(() => {

        e.target.classList.remove("bg-orange-100")
        e.target.classList.add("bg-yellow-100")

    }, 20);


    e.target.classList.remove("bg-orange-100")
    // let copyValue=v.split("：")[1]
    navigator.clipboard.writeText(element)
}


const FunctionsForCustomerService = () => {
    const { user, totalQuestions, setTotalQuestions, setTotalQuestionLan, unknownQuestions, totalQuestionsLan, unknownQuestionsLan, setUnknownQuestions, setUnknownQuestionsLan, translationQuestions, setTranslationQuestions, setTranslationQuestionsLan, handleToStoreAllData, handleToDeleteAllData, setTranslationPercent, translateCalculatePercentage, unknownCalculatePercentage, setUnknownPercent } = useContext(AuthContext)


 


    return (
        <div>
            
        </div>
    );
};

export default FunctionsForCustomerService;


