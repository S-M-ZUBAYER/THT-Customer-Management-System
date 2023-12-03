

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const AddModelNo = ({allWarehouseNameList, setAllWarehouseNameList}) => {
    const [modelNo, setModelNo]=useState("");

  const handleModelNoChange = (e) => {
    setModelNo(e.target.value);
  };

  const handleAddWarehouse = () => {
    if (modelNo.trim() !== '') {
      setAllWarehouseNameList([...allWarehouseNameList,modelNo]);
      axios.post('https://grozziieget.zjweiting.com:8033/tht/modelNo/add', {
        modelNo: modelNo,
      })
      .then((response) => {
        toast.success("New Model Number Added Successfully")
        // Handle success, reset the input field, or show a success message
        setModelNo('');
      })
      .catch((error) => {
        console.error('Error adding Model No', error);
        toast.error(error)
        // Handle error, show an error message to the user
      });
    }

  };

 


  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-900 my-5">Add All Model No</h1>
      <input type="text" value={modelNo} onChange={(e)=>handleModelNoChange(e)} placeholder="Enter Model No" className="pl-2 text-center bg-white text-gray-800" />
      <div>

      <button className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg" onClick={handleAddWarehouse}>Add Model</button>
      </div>
    </div>
  );
};

export default AddModelNo;