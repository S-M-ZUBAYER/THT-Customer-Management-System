import React, { useState } from 'react';
import PowerBankModels from './PowerbankModel';
import VoltageDetails from './VoltageDetails';

const VoltagePercentage = () => {

    const [currentServer, setCurrentServer] = useState("Global");
    const servers = ["Global", "Chinese"]
    const [baseUrl, setBaseUrl] = useState("https://grozziieget.zjweiting.com:8033");
    const handleToServerChange = () => {
        setCurrentServer(prev => prev === "Global" ? "Chinese" : "Global");
        setBaseUrl(currentServer !== "Global"
            ? "https://grozziieget.zjweiting.com:8033"
            : "https://jiapuv.com:8033"
        );
    };

    return (
        <div className="pt-5 bg-gray-100 " >
            <div className="flex justify-end pr-5 ">
                <select
                    className="p-2 w-52 border-gray-400 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={currentServer}
                    onChange={handleToServerChange}
                >
                    {servers.map((server) => (
                        <option key={server} value={server}>
                            {server}
                        </option>
                    ))}
                </select>
            </div>
            <PowerBankModels
                baseUrl={baseUrl}
                setBaseUrl={setBaseUrl}
                currentServer={currentServer}
                setCurrentServer={setCurrentServer}
            ></PowerBankModels>
            <VoltageDetails
                baseUrl={baseUrl}
                setBaseUrl={setBaseUrl}
                currentServer={currentServer}
                setCurrentServer={setCurrentServer}
            ></VoltageDetails>
        </div>
    );
};

export default VoltagePercentage;