import React, { useState } from 'react';
import {AiFillFolderOpen} from "react-icons/ai";
import { Link } from 'react-router-dom';

const IconsCategoryList = ({categories}) => {
    const [routeCategory,setRouteCategory]=useState("")


  return (
    <div>
      <h1 className="text-3xl my-5 font-bold text-green-400">All Available Categories</h1>
    <div className="grid grid-cols-5">
        {categories.map((category, index) => (
          
            <Link  to={`/admin/icon/${category}`} className="my-5 mx-auto">
              <AiFillFolderOpen className="w-20 h-20 mx-auto"></AiFillFolderOpen>
                <p>
                {category}
                </p>
            </Link>
          
        ))}
      </div>
    </div>
  );
};

export default IconsCategoryList;