

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const AddWarehouseName = ({allWarehouseNameList, setAllWarehouseNameList}) => {
    const [warehouseName, setWarehouseName]=useState("");

  const handleWarehouseChange = (e) => {
    setWarehouseName(e.target.value);
  };


  const handleAddWarehouse = () => {
    if (warehouseName.trim() !== '') {
      setAllWarehouseNameList([...allWarehouseNameList,warehouseName]);
      axios.post('https://grozziieget.zjweiting.com:8033/tht/warehouseName/add', {
        warehouseName: warehouseName,
      })
      .then((response) => {
        toast.success("New warehouseName Added Successfully")
        // Handle success, reset the input field, or show a success message
        setWarehouseName('');
      })
      .catch((error) => {
        console.error('Error adding warehouseName', error);
        toast.error(error)
        // Handle error, show an error message to the user
      });
    }

  };

 


  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-900 my-5">Add All Warehouse Name</h1>
      <input type="text" value={warehouseName} onChange={(e)=>handleWarehouseChange(e)} placeholder="Enter Warehouse Name" className="pl-2 text-center bg-white text-gray-800" />
      <div>

      <button className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg" onClick={handleAddWarehouse}>Add</button>
      </div>
    </div>
  );
};

export default AddWarehouseName;