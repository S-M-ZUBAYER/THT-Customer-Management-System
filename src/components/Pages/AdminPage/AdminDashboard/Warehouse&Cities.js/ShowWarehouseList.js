import React, { useState } from 'react';
import {AiFillFolderOpen} from "react-icons/ai";
import { Link } from 'react-router-dom';

const ShowWarehouseList = ({allWarehouseNameList}) => {
    const [routeCategory,setRouteCategory]=useState("")


  return (
    <div>
      <h1 className="text-3xl my-5 font-bold text-green-400">All Available Warehouse here</h1>
    <div className="grid grid-cols-3 md:grid-cols-5">
        {allWarehouseNameList.map((warehouse, index) => (
          
            <Link key={index}  to={`/admin/cityName/${warehouse}`} className="my-5 mx-auto">
              <AiFillFolderOpen className="w-20 h-20 mx-auto text-yellow-400"></AiFillFolderOpen>
                <p className="font-semibold">
                {warehouse}
                </p>
            </Link>
          
        ))} 
      </div>
    </div>
  );
};

export default ShowWarehouseList;