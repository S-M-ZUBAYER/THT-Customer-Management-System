import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/UserContext';

// const DynamicBarChart = ({ deviceTypeCount }) => {
const DynamicBarChart = () => {
    const { user } = useContext(AuthContext);
    const [deviceTypeCountLoading, setDeviceTypeCountLoading] = useState(true);
    const [totalModelLoading, setTotalModelLoading] = useState(true);
    const [totalModel, setTotalModel] = useState({});
    const [totalUser, setTotalUser] = useState(0);

    // Static data for demonstration; replace with API data in production
    const deviceTypeCount = [
        { country: "Bangladesh", deviceTypeCounts: [{ deviceType: "Android", count: 2343 }, { deviceType: "IOS", count: 3344 }] },
        { country: "China", deviceTypeCounts: [{ deviceType: "Android", count: 342 }, { deviceType: "IOS", count: 345 }] },
        { country: "Indonesia", deviceTypeCounts: [{ deviceType: "Android", count: 133 }] }
    ];

    // useEffect(() => {
    //     // Call each fetch function
    //     fetchApiCallCount();
    //     fetchTotalPrinterModel();
    //     fetchTotalUser();
    // }, [user]);

    useEffect(() => {
        if (user?.email) {
            fetchApiCallCount();
            fetchTotalPrinterModel();
            fetchTotalUser();
        }
    }, [user?.email]);
    // Fetches device type count data
    const fetchApiCallCount = async () => {
        setDeviceTypeCountLoading(true);
        try {
            const response = await fetch('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/user/by/countrywise/deviceType');
            if (!response.ok) throw new Error('Failed to fetch API call count');
            const data = await response.json();
            // Process and set deviceTypeCount data here if needed
        } catch (error) {
            console.error("Error fetching API call count:", error);
        } finally {
            setDeviceTypeCountLoading(false);
        }
    };

    // Fetches total user count data
    const fetchTotalUser = async () => {
        try {
            const response = await fetch('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/user/page?page=1&size=1');
            if (!response.ok) throw new Error('Failed to fetch total user count');
            const data = await response.json();
            setTotalUser(data.totalElements);
        } catch (error) {
            console.error("Error fetching total user count:", error);
        }
    };

    // Fetches printer model data
    const fetchTotalPrinterModel = async () => {
        setTotalModelLoading(true);
        try {
            const response = await fetch('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/logininfo/user/by/printerModel');
            if (!response.ok) throw new Error('Failed to fetch printer model data');
            const data = await response.json();
            setTotalModel(data);
        } catch (error) {
            console.error("Error fetching printer model data:", error);
        } finally {
            setTotalModelLoading(false);
        }
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-3xl text-gray-500 font-bold mb-5">Device Type Counts by Country</h3>
            <div className="space-y-4">
                {deviceTypeCount.map((countryData, index) => (
                    <div key={index} className="mb-4">
                        <h4 className="text-lg font-bold">{countryData.country}</h4>
                        {countryData.deviceTypeCounts.map((deviceData, idx) => {
                            const widthPercentage = (deviceData.count / totalUser) * 100;
                            const barColor = deviceData.count > (totalUser * 0.5) ? 'bg-red-500' : deviceData.deviceType === "Android" ? 'bg-yellow-500' : 'bg-green-500';

                            return (
                                <div key={idx} className="mb-2">
                                    <div className="flex justify-between items-center">
                                        <span>{deviceData.deviceType}</span>
                                        <span className="font-semibold">{deviceData.count}</span>
                                    </div>
                                    <div className="bg-gray-200 h-4 rounded-full">
                                        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${widthPercentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DynamicBarChart;
