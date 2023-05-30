// import React, { useState } from 'react';

// const CategoryList = ({category, setCategory,categories, setCategories,selectedCategory, setSelectedCategory }) => {

//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//   };

//   const handleAddCategory = () => {
//     if (category.trim() !== '') {
//       setCategories((prevCategories) => [...prevCategories, category]);
//       setCategory('');
//     }
//   };

//   return (
//     <div>
//       <h1>Category List</h1>
//       <input type="text" value={category} onChange={handleCategoryChange} placeholder="Enter category name" />
//       <button onClick={handleAddCategory}>Add</button>

//       <ul>
//         {categories.map((cat, index) => (
//           <li key={index}>{cat}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryList;

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const CategoryList = ({category, setCategory,categories, setCategories,selectedCategory, setSelectedCategory }) => {


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (category.trim() !== '') {
      setCategories((prevCategories) => [...prevCategories, category]);
      //load current user data from database
      console.log(categories)
      fetch('http://localhost:5000/tht/categories/add', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({categories })
      })
          .then(res => res.json())
          .then(data => {
              if (data?.insertId) {
                  toast.success('New Category stored Successfully');
                 
              }
              else {
                  toast.error(data.message);
              }

          }) 
      setCategory('');
    }



  };

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <h1>Category List</h1>
      <input type="text" value={category} onChange={handleCategoryChange} placeholder="Enter category name" />
      <button onClick={handleAddCategory}>Add</button>

      <select value={selectedCategory} onChange={handleSelectChange}>
        <option value="">Select a category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>

      {selectedCategory && <p>Selected category: {selectedCategory}</p>}
    </div>
  );
};

export default CategoryList;

