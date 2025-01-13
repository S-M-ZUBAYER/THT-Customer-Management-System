import React from 'react';
import PowerBankModels from './PowerbankModel';
import VoltageDetails from './VoltageDetails';

const VoltagePercentage = () => {
    return (
        <div className="mb-16">
            <PowerBankModels></PowerBankModels>
            <VoltageDetails></VoltageDetails>
        </div>
    );
};

export default VoltagePercentage;