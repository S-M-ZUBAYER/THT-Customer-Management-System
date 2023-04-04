import React from 'react';
import CustomerServicePart from './CustomerServicePart';

const CustomerService_2 = () => {

   

    return (
        <div className="text-left mx-20 px-12 my-10 py-10 shadow-lg  rounded-lg">
            
            <h1 className="text-2xl font-semibold text-gray-400 mt-5">
                Customer Name
            </h1>
            <hr className="text-black font-bold border-2 my-2"></hr> 

            <CustomerServicePart></CustomerServicePart>
        </div>
    );
};

export default CustomerService_2;