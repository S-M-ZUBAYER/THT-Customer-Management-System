

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const AddModelNo = ({allWarehouseNameList, setAllWarehouseNameList}) => {
    const [modelNo, setModelNo]=useState("");

  const handleModelNoChange = (e) => {
    setModelNo(e.target.value);
  };

  //Create this function to add new model
  const handleAddWarehouse = () => {
    if (modelNo.trim() !== '') {
      setAllWarehouseNameList([...allWarehouseNameList,modelNo]);
      axios.post('https://grozziieget.zjweiting.com:8033/tht/modelNo/add', {
        modelNo: modelNo,
      })
      .then((response) => {
        toast.success("New Model Number Added Successfully")
        setModelNo('');
      })
      .catch((error) => {
        console.error('Error adding Model No', error);
        toast.error(error)
      });
    }

  };

 
  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-900 my-5">Add All Bluetooth Model No</h1>
      <input type="text" value={modelNo} onChange={(e)=>handleModelNoChange(e)} placeholder="Enter Model No" className="pl-2 text-center bg-white text-gray-800" />
      <div>

      <button className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg" onClick={handleAddWarehouse}>Add Bluetooth Model</button>
      </div>
    </div>
  );
};

export default AddModelNo;