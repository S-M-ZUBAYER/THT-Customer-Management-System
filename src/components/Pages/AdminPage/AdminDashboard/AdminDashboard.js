import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/UserContext';
import usersLogo from "../../../../Assets/Images/Admin/Users.png"
import IconsLogo from "../../../../Assets/Images/Admin/icons.png"
import mallLogo from "../../../../Assets/Images/Admin/Mall.png"
import eventLogo from "../../../../Assets/Images/Admin/Event.png"
import QALogo from "../../../../Assets/Images/Admin/Q&A.jpg"
import BluetoothLogo from "../../../../Assets/Images/Admin/bluetooth.jpg"
import BluetoothManyLogo from "../../../../Assets/Images/Admin/bluetoothMany.jpg"
import wifiLogo from "../../../../Assets/Images/Admin/wifi.jpg"
import wifiManyLogo from "../../../../Assets/Images/Admin/WifiiMany.jpg"
import loginLogo from "../../../../Assets/Images/Admin/login.jpg"
import iosLogo from "../../../../Assets/Images/Admin/ios.jpeg"
import androidLogo from "../../../../Assets/Images/Admin/Android.jpg"
import allLoginLogo from "../../../../Assets/Images/Admin/Users.png"
import axios from 'axios';
import { Link } from 'react-router-dom';
import BtnSpinner from '../../../Shared/Loading/BtnSpinner';
import { HiRefresh } from "react-icons/hi";
import DynamicBarChart from './DynamicBarChart';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [eventProduct, setEventProduct] = useState(null);
  const [eventProductLoading, setEventProductLoading] = useState(false)
  const [mallProduct, setMallProduct] = useState(null);
  const [mallProductLoading, setMallProductLoading] = useState(false)
  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [questionAnswer, setQuestionsAnswer] = useState(null);
  const [questionAnswerLoading, setquestionAnswerLoading] = useState(true)
  const [userLoading, setUserLoading] = useState(true)
  const [eventLoading, setEventLoading] = useState(true)
  const [mallLoading, setMallLoading] = useState(true)
  const [categoryLoading, setCategoryLoading] = useState(true)
  const [qandALoading, setQandALoading] = useState(true)
  const [modelApiCount, setModelApiCount] = useState({})
  const [modelApiCountLoading, setModelApiCountLoading] = useState(true)
  const [loginApiCount, setLoginApiCount] = useState("")
  const [modelLoginApiCountLoading, setModelLoginApiCountLoading] = useState(true)
  const [todayLoginApiCount, setTodayLoginApiCount] = useState("")
  const [deviceTypeCount, setDeviceTypeCount] = useState("")
  const [todayLoginApiCountLoading, setTodayModelLoginApiCountLoading] = useState(true)
  const [deviceTypeCountLoading, setDeviceTypeCountLoading] = useState(true)


  //got the current user data from database  
  useEffect(() => {
    if (user?.email) {
      fetchUserByEmail();
      fetchQuestionsAnswerByEmail();
      fetchDeviceTypeCount();
    }
  }, [user?.email]);


  const fetchUserByEmail = async () => {
    try {
      const response = await axios.get('https://grozziieget.zjweiting.com:8033/tht/users', {
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
    fetch('https://grozziieget.zjweiting.com:8033/tht/eventProducts')
      .then(response => response.json())
      .then(data => setEventProduct(data));
    setEventLoading(false);
  }, []);

  const fetchApiCallCount = async () => {
    setModelApiCountLoading(true);
    try {
      const response = await fetch('https://grozziieget.zjweiting.com:8033/tht/apiCallCount');
      if (!response.ok) {
        throw new Error('Failed to fetch API call count');
      }
      const data = await response.json();
      setModelApiCount(data);
    } catch (error) {
      console.error("Error fetching API call count:", error);
    } finally {
      setModelApiCountLoading(false);
    }
  };
  const fetchLoginApiCallCount = async () => {
    setModelLoginApiCountLoading(true);
    try {
      const response = await fetch('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/total/sum');
      if (!response.ok) {
        throw new Error('Failed to fetch API call count');
      }
      const data = await response.json();
      setLoginApiCount(data);
    } catch (error) {
      console.error("Error fetching API call count:", error);
    } finally {
      setModelLoginApiCountLoading(false);
    }
  };
  const fetchDeviceTypeCount = async () => {
    setModelLoginApiCountLoading(true);
    try {
      const response = await fetch('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/user/by/deviceType');
      if (!response.ok) {
        throw new Error('Failed to fetch API call count');
      }
      const data = await response.json();
      setDeviceTypeCount(data);
    } catch (error) {
      console.error("Error fetching API call count:", error);
    } finally {
      setDeviceTypeCountLoading(false);
    }
  };

  const getTodayUserDataByDate = async () => {
    setTodayModelLoginApiCountLoading(true);
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const url = `https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/userByDate/${today}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodayLoginApiCount(data);
      // Process data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setTodayModelLoginApiCountLoading(false);
    }
  };





  useEffect(() => {
    fetchApiCallCount();
    fetchLoginApiCallCount();
    getTodayUserDataByDate();
    getTodayUserDataByDate();
  }, []);


  //start the part to get all the users from database

  axios.get('https://grozziieget.zjweiting.com:8033/tht/allUsers')
    .then(response => {
      setAllUsers(response.data);
      setUserLoading(false)
    })
    .catch(error => {
      console.error(error);
    });

  // use useEffect to load the all mall product from data base
  useEffect(() => {

    fetch('https://grozziieget.zjweiting.com:8033/tht/mallProducts')
      .then(response => response.json())
      .then(data => setMallProduct(data));
    setMallLoading(false)
  }, []);

  useEffect(() => {
    fetch('https://grozziieget.zjweiting.com:8033/tht/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(JSON.parse(data[0]?.allcategories))
        setCategoriesLoading(false)
      });
  }, []);

  //got the current user data from database  

  const fetchQuestionsAnswerByEmail = async () => {
    try {
      const response = await axios.get('https://grozziieget.zjweiting.com:8033/tht/QandAnswers', {
        params: {
          email: user?.email,
        },
      });
      setQuestionsAnswer(response.data);
      setQandALoading(false)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleCount = () => {
    fetchApiCallCount();
    fetchLoginApiCallCount();
    getTodayUserDataByDate();
  }

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


      <section className="relative p-6 py-6 bg-gradient-to-l from-blue-900 via-slate-900 to-black pt-12 text-gray-200 mb-16 rounded-lg">
        <button
          onClick={handleCount}
          className="absolute text-3xl top-4 right-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          <HiRefresh />
        </button>
        <div data-aos="fade-down" data-aos-duration="2000" className="mb-5 mt-5">
          <h2 className="text-black text-3xl text-green-400 font-bold mb-5">Short Overview</h2>
          <p className="text-gray-200 text-base font-semibold mb-8">THT-Space Electrical Company Ltd. is a leading manufacturer of printing and attendance check equipment. With a factory located in China, the company produces a range of products including dot printers, thermal printers, attendance check clocks, and binding machines.</p>
        </div>
        <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          <Link to='/admin/users' data-aos="fade-right" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={usersLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  userLoading ?
                    <BtnSpinner></BtnSpinner>
                    : allUsers?.length
                }
              </p>
              <p className="capitalize">Total Users</p>
            </div>
          </Link>
          <Link to='/admin/icon' data-aos="fade-right" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={IconsLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  categoriesLoading ?
                    <BtnSpinner></BtnSpinner>
                    : categories?.length
                }
              </p>
              <p className="capitalize">Total Icons Category</p>
            </div>
          </Link>
          <Link to='/admin/mallProduct' data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={mallLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  mallLoading ?
                    <BtnSpinner></BtnSpinner>
                    : mallProduct?.length
                }
              </p>
              <p className="capitalize">Total Mall Product</p>
            </div>
          </Link>
          <Link to='/admin/eventProduct' data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={eventLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  eventLoading ?
                    <BtnSpinner></BtnSpinner>
                    : eventProduct?.length
                }
              </p>
              <p className="capitalize">Total Event Product</p>
            </div>
          </Link>
          <Link data-aos="fade-right" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={loginLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  todayLoginApiCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : todayLoginApiCount
                }
              </p>
              <p className="capitalize">Today Login Count</p>
            </div>
          </Link>
          <Link data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={usersLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  modelLoginApiCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : loginApiCount
                }
                { }</p>
              <p className="capitalize">Total Login Count</p>
            </div>
          </Link>
          <Link data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={wifiLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  modelApiCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : modelApiCount?.wifiCount
                }
                { }</p>
              <p className="capitalize">Today Wifi Count</p>
            </div>
          </Link>
          <Link data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={wifiManyLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  modelApiCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : modelApiCount?.wifiTotalCount
                }
                { }</p>
              <p className="capitalize">Total Wifi Count</p>
            </div>
          </Link>
          <Link data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={BluetoothLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  modelApiCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : modelApiCount?.bluetoothCount
                }
                { }</p>
              <p className="capitalize">Today Bluetooth Count</p>
            </div>
          </Link>
          <Link data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={BluetoothManyLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  modelApiCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : modelApiCount?.bluetoothTotalCount
                }
                { }</p>
              <p className="capitalize">Total Bluetooth Count</p>
            </div>
          </Link>
          <Link data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={androidLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  deviceTypeCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : deviceTypeCount?.Android
                }
                { }</p>
              <p className="capitalize">Total Android Users</p>
            </div>
          </Link>
          <Link data-aos="fade-left" data-aos-duration="2000" className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gradient-to-t from-blue-900 via-slate-900 to-violet-700 text-gray-100">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-violet-400">

              <img className="w-16 h-16" src={iosLogo}></img>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-semibold leading-none">
                {
                  deviceTypeCountLoading ?
                    <BtnSpinner></BtnSpinner>
                    : deviceTypeCount?.IOS
                }
                { }</p>
              <p className="capitalize">Total IOS Users</p>
            </div>
          </Link>
        </div>
      </section>
      {/* Status Bar / Progress */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Country wise user Progress bar</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Malaysia</span>
            <span className="font-semibold">75%</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-yellow-500 h-full rounded-full" style={{ width: "75%" }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span>China</span>
            <span className="font-semibold">80%</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: "80%" }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span>Philippines</span>
            <span className="font-semibold">45%</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-green-500 h-full rounded-full" style={{ width: "45%" }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span>Indonesia</span>
            <span className="font-semibold">65%</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: "65%" }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span>Thailand</span>
            <span className="font-semibold">55%</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-red-500 h-full rounded-full" style={{ width: "55%" }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span>Vietnam</span>
            <span className="font-semibold">70%</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-pink-500 h-full rounded-full" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div> */}
      <DynamicBarChart></DynamicBarChart>
    </div>

  );
};

export default AdminDashboard;