import React, { useContext } from 'react';
import img from "../../../Assets/Images/messi.jpg"
import { AuthContext } from '../../../context/UserContext';
const Account = () => {
const {logOut,user}=useContext(AuthContext)

const handleToLogOut=()=>{
    logOut()
    .then(()=>{})
    .catch(err=>{
        console.log(err)
    })
}


    return (
        <div className="mt-32 md:mx-36">
        
        <div className="grid grid-cols-1 md:grid-cols-2 text-center">
            <div className="flex justify-around">
                <img className="rounded-full h-56 w-56" src={user?.photoURL}></img>
            </div>
            <div className="text-start sm:mt-10 md:mt-0 "> 
                <div className= "sm:mx-10 md:mx-0">
                    <div className="test-center">
                       <h2 className="text-lg font-semibold mb-0 pb-0">
                        User name
                    </h2>
                    <p className="mb-4 ml-1"> 
                        Designation
                    </p>  
                    </div>
                   
                    <div className="grid grid-cols-4 my-3">
                        <p className="font-semibold">
                        Contact Number:
                        </p>
                         <p >+8801304979278</p>
                    </div>
                    <div className="grid grid-cols-4 my-3">
                        <p  className="font-semibold">
                        Email
                        </p>
                         <p>smzubayer9004@gmail.com</p>
                    </div>
                    <div className="grid grid-cols-4 my-3">
                        <p  className="font-semibold">
                        Country
                        </p>
                         <p>Bangladesh</p>
                    </div>
                    <div className="grid grid-cols-4 my-3">
                        <p  className="font-semibold">
                        language
                        </p>
                         <p>Bengali</p>
                    </div>

                </div>

                <div className="my-20">
            <button onClick={handleToLogOut} className="bg-[#004368]  px-20 rounded-md py-2 ml-2 text-white font-semibold hover:bg-slate-800" >
                Log out
            </button>
        </div>
                
            </div>

        </div>

        
            
        </div>
    );
};

export default Account;