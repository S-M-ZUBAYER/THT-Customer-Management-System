

import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const AddIconCategory = ({categories, setCategories}) => {
    const [categoryName, setCategoryName]=useState("");
 console.log(categories)

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
    console.log(categoryName)
  };


  const handleAddCategory = () => {
    if (categoryName.trim() !== '') {
      setCategories([...categories,categoryName]);
      axios.post('https://grozziie.zjweiting.com:8033/tht/iconCategories/add', {
        categoryName: categoryName,
      })
      .then((response) => {
        console.log('Category added successfully', response.data);
        toast.success("New Category Added Successfully")
        // Handle success, reset the input field, or show a success message
        setCategoryName('');
      })
      .catch((error) => {
        console.error('Error adding category', error);
        toast.error(error)
        // Handle error, show an error message to the user
      });
    }

  };

 


  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-900 my-5">Add Icon Image Category</h1>
      <input type="text" value={categoryName} onChange={(e)=>handleCategoryChange(e)} placeholder="Enter category name" className="pl-2 text-center bg-white text-gray-800" />
      <div>

      <button className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg" onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default AddIconCategory;

