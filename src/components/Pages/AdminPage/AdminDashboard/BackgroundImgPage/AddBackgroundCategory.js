import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const AddBackgroundCategory = ({categories, setCategories}) => {
    const [categoryName, setCategoryName]=useState("");


//Get the category name from input field
  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };


//Make function to store the category name to store background images
  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      setCategories([...categories,categoryName]);
      axios.post('https://grozziieget.zjweiting.com:8033/tht/backgroundCategories/add', {
        categoryName: categoryName,
      })
      .then((response) => {
        toast.success("New Category Added Successfully")
        setCategoryName('');
      })
      .catch((error) => {
        console.error('Error adding category', error);
        toast.error(error)
      });
    }

  };

 


  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-900 my-5">Add Background Image Category</h1>
      <input type="text" value={categoryName} onChange={(e)=>handleCategoryChange(e)} placeholder="Enter category name" className="pl-2 text-center bg-white text-gray-800" />
      <div>
      <button className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg" onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default AddBackgroundCategory;

