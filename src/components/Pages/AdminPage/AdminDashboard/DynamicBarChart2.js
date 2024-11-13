import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/UserContext';

const DynamicBarChart2 = () => {
    const { user } = useContext(AuthContext);
    const [totalModelLoading, setTotalModelLoading] = useState(true);
    const [totalModel, setTotalModel] = useState({});
    const [totalUser, setTotalUser] = useState(10);

    // Array of 20 different colors for the bars
    const barColors = [
        'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
        'bg-indigo-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-lime-500',
        'bg-emerald-500', 'bg-cyan-500', 'bg-fuchsia-500', 'bg-rose-500', 'bg-violet-500',
        'bg-amber-500', 'bg-zinc-500', 'bg-sky-500', 'bg-slate-500', 'bg-neutral-500'
    ];

    // useEffect to call the data fetching functions on user login
    useEffect(() => {
        if (user?.email) {
            fetchTotalPrinterModel();
            fetchTotalUser();
        }
    }, [user?.email]);

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

    // Fetches total user count data
    const fetchTotalUser = async () => {
        try {
            const response = await fetch('https://grozziieget.zjweiting.com:3091/CustomerService-Chat/api/dev/user/page?page=1&size=1');
            if (!response.ok) throw new Error('Failed to fetch total user count');
            const data = await response.json();
            // setTotalUser(data.totalElements);
        } catch (error) {
            console.error("Error fetching total user count:", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-3xl text-gray-500 font-bold mb-5">Printer Model Counts</h3>
            <div className="space-y-4">
                {totalModelLoading ? (
                    <div>Loading...</div>
                ) : (
                    Object.keys(totalModel).map((model, index) => {
                        const count = totalModel[model];
                        const widthPercentage = (count / totalUser) * 100;

                        // Cycle through the color array based on the index of the model
                        const barColor = barColors[index % barColors.length];

                        return (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-center">
                                    <span>{model}</span>
                                    <span className="font-semibold">{count}</span>
                                </div>
                                <div className="bg-gray-200 h-4 rounded-full">
                                    <div
                                        className={`h-full rounded-full ${barColor}`}
                                        style={{ width: `${widthPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default DynamicBarChart2;
