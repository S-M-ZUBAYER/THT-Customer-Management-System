import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AddIconCategory = ({ categories, setCategories }) => {
  // State to hold category names for different languages
  const [categoryNames, setCategoryNames] = useState({
    en: "",
    zh: "",
    vi: "",
    idn: "",
    fil: "",
    ms: "",
    th: ""
  });

  // Handle input change for each language
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryNames((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Create a function to store category names
  const handleAddCategory = () => {
    const { en, zh, vi, idn, fil, ms, th } = categoryNames;

    // Ensure all fields are filled out
    if (en.trim() && zh.trim() && vi.trim() && idn.trim() && fil.trim() && ms.trim() && th.trim()) {
      axios.post('https://grozziieget.zjweiting.com:8033/tht/iconCategoriesList/add', {
        english: en,
        china: zh,
        vietnam: vi,
        indonesia: idn,
        philippines: fil,
        malaysia: ms,
        thailand: th
      })
        .then((response) => {
          toast.success("New Category Added Successfully");
          setCategories([...categories, categoryNames]);
          // Reset input fields
          setCategoryNames({
            en: "",
            zh: "",
            vi: "",
            idn: "",
            fil: "",
            ms: "",
            th: ""
          });
        })
        .catch((error) => {
          console.error('Error adding category', error);
          toast.error("Error adding category");
        });
    } else {
      toast.error("Please fill out all fields");
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-yellow-900 text-center mb-8">Add Icon Image Category</h1>

      {/* Input fields for each language */}
      {Object.keys(categoryNames).map((lang) => (
        <div key={lang} className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1 capitalize">
            {lang} Category Name
          </label>
          <input
            type="text"
            name={lang}
            value={categoryNames[lang]}
            onChange={handleCategoryChange}
            placeholder={`Enter category name in ${lang.toUpperCase()}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-200"
          />
        </div>
      ))}

      <div className="text-center">
        <button
          className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 ml-5 rounded-lg"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddIconCategory;
