

import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../../../context/UserContext';

const CategoryList = () => {
  const {category, setCategory,categories, setCategories}=useContext(AuthContext);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(category)
  };


  const handleAddCategory = () => {
    if (category.trim() !== '') {
      const newCategories=[...categories,category]
      setCategories(newCategories);
      //load current user data from database
      console.log(newCategories,"set All categories")
      fetch('https://customer-server-theta.vercel.app/tht/categories/add', {    
          method: 'PUT',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(newCategories)
      })
          .then(res => res.json())
          .then(data => {
              if (data?.changedRows) {
                  toast.success('New Category stored Successfully');
                 
              }
              else {
                  toast.error(data.message);
              }

          }) 
      setCategory('');
    }



  };


  // //create a function to update a user from the frontend and database both side 
  // const updateUser = async (userId, editingUser) => {
  //   try {
  //     const response = await axios.put(`https://customer-server-theta.vercel.app/tht/users/update/${userId}`, editingUser);
  //     toast.success("user information updated successfully");
  //     // Optionally, you can show a success message to the user using a toast or other UI notification.
  //   } catch (error) {
  //     toast.error('Error updating user:', error);
  //     // Optionally, you can show an error message to the user using a toast or other UI notification.
  //   }
  // };




  return (
    <div>
      <h1 className="text-2xl font-bold text-yellow-900 my-5">Add Category</h1>
      <input type="text" value={category} onChange={(e)=>handleCategoryChange(e)} placeholder="Enter category name" className="pl-2 text-center bg-white text-gray-800" />
      <div>

      <button className="px-4 py-1 mt-5 bg-lime-200 text-gray-800 font-semibold rounded-lg" onClick={handleAddCategory}>Add</button>
      </div>
    </div>
  );
};

export default CategoryList;

