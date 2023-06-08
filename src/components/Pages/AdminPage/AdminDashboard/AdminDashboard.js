import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/UserContext';
import usersLogo from "../../../../Assets/Images/Admin/Users.png"
import IconsLogo from "../../../../Assets/Images/Admin/icons.png"
import mallLogo from "../../../../Assets/Images/Admin/Mall.png"
import eventLogo from "../../../../Assets/Images/Admin/Event.png"
import QALogo from "../../../../Assets/Images/Admin/Q&A.jpg"
import axios from 'axios';

const AdminDashboard = () => {
    const {user}=useContext(AuthContext);
    const [userInfo,setUserInfo]=useState(null);
    const [allUsers,setAllUsers]=useState(null);
    const [eventProduct,setEventProduct]=useState(null);
    const [mallProduct,setMallProduct]=useState(null);
    const [categories,setCategories]=useState(null);
    const [questionAnswer,setQuestionsAnswer]=useState(null);
     //got the current user data from database  
     useEffect(() => {
        if (user?.email) {
          fetchUserByEmail();
          fetchQuestionsAnswerByEmail();
        }
      }, [user?.email]);


    const fetchUserByEmail = async () => {
        try {
          const response = await axios.get('http://localhost:5000/tht/users', {
            params: {
              email: user?.email,
            },
          });
          setUserInfo(response.data[0]);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
// use useEffect to load the all mall product from data base
useEffect(() => {
    
    fetch('http://localhost:5000/tht/eventProducts')
        .then(response => response.json())
        .then(data => setEventProduct(data));
}, []);


//start the part to get all the users from database

axios.get('http://localhost:5000/tht/allUsers')
.then(response => {
  setAllUsers(response.data);
})                 
.catch(error => {
  console.log(error);
});
    
 // use useEffect to load the all mall product from data base
 useEffect(() => {
    
    fetch('http://localhost:5000/tht/mallProducts')
        .then(response => response.json())
        .then(data => setMallProduct(data));
}, []);

useEffect(() => {
    fetch('http://localhost:5000/tht/categories')
        .then(response => response.json())
        .then(data =>{
          setCategories(JSON.parse(data[0]?.allcategories))
        });
}, []);

  //got the current user data from database  

  const fetchQuestionsAnswerByEmail = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tht/QandAnswers', {
        params: {
          email: user?.email,
        },
      });
      setQuestionsAnswer(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


    return (
        <div>
         <div className="text-white pt-12 pb-5">
                        <img data-aos="fade-down" data-aos-duration="2000" className="h-40 w-40 rounded-full border-8 border-x-fuchsia-500 border-yellow-300 mx-auto"
                             src={userInfo?.image} 
                            alt="" />
                        <div data-aos="fade-up" data-aos-duration="2000">
                            <h1 className="text-2xl text-red-300 font-bold" >
                                Hi <span className="text-lime-400">
                                    {user?.email}
                                </span>
                            </h1>
                            <p className="text-xl text-green-300">
                                Welcome to your dashboard
                            </p>
                        </div>

                    </div>   

                    <section className="p-6 py-6 bg-gradient-to-l from-blue-900 via-slate-900 to-black pt-12 text-gray-200 mb-16 rounded-lg">
            <div data-aos="fade-down" data-aos-duration="2000" className="mb-5 mt-12">
                <h2 className="text-black text-3xl text-green-400 font-bold">Short Overview</h2>
                <p className="text-gray-200 text-base font-semibold">THT-Space Electrical Company Ltd. is a leading manufacturer of printing and attendance check equipment. With a factory located in China, the company produces a range of products including dot printers, thermal printers, attendance check clocks, and binding machines.</p>
            </div>
            <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
            <div data-aos="fade-right" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                       
                        <img className="w-16 h-16" src={usersLogo}></img>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{allUsers?.length}</p>
                        <p className="capitalize">Total Users</p>
                    </div>
                </div>
                <div data-aos="fade-right" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                        
                        <img className="w-16 h-16" src={IconsLogo}></img>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{categories?.length}</p>
                        <p className="capitalize">Total Icons Category</p>
                    </div>
                </div>
                <div data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                       
                        <img className="w-16 h-16" src={mallLogo}></img>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{mallProduct?.length}</p>
                        <p className="capitalize">Total Mall Product</p>
                    </div>
                </div>
                <div data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                       
                       <img className="w-16 h-16" src={eventLogo}></img>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{eventProduct?.length}</p>
                        <p className="capitalize">Total Event Product</p>
                    </div>
                </div>
                <div data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
                    <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">
                       
                        <img className="w-16 h-16" src={QALogo}></img>
                    </div>
                    <div className="flex flex-col justify-center align-middle">
                        <p className="text-3xl font-semibold leading-none">{questionAnswer?.length}</p>
                        <p className="capitalize">Total Q&A</p>
                    </div>
                </div>
            </div>
        </section> 
        </div>
        
    );
};

export default AdminDashboard;