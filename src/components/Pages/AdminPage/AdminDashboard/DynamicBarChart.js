import React from 'react';

const data = [
    {
        country: "Bangladesh",
        deviceTypeCounts: [
            { deviceType: "Android", count: 2343 },
            { deviceType: "IOS", count: 3344 }
        ]
    },
    {
        country: "China",
        deviceTypeCounts: [
            { deviceType: "Android", count: 342 },
            { deviceType: "IOS", count: 345 }
        ]
    },
    {
        country: "Bangladesh",
        deviceTypeCounts: [
            { deviceType: "Android", count: 2 },
            { deviceType: "IOS", count: 322 }
        ]
    },
    {
        country: "Indonesia",
        deviceTypeCounts: [
            { deviceType: "Android", count: 133 }
        ]
    }
];

const TOTAL_USERS = 23000;

const DynamicBarChart = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Device Type Counts by Country</h3>
            <div className="space-y-4">
                {data.map((countryData, index) => (
                    <div key={index} className="mb-4">
                        <h4 className="text-lg font-bold">{countryData.country}</h4>
                        {countryData.deviceTypeCounts.map((deviceData, idx) => {
                            const widthPercentage = (deviceData.count / TOTAL_USERS) * 100;

                            // Apply color conditionally based on count thresholds
                            const barColor = deviceData.count > (TOTAL_USERS * 0.5)
                                ? 'bg-red-500' // High usage (more than 50% of total users)
                                : deviceData.count > (TOTAL_USERS * 0.1)
                                    ? 'bg-yellow-500' // Medium usage (10-50% of total users)
                                    : 'bg-green-500'; // Low usage (less than 10% of total users)

                            return (
                                <div key={idx} className="mb-2">
                                    <div className="flex justify-between items-center">
                                        <span>{deviceData.deviceType}</span>
                                        <span className="font-semibold">{deviceData.count}</span>
                                    </div>
                                    <div className="bg-gray-200 h-4 rounded-full">
                                        <div
                                            className={`h-full rounded-full ${barColor}`}
                                            style={{ width: `${widthPercentage}%` }}
                                        ></div>
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
