import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';// Assume BtnSpinner is a reusable spinner component for loading states
import { fetchData } from './apiService'; // Utility for fetching data
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
const AdminDashboard = () => {

  const [userInfo, setUserInfo] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mallProduct, setMallProduct] = useState([]);
  const [eventProduct, setEventProduct] = useState([]);
  const [todayLoginApiCount, setTodayLoginApiCount] = useState(0);
  const [loginApiCount, setLoginApiCount] = useState(0);
  const [modelApiCount, setModelApiCount] = useState({});
  const [deviceTypeCount, setDeviceTypeCount] = useState({});
  const [deviceTypeTotalCount, setDeviceTypeTotalCount] = useState({});

  const [loading, setLoading] = useState({
    userLoading: true,
    categoriesLoading: true,
    mallLoading: true,
    eventLoading: true,
    todayLoginApiCountLoading: true,
    modelLoginApiCountLoading: true,
    modelApiCountLoading: true,
    deviceTypeCountLoading: true,
    deviceTypeTotalCountLoading: true,
  });

  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  useEffect(() => {
    // Simulated API calls to fetch data
    fetchData('https://grozziieget.zjweiting.com:8033/tht/user-info', setUserInfo, 'userLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:8033/tht/allUsers', setAllUsers, 'userLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:8033/tht/categories', setCategories, 'categoriesLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:8033/tht/mallProducts', setMallProduct, 'mallLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:8033/tht/eventProducts', setEventProduct, 'eventLoading', setLoading);
    fetchData(`https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/userByDate/${today}`, setTodayLoginApiCount, 'todayLoginApiCountLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/total/sum', setLoginApiCount, 'modelLoginApiCountLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:8033/tht/apiCallCount', setModelApiCount, 'modelApiCountLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/user/by/countrywise/deviceType', setDeviceTypeCount, 'deviceTypeCountLoading', setLoading);
    fetchData('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/user/by/deviceType', setDeviceTypeTotalCount, 'deviceTypeCountTotalLoading', setLoading);
  }, []);




  const handleCountRefresh = async () => {
    setLoading(prev => ({ ...prev, todayLoginApiCountLoading: true, modelLoginApiCountLoading: true }));
    await fetchData(`https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/userByDate/${today}`, setTodayLoginApiCount, 'todayLoginApiCountLoading');
    await fetchData('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/total/sum', setLoginApiCount, 'modelLoginApiCountLoading');
  };


  return (
    <div className="admin-dashboard">
      <Dashboard
        userInfo={userInfo}
        handleCount={handleCountRefresh}
        userLoading={loading.userLoading}
        allUsers={allUsers}
        categoriesLoading={loading.categoriesLoading}
        categories={categories}
        mallLoading={loading.mallLoading}
        mallProduct={mallProduct}
        eventLoading={loading.eventLoading}
        eventProduct={eventProduct}
        todayLoginApiCountLoading={loading.todayLoginApiCountLoading}
        todayLoginApiCount={todayLoginApiCount}
        modelLoginApiCountLoading={loading.modelLoginApiCountLoading}
        loginApiCount={loginApiCount}
        modelApiCountLoading={loading.modelApiCountLoading}
        modelApiCount={modelApiCount}
        deviceTypeCountLoading={loading.deviceTypeCountLoading}
        deviceTypeCount={deviceTypeCount}
        deviceTypeTotalCountLoading={loading.deviceTypeTotalCountLoading}
        deviceTypeTotalCount={deviceTypeTotalCount}
        usersLogo={usersLogo}
        IconsLogo={IconsLogo}
        mallLogo={mallLogo}
        eventLogo={eventLogo}
        loginLogo={loginLogo}
        wifiLogo={wifiLogo}
        wifiManyLogo={wifiManyLogo}
        BluetoothLogo={BluetoothLogo}
        BluetoothManyLogo={BluetoothManyLogo}
        androidLogo={androidLogo}
        iosLogo={iosLogo}
      />
    </div>
  );
};

export default AdminDashboard;
